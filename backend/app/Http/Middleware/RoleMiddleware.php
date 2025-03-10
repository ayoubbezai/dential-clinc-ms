<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
      public function handle(Request $request, Closure $next, ...$roles)  // Accept multiple roles
    {
        if (!$request->user() || !in_array($request->user()->role->name, $roles)) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}