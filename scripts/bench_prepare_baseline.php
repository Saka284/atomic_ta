<?php

// Usage:
// php scripts/bench_prepare_baseline.php --ref=origin/main --output=benchmarks/baseline.json [--force]
// By default this script uses an isolated SQLite database inside the worktree.
// Set BENCH_USE_ISOLATED_SQLITE=0 to opt out (not recommended).

$options = getopt('', [
    'ref::',
    'output::',
    'force',
]);

$ref = $options['ref'] ?? 'origin/main';
$output = $options['output'] ?? 'benchmarks/baseline.json';
$force = array_key_exists('force', $options);

if (file_exists($output) && !$force) {
    fwrite(STDOUT, "Baseline already exists: {$output}\n");
    exit(0);
}

$root = realpath(__DIR__ . '/..');
if ($root === false) {
    fwrite(STDERR, "Cannot resolve repo root.\n");
    exit(1);
}

$worktreeDir = $root . DIRECTORY_SEPARATOR . 'benchmarks' . DIRECTORY_SEPARATOR . '.bench-base';

$run = function (string $cmd, ?string $cwd = null): int {
    $cwd = $cwd ?? getcwd();
    $descriptorSpec = [
        0 => STDIN,
        1 => STDOUT,
        2 => STDERR,
    ];
    $process = proc_open($cmd, $descriptorSpec, $pipes, $cwd);
    if (!is_resource($process)) {
        return 1;
    }
    return proc_close($process);
};

$readEnvValue = function (string $path, string $key): ?string {
    if (!file_exists($path)) {
        return null;
    }

    $lines = @file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        return null;
    }

    foreach ($lines as $line) {
        if (preg_match('/^\s*' . preg_quote($key, '/') . '\s*=\s*(.*)\s*$/', $line, $matches) !== 1) {
            continue;
        }

        $value = trim($matches[1]);
        return trim($value, "\"'");
    }

    return null;
};

$writeEnvValue = function (string $path, string $key, string $value): void {
    $lines = file_exists($path) ? @file($path, FILE_IGNORE_NEW_LINES) : [];
    if ($lines === false) {
        $lines = [];
    }

    $pattern = '/^\s*' . preg_quote($key, '/') . '\s*=/';
    $updated = false;

    foreach ($lines as $index => $line) {
        if (preg_match($pattern, $line) === 1) {
            $lines[$index] = $key . '=' . $value;
            $updated = true;
            break;
        }
    }

    if (!$updated) {
        $lines[] = $key . '=' . $value;
    }

    file_put_contents($path, implode(PHP_EOL, $lines) . PHP_EOL);
};

// Clean old worktree if exists
if (is_dir($worktreeDir)) {
    $run('git worktree remove --force ' . escapeshellarg($worktreeDir), $root);
}

$exit = $run('git worktree add ' . escapeshellarg($worktreeDir) . ' ' . escapeshellarg($ref), $root);
if ($exit !== 0) {
    fwrite(STDERR, "Failed to create worktree for ref {$ref}\n");
    exit($exit);
}

// Copy benchmark helpers into baseline worktree (so older refs can run benches)
$benchFiles = [
    'app/Console/Commands/BenchEndpoints.php',
    'config/bench.php',
    'database/seeders/BenchmarkSeeder.php',
];

foreach ($benchFiles as $file) {
    $source = $root . DIRECTORY_SEPARATOR . $file;
    $target = $worktreeDir . DIRECTORY_SEPARATOR . $file;
    if (file_exists($source)) {
        $dir = dirname($target);
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
        copy($source, $target);
    }
}

// Ensure .env exists in worktree
$envPath = $worktreeDir . DIRECTORY_SEPARATOR . '.env';
if (!file_exists($envPath)) {
    $rootEnv = $root . DIRECTORY_SEPARATOR . '.env';
    $rootEnvExample = $root . DIRECTORY_SEPARATOR . '.env.example';
    $source = file_exists($rootEnv) ? $rootEnv : $rootEnvExample;
    if ($source && file_exists($source)) {
        copy($source, $envPath);
    }
}

$useIsolatedSqlite = getenv('BENCH_USE_ISOLATED_SQLITE') !== '0';

if ($useIsolatedSqlite) {
    $sqlitePath = $worktreeDir . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'bench_baseline.sqlite';
    $sqliteDir = dirname($sqlitePath);
    if (!is_dir($sqliteDir)) {
        @mkdir($sqliteDir, 0777, true);
    }
    if (!file_exists($sqlitePath)) {
        @touch($sqlitePath);
    }

    $writeEnvValue($envPath, 'APP_ENV', 'testing');
    $writeEnvValue($envPath, 'DB_CONNECTION', 'sqlite');
    $writeEnvValue($envPath, 'DB_DATABASE', str_replace('\\', '/', $sqlitePath));

    fwrite(STDOUT, "Using isolated SQLite database: {$sqlitePath}\n");
} else {
    $dbName = $readEnvValue($envPath, 'DB_DATABASE');
    $appEnv = $readEnvValue($envPath, 'APP_ENV');
    $allowDestructive = getenv('BENCH_ALLOW_DESTRUCTIVE') === '1';
    $safeByDbName = is_string($dbName) && preg_match('/(test|bench)/i', $dbName) === 1;
    $safeByAppEnv = is_string($appEnv) && strtolower($appEnv) === 'testing';

    if (!$allowDestructive && !$safeByDbName && !$safeByAppEnv) {
        fwrite(
            STDERR,
            "Refusing to run migrate:fresh on non-test database '{$dbName}'. ".
            "Set BENCH_USE_ISOLATED_SQLITE=1 (default) or BENCH_ALLOW_DESTRUCTIVE=1 to override intentionally.\n"
        );
        $run('git worktree remove --force ' . escapeshellarg($worktreeDir), $root);
        exit(1);
    }
}

// Install dependencies if vendor missing
if (!file_exists($worktreeDir . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php')) {
    $exit = $run('composer install --prefer-dist --no-progress --no-suggest', $worktreeDir);
    if ($exit !== 0) {
        fwrite(STDERR, "Composer install failed in baseline worktree.\n");
        $run('git worktree remove --force ' . escapeshellarg($worktreeDir), $root);
        exit($exit);
    }
}

// Ensure app key exists
$run('php artisan key:generate --force', $worktreeDir);

// Prepare DB and run benchmark
$exit = $run('php artisan migrate:fresh --seed --seeder=BenchmarkSeeder', $worktreeDir);
if ($exit !== 0) {
    fwrite(STDERR, "Benchmark seeding failed in baseline worktree.\n");
    $run('git worktree remove --force ' . escapeshellarg($worktreeDir), $root);
    exit($exit);
}

$outputAbs = $root . DIRECTORY_SEPARATOR . $output;
$exit = $run('php artisan bench:endpoints --output=' . escapeshellarg($outputAbs) . ' --fail-on-threshold', $worktreeDir);
if ($exit !== 0) {
    fwrite(STDERR, "Benchmark run failed in baseline worktree.\n");
    $run('git worktree remove --force ' . escapeshellarg($worktreeDir), $root);
    exit($exit);
}

$run('git worktree remove --force ' . escapeshellarg($worktreeDir), $root);

fwrite(STDOUT, "Baseline generated at {$output}\n");
exit(0);
