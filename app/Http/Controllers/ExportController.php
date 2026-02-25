<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CameraData;        // Model Database Kamera
use App\Exports\SensorDataExport; // Export Sensor (Tetap dipakai)
use Maatwebsite\Excel\Facades\Excel;
use ZipArchive;                   // Library buat bikin ZIP
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ExportController extends Controller
{
    // --- EXPORT SENSOR (JANGAN DIUBAH) ---
    public function sensor(Request $request)
    {
        $request->validate([
            'gh_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'node_id' => 'nullable|integer|min:1',
        ]);

        $startDate = date('Y-m-d', strtotime($request->start_date));
        $endDate = date('Y-m-d', strtotime($request->end_date));
        $fileName = "sensor_data_{$startDate}_to_{$endDate}.xlsx";

        return Excel::download(
            new SensorDataExport(
                $request->gh_id,
                $request->start_date,
                $request->end_date,
                $request->node_id
            ),
            $fileName
        );
    }

    // --- EXPORT CAMERA (INI YANG KITA UBAH JADI ZIP) ---
    public function camera(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'gh_id' => 'nullable'
        ]);

        // 2. Ambil Data dari Database
        $start = Carbon::parse($request->start_date)->startOfDay();
        $end = Carbon::parse($request->end_date)->addDay()->startOfDay();

        $query = CameraData::query()
            ->where('recorded_at', '>=', $start)
            ->where('recorded_at', '<', $end);

        if ($request->gh_id) {
            $query->where('gh_id', $request->gh_id);
        }

        $data = $query->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'Tidak ada data pada tanggal tersebut'], 404);
        }

        // 3. Siapkan File ZIP
        $zipFileName = 'Laporan_Camera_' . date('Y-m-d_His') . '.zip';
        $zipPath = public_path($zipFileName); // Simpan sementara di folder public
        
        // Hapus file lama jika ada (biar bersih)
        if (File::exists($zipPath)) {
            File::delete($zipPath);
        }

        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE) === TRUE) {

            // --- A. BUAT DATA CSV (TABEL) ---
            $csvHeader = ['Greenhouse ID', 'Datetime', 'Akurasi (%)', 'Status', 'Nama File Gambar'];
            $csvContent = implode(',', $csvHeader) . "\n";

            foreach ($data as $row) {
                // Logika status (Cek apakah foggy atau tidak)
                $statusText = $row->isFoggy ? 'Berkabut' : 'Tidak Berkabut';
                $imagePath = parse_url((string) $row->image, PHP_URL_PATH) ?: (string) $row->image;
                
                // Siapkan baris data
                $csvRow = [
                    $row->gh_id,
                    $row->recorded_at,
                    $row->confidence ?? '-',
                    $statusText,
                    basename($imagePath) // Ambil nama filenya saja
                ];
                $csvContent .= implode(',', $csvRow) . "\n";
            }
            
            // Masukkan data teks tadi ke dalam ZIP
            $zip->addFromString('Data_Laporan.csv', $csvContent);

            // --- B. MASUKKAN GAMBAR ASLI KE ZIP ---
            foreach ($data as $row) {
                if (!$row->image) {
                    continue;
                }

                $imagePath = parse_url((string) $row->image, PHP_URL_PATH) ?: (string) $row->image;
                $imageName = basename($imagePath);
                if (!$imageName || $imageName === '.' || $imageName === '/') {
                    continue;
                }

                // Local first (works when storage is shared on the same host)
                $localPath = public_path(ltrim($imagePath, '/'));
                if (is_file($localPath)) {
                    $zip->addFile($localPath, 'images/' . $imageName);
                    continue;
                }

                // Fallback to configured media host for centralized storage
                $imageUrl = $this->resolvePublicMediaUrl((string) $row->image);
                try {
                    $response = Http::timeout(10)->get($imageUrl);
                    if ($response->successful()) {
                        $zip->addFromString('images/' . $imageName, $response->body());
                    }
                } catch (\Throwable $e) {
                    Log::warning('[EXPORT_CAMERA] Failed to fetch image for ZIP', [
                        'image' => $row->image,
                        'url' => $imageUrl,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            $zip->close();
        } else {
            return response()->json(['message' => 'Gagal membuat file ZIP'], 500);
        }

        // 4. Download & Hapus File Sementara
        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    private function resolvePublicMediaUrl(string $imageReference): string
    {
        if (preg_match('/^https?:\/\//i', $imageReference)) {
            return $imageReference;
        }

        $baseUrl = rtrim((string) config('app.media_url', config('app.url')), '/');

        return $baseUrl . '/' . ltrim($imageReference, '/');
    }
}
