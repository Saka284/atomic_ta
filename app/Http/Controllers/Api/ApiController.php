<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class ApiController extends Controller
{
    /**
     * Ambil data per greenhouse untuk tabel sensor (Pivot Format)
     */
    public function tablePerGH(Request $request)
    {
        // 1. Ambil Greenhouse ID
        $gh_id = $request->gh_id ?: 1;
        if ($request->has('dict')) {
            $dict = json_decode($request->dict, true);
            $gh_id = $dict['gh_id'] ?? $gh_id;
        }

        // 2. Mapping ID Sensor sesuai permintaan USER
        // GH 1: Temp(1), Hum(2), Light(3), RSSI(7)
        // GH 2: Temp(4), Hum(5), Light(6), RSSI(8)
        if ($gh_id == 1) {
            $ids = ['temp' => 1, 'hum' => 2, 'light' => 3, 'rssi' => 7];
        } else {
            $ids = ['temp' => 4, 'hum' => 5, 'light' => 6, 'rssi' => 8];
        }

        // 3. Query dengan teknik PIVOT agar satu baris memiliki semua nilai sensor
        $query = DB::table('sensor_data')
            ->whereIn('sensor_id', array_values($ids))
            ->select(
                'node_id',
                'recorded_at',
                DB::raw("DATE(recorded_at) as date"),
                DB::raw("TIME(recorded_at) as time"),
                DB::raw("MAX(CASE WHEN sensor_id = {$ids['temp']} THEN value END) as temperature"),
                DB::raw("MAX(CASE WHEN sensor_id = {$ids['hum']} THEN value END) as humidity"),
                DB::raw("MAX(CASE WHEN sensor_id = {$ids['light']} THEN value END) as light_intensity"),
                DB::raw("MAX(CASE WHEN sensor_id = {$ids['rssi']} THEN value END) as rssi")
            )
            ->groupBy('node_id', 'recorded_at')
            ->orderBy('recorded_at', 'desc');

        // 4. Pagination agar footer tabel muncul (count total)
        $perPage = 10;
        $paginatedData = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $paginatedData->items(),
            'total' => $paginatedData->total(),
            'current_page' => $paginatedData->currentPage(),
            'per_page' => $perPage,
            'last_page' => $paginatedData->lastPage(),
        ]);
    }

    /**
     * Ambil data rekaman kamera (Fix Status & Image URL)
     */
    public function cameraPerGH(Request $request)
    {
        $gh_id = $request->gh_id ?: 1;
        if ($request->has('dict')) {
            $dict = json_decode($request->dict, true);
            $gh_id = $dict['gh_id'] ?? $gh_id;
        }

        $paginated = DB::table('camera_data')
            ->where('gh_id', $gh_id)
            ->orderBy('recorded_at', 'desc')
            ->paginate(5);

        // Mapping URL Gambar (Sesuaikan port jika aplikasi utama bukan di 8000)
        $domain = "http://127.0.0.1:8000";

        $items = collect($paginated->items())->map(function ($item) use ($domain) {
            // FIX STATUS: Frontend butuh kolom "status" (Teks), bukan "isFoggy" (Boolean)
            $item->status = $item->isFoggy ? 'Berkabut' : 'Tidak Berkabut';

            // FIX IMAGE: Gabungkan Domain dengan Path dari DB
            if (!empty($item->image) && !str_starts_with($item->image, 'http')) {
                // Bersihkan path jika ada 'public/' atau dobel '/storage/'
                $itemPath = $item->image;
                $itemPath = str_replace('public/', '', $itemPath);

                // Jika path di DB sudah diawali '/storage', jangan tambahkan '/storage' lagi
                if (str_starts_with($itemPath, '/storage')) {
                    $item->image = $domain . $itemPath;
                } else {
                    $item->image = $domain . '/storage/' . ltrim($itemPath, '/');
                }
            }

            return $item;
        });

        return response()->json([
            'success' => true,
            'data' => $items,
            'total' => $paginated->total(),
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
        ]);
    }

    /**
     * Ambil data untuk Gauge (Monitoring) 
     */
    public function get_average_sensor_data(Request $request)
    {
        $gh_id = $request->gh_id ?: 1;

        // Sinkronisasi snapshot setiap 30 detik agar data gauge tetap segar
        if (!Cache::has('sensor_snapshots_synced')) {
            DB::statement("
                INSERT INTO sensor_snapshots (sensor_id, node_id, value, recorded_at, created_at, updated_at)
                SELECT sd.sensor_id, sd.node_id, sd.value, sd.recorded_at, NOW(), NOW()
                FROM sensor_data sd
                INNER JOIN (
                    SELECT sensor_id, node_id, MAX(id) AS latest_id
                    FROM sensor_data
                    GROUP BY sensor_id, node_id
                ) latest ON latest.latest_id = sd.id
                ON DUPLICATE KEY UPDATE
                    value = VALUES(value),
                    recorded_at = VALUES(recorded_at),
                    updated_at = VALUES(updated_at)
            ");
            Cache::put('sensor_snapshots_synced', true, 30);

            // Bersihkan cache terkait di PageController agar sinkron
            Cache::forget('gaugeData');
            Cache::forget('monitoring_latest_time');
            Cache::forget('heatmap_sensor_data');
            Cache::forget('heatmap_latest_time');
        }

        $snapshot = DB::table('sensor_snapshots as ss')
            ->join('sensors as s', 's.id', '=', 'ss.sensor_id')
            ->where('s.gh_id', $gh_id)
            ->select('s.name', DB::raw('AVG(ss.value) as avg_value'), DB::raw('MAX(ss.recorded_at) as last_recorded_at'))
            ->groupBy('s.name')
            ->get();

        $result = [
            'temperature' => 0,
            'humidity' => 0,
            'light_intensity' => 0,
            'last_recorded_at' => null,
        ];

        foreach ($snapshot as $row) {
            $key = strtolower(str_replace(' ', '_', $row->name));
            if (array_key_exists($key, $result)) {
                $result[$key] = round($row->avg_value, 2);
                if (!$result['last_recorded_at'] || $row->last_recorded_at > $result['last_recorded_at']) {
                    $result['last_recorded_at'] = $row->last_recorded_at;
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => $result
        ]);
    }

    /**
     * Ambil data untuk Chart (Grafik)
     */
    public function fetchChart(Request $request)
    {
        $sensor_id = $request->sensor_id;
        if ($request->has('dict')) {
            $dict = json_decode($request->dict, true);
            $sensor_id = $dict['sensor_id'] ?? $sensor_id;
        }

        if (!$sensor_id)
            return response()->json(['success' => false], 400);

        $data = DB::table('sensor_data')
            ->where('sensor_id', $sensor_id)
            ->where('recorded_at', '>=', Carbon::now()->subDay())
            ->select(DB::raw("DATE_FORMAT(recorded_at, '%H:%i') as label"), DB::raw('AVG(value) as value'))
            ->groupBy('label')
            ->orderBy('label', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $data->pluck('value'),
            'label' => $data->pluck('label')
        ]);
    }

    /**
     * Simpan data sensor dari Hardware
     */
    public function saveSensorData(Request $request)
    {
        $gh_id = $request->gh_id;
        $node_id = $request->node_id;
        $recorded_at = $request->recorded_at ?: now();

        // Mapping Sensor ID
        if ($gh_id == 1) {
            $mapping = ['temperature' => 1, 'humidity' => 2, 'light_intensity' => 3, 'rssi' => 7];
        } else {
            $mapping = ['temperature' => 4, 'humidity' => 5, 'light_intensity' => 6, 'rssi' => 8];
        }

        $insertedCount = 0;
        foreach ($mapping as $key => $sensor_id) {
            if ($request->has($key)) {
                $value = $request->input($key);

                // Insert ke sensor_data
                DB::table('sensor_data')->insert([
                    'sensor_id' => $sensor_id,
                    'node_id' => $node_id,
                    'value' => $value,
                    'recorded_at' => $recorded_at,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Update sensor_snapshots (Upsert)
                DB::table('sensor_snapshots')->updateOrInsert(
                    ['sensor_id' => $sensor_id, 'node_id' => $node_id],
                    [
                        'value' => $value,
                        'recorded_at' => $recorded_at,
                        'updated_at' => now(),
                    ]
                );
                $insertedCount++;
            }
        }

        if ($insertedCount > 0) {
            // Bersihkan cache agar tampilan web langsung update
            Cache::forget('gaugeData');
            Cache::forget('monitoring_latest_time');
            Cache::forget('heatmap_sensor_data');
            Cache::forget('heatmap_latest_time');
        }

        return response()->json(['success' => true, 'inserted' => $insertedCount]);
    }

    /**
     * Simpan data kamera dari Hardware
     */
    public function saveCameraData(Request $request)
    {
        $gh_id = $request->gh_id;
        $isFoggy = $request->isFoggy;
        $recorded_at = $request->recorded_at ?: now();
        $image_base64 = $request->image;

        if (!$image_base64) {
            return response()->json(['success' => false, 'message' => 'No image provided'], 400);
        }

        // Handle Base64 Image
        if (preg_match('/^data:image\/(\w+);base64,/', $image_base64, $type)) {
            $image_base64 = substr($image_base64, strpos($image_base64, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, etc
        } else {
            $type = 'jpg';
        }

        $image_base64 = base64_decode($image_base64);
        if ($image_base64 === false) {
            return response()->json(['success' => false, 'message' => 'Invalid base64 data'], 400);
        }

        $fileName = 'camera_' . time() . '_' . rand(100, 999) . '.' . $type;
        $folderPath = 'public/camera/';
        $dbPath = 'storage/camera/' . $fileName;

        if (!\Illuminate\Support\Facades\Storage::exists($folderPath)) {
            \Illuminate\Support\Facades\Storage::makeDirectory($folderPath);
        }

        \Illuminate\Support\Facades\Storage::put($folderPath . $fileName, $image_base64);

        DB::table('camera_data')->insert([
            'gh_id' => $gh_id,
            'image' => $dbPath,
            'isFoggy' => $isFoggy,
            'recorded_at' => $recorded_at,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * Update ambang batas sensor dari Web
     */
    public function updateThresholds(Request $request)
    {
        $thresholds = $request->thresholds; // Array of {sensor_id, min, max}
        if (!is_array($thresholds)) {
            return response()->json(['success' => false, 'message' => 'Invalid data format'], 400);
        }

        foreach ($thresholds as $t) {
            DB::table('sensors')
                ->where('id', $t['sensor_id'])
                ->update([
                    'threshold_min' => $t['threshold_min'],
                    'threshold_max' => $t['threshold_max'],
                    'updated_at' => now(),
                ]);
        }

        Cache::forget('heatmap_thresholds');
        Cache::forget('controlling_data');

        return response()->json(['success' => true]);
    }

    public function getDeviceStatus(Request $request)
    {
        $gh_id = $request->gh_id ?: 1;
        $data = DB::table('device_statuses')->where('gh_id', $gh_id)->first();
        return response()->json(['success' => true, 'data' => $data]);
    }

    public function postDeviceStatus(Request $request)
    {
        $gh_id = $request->gh_id;
        $fields = $request->only(['exhaust_status', 'dehumidifier_status', 'blower_status']);

        DB::table('device_statuses')->updateOrInsert(
            ['gh_id' => $gh_id],
            array_merge($fields, ['updated_at' => now()])
        );

        return response()->json(['success' => true, 'data' => DB::table('device_statuses')->where('gh_id', $gh_id)->first()]);
    }

    public function getControlling()
    {
        $data = \App\Models\Greenhouse::with('sensor')->get();
        return response()->json(['success' => true, 'data' => $data]);
    }

    public function thd()
    {
        return response()->json(['success' => true, 'message' => 'THD endpoint active']);
    }

    public function camera_status()
    {
        return response()->json(['success' => true, 'message' => 'Camera status active']);
    }
}
