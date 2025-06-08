<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Domain; // your Domain model

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized - no user'], Response::HTTP_UNAUTHORIZED);
        }

        // Get full host (domain) from the request
        $host = $request->getHost(); // e.g., drsmile.yoursaas.com

        // Lookup domain in the domains table
        $domain = Domain::where('domain', $host)->first();

        if (!$domain) {
            return response()->json(['message' => 'Domain not found'], Response::HTTP_NOT_FOUND);
        }

        // Check user belongs to tenant associated with the domain
        if ($user->tenant_id !== $domain->tenant_id) {
            return response()->json(['message' => 'Unauthorized tenant access'], Response::HTTP_FORBIDDEN);
        }

        // Check user role if roles specified
        if ($roles && !in_array($user->role->name, $roles)) {
            return response()->json(['message' => 'Unauthorized role'], Response::HTTP_FORBIDDEN);
        }

        // Optionally share the tenant or domain globally
        app()->instance('tenant_id', $domain->tenant_id);
        app()->instance('domain', $domain);

        return $next($request);
    }
}
