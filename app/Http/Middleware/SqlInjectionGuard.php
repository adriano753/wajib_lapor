<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SqlInjectionGuard
{
    public function handle(Request $request, Closure $next)
    {
        $input = json_encode($request->all());

        $patterns = [
            "/select\s.*from/i",
            "/union\sselect/i",
            "/drop\s+table/i",
            "/insert\s+into/i",
            "/--/",
            "/;/"
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $input)) {
                abort(403, 'SQL Injection detected');
            }
        }

        return $next($request);
    }
}
