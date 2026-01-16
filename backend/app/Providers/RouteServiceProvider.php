<?php

namespace App\Providers;

use Illuminate\Routing\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        Route::model('product', \App\Models\Product::class);
        Route::model('order', \App\Models\Order::class);
    }
}
