<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
<<<<<<< HEAD
=======
    //KHSUS UNTUK CLOUDFLARE
    // public function boot()
    // {
    //     URL::forceScheme('https');
    // }

    //khusu untuk local
>>>>>>> rayhan
    public function boot()
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
