<?php

return [
    'name' => env('APP_NAME', 'Morning Brew Collective'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost'),
    'timezone' => 'Asia/Singapore',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_SG',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
    'maintenance' => [
        'driver' => 'file',
    ],
    'providers' => [
        // Laravel Framework Service Providers...
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
      
        // Application Service Providers
        App\Providers\AppServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
    ],
    'aliases' => [
        //...
    ],
];
