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
        $camera_data = CameraData::whereDate('recorded_at', '>=', $this->start_date)
            ->whereDate('recorded_at', '<=', $this->end_date)
            ->when($this->gh_id, function ($q) {
                $q->where('gh_id', $this->gh_id);
            })
            ->orderByDesc('recorded_at')
            ->get();

        $data = $camera_data->map(function ($camera) {

            return [
                'gh_id' => $camera->gh_id,
                'recorded_at' => $camera->recorded_at,
                'image_url' => asset($camera->image) ?? '-',
                'status' => $camera->isFoggy ? 'Berkabut' : 'Tidak Berkabut',
            ];
        });

        return $data;
    }

    public function headings(): array
    {
        return ["Greenhouse ID", "Recorded At", "Image URL", "Status"];
    }
}
