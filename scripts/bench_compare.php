<?php

// Usage:
// php scripts/bench_compare.php --current=benchmarks/current.json --baseline-ref=origin/main --fail-on-regression

$options = getopt('', [
    'current::',
    'baseline::',
    'baseline-ref::',
    'output::',
    'regression::',
    'min-regression-ms::',
    'min-improvement::',
    'update-baseline::',
    'update-if-better',
    'fail-on-regression',
]);

$currentFile = $options['current'] ?? 'benchmarks/current.json';
$baselineFile = $options['baseline'] ?? null;
$baselineRef = $options['baseline-ref'] ?? null;
$regression = isset($options['regression']) ? (float) $options['regression'] : 0.10;
$minRegressionMs = isset($options['min-regression-ms']) ? (float) $options['min-regression-ms'] : 50.0;
$minImprovement = isset($options['min-improvement']) ? (float) $options['min-improvement'] : 0.05;
$updateBaseline = $options['update-baseline'] ?? null;
$updateIfBetter = array_key_exists('update-if-better', $options);
$failOnRegression = array_key_exists('fail-on-regression', $options);

if (!file_exists($currentFile)) {
    fwrite(STDERR, "Current benchmark file not found: {$currentFile}\n");
    exit(1);
}

$currentJson = file_get_contents($currentFile);
$current = json_decode($currentJson, true);
if (!is_array($current)) {
    fwrite(STDERR, "Invalid current benchmark JSON: {$currentFile}\n");
    exit(1);
}

$baselineJson = null;
if ($baselineFile && file_exists($baselineFile)) {
    $baselineJson = file_get_contents($baselineFile);
} elseif ($baselineRef) {
    $ref = escapeshellarg($baselineRef);
    $baselineJson = @shell_exec("git show {$ref}:benchmarks/baseline.json 2>NUL");
    if (!$baselineJson) {
        $baselineJson = @shell_exec("git show {$ref}:benchmarks/baseline.json 2>/dev/null");
    }
} elseif (file_exists('benchmarks/baseline.json')) {
    $baselineJson = file_get_contents('benchmarks/baseline.json');
}

if (!$baselineJson) {
    fwrite(STDOUT, "Baseline not found. Skipping comparison.\n");
    exit(0);
}

$baseline = json_decode($baselineJson, true);
if (!is_array($baseline)) {
    fwrite(STDERR, "Invalid baseline benchmark JSON.\n");
    exit(1);
}

$baselineEndpoints = $baseline['endpoints'] ?? [];
$currentEndpoints = $current['endpoints'] ?? [];

if (empty($currentEndpoints)) {
    fwrite(STDERR, "No endpoints in current benchmark.\n");
    exit(1);
}

fwrite(STDOUT, "Benchmark Compare (baseline vs current)\n");
fwrite(STDOUT, str_repeat('-', 98) . "\n");
fwrite(STDOUT, sprintf("%-12s %10s %10s %10s %10s %10s %10s\n", "endpoint", "base_p95", "cur_p95", "p95x", "base_avg", "cur_avg", "avgx"));

$failures = [];
$anyWorse = false;
$totalBaseP95 = 0.0;
$totalCurP95 = 0.0;
$totalBaseAvg = 0.0;
$totalCurAvg = 0.0;
$report = [
    'meta' => [
        'baseline_ref' => $baselineRef,
        'regression' => $regression,
        'min_regression_ms' => $minRegressionMs,
        'min_improvement' => $minImprovement,
    ],
    'endpoints' => [],
];

foreach ($currentEndpoints as $name => $stats) {
    if (!isset($baselineEndpoints[$name])) {
        continue;
    }

    $base = $baselineEndpoints[$name];
    $baseP95 = (float) ($base['p95_ms'] ?? 0);
    $curP95 = (float) ($stats['p95_ms'] ?? 0);
    $baseAvg = (float) ($base['avg_ms'] ?? 0);
    $curAvg = (float) ($stats['avg_ms'] ?? 0);

    $p95x = ($curP95 > 0 && $baseP95 > 0) ? round($baseP95 / $curP95, 2) : 0.0;
    $avgx = ($curAvg > 0 && $baseAvg > 0) ? round($baseAvg / $curAvg, 2) : 0.0;

    $totalBaseP95 += $baseP95;
    $totalCurP95 += $curP95;
    $totalBaseAvg += $baseAvg;
    $totalCurAvg += $curAvg;

    fwrite(STDOUT, sprintf(
        "%-12s %10.1f %10.1f %10.2f %10.1f %10.1f %10.2f\n",
        $name,
        $baseP95,
        $curP95,
        $p95x,
        $baseAvg,
        $curAvg,
        $avgx
    ));

    $report['endpoints'][$name] = [
        'baseline' => $base,
        'current' => $stats,
        'p95_speedup' => $p95x,
        'avg_speedup' => $avgx,
    ];

    $p95DeltaMs = $curP95 - $baseP95;
    if (
        $baseP95 > 0
        && $curP95 > $baseP95 * (1 + $regression)
        && $p95DeltaMs >= $minRegressionMs
    ) {
        $failures[] = $name;
        $anyWorse = true;
    }
    if ($baseP95 > 0 && $curP95 > $baseP95) {
        $anyWorse = true;
    }
}

$summary = [
    'total_base_p95' => $totalBaseP95,
    'total_cur_p95' => $totalCurP95,
    'total_base_avg' => $totalBaseAvg,
    'total_cur_avg' => $totalCurAvg,
    'p95_speedup_total' => $totalCurP95 > 0 ? round($totalBaseP95 / $totalCurP95, 2) : 0.0,
    'avg_speedup_total' => $totalCurAvg > 0 ? round($totalBaseAvg / $totalCurAvg, 2) : 0.0,
];

$report['summary'] = $summary;

fwrite(STDOUT, str_repeat('-', 98) . "\n");
fwrite(STDOUT, sprintf(
    "%-12s %10.1f %10.1f %10.2f %10.1f %10.1f %10.2f\n",
    'TOTAL',
    $summary['total_base_p95'],
    $summary['total_cur_p95'],
    $summary['p95_speedup_total'],
    $summary['total_base_avg'],
    $summary['total_cur_avg'],
    $summary['avg_speedup_total']
));

if ($output = ($options['output'] ?? null)) {
    if (!is_dir(dirname($output))) {
        @mkdir(dirname($output), 0777, true);
    }
    file_put_contents($output, json_encode($report, JSON_PRETTY_PRINT));
}

if ($updateIfBetter && $updateBaseline) {
    $improvedTotal = $totalBaseP95 > 0
        ? ($totalCurP95 <= $totalBaseP95 * (1 - $minImprovement))
        : false;

    if ($improvedTotal && !$anyWorse) {
        if (!is_dir(dirname($updateBaseline))) {
            @mkdir(dirname($updateBaseline), 0777, true);
        }
        file_put_contents($updateBaseline, json_encode($current, JSON_PRETTY_PRINT));
        fwrite(STDOUT, "Baseline updated: {$updateBaseline}\n");
    } else {
        fwrite(STDOUT, "Baseline not updated (no sufficient improvement or regression detected).\n");
    }
}

if (!empty($failures)) {
    fwrite(STDERR, "Regression detected in: " . implode(', ', $failures) . "\n");
    if ($failOnRegression) {
        exit(1);
    }
}

exit(0);
