<?php
// TEMPORARY - DELETE THIS FILE AFTER MIGRATION
$secret = $_GET['key'] ?? '';
if ($secret !== 'tuv2026migrate') {
    die('Unauthorized');
}

$basePath = dirname(__DIR__);

// Try exec first
if (function_exists('exec')) {
    $output = [];
    exec("cd {$basePath} && php artisan migrate --force 2>&1", $output);
    echo '<pre>' . htmlspecialchars(implode("\n", $output)) . '</pre>';
    die();
}

// Try shell_exec
if (function_exists('shell_exec')) {
    $out = shell_exec("cd {$basePath} && php artisan migrate --force 2>&1");
    echo '<pre>' . htmlspecialchars($out ?? 'No output') . '</pre>';
    die();
}

// Try proc_open
if (function_exists('proc_open')) {
    $desc = [1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
    $proc = proc_open("php {$basePath}/artisan migrate --force", $desc, $pipes, $basePath);
    if (is_resource($proc)) {
        echo '<pre>' . htmlspecialchars(stream_get_contents($pipes[1]) . stream_get_contents($pipes[2])) . '</pre>';
        proc_close($proc);
    }
    die();
}

echo '<pre>ERROR: All exec functions are disabled.
Contact hosting support to run: php artisan migrate --force</pre>';
