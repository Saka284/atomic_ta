<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'sensor_id' => 'required|integer',
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
            // Generate filename: file-sensor{id}-v{version}-s{id}.bin
            $versionSlug = str_replace('.', '_', $validated['version']);
            $filename = "file-sensor{$validated['sensor_id']}-v{$versionSlug}-s{$validated['sensor_id']}.bin";
            
            // Store file in public storage
            $path = $request->file('file')->storeAs('files', $filename, 'public');
            
            // Build URL using storage disk configuration
            $fileUrl = Storage::disk('public')->url($path);

            \Log::info("[OTA] Firmware uploaded: {$filename}, version: {$validated['version']}");

            return response()->json([
                'file_url' => $fileUrl,
                'status' => (int) $validated['status'],
                'sensor_id' => (int) $validated['sensor_id'],
                'version' => $validated['version'],
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
        // TODO: Query database for latest firmware for this node
        // For now, return placeholder - this should be enhanced with a Firmware model
        
        \Log::info("[OTA] Node {$nodeId} checked for updates");

        return response()->json([
            'version' => '1.0.0',
            'firmware_url' => '',
            'status' => 0, // No update available
        ]);
    }
}
