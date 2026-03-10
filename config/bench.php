<?php

return [
    'iterations' => (int) env('BENCH_ITERATIONS', 20),
    'warmup' => (int) env('BENCH_WARMUP', 3),
    'cold' => (bool) env('BENCH_COLD', false),
    'endpoints' => [
        'monitoring',
        'table',
        'camera',
        'controlling',
        'heatmap',
    ],
    // Thresholds in milliseconds (p95 warm). Adjust via BENCH_THRESHOLDS JSON env.
    'thresholds' => [
        'monitoring' => 800,
        'table' => 900,
        'camera' => 800,
        'controlling' => 900,
        'heatmap' => 1400,
    ],
];
