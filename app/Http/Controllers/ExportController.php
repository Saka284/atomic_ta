<?php

namespace App\Http\Controllers;

use App\Exports\CameraDataExport;
use App\Exports\SensorDataExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
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

    public function camera(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'gh_id' => 'nullable|exists:greenhouses,id'
        ]);

        $startDate = date('Y-m-d', strtotime($request->start_date));
        $endDate = date('Y-m-d', strtotime($request->end_date));

        $fileName = "camera_data_{$startDate}_to_{$endDate}.xlsx";

        return Excel::download(
            new CameraDataExport($request->start_date, $request->end_date, $request->gh_id),
            $fileName
        );
    }
}
