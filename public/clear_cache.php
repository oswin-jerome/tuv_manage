<?php
// TEMPORARY - DELETE AFTER USE
$secret = $_GET['key'] ?? '';
if ($secret !== 'tuv2026clear') {
    die('Unauthorized');
}

$basePath = dirname(__DIR__);

// Bootstrap Laravel
require $basePath . '/vendor/autoload.php';
$app = require_once $basePath . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$results = [];

// Clear all caches
foreach (['cache:clear', 'view:clear', 'route:clear', 'config:clear', 'event:clear'] as $cmd) {
    $kernel->call($cmd);
    $results[] = "✓ $cmd";
}

// Also clear OPcache if available
if (function_exists('opcache_reset')) {
    opcache_reset();
    $results[] = "✓ opcache cleared";
}

echo '<pre style="font-family:monospace;padding:20px;">';
echo implode("\n", $results);
echo "\n\nDone! Delete this file now.";
echo '</pre>';
