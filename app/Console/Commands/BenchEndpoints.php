<?php

namespace App\Console\Commands;

use App\Http\Controllers\PageController;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BenchEndpoints extends Command
{
    protected $signature = 'bench:endpoints
        {--iterations= : Number of measured iterations per endpoint}
        {--warmup= : Number of warmup iterations per endpoint}
        {--cold : Measure one cold run per endpoint (Cache::flush before run)}
        {--endpoints= : Comma-separated list of endpoints}
        {--thresholds= : JSON map of endpoint=>ms p95 thresholds}
        {--output= : Write JSON results to file}
        {--fail-on-threshold : Exit non-zero when any endpoint exceeds threshold}';

    protected $description = 'Benchmark Inertia page endpoints and report latency stats.';

    public function handle(): int
    {
        $iterations = (int) ($this->option('iterations') ?: config('bench.iterations', 20));
        $warmup = (int) ($this->option('warmup') ?: config('bench.warmup', 3));
        $cold = (bool) ($this->option('cold') ?: config('bench.cold', false));
        $iterations = max(1, $iterations);
        $warmup = max(0, $warmup);

        $endpointList = $this->option('endpoints');
        $endpoints = $endpointList
            ? array_values(array_filter(array_map('trim', explode(',', $endpointList))))
            : config('bench.endpoints', []);

        $thresholds = config('bench.thresholds', []);
        $thresholdOverride = $this->option('thresholds') ?: env('BENCH_THRESHOLDS');
        if ($thresholdOverride) {
            $decoded = json_decode($thresholdOverride, true);
            if (is_array($decoded)) {
                $thresholds = array_merge($thresholds, $decoded);
            }
        }

        $controller = app(PageController::class);
        $handlers = [
            'monitoring' => fn () => $controller->monitoring(),
            'table' => fn () => $controller->table(),
            'camera' => fn () => $controller->camera(),
            'controlling' => fn () => $controller->controlling(),
            'heatmap' => fn () => $controller->heatmap(Request::create('/heatmap', 'GET', ['gh_id' => 1])),
        ];

        $results = [
            'meta' => [
                'timestamp' => date('c'),
                'iterations' => $iterations,
                'warmup' => $warmup,
                'cold' => $cold,
                'php' => PHP_VERSION,
                'env' => app()->environment(),
                'dataset' => [
                    'greenhouses' => (int) env('BENCH_GH', 2),
                    'nodes_per_gh' => (int) env('BENCH_NODES', 5),
                    'rows_per_node' => (int) env('BENCH_ROWS', 300),
                    'camera_rows' => (int) env('BENCH_CAMERA_ROWS', 120),
                ],
            ],
            'endpoints' => [],
        ];

        $failures = [];

        $this->line('Endpoint Benchmark (ms)');
        $this->line(str_repeat('-', 86));
        $this->line(sprintf('%-12s %8s %8s %8s %8s %8s %8s %8s', 'endpoint', 'min', 'p50', 'p95', 'avg', 'max', 'rps', 'loops'));

        foreach ($endpoints as $name) {
            if (!isset($handlers[$name])) {
                $this->warn("Skipping unknown endpoint: {$name}");
                continue;
            }

            $handler = $handlers[$name];
            $coldMs = null;

            if ($cold) {
                Cache::flush();
                $coldMs = $this->runOnce($handler);
            }

            for ($i = 0; $i < $warmup; $i++) {
                $this->runOnce($handler);
            }

            $times = [];
            for ($i = 0; $i < $iterations; $i++) {
                $times[] = $this->runOnce($handler);
            }

            $stats = $this->stats($times);
            $stats['cold_ms'] = $coldMs;
            $stats['threshold_ms'] = $thresholds[$name] ?? null;
            $stats['threshold_ok'] = $stats['threshold_ms']
                ? $stats['p95_ms'] <= $stats['threshold_ms']
                : true;

            if (!$stats['threshold_ok'] && $this->option('fail-on-threshold')) {
                $failures[] = $name;
            }

            $results['endpoints'][$name] = $stats;

            $this->line(sprintf(
                '%-12s %8.1f %8.1f %8.1f %8.1f %8.1f %8.1f %8d',
                $name,
                $stats['min_ms'],
                $stats['p50_ms'],
                $stats['p95_ms'],
                $stats['avg_ms'],
                $stats['max_ms'],
                $stats['rps'],
                $stats['iterations']
            ));

            if (!$stats['threshold_ok']) {
                $this->warn("  threshold exceeded: p95 {$stats['p95_ms']}ms > {$stats['threshold_ms']}ms");
            }
        }

        if ($output = $this->option('output')) {
            if (!is_dir(dirname($output))) {
                @mkdir(dirname($output), 0777, true);
            }
            file_put_contents($output, json_encode($results, JSON_PRETTY_PRINT));
        }

        if (!empty($failures)) {
            $this->error('Benchmark failed threshold(s): ' . implode(', ', $failures));
            return 1;
        }

        return 0;
    }

    private function runOnce(callable $handler): float
    {
        $start = microtime(true);
        $handler();
        return (microtime(true) - $start) * 1000;
    }

    private function stats(array $times): array
    {
        sort($times);
        $count = count($times);
        $sum = array_sum($times);
        $avg = $count ? $sum / $count : 0.0;
        $min = $count ? $times[0] : 0.0;
        $max = $count ? $times[$count - 1] : 0.0;
        $p50 = $this->percentile($times, 0.50);
        $p95 = $this->percentile($times, 0.95);
        $rps = $sum > 0 ? round(($count / ($sum / 1000)), 1) : 0.0;

        return [
            'iterations' => $count,
            'min_ms' => $min,
            'p50_ms' => $p50,
            'p95_ms' => $p95,
            'avg_ms' => $avg,
            'max_ms' => $max,
            'rps' => $rps,
        ];
    }

    private function percentile(array $sorted, float $percent): float
    {
        $count = count($sorted);
        if ($count === 0) {
            return 0.0;
        }

        $index = (int) floor(($count - 1) * $percent);
        return $sorted[$index];
    }
}
