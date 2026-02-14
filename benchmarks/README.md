# Benchmarks

This folder stores benchmark outputs used for local checks and CI artifact reports.
In CI, baseline is generated automatically from the compared base commit/worktree.

## Generate baseline (manual/local)
```bash
php artisan migrate --force
php artisan db:seed --class=BenchmarkSeeder --force
php artisan bench:endpoints --output=benchmarks/baseline.json --fail-on-threshold
```

## Generate baseline from older ref (automatic)
```bash
php scripts/bench_prepare_baseline.php --ref=origin/main --output=benchmarks/baseline.json --force
```

## Run current benchmark (local)
```bash
php artisan migrate --force
php artisan db:seed --class=BenchmarkSeeder --force
php artisan bench:endpoints --output=benchmarks/current.json --fail-on-threshold
php scripts/bench_compare.php --current=benchmarks/current.json --baseline=benchmarks/baseline.json
```

## Notes
- Thresholds live in `config/bench.php` and can be overridden via `BENCH_THRESHOLDS` (JSON).
- Dataset size can be tuned with `BENCH_GH`, `BENCH_NODES`, `BENCH_ROWS`, `BENCH_CAMERA_ROWS`.

## Optional baseline update (local only)
`bench_compare.php` can auto-update baseline when the current run is faster:
```bash
php scripts/bench_compare.php --current=benchmarks/current.json --baseline=benchmarks/baseline.json --update-if-better --update-baseline=benchmarks/baseline.json
```
