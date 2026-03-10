<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Greenhouse;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;

class ScheduleController extends Controller
{
    /**
     * Get schedules for gateway.
     * Endpoint: GET /api/gateway/schedule?gh_id=1
     */
    public function getSchedule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|integer',
            'schedule_id' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 400,
                'message' => 'Format request tidak valid',
            ], 400);
        }

        // Check if greenhouse exists
        $greenhouse = Greenhouse::find($request->gh_id);
        if (!$greenhouse) {
            return response()->json([
                'success' => false,
                'code' => 404,
                'message' => 'Greenhouse tidak ditemukan',
            ], 404);
        }

        // Build query
        $query = Schedule::where('gh_id', $request->gh_id);
        $scheduleIds = [];

        // Filter by schedule_id if provided
        if ($request->has('schedule_id') && $request->schedule_id !== null) {
            $scheduleIds = is_array($request->schedule_id)
                ? $request->schedule_id
                : [$request->schedule_id];
            $scheduleIds = array_values(array_map('intval', $scheduleIds));
            sort($scheduleIds);
            $query->whereIn('id', $scheduleIds);
        }

        $cacheKey = 'schedule_gateway_' . md5(json_encode([
            'gh_id' => (int) $request->gh_id,
            'schedule_id' => $scheduleIds,
        ]));

        // Cache for 60 seconds (Gateway polling optimization)
        $response = Cache::remember($cacheKey, 60, function () use ($query, $request) {
            $schedules = $query->orderBy('start_time')
                ->get()
                ->map(function ($schedule) {
                    return [
                        'id' => $schedule->id,
                        'aktif' => $schedule->enabled ? 1 : 0,
                        'mulai' => substr($schedule->start_time, 0, 5),
                        'selesai' => substr($schedule->end_time, 0, 5),
                        'relay' => $schedule->relay_binary,
                    ];
                });

            return [
                'success' => true,
                'gh_id' => (int) $request->gh_id,
                'schedules' => $schedules,
            ];
        });

        return response()->json($response);
    }

    /**
     * Save schedules from web interface.
     * Endpoint: POST /api/schedules
     */
    public function saveSchedules(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|integer|exists:greenhouses,id',
            'schedules' => 'present|array|max:4',
            'schedules.*.enabled' => 'required|boolean',
            'schedules.*.start_time' => 'required|date_format:H:i',
            'schedules.*.end_time' => 'required|date_format:H:i|after:schedules.*.start_time',
            'schedules.*.actuators' => 'required|array',
            'schedules.*.actuators.blower' => 'required|in:on,off,threshold',
            'schedules.*.actuators.exhaust' => 'required|in:on,off,threshold',
            'schedules.*.actuators.dehumidifier' => 'required|in:on,off,threshold',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 400,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 400);
        }

        try {
            // Delete existing schedules for this greenhouse
            Schedule::where('gh_id', $request->gh_id)->delete();

            // Create new schedules
            foreach ($request->schedules as $scheduleData) {
                Schedule::create([
                    'gh_id' => $request->gh_id,
                    'enabled' => $scheduleData['enabled'],
                    'start_time' => $scheduleData['start_time'],
                    'end_time' => $scheduleData['end_time'],
                    'relay_exhaust' => $scheduleData['actuators']['exhaust'],
                    'relay_dehumidifier' => $scheduleData['actuators']['dehumidifier'],
                    'relay_blower' => $scheduleData['actuators']['blower'],
                ]);
            }

            // Invalidate Cache for both Gateway and Web
            Cache::forget("schedule_gateway_{$request->gh_id}");
            Cache::forget("schedule_web_{$request->gh_id}");
            Cache::forget('controlling_schedules');
            Cache::forget('monitoring_actuator_status');

            return response()->json([
                'success' => true,
                'message' => 'Jadwal berhasil disimpan',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'code' => 500,
                'message' => 'Gagal menyimpan jadwal',
            ], 500);
        }
    }

    /**
     * Get schedules for web interface.
     * Endpoint: GET /api/schedules
     */
    public function getSchedulesForWeb(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gh_id' => 'required|integer|exists:greenhouses,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        // Cache Key: schedule_web_{gh_id}
        $cacheKey = "schedule_web_{$request->gh_id}";

        $response = Cache::remember($cacheKey, 60, function () use ($request) {
            $schedules = Schedule::where('gh_id', $request->gh_id)
                ->orderBy('start_time')
                ->get()
                ->map(function ($schedule) {
                    return [
                        'id' => $schedule->id,
                        'greenhouse_id' => $schedule->gh_id,
                        'enabled' => $schedule->enabled,
                        'start_time' => substr($schedule->start_time, 0, 5),
                        'end_time' => substr($schedule->end_time, 0, 5),
                        'actuators' => [
                            'blower' => $schedule->relay_blower,
                            'exhaust' => $schedule->relay_exhaust,
                            'dehumidifier' => $schedule->relay_dehumidifier,
                        ],
                    ];
                });

            return [
                'success' => true,
                'schedules' => $schedules,
            ];
        });

        return response()->json($response);
    }
}
