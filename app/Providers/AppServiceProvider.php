<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if (!app()->environment('local') && env("APP_URL") && env("APP_URL") !== "http://localhost") {
            URL::forceRootUrl(env("APP_URL"));
            URL::forceScheme(env("APP_SCHEMA", "http"));
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}