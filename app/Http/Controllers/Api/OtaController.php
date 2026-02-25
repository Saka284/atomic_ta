<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FirmwareFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class OtaController extends Controller
{
    /**
     * Upload new firmware file
     * 
     * POST /api/files
     * Form data: status, version, file, sensor_id
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadFirmware(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|boolean',
            'version' => 'required|string|max:20',
            'file' => 'required|file|mimes:bin|max:2048', // Max 2MB
            'sensor_id' => 'nullable|integer|min:1',
            'node_id' => 'nullable|integer|min:1',
        ]);
        $validator->after(function ($validator) use ($request) {
            if (!$request->filled('sensor_id') && !$request->filled('node_id')) {
                $validator->errors()->add('node_id', 'The node_id or sensor_id field is required.');
            }
        });

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validate();
        $nodeId = (int) ($validated['node_id'] ?? $validated['sensor_id']);
        $status = (bool) $validated['status'];

        try {
            // Generate filename: file-sensor{id}-v{version}-s{id}.bin
            $versionSlug = str_replace('.', '_', $validated['version']);
            $filename = "file-sensor{$nodeId}-v{$versionSlug}-s{$nodeId}.bin";
            
            // Store file in public storage
            $path = $request->file('file')->storeAs('files', $filename, 'public');
            
            // Keep URL bound to upload host so it stays reachable without shared storage.
            $fileUrl = rtrim($request->getSchemeAndHttpHost(), '/') . '/storage/' . ltrim($path, '/');

            $metadataPersisted = true;
            try {
                $firmware = FirmwareFile::updateOrCreate(
                    [
                        'node_id' => $nodeId,
                        'version' => $validated['version'],
                    ],
                    [
                        'status' => $status,
                        'file_path' => $path,
                        'file_url' => $fileUrl,
                    ]
                );

                // Keep one active firmware per node for simple OTA checks.
                if ($status) {
                    FirmwareFile::where('node_id', $nodeId)
                        ->where('id', '!=', $firmware->id)
                        ->update(['status' => false]);
                }

                Cache::forget("firmware_latest_node_{$nodeId}");
            } catch (\Throwable $persistException) {
                $metadataPersisted = false;
                \Log::warning('[OTA] Firmware metadata persistence skipped', [
                    'node_id' => $nodeId,
                    'version' => $validated['version'],
                    'error' => $persistException->getMessage(),
                ]);
            }

            \Log::info("[OTA] Firmware uploaded: {$filename}, version: {$validated['version']}");

            return response()->json([
                'file_url' => $fileUrl,
                'status' => (int) $status,
                'sensor_id' => $nodeId, // backward compatibility
                'node_id' => $nodeId,
                'version' => $validated['version'],
                'metadata_persisted' => $metadataPersisted,
            ]);
        } catch (\Exception $e) {
            \Log::error("[OTA] Firmware upload failed: " . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload firmware.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get latest firmware info for a node
     * 
     * GET /api/get-file/{nodeId}
     * 
     * @param int $nodeId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFirmwareInfo($nodeId)
    {
        $nodeId = (int) $nodeId;
        if ($nodeId <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid node id',
            ], 422);
        }

        $firmware = null;
        try {
            $cacheKey = "firmware_latest_node_{$nodeId}";
            $firmware = Cache::remember($cacheKey, 30, function () use ($nodeId) {
                return FirmwareFile::where('node_id', $nodeId)
                    ->where('status', true)
                    ->orderByDesc('updated_at')
                    ->orderByDesc('id')
                    ->first();
            });
        } catch (\Throwable $queryException) {
            \Log::warning('[OTA] Firmware lookup failed, fallback to no update', [
                'node_id' => $nodeId,
                'error' => $queryException->getMessage(),
            ]);
        }

        \Log::info("[OTA] Node {$nodeId} checked for updates", [
            'has_update' => $firmware ? 1 : 0,
        ]);

        if (!$firmware) {
            return response()->json([
                'version' => '',
                'firmware_url' => '',
                'status' => 0, // No update available
                'node_id' => $nodeId,
            ]);
        }

        return response()->json([
            'version' => $firmware->version,
            'firmware_url' => $firmware->file_url,
            'status' => 1,
            'node_id' => $nodeId,
        ]);
    }
}
