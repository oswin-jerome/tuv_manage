<?php
// TEMPORARY - DELETE THIS FILE AFTER MIGRATION
$secret = $_GET['key'] ?? '';
if ($secret !== 'tuv2026migrate') {
    die('Unauthorized');
}

$output = [];
$basePath = dirname(__DIR__);
exec("cd {$basePath} && php artisan migrate --force 2>&1", $output);
echo '<pre>' . implode("\n", $output) . '</pre>';
