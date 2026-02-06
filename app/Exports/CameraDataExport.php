<?php

namespace App\Exports;

use App\Models\CameraData;
use Illuminate\Support\Facades\Storage;
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
        $sql = "SELECT gh_id, recorded_at, image, isFoggy FROM camera_data WHERE DATE(recorded_at) >= ? AND DATE(recorded_at) <= ?";
        $params = [$this->start_date, $this->end_date];

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
                'image_url' => asset($row->image) ?? '-',
                'status' => $row->isFoggy ? 'Berkabut' : 'Tidak Berkabut',
            ];
        }, $results);

        return collect($data);
    }

    public function headings(): array
    {
        return ["Greenhouse ID", "Recorded At", "Image URL", "Status"];
    }
}
