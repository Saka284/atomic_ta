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

            foreach (array_unique(array_column($data, 'sensor_id')) as $sensorId) {
                Cache::forget("sensor_latest_date_{$sensorId}");
            }
            Cache::forget('sensor_snapshots_ready');
            Cache::forget('gaugeData');
            Cache::forget('monitoring_latest_time');
            Cache::forget('monitoring_actuator_status');
            Cache::forget('heatmap_sensor_data');
            Cache::forget('heatmap_latest_time');

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
            'confidence' => 'nullable|numeric'
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
                'confidence' => $request->confidence ?? null,
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

        $sensor_id = (int) $decodedData['sensor_id'];
        $mode = $decodedData['mode'] ?? 'avg';
        if (!in_array($mode, ['avg', 'per_node'], true)) {
            return response()->json(['success' => false, 'message' => 'Invalid chart mode.'], 422);
        }
        $range = $decodedData['range'] ?? 'custom';
        if (!in_array($range, ['custom', 'last_1h', 'last_1d', 'last_1w', 'last_1m'], true)) {
            return response()->json(['success' => false, 'message' => 'Invalid chart range.'], 422);
        }

        $latestRecordedAt = Cache::remember("sensor_latest_date_{$sensor_id}", 60, function () use ($sensor_id) {
            return DB::table('sensor_data')->where('sensor_id', $sensor_id)->max('recorded_at');
        });

        $defaultDate = $latestRecordedAt
            ? Carbon::parse($latestRecordedAt)->toDateString()
            : now()->toDateString();

        $date_start = !empty($decodedData['date_start']) ? $decodedData['date_start'] : $defaultDate;
        $date_end = !empty($decodedData['date_end']) ? $decodedData['date_end'] : null;
        $time = !empty($decodedData['time']) ? $decodedData['time'] : null;

        $sensorGhId = Cache::remember("sensor_gh_{$sensor_id}", 3600, function () use ($sensor_id) {
            return DB::table('sensors')->where('id', $sensor_id)->value('gh_id');
        });

        if (!$sensorGhId) {
            return response()->json(['success' => false, 'message' => 'Sensor not found.'], 404);
        }

        $gh_id = (int) ($decodedData['gh_id'] ?? $sensorGhId);

        // Cache Key based on request params
        $cacheKey = 'chart_' . md5($dict);

        $payload = Cache::remember($cacheKey, 60, function () use ($sensor_id, $date_start, $date_end, $time, $mode, $gh_id, $range) {
            [$start, $end, $bucketSqlFormat, $bucketType] = $this->resolveChartWindow(
                $range,
                $date_start,
                $date_end,
                $time
            );

            if ($mode === 'per_node') {
                $sql = "
                    SELECT
                        node_id,
                        DATE_FORMAT(recorded_at, '{$bucketSqlFormat}') as bucket,
                        AVG(value) as avg_value
                    FROM sensor_data
                    WHERE sensor_id = ?
                      AND recorded_at >= ?
                      AND recorded_at < ?
                    GROUP BY node_id, bucket
                    ORDER BY bucket ASC, node_id ASC
                ";

                $rows = DB::select($sql, [
                    $sensor_id,
                    $start->toDateTimeString(),
                    $end->toDateTimeString(),
                ]);

                $rawLabels = array_values(array_unique(array_map(fn($row) => $row->bucket, $rows)));
                sort($rawLabels);
                $labelIndexes = array_flip($rawLabels);

                $nodeIds = $this->resolveNodeIdsForChart(
                    $gh_id,
                    $sensor_id,
                    $start->toDateTimeString(),
                    $end->toDateTimeString()
                );

                $nodeSeries = [];
                foreach ($nodeIds as $nodeId) {
                    $nodeSeries[$nodeId] = array_fill(0, count($rawLabels), null);
                }

                foreach ($rows as $row) {
                    $nodeId = (int) $row->node_id;
                    if (!array_key_exists($nodeId, $nodeSeries)) {
                        $nodeSeries[$nodeId] = array_fill(0, count($rawLabels), null);
                    }

                    if (isset($labelIndexes[$row->bucket])) {
                        $nodeSeries[$nodeId][$labelIndexes[$row->bucket]] = (float) $row->avg_value;
                    }
                }

                $labels = array_map(
                    fn($bucket) => $this->formatChartBucketLabel($bucket, $bucketType),
                    $rawLabels
                );

                $datasets = [];
                foreach ($nodeSeries as $nodeId => $values) {
                    $datasets[] = [
                        'node_id' => (int) $nodeId,
                        'label' => "Node {$nodeId}",
                        'data' => $values,
                    ];
                }

                return [
                    'mode' => 'per_node',
                    'label' => $labels,
                    'raw_labels' => $rawLabels,
                    'bucket_type' => $bucketType,
                    'data' => [],
                    'datasets' => $datasets,
                ];
            }

            $sql = "
                SELECT
                    DATE_FORMAT(recorded_at, '{$bucketSqlFormat}') as bucket,
                    AVG(value) as avg_value
                FROM sensor_data
                WHERE sensor_id = ?
                  AND recorded_at >= ?
                  AND recorded_at < ?
                GROUP BY bucket
                ORDER BY bucket ASC
            ";
            $dataQuery = DB::select($sql, [
                $sensor_id,
                $start->toDateTimeString(),
                $end->toDateTimeString(),
            ]);

            $labels = array_map(
                fn($row) => $this->formatChartBucketLabel($row->bucket, $bucketType),
                $dataQuery
            );
            $rawLabels = array_map(fn($row) => $row->bucket, $dataQuery);
            $values = array_map(fn($row) => (float) $row->avg_value, $dataQuery);

            return [
                'mode' => 'avg',
                'data' => $values,
                'label' => $labels,
                'raw_labels' => $rawLabels,
                'bucket_type' => $bucketType,
                'datasets' => [],
            ];
        });

        return response()->json($payload);
    }

    private function resolveChartWindow(string $range, string $dateStart, ?string $dateEnd, ?string $time): array
    {
        if ($range !== 'custom') {
            $end = now();
            if ($range === 'last_1h') {
                return [(clone $end)->subHour(), $end, '%Y-%m-%d %H:%i:00', 'minute'];
            }

            if ($range === 'last_1d') {
                return [(clone $end)->subDay(), $end, '%Y-%m-%d %H:00:00', 'hour'];
            }

            if ($range === 'last_1w') {
                return [(clone $end)->subWeek(), $end, '%Y-%m-%d %H:00:00', 'hour'];
            }

            return [(clone $end)->subMonth(), $end, '%Y-%m-%d', 'day'];
        }

        if ($time) {
            $hour = (int) date('H', strtotime($time));
            $start = Carbon::parse($dateStart)->setTime($hour, 0, 0);
            return [$start, (clone $start)->addHour(), '%Y-%m-%d %H:%i:00', 'minute'];
        }

        $start = Carbon::parse($dateStart)->startOfDay();
        $end = $dateEnd
            ? Carbon::parse($dateEnd)->addDay()->startOfDay()
            : (clone $start)->addDay();

        return [$start, $end, '%Y-%m-%d %H:00:00', 'hour'];
    }

    private function formatChartBucketLabel(string $bucket, string $bucketType): string
    {
        try {
            $date = Carbon::parse($bucket);
        } catch (\Throwable $e) {
            return $bucket;
        }

        if ($bucketType === 'minute') {
            return $date->format('H:i');
        }

        if ($bucketType === 'day') {
            return $date->format('d M');
        }

        return $date->format('d M H:i');
    }

    private function resolveNodeIdsForChart(int $ghId, int $sensorId, string $start, string $end): array
    {
        if ($ghId === 1) {
            return [1, 2, 3, 4, 5];
        }

        if ($ghId === 2) {
            return [6, 7, 8, 9, 10];
        }

        $cacheKey = 'chart_node_ids_' . md5(json_encode([
            'gh_id' => $ghId,
            'sensor_id' => $sensorId,
            'start' => $start,
            'end' => $end,
        ]));

        return Cache::remember($cacheKey, 120, function () use ($sensorId, $start, $end) {
            $rows = DB::select("
                SELECT DISTINCT node_id
                FROM sensor_data
                WHERE sensor_id = ?
                  AND recorded_at >= ?
                  AND recorded_at < ?
                ORDER BY node_id ASC
            ", [$sensorId, $start, $end]);

            $nodeIds = array_map(fn($row) => (int) $row->node_id, $rows);
            if (!empty($nodeIds)) {
                return $nodeIds;
            }

            $fallbackRows = DB::select("
                SELECT DISTINCT node_id
                FROM sensor_data
                WHERE sensor_id = ?
                ORDER BY node_id ASC
            ", [$sensorId]);

            return array_map(fn($row) => (int) $row->node_id, $fallbackRows);
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

        $gh_id = (int) ($decodedData['gh_id'] ?? 0);
        if ($gh_id <= 0) {
            return response()->json(['success' => false, 'message' => 'Greenhouse ID is required.'], 422);
        }

        $page = max(1, (int) ($decodedData['page'] ?? 1));
        $perPage = min(200, max(1, (int) ($decodedData['per_page'] ?? 10)));
        $offset = ($page - 1) * $perPage;
        $sortField = strtolower((string) ($decodedData['sort_field'] ?? 'recorded_at'));
        $sortDirection = strtolower((string) ($decodedData['sort_direction'] ?? 'desc'));
        if (!in_array($sortDirection, ['asc', 'desc'], true)) {
            $sortDirection = 'desc';
        }

        $greenhouseExists = Cache::remember("greenhouse_exists_{$gh_id}", 3600, function () use ($gh_id) {
            return DB::selectOne("SELECT 1 FROM greenhouses WHERE id = ?", [$gh_id]) !== null;
        });
        if (!$greenhouseExists) {
            return response()->json(['success' => false, 'message' => 'Greenhouse not found.'], 404);
        }

        $sensorIds = Cache::remember("sensor_ids_{$gh_id}", 3600, function () use ($gh_id) {
            return Sensor::where('gh_id', $gh_id)->pluck('id', 'name')->toArray();
        });

        $sensorIdMap = [
            'temperature' => $sensorIds['Temperature'] ?? null,
            'humidity' => $sensorIds['Humidity'] ?? null,
            'light_intensity' => $sensorIds['Light Intensity'] ?? null,
            'rssi' => $sensorIds['RSSI'] ?? null,
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

        $startTime = $decodedData['start_date'] ?? null;
        $endTime = $decodedData['end_date'] ?? null;
        $nodeId = isset($decodedData['node_id']) && $decodedData['node_id'] !== ''
            ? (int) $decodedData['node_id']
            : null;
        $columnFilters = is_array($decodedData['column_filters'] ?? null)
            ? $decodedData['column_filters']
            : [];

        if (($startTime && !$endTime) || (!$startTime && $endTime)) {
            return response()->json(['success' => false, 'message' => 'Both start_date and end_date are required.'], 422);
        }

        $inPlaceholders = implode(',', array_fill(0, count($inIds), '?'));
        $whereClause = "sd.sensor_id IN ($inPlaceholders)";
        $filterParams = [...$inIds];

        if ($startTime && $endTime) {
            try {
                $start = Carbon::parse($startTime)->startOfDay()->toDateTimeString();
                $end = Carbon::parse($endTime)->addDay()->startOfDay()->toDateTimeString();
            } catch (\Throwable $e) {
                return response()->json(['success' => false, 'message' => 'Invalid date range.'], 422);
            }

            $whereClause .= " AND sd.recorded_at >= ? AND sd.recorded_at < ?";
            $filterParams[] = $start;
            $filterParams[] = $end;
        }

        if ($nodeId !== null && $nodeId > 0) {
            $whereClause .= " AND sd.node_id = ?";
            $filterParams[] = $nodeId;
        }

        $sortFieldMap = [
            'recorded_at' => 'grouped.recorded_at',
            'date' => 'grouped.recorded_at',
            'time' => 'grouped.recorded_at',
            'node_id' => 'grouped.node_id',
            'temperature' => 'grouped.temperature',
            'humidity' => 'grouped.humidity',
            'light_intensity' => 'grouped.light_intensity',
            'rssi' => 'grouped.rssi',
        ];
        $sortColumn = $sortFieldMap[$sortField] ?? 'grouped.recorded_at';
        $sortDirectionSql = strtoupper($sortDirection);
        $orderBySql = $sortColumn . " " . $sortDirectionSql;
        if ($sortColumn !== 'grouped.recorded_at') {
            $orderBySql .= ", grouped.recorded_at DESC, grouped.node_id ASC";
        } else {
            $orderBySql .= ", grouped.node_id ASC";
        }

        $aggregationSql = "
            SELECT
                sd.node_id,
                sd.recorded_at,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as temperature,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as humidity,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as light_intensity,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as rssi
            FROM sensor_data sd
            WHERE $whereClause
            GROUP BY sd.node_id, sd.recorded_at
        ";

        $aggregationParams = array_merge([
            $sensorIdMap['temperature'],
            $sensorIdMap['humidity'],
            $sensorIdMap['light_intensity'],
            $sensorIdMap['rssi'],
        ], $filterParams);

        $columnExprMap = [
            'node_id' => 'grouped.node_id',
            'date' => 'DATE(grouped.recorded_at)',
            'time' => 'TIME(grouped.recorded_at)',
            'temperature' => 'grouped.temperature',
            'humidity' => 'grouped.humidity',
            'light_intensity' => 'grouped.light_intensity',
            'rssi' => 'grouped.rssi',
        ];
        $numericFilterColumns = [
            'node_id',
            'temperature',
            'humidity',
            'light_intensity',
            'rssi',
        ];

        $buildCondition = function (string $expr, array $condition, bool $isNumeric): ?array {
            $type = (string) ($condition['type'] ?? 'equals');
            $filterValue = $condition['filter'] ?? null;
            $filterTo = $condition['filterTo'] ?? null;

            if ($isNumeric) {
                switch ($type) {
                    case 'equals':
                        if ($filterValue === null || $filterValue === '') return null;
                        return ['sql' => "{$expr} = ?", 'params' => [$filterValue]];
                    case 'notEqual':
                        if ($filterValue === null || $filterValue === '') return null;
                        return ['sql' => "{$expr} != ?", 'params' => [$filterValue]];
                    case 'greaterThan':
                        if ($filterValue === null || $filterValue === '') return null;
                        return ['sql' => "{$expr} > ?", 'params' => [$filterValue]];
                    case 'greaterThanOrEqual':
                        if ($filterValue === null || $filterValue === '') return null;
                        return ['sql' => "{$expr} >= ?", 'params' => [$filterValue]];
                    case 'lessThan':
                        if ($filterValue === null || $filterValue === '') return null;
                        return ['sql' => "{$expr} < ?", 'params' => [$filterValue]];
                    case 'lessThanOrEqual':
                        if ($filterValue === null || $filterValue === '') return null;
                        return ['sql' => "{$expr} <= ?", 'params' => [$filterValue]];
                    case 'inRange':
                        if ($filterValue === null || $filterValue === '' || $filterTo === null || $filterTo === '') {
                            return null;
                        }
                        return ['sql' => "({$expr} >= ? AND {$expr} <= ?)", 'params' => [$filterValue, $filterTo]];
                    case 'blank':
                        return ['sql' => "{$expr} IS NULL", 'params' => []];
                    case 'notBlank':
                        return ['sql' => "{$expr} IS NOT NULL", 'params' => []];
                    default:
                        return null;
                }
            }

            $stringExpr = "LOWER(CAST({$expr} AS CHAR))";
            $textValue = $filterValue !== null ? strtolower((string) $filterValue) : null;

            switch ($type) {
                case 'contains':
                    if ($textValue === null || $textValue === '') return null;
                    return ['sql' => "{$stringExpr} LIKE ?", 'params' => ["%{$textValue}%"]];
                case 'notContains':
                    if ($textValue === null || $textValue === '') return null;
                    return ['sql' => "({$stringExpr} NOT LIKE ? OR {$expr} IS NULL)", 'params' => ["%{$textValue}%"]];
                case 'startsWith':
                    if ($textValue === null || $textValue === '') return null;
                    return ['sql' => "{$stringExpr} LIKE ?", 'params' => ["{$textValue}%"]];
                case 'endsWith':
                    if ($textValue === null || $textValue === '') return null;
                    return ['sql' => "{$stringExpr} LIKE ?", 'params' => ["%{$textValue}"]];
                case 'equals':
                    if ($textValue === null || $textValue === '') return null;
                    return ['sql' => "{$stringExpr} = ?", 'params' => [$textValue]];
                case 'notEqual':
                    if ($textValue === null || $textValue === '') return null;
                    return ['sql' => "({$stringExpr} != ? OR {$expr} IS NULL)", 'params' => [$textValue]];
                case 'blank':
                    return ['sql' => "({$expr} IS NULL OR CAST({$expr} AS CHAR) = '')", 'params' => []];
                case 'notBlank':
                    return ['sql' => "({$expr} IS NOT NULL AND CAST({$expr} AS CHAR) != '')", 'params' => []];
                default:
                    return null;
            }
        };

        $columnFilterClauses = [];
        $columnFilterParams = [];

        foreach ($columnFilters as $columnKey => $filterDef) {
            if (!isset($columnExprMap[$columnKey]) || !is_array($filterDef)) {
                continue;
            }

            $expr = $columnExprMap[$columnKey];
            $isNumeric = in_array($columnKey, $numericFilterColumns, true);
            $operator = strtoupper((string) ($filterDef['operator'] ?? 'AND'));
            $joinOperator = $operator === 'OR' ? ' OR ' : ' AND ';

            $conditions = [];
            if (isset($filterDef['conditions']) && is_array($filterDef['conditions'])) {
                $conditions = $filterDef['conditions'];
            } elseif (isset($filterDef['condition1']) || isset($filterDef['condition2'])) {
                if (isset($filterDef['condition1']) && is_array($filterDef['condition1'])) {
                    $conditions[] = $filterDef['condition1'];
                }
                if (isset($filterDef['condition2']) && is_array($filterDef['condition2'])) {
                    $conditions[] = $filterDef['condition2'];
                }
            } else {
                $conditions[] = $filterDef;
            }

            $perColumnSql = [];
            $perColumnParams = [];
            foreach ($conditions as $condition) {
                if (!is_array($condition)) {
                    continue;
                }

                $built = $buildCondition($expr, $condition, $isNumeric);
                if (!$built) {
                    continue;
                }

                $perColumnSql[] = $built['sql'];
                $perColumnParams = array_merge($perColumnParams, $built['params']);
            }

            if (empty($perColumnSql)) {
                continue;
            }

            $columnFilterClauses[] = '(' . implode($joinOperator, $perColumnSql) . ')';
            $columnFilterParams = array_merge($columnFilterParams, $perColumnParams);
        }

        $columnFilterWhereSql = '';
        if (!empty($columnFilterClauses)) {
            $columnFilterWhereSql = 'WHERE ' . implode(' AND ', $columnFilterClauses);
        }

        $countKeyPayload = [
            'gh_id' => $gh_id,
            'sensor_ids' => $inIds,
            'start_date' => $startTime,
            'end_date' => $endTime,
            'node_id' => $nodeId,
            'column_filters' => $columnFilters,
        ];
        $countCacheKey = 'table_count_' . md5(json_encode($countKeyPayload));

        $total = Cache::remember($countCacheKey, 60, function () use ($aggregationSql, $aggregationParams, $columnFilterWhereSql, $columnFilterParams) {
            $countSql = "SELECT COUNT(*) as total FROM ($aggregationSql) as grouped {$columnFilterWhereSql}";
            $totalResult = DB::selectOne($countSql, array_merge($aggregationParams, $columnFilterParams));
            return (int) ($totalResult->total ?? 0);
        });

        $pageCacheKey = 'table_page_' . md5(json_encode([
            'filters' => $countKeyPayload,
            'page' => $page,
            'per_page' => $perPage,
            'sort_field' => $sortField,
            'sort_direction' => $sortDirection,
        ]));

        $payload = Cache::remember($pageCacheKey, 60, function () use ($aggregationSql, $aggregationParams, $columnFilterWhereSql, $columnFilterParams, $orderBySql, $perPage, $offset, $page, $total) {
            $dataSql = "
                SELECT
                    grouped.node_id,
                    DATE(grouped.recorded_at) as date,
                    TIME(grouped.recorded_at) as time,
                    grouped.temperature,
                    grouped.humidity,
                    grouped.light_intensity,
                    grouped.rssi
                FROM ($aggregationSql) as grouped
                {$columnFilterWhereSql}
                ORDER BY $orderBySql
                LIMIT ? OFFSET ?
            ";

            $dataParams = array_merge($aggregationParams, $columnFilterParams, [$perPage, $offset]);
            $sensorData = DB::select($dataSql, $dataParams);
            $lastPage = max(1, (int) ceil($total / $perPage));

            return [
                'success' => true,
                'data' => $sensorData,
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'last_page' => $lastPage,
            ];
        });

        return response()->json($payload);
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

        $gh_id = (int) ($decodedData['gh_id'] ?? 0);
        if ($gh_id <= 0) {
            return response()->json(['success' => false, 'message' => 'Greenhouse ID is required.'], 422);
        }

        $page = max(1, (int) ($decodedData['page'] ?? 1));
        $perPage = min(200, max(1, (int) ($decodedData['per_page'] ?? 5)));
        $offset = ($page - 1) * $perPage;

        $greenhouseExists = Cache::remember("greenhouse_exists_{$gh_id}", 3600, function () use ($gh_id) {
            return DB::selectOne("SELECT 1 FROM greenhouses WHERE id = ?", [$gh_id]) !== null;
        });
        if (!$greenhouseExists) {
            return response()->json(['success' => false, 'message' => 'Greenhouse not found.'], 404);
        }

        $total = Cache::remember("camera_count_{$gh_id}", 20, function () use ($gh_id) {
            $count = DB::selectOne("
                SELECT COUNT(*) as total
                FROM camera_data
                WHERE gh_id = ?
            ", [$gh_id]);

            return (int) ($count->total ?? 0);
        });

        $pageCacheKey = 'camera_page_' . md5(json_encode([
            'gh_id' => $gh_id,
            'page' => $page,
            'per_page' => $perPage,
        ]));

        $payload = Cache::remember($pageCacheKey, 20, function () use ($gh_id, $perPage, $offset, $page, $total) {
            // Two-step pagination: scan index first, then fetch full row payload.
            $pageIds = DB::select("
                SELECT id
                FROM camera_data
                WHERE gh_id = ?
                ORDER BY recorded_at DESC, id DESC
                LIMIT ? OFFSET ?
            ", [$gh_id, $perPage, $offset]);

            $cameraData = [];
            if (!empty($pageIds)) {
                $idList = array_values(array_map(fn($row) => (int) $row->id, $pageIds));
                $placeholders = implode(',', array_fill(0, count($idList), '?'));

                $cameraData = DB::select("
                    SELECT
                        id,
                        gh_id,
                        image,
                        isFoggy,
                        recorded_at,
                        DATE_FORMAT(recorded_at, '%d/%m/%Y %H:%i:%s') as recorded_at_24h,
                        confidence
                    FROM camera_data
                    WHERE id IN ($placeholders)
                    ORDER BY recorded_at DESC, id DESC
                ", $idList);
            }

            // Lightweight formatting map
            $formattedData = array_map(function ($camera) {
                $camera->recorded_at = $camera->recorded_at_24h ?? '-';
                unset($camera->recorded_at_24h);
                $camera->image = url($camera->image);
                $camera->status = $camera->isFoggy ? 'Berkabut' : 'Tidak Berkabut';
                return $camera;
            }, $cameraData);

            $lastPage = max(1, (int) ceil($total / $perPage));

            return [
                'success' => true,
                'data' => $formattedData,
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'last_page' => $lastPage,
            ];
        });

        return response()->json($payload);
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
        Cache::forget('monitoring_actuator_status');

        return response()->json(['message' => 'Threshold berhasil diperbarui'], 200);
    }

    public function getControlling()
    {
        $data = Cache::remember('controlling_data', 60, function () {
            return Greenhouse::query()
                ->select(['id', 'name'])
                ->with([
                    'sensor' => function ($query) {
                        $query->select(['id', 'gh_id', 'name', 'unit', 'threshold_min', 'threshold_max'])
                            ->where('name', '!=', 'RSSI');
                    }
                ])
                ->get();
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
