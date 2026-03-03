<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecureHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Hapus header server info
        $response->headers->remove('X-Powered-By');

        // HSTS hanya aktif kalau HTTPS (production)
        if ($request->isSecure()) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            );
        }

        /**
         * CSP STABIL UNTUK LARAVEL + BOOTSTRAP + CDN
         * Aman tapi tidak merusak tampilan
         */
        $csp = 
            "default-src 'self' https: data: blob:; ".
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com http://localhost:5173 http://127.0.0.1:5173 http://[::1]:5173; ".
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; ".
            "font-src 'self' https://fonts.gstatic.com data:; ".
            "img-src 'self' https: data: blob:; ".
            "connect-src 'self' https: data: blob:; ".
            "frame-ancestors 'self'; ".
            "object-src 'none'; ".
            "base-uri 'self'; ".
            "form-action 'self';";

        return $response
            ->header('X-Frame-Options', 'SAMEORIGIN')
            ->header('X-Content-Type-Options', 'nosniff')
            ->header('X-XSS-Protection', '1; mode=block')
            ->header('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

            // Aman untuk instansi
            ->header('Cross-Origin-Opener-Policy', 'same-origin')
            ->header('Cross-Origin-Resource-Policy', 'same-origin');

            // JANGAN aktifkan ini dulu (bisa bikin layout rusak)
            // ->header('Cross-Origin-Embedder-Policy', 'require-corp')

            //->header('Content-Security-Policy', $csp);
    }
}
