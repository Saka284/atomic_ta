<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CameraData;        // Model Database Kamera
use App\Exports\SensorDataExport; // Export Sensor (Tetap dipakai)
use Maatwebsite\Excel\Facades\Excel;
use ZipArchive;                   // Library buat bikin ZIP
use Illuminate\Support\Facades\File;
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
        ]);

        $startDate = date('Y-m-d', strtotime($request->start_date));
        $endDate = date('Y-m-d', strtotime($request->end_date));
        $fileName = "sensor_data_{$startDate}_to_{$endDate}.xlsx";

        return Excel::download(
            new SensorDataExport($request->gh_id, $request->start_date, $request->end_date),
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
                
                // Siapkan baris data
                $csvRow = [
                    $row->gh_id,
                    $row->recorded_at,
                    $row->fog_percentage ?? '-',
                    $statusText,
                    basename($row->image) // Ambil nama filenya saja
                ];
                $csvContent .= implode(',', $csvRow) . "\n";
            }
            
            // Masukkan data teks tadi ke dalam ZIP
            $zip->addFromString('Data_Laporan.csv', $csvContent);

            // --- B. MASUKKAN GAMBAR ASLI KE ZIP ---
            foreach ($data as $row) {
                // Pastikan file gambarnya ada di folder public laptop kakak
                if ($row->image && file_exists(public_path($row->image))) {
                    $fullPath = public_path($row->image);
                    // Masukkan ke dalam folder 'images' di dalam ZIP
                    $zip->addFile($fullPath, 'images/' . basename($row->image));
                }
            }

            $zip->close();
        } else {
            return response()->json(['message' => 'Gagal membuat file ZIP'], 500);
        }

        // 4. Download & Hapus File Sementara
        return response()->download($zipPath)->deleteFileAfterSend(true);
    }
}
