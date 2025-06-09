<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Domain;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized - no user'], Response::HTTP_UNAUTHORIZED);
        }

        // Get the current host
        $host = $request->getHost(); // e.g., "localhost" or "app.domain.com"
        $isLocal = str_contains($host, 'localhost');

        if (!$isLocal) {
            // Lookup domain from the DB (only in non-local environments)
            $domain = Domain::where('domain', $host)->first();

            if (!$domain) {
                return response()->json(['message' => 'Domain not found'], Response::HTTP_NOT_FOUND);
            }

            // Check if user belongs to the domain's tenant
            if ($user->tenant_id !== $domain->tenant_id) {
                return response()->json(['message' => 'Unauthorized tenant access'], Response::HTTP_FORBIDDEN);
            }

            // Set domain/tenant globally
            app()->instance('tenant_id', $domain->tenant_id);
            app()->instance('domain', $domain);
        } else {
            // Local environment: bypass domain lookup
            app()->instance('tenant_id', null);
            app()->instance('domain', null);
        }

        // Role check
        if ($roles && !in_array($user->role->name ?? null, $roles)) {
            return response()->json(['message' => 'Unauthorized role'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
