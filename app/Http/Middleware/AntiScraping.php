<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AntiScraping
{
    public function handle(Request $request, Closure $next)
    {
        $agent = strtolower($request->userAgent());

        $bots = ['python', 'curl', 'wget', 'scrapy', 'bot'];

        foreach ($bots as $bot) {
            if (str_contains($agent, $bot)) {
                abort(403, 'Bot blocked');
            }
        }

        return $next($request);
    }
}
