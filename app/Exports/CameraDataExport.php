<?php

namespace App\Exports;

use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CameraDataExport implements FromCollection, WithHeadings
{
    protected $start_date, $end_date, $gh_id;

    public function __construct($start_date, $end_date, $gh_id)
    {
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->gh_id = $gh_id;
    }

    public function collection()
    {
        // Optimization: Raw SQL to bypass Model Hydration
        $start = Carbon::parse($this->start_date)->startOfDay()->toDateTimeString();
        $end = Carbon::parse($this->end_date)->addDay()->startOfDay()->toDateTimeString();

        $sql = "SELECT gh_id, recorded_at, image, isFoggy FROM camera_data WHERE recorded_at >= ? AND recorded_at < ?";
        $params = [$start, $end];

        if ($this->gh_id) {
            $sql .= " AND gh_id = ?";
            $params[] = $this->gh_id;
        }

        $sql .= " ORDER BY recorded_at DESC";

        $results = \Illuminate\Support\Facades\DB::select($sql, $params);

        $data = array_map(function ($row) {
            return [
                'gh_id' => $row->gh_id,
                'recorded_at' => $row->recorded_at,
                'image_url' => $this->buildPublicMediaUrl($row->image),
                'status' => $row->isFoggy ? 'Berkabut' : 'Tidak Berkabut',
            ];
        }, $results);

        return collect($data);
    }

    private function buildPublicMediaUrl(?string $path): string
    {
        if (!$path) {
            return '-';
        }

        if (preg_match('/^https?:\/\//i', $path)) {
            return $path;
        }

        $baseUrl = rtrim((string) config('app.media_url', config('app.url')), '/');

        return $baseUrl . '/' . ltrim($path, '/');
    }

    public function headings(): array
    {
        return ["Greenhouse ID", "Recorded At", "Image URL", "Status"];
    }
}
