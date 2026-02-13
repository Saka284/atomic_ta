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
use Illuminate\Support\Facades\Cache;

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

        $last_data = DB::selectOne("
            SELECT created_at FROM sensor_data 
            WHERE node_id = ? 
            ORDER BY id DESC LIMIT 1
        ", [$validated['node_id']]);

        if ($last_data && Carbon::parse($last_data->created_at)->addMinutes(10) > now()) {
            return response()->json([
                'success' => false,
                'message' => 'Server only accepts data once per 10 minutes per node',
                'errors' => $validator->errors()
            ], 422);
        }

        $sensors = DB::select("SELECT id, name FROM sensors WHERE gh_id = ?", [$validated['gh_id']]);
        $sensors = collect($sensors);

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
                // Single batch upsert to reduce round-trips
                DB::table('sensor_snapshots')->upsert(
                    $data,
                    ['sensor_id', 'node_id'],
                    ['value', 'recorded_at', 'updated_at']
                );
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

        $sensors = DB::select("
            SELECT id, gh_id, name, unit, threshold_min, threshold_max, created_at, updated_at
            FROM sensors WHERE gh_id = ?
        ", [$validated['gh_id']]);

        if (empty($sensors)) {
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

        $snapshot = DB::select("
            SELECT 
                s.name as sensor_name,
                AVG(ss.value) as avg_value,
                MAX(ss.recorded_at) as last_recorded_at
            FROM sensor_snapshots ss
            JOIN sensors s ON s.id = ss.sensor_id
            WHERE s.gh_id = ?
            AND s.name IN ('Temperature', 'Humidity', 'Light Intensity')
            GROUP BY s.name
        ", [$validated['gh_id']]);

        $result = [
            'temperature' => 0,
            'humidity' => 0,
            'light_intensity' => 0,
            'last_recorded_at' => null,
        ];

        foreach ($snapshot as $row) {
            $key = strtolower(str_replace(' ', '_', $row->sensor_name));
            $result[$key] = round($row->avg_value, 2);
            if (!$result['last_recorded_at'] || $row->last_recorded_at > $result['last_recorded_at']) {
                $result['last_recorded_at'] = $row->last_recorded_at;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $result
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

        // Optimization: Raw SQL to skip hydration checks
        $sensorExists = DB::selectOne("SELECT 1 FROM sensors WHERE id = ?", [$sensor_id]);
        if (!$sensorExists) {
            return response()->json(['success' => false, 'message' => 'Sensor not found.'], 404);
        }

        // Cache Key based on request params
        $cacheKey = 'chart_' . md5($dict);

        // Optimization: Cache result for 60 seconds
        return Cache::remember($cacheKey, 60, function () use ($sensor_id, $date_start, $date_end, $time) {
            
            if ($time) {
                // Minute-by-minute data for a specific hour
                $hour = date('H', strtotime($time));
                $start = Carbon::parse($date_start)->setTime((int) $hour, 0, 0);
                $end = (clone $start)->addHour();
                $sql = "
                    SELECT value as avg_value, recorded_at 
                    FROM sensor_data 
                    WHERE sensor_id = ? 
                    AND recorded_at >= ? 
                    AND recorded_at < ?
                    ORDER BY recorded_at ASC
                ";
                $params = [$sensor_id, $start->toDateTimeString(), $end->toDateTimeString()];
                $dataQuery = DB::select($sql, $params);
                
                $labels = array_map(fn($row) => date('H:i', strtotime($row->recorded_at)), $dataQuery);
                $values = array_column($dataQuery, 'avg_value');
    
            } else {
                // Hourly Average Calculation pushed to MySQL
                $start = Carbon::parse($date_start)->startOfDay();
                $end = $date_end
                    ? Carbon::parse($date_end)->addDay()->startOfDay()
                    : (clone $start)->addDay();
                $sql = "
                    SELECT 
                        DATE_FORMAT(recorded_at, '%Y-%m-%d %H:00:00') as hour_group,
                        AVG(value) as avg_value
                    FROM sensor_data
                    WHERE sensor_id = ?
                ";
                $params = [
                    $sensor_id,
                    $start->toDateTimeString(),
                    $end->toDateTimeString(),
                ];
                $sql .= " AND recorded_at >= ? AND recorded_at < ?";
    
                $sql .= " GROUP BY hour_group ORDER BY hour_group ASC";
    
                $dataQuery = DB::select($sql, $params);
    
                $labels = array_map(fn($row) => date('d M H:i', strtotime($row->hour_group)), $dataQuery);
                $values = array_column($dataQuery, 'avg_value');
            }
    
            // Optimization: Return plain array, no collection overhead
            return response()->json([
                'data' => $values,
                'label' => $labels,
            ]);
        });
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

        $gh_id = $decodedData['gh_id'];
        $page = max(1, (int) ($decodedData['page'] ?? 1));
        $perPage = min(100, max(1, (int) ($decodedData['per_page'] ?? 10)));
        $offset = ($page - 1) * $perPage;

        // Sort parameters
        $allowedSortColumns = ['node_id', 'date', 'time', 'temperature', 'humidity', 'light_intensity', 'rssi'];
        $sortBy = $decodedData['sort_by'] ?? 'date';
        $sortDir = strtoupper($decodedData['sort_dir'] ?? 'DESC');
        if (!in_array($sortBy, $allowedSortColumns)) $sortBy = 'date';
        if (!in_array($sortDir, ['ASC', 'DESC'])) $sortDir = 'DESC';

        // Column filter parameters (from AG Grid)
        $columnFilters = $decodedData['column_filters'] ?? [];

        // Optimization: Raw SQL for check
        $greenhouseExists = DB::selectOne("SELECT 1 FROM greenhouses WHERE id = ?", [$gh_id]);
        if (!$greenhouseExists) {
            return response()->json(['success' => false, 'message' => 'Greenhouse not found.'], 404);
        }

        // Cache Key based on all request params including pagination
        $cacheKey = 'table_' . md5($dict);

        // Optimization: Cache result for 60 seconds
        return Cache::remember($cacheKey, 60, function () use ($gh_id, $decodedData, $page, $perPage, $offset, $sortBy, $sortDir, $columnFilters) {
            $sensorIds = Cache::remember("sensor_ids_{$gh_id}", 3600, function () use ($gh_id) {
                return Sensor::where('gh_id', $gh_id)->pluck('id', 'name')->toArray();
            });

            $sensorIdMap = [
                'temperature' => $sensorIds['Temperature'] ?? null,
                'humidity' => $sensorIds['Humidity'] ?? null,
                'light_intensity' => $sensorIds['Light Intensity'] ?? null,
                'rssi' => $sensorIds['RSSI'] ?? null,
            ];

            $caseParams = [
                $sensorIdMap['temperature'],
                $sensorIdMap['humidity'],
                $sensorIdMap['light_intensity'],
                $sensorIdMap['rssi'],
            ];

            $inIds = array_values(array_filter($sensorIdMap));
            if (empty($inIds)) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'total' => 0,
                    'page' => $page,
                    'per_page' => $perPage,
                    'last_page' => 1,
                ]);
            }

            // Dynamic Filters
            $startTime = $decodedData['start_date'] ?? null;
            $endTime = $decodedData['end_date'] ?? null;
            $nodeId = $decodedData['node_id'] ?? null;

            $placeholders = implode(',', array_fill(0, count($inIds), '?'));

            // Build WHERE clause (shared between count and data queries)
            $whereClause = "sd.sensor_id IN ($placeholders)";
            $filterParams = $inIds;

            if ($startTime && $endTime) {
                $start = Carbon::parse($startTime)->startOfDay()->toDateTimeString();
                $end = Carbon::parse($endTime)->addDay()->startOfDay()->toDateTimeString();
                $whereClause .= " AND sd.recorded_at >= ? AND sd.recorded_at < ?";
                $filterParams[] = $start;
                $filterParams[] = $end;
            }

            if ($nodeId) {
                $whereClause .= " AND sd.node_id = ?";
                $filterParams[] = $nodeId;
            }

            // Build HAVING clause for column filters (aggregated columns)
            $havingClause = '';
            $havingParams = [];
            $havingParts = [];

            // Map column names to their HAVING expressions
            $havingColumnMap = [
                'node_id' => 'sd.node_id',
                'date' => 'DATE(sd.recorded_at)',
                'time' => 'TIME(sd.recorded_at)',
                'temperature' => 'MAX(CASE WHEN sd.sensor_id = ' . ((int)($sensorIdMap['temperature'] ?? 0)) . ' THEN sd.value END)',
                'humidity' => 'MAX(CASE WHEN sd.sensor_id = ' . ((int)($sensorIdMap['humidity'] ?? 0)) . ' THEN sd.value END)',
                'light_intensity' => 'MAX(CASE WHEN sd.sensor_id = ' . ((int)($sensorIdMap['light_intensity'] ?? 0)) . ' THEN sd.value END)',
                'rssi' => 'MAX(CASE WHEN sd.sensor_id = ' . ((int)($sensorIdMap['rssi'] ?? 0)) . ' THEN sd.value END)',
            ];

            foreach ($columnFilters as $colName => $filterDef) {
                if (!isset($havingColumnMap[$colName])) continue;
                $expr = $havingColumnMap[$colName];
                $type = $filterDef['filterType'] ?? 'number';
                $condType = $filterDef['type'] ?? 'equals';
                $filterVal = $filterDef['filter'] ?? null;
                $filterTo = $filterDef['filterTo'] ?? null;

                if ($filterVal === null && $condType !== 'blank' && $condType !== 'notBlank') continue;

                if ($type === 'text') {
                    // Text filter handling (for date, time columns)
                    switch ($condType) {
                        case 'contains':
                            $havingParts[] = "$expr LIKE ?";
                            $havingParams[] = "%$filterVal%";
                            break;
                        case 'notContains':
                            $havingParts[] = "$expr NOT LIKE ?";
                            $havingParams[] = "%$filterVal%";
                            break;
                        case 'equals':
                            $havingParts[] = "$expr = ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'notEqual':
                            $havingParts[] = "$expr != ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'startsWith':
                            $havingParts[] = "$expr LIKE ?";
                            $havingParams[] = "$filterVal%";
                            break;
                        case 'endsWith':
                            $havingParts[] = "$expr LIKE ?";
                            $havingParams[] = "%$filterVal";
                            break;
                    }
                } else {
                    // Number filter handling
                    switch ($condType) {
                        case 'equals':
                            $havingParts[] = "$expr = ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'notEqual':
                            $havingParts[] = "$expr != ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'greaterThan':
                            $havingParts[] = "$expr > ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'greaterThanOrEqual':
                            $havingParts[] = "$expr >= ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'lessThan':
                            $havingParts[] = "$expr < ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'lessThanOrEqual':
                            $havingParts[] = "$expr <= ?";
                            $havingParams[] = $filterVal;
                            break;
                        case 'inRange':
                            if ($filterTo !== null) {
                                $havingParts[] = "$expr >= ? AND $expr <= ?";
                                $havingParams[] = $filterVal;
                                $havingParams[] = $filterTo;
                            }
                            break;
                        case 'blank':
                            $havingParts[] = "$expr IS NULL";
                            break;
                        case 'notBlank':
                            $havingParts[] = "$expr IS NOT NULL";
                            break;
                    }
                }
            }

            if (!empty($havingParts)) {
                $havingClause = 'HAVING ' . implode(' AND ', $havingParts);
            }

            // Build ORDER BY clause
            $sortColumn = match ($sortBy) {
                'node_id' => 'sd.node_id',
                'date' => 'sd.recorded_at',
                'time' => 'sd.recorded_at',
                'temperature' => 'temperature',
                'humidity' => 'humidity',
                'light_intensity' => 'light_intensity',
                'rssi' => 'rssi',
                default => 'sd.recorded_at',
            };
            $orderByClause = "ORDER BY $sortColumn $sortDir";
            // Add secondary sort for stability
            if ($sortBy !== 'date' && $sortBy !== 'time') {
                $orderByClause .= ', sd.recorded_at DESC';
            } else {
                $orderByClause .= ', sd.node_id ASC';
            }

            // 1. Count total rows (distinct groups, with HAVING filters)
            $countSql = "SELECT COUNT(*) as total FROM (
                SELECT sd.node_id,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as temperature,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as humidity,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as light_intensity,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as rssi
                FROM sensor_data sd WHERE $whereClause GROUP BY sd.node_id, sd.recorded_at
                $havingClause
            ) as cnt";
            $countParams = array_merge($caseParams, $filterParams, $havingParams);
            $totalResult = DB::selectOne($countSql, $countParams);
            $total = $totalResult->total ?? 0;

            // 2. Fetch paginated data
            $dataSql = "
                SELECT 
                    sd.node_id,
                    DATE(sd.recorded_at) as date,
                    TIME(sd.recorded_at) as time,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as temperature,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as humidity,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as light_intensity,
                    MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as rssi
                FROM sensor_data sd
                WHERE $whereClause
                GROUP BY sd.node_id, sd.recorded_at
                $havingClause
                $orderByClause
                LIMIT ? OFFSET ?
            ";

            $dataParams = array_merge($caseParams, $filterParams, $havingParams, [$perPage, $offset]);
            $sensorData = DB::select($dataSql, $dataParams);

            $lastPage = max(1, (int) ceil($total / $perPage));

            return response()->json([
                'success' => true,
                'data' => $sensorData,
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'last_page' => $lastPage,
            ]);
        });
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

        $gh_id = $decodedData['gh_id'];

        $greenhouseExists = DB::selectOne("SELECT 1 FROM greenhouses WHERE id = ?", [$gh_id]);
        if (!$greenhouseExists) {
            return response()->json(['success' => false, 'message' => 'Greenhouse not found.'], 404);
        }

        // Optimization: Raw SQL Select
        $cameraData = DB::select("
            SELECT 
                id, gh_id, image, isFoggy, recorded_at, fog_percentage
            FROM camera_data 
            WHERE gh_id = ? 
            ORDER BY recorded_at DESC
            LIMIT 100
        ", [$gh_id]);

        // Lightweight formatting map
        $formattedData = array_map(function ($camera) {
            // Note: $camera is stdClass here, not Eloquent model
            $camera->recorded_at = date('d/m/Y h:i:s', strtotime($camera->recorded_at));
            $camera->image = url($camera->image);
            $camera->status = $camera->isFoggy ? 'Berkabut' : 'Tidak Berkabut';
            return $camera;
        }, $cameraData);

        return response()->json([
            'success' => true,
            'data' => $formattedData
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

        $cases_min = [];
        $cases_max = [];
        $ids = [];

        foreach ($request->thresholds as $t) {
            $id = (int) $t['sensor_id'];
            $min = (float) $t['threshold_min'];
            $max = (float) $t['threshold_max'];
            
            $cases_min[] = "WHEN id = {$id} THEN {$min}";
            $cases_max[] = "WHEN id = {$id} THEN {$max}";
            $ids[] = $id;
        }

        if (!empty($ids)) {
            $sql = "UPDATE sensors SET 
                threshold_min = CASE " . implode(' ', $cases_min) . " ELSE threshold_min END,
                threshold_max = CASE " . implode(' ', $cases_max) . " ELSE threshold_max END,
                updated_at = NOW()
                WHERE id IN (" . implode(',', $ids) . ")";
            DB::statement($sql);
        }

        Cache::forget('controlling_data');

        return response()->json(['message' => 'Threshold berhasil diperbarui'], 200);
    }

    public function getControlling()
    {
        return Cache::remember('controlling_data', 60, function () {
            $data = Greenhouse::with(['sensor' => function ($query) {
                $query->whereNotIn('name', ['RSSI']);
            }])->get();
            
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        });
    }
}
