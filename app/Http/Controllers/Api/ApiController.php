<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CameraData;
use App\Models\Greenhouse;
use App\Models\Sensor;
use App\Models\SensorData;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function sensor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|exists:greenhouses,id',
            'node_id' => 'required|integer',
            'temperature' => 'required|numeric',
            'humidity' => 'required|numeric',
            'light_intensity' => 'required|numeric',
            'rssi' => 'nullable|numeric',
            'recorded_at' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }


        $validated = $validator->validate();

        // accept data once per 10 minutes per node
        $last_data = SensorData::where('node_id', $validated['node_id'])->latest()->first();

        if ($last_data && $last_data->created_at->addMinutes(10) > now()) {
            return response()->json([
                'success' => false,
                'message' => 'Server only accepts data once per 10 minutes per node',
                'errors' => $validator->errors()
            ], 422);
        }

        $sensors = Sensor::where('gh_id', $validated['gh_id'])->get();

        $now = now()->toDateTimeString();

        $data = collect(['temperature', 'humidity', 'light_intensity', 'rssi'])->map(function ($type) use ($validated, $now, $sensors) {
            $formattedType = ($type === 'rssi')
                ? 'RSSI'
                : str_replace('_', ' ', ucwords($type, '_'));

            $sensor = $sensors->firstWhere('name', $formattedType);

            return [
                'sensor_id' => $sensor->id,
                'node_id' => $validated['node_id'],
                'value' => $validated[$type] ?? null,
                'recorded_at' => $validated['recorded_at'],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        })->toArray();

        try {
            DB::transaction(function () use ($data) {
                SensorData::insert($data);
            });

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save sensor data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function camera(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|exists:greenhouses,id',
            'isFoggy' => 'required|boolean',
            'recorded_at' => 'required|date',
            'image' => 'required|string', // base64,
            'fog_percentage' => 'nullable|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validate();

        try {
            $imageData = null;
            $timestamp = now()->format('YmdHis');

            if ($request->has('image')) { // base64
                $base64String = $request->image;

                if (!preg_match('/^data:image\/(png|jpg|jpeg);base64,/', $base64String, $matches)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid Base64 format.'
                    ], 400);
                }

                // Tentukan format gambar
                $format = $matches[1]; // "png", "jpg", atau "jpeg"

                // Decode base64
                $imageData = substr($base64String, strpos($base64String, ',') + 1);
                $imageData = base64_decode($imageData);

                if ($imageData === false) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid Base64 data.'
                    ], 400);
                }

                // Tentukan path file sementara
                $originalPath = public_path("/storage/camera/{$timestamp}.{$format}");
                file_put_contents($originalPath, $imageData);

                // Load gambar sesuai format
                if ($format === 'png') {
                    $image = imagecreatefrompng($originalPath);
                } else {
                    $image = imagecreatefromjpeg($originalPath);
                }

                if (!$image) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to create image resource.'
                    ], 500);
                }

                // 🔥 Perbaiki jika PNG menggunakan indexed color (palette-based)
                if ($format === 'png' && imageistruecolor($image) === false) {
                    imagepalettetotruecolor($image); // Ubah indexed color PNG ke RGB
                }

                // Simpan sebagai WebP
                $webpPath = public_path("/storage/camera/{$timestamp}.webp");
                imagewebp($image, $webpPath, 50); // Quality WebP 50%
                imagedestroy($image);

                // Bandingkan ukuran file
                $sizeOriginal = filesize($originalPath);
                $sizeWebp = filesize($webpPath);

                if ($sizeWebp < $sizeOriginal) {
                    unlink($originalPath); // Hapus file asli jika WebP lebih kecil
                    $imageData = "/storage/camera/{$timestamp}.webp";
                } else {
                    unlink($webpPath); // Hapus WebP jika lebih besar
                    $imageData = "/storage/camera/{$timestamp}.{$format}";
                }
            }

            if (!$imageData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image is required'
                ]);
            }

            $camera_data = CameraData::create([
                'gh_id' => $validated['gh_id'],
                'isFoggy' => $validated['isFoggy'],
                'recorded_at' => $validated['recorded_at'],
                'image' => $imageData,
                'fog_percentage' => $request->fog_percentage ?? null,
            ]);

            return response()->json([
                'success' => true,
                'data' => $camera_data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save camera data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function thd(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|exists:greenhouses,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validate();

        $sensors = Sensor::where('gh_id', $validated['gh_id'])->get();

        if ($sensors->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No sensors found for the given greenhouse.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $sensors
        ]);
    }

    public function camera_status(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|exists:greenhouses,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validate();

        $camera_data = CameraData::where('gh_id', $validated['gh_id'])->latest()->first();

        if (!$camera_data) {
            return response()->json([
                'success' => false,
                'message' => 'No camera found for the given greenhouse.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $camera_data
        ]);
    }

    public function get_average_sensor_data(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|exists:greenhouses,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validate();

        $sensor_ids = Sensor::where('gh_id', $validated['gh_id'])->pluck('id')->toArray();

        $sensor_data = SensorData::with('sensor')
            ->whereIn('sensor_id', $sensor_ids)
            ->select('sensor_data.sensor_id', 'sensor_data.node_id', 'sensor_data.value', 'sensor_data.recorded_at', 'sensors.name as sensor_name')
            ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
            ->whereIn('sensor_data.id', function ($query) use ($sensor_ids) {
                $query->selectRaw('MAX(sensor_data.id)')
                    ->from('sensor_data')
                    ->whereIn('sensor_data.sensor_id', $sensor_ids)
                    ->groupBy('sensor_data.sensor_id', 'sensor_data.node_id');
            })
            ->orderByDesc('sensor_data.recorded_at')
            ->get();

        $totals = [
            'Temperature' => 0,
            'Humidity' => 0,
            'Light Intensity' => 0,
        ];

        $counts = [
            'Temperature' => 0,
            'Humidity' => 0,
            'Light Intensity' => 0,
        ];

        foreach ($sensor_data as $data) {
            if (isset($totals[$data->sensor_name])) {
                $totals[$data->sensor_name] += $data->value;
                $counts[$data->sensor_name]++;
            }
        }

        $data = [
            'temperature' => $counts['Temperature'] ? round($totals['Temperature'] / $counts['Temperature'], 2) : 0,
            'humidity' => $counts['Humidity'] ? round($totals['Humidity'] / $counts['Humidity'], 2) : 0,
            'light_intensity' => $counts['Light Intensity'] ? round($totals['Light Intensity'] / $counts['Light Intensity'], 2) : 0,
            'last_recorded_at' => $sensor_data->max('recorded_at'),
        ];

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function fetchChart(Request $request)
    {
        $dict = $request->query('dict');
        if (!$dict) {
            return response()->json(['success' => false, 'message' => 'No data received.'], 400);
        }

        $decodedData = json_decode($dict, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['success' => false, 'message' => 'Invalid JSON format.'], 400);
        }

        if (!isset($decodedData['sensor_id'])) {
            return response()->json(['success' => false, 'message' => 'Sensor ID is required.'], 400);
        }

        $sensor_id = $decodedData['sensor_id'];
        $date_start = !empty($decodedData['date_start']) ? $decodedData['date_start'] : now()->toDateString();
        $date_end = !empty($decodedData['date_end']) ? $decodedData['date_end'] : null;
        $time = !empty($decodedData['time']) ? $decodedData['time'] : null;

        $sensorExists = Sensor::where('id', $sensor_id)->exists();
        if (!$sensorExists) {
            return response()->json(['success' => false, 'message' => 'Sensor not found.'], 404);
        }

        $query = SensorData::with('sensor')->where('sensor_id', $sensor_id);

        if ($date_start && $date_end) {
            $query->whereDate('recorded_at', '>=', $date_start);
            $query->whereDate('recorded_at', '<=', $date_end);
        } else {
            $query->whereDate('recorded_at', $date_start);
        }

        if ($time) {
            $query->whereRaw('HOUR(recorded_at) = ?', [date('H', strtotime($time))]);
            $sensorData = $query->select('*', 'value as avg_value')->orderBy('recorded_at')->get();
        } else {
            $sensorData = $query->orderBy('recorded_at')->get();

            $hourlyData = [];

            foreach ($sensorData as $data) {
                $hour = date('Y-m-d H:00:00', strtotime($data->recorded_at));

                if (!isset($hourlyData[$hour])) {
                    $hourlyData[$hour] = [
                        'total' => 0,
                        'count' => 0,
                    ];
                }

                $hourlyData[$hour]['total'] += $data->value;
                $hourlyData[$hour]['count'] += 1;
            }

            $sensorData = collect();
            foreach ($hourlyData as $hour => $values) {
                $sensorData->push([
                    'hour' => $hour,
                    'avg_value' => $values['total'] / $values['count'],
                ]);
            }
        }

        $data = $sensorData->pluck('avg_value');
        $label = $sensorData->map(function ($data) {
            if (isset($data['hour'])) {
                return date('d M H:i', strtotime($data['hour']));
            } else {
                return date('H:i', strtotime($data->recorded_at));
            }
        });


        return response()->json([
            'data' => $data,
            'label' => $label,
        ]);
    }


    public function tablePerGH(Request $request)
    {
        $dict = $request->input('dict');
        if (empty($dict)) {
            return response()->json(['success' => false, 'message' => 'No data received.'], 400);
        }

        $decodedData = json_decode($dict, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['success' => false, 'message' => 'Invalid JSON format.'], 400);
        }

        $greenhouseExists = Greenhouse::where('id', $decodedData['gh_id'])->exists();
        if (!$greenhouseExists) {
            return response()->json(['success' => false, 'message' => 'Greenhouse not found.'], 404);
        }

        $sensorData = SensorData::select(
            'sensor_data.node_id',
            DB::raw('DATE(sensor_data.recorded_at) as date'),
            DB::raw('TIME(sensor_data.recorded_at) as time'),
            DB::raw('MAX(CASE WHEN sensors.name = "Temperature" THEN sensor_data.value END) as temperature'),
            DB::raw('MAX(CASE WHEN sensors.name = "Humidity" THEN sensor_data.value END) as humidity'),
            DB::raw('MAX(CASE WHEN sensors.name = "Light Intensity" THEN sensor_data.value END) as light_intensity'),
            DB::raw('MAX(CASE WHEN sensors.name = "RSSI" THEN sensor_data.value END) as rssi')
        )
            ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
            ->join('greenhouses', 'greenhouses.id', '=', 'sensors.gh_id')
            ->where('greenhouses.id', $decodedData['gh_id'])
            ->groupBy('sensor_data.node_id', 'sensor_data.recorded_at')
            ->orderByDesc('recorded_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $sensorData
        ]);
    }

    public function cameraPerGH(Request $request)
    {
        $dict = $request->input('dict');
        if (empty($dict)) {
            return response()->json(['success' => false, 'message' => 'No data received.'], 400);
        }

        $decodedData = json_decode($dict, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['success' => false, 'message' => 'Invalid JSON format.'], 400);
        }

        $greenhouseExists = Greenhouse::where('id', $decodedData['gh_id'])->exists();
        if (!$greenhouseExists) {
            return response()->json(['success' => false, 'message' => 'Greenhouse not found.'], 404);
        }

        $cameraData = CameraData::where('gh_id', $decodedData['gh_id'])
            ->orderByDesc('recorded_at')
            ->get()
            ->map(function ($camera) {
                $camera->recorded_at = Carbon::parse($camera->recorded_at)->format('d/m/Y h:i:s');
                $camera->image = url($camera->image);
                $camera->status = $camera->isFoggy ?
                    'Berkabut' : 'Tidak Berkabut';
                return $camera;
            });

        return response()->json([
            'success' => true,
            'data' => $cameraData
        ]);
    }

    public function updateThreshold(Request  $request)
    {
        $validator = Validator::make($request->all(), [
            'thresholds' => 'required|array',
            'thresholds.*.sensor_id' => 'required|exists:sensors,id',
            'thresholds.*.threshold_min' => 'required|numeric|min:0',
            'thresholds.*.threshold_max' => 'required|numeric|min:0|gt:thresholds.*.threshold_min',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->thresholds as $thresholdData) {
            $sensor = Sensor::find($thresholdData['sensor_id']);
            if ($sensor) {
                $sensor->update([
                    'threshold_min' => $thresholdData['threshold_min'],
                    'threshold_max' => $thresholdData['threshold_max'],
                ]);
            }
        }

        return response()->json(['message' => 'Threshold berhasil diperbarui'], 200);
    }

    public function getControlling()
    {
        $data = Greenhouse::with(['sensor' => function ($query) {
            $query->whereNotIn('name', ['RSSI']);
        }])->get();
        
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
