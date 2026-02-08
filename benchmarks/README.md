# Benchmarks

This folder stores benchmark outputs and baseline data for CI comparisons.

## Generate baseline (manual)
```bash
php artisan migrate:fresh --seed --seeder=BenchmarkSeeder
php artisan bench:endpoints --output=benchmarks/baseline.json --fail-on-threshold
```

Commit `benchmarks/baseline.json` after review. CI will compare against it.

## Run current benchmark (local)
```bash
php artisan migrate:fresh --seed --seeder=BenchmarkSeeder
php artisan bench:endpoints --output=benchmarks/current.json --fail-on-threshold
php scripts/bench_compare.php --current=benchmarks/current.json --baseline=benchmarks/baseline.json
```

## Notes
- Thresholds live in `config/bench.php` and can be overridden via `BENCH_THRESHOLDS` (JSON).
- Dataset size can be tuned with `BENCH_GH`, `BENCH_NODES`, `BENCH_ROWS`, `BENCH_CAMERA_ROWS`.
