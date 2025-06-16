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
        $isMobileApi = str_starts_with($host, 'api.') || strpos($host, 'api.') === 0; // Check if it's mobile API request
        
        // Check if it's main website (no subdomain or specific main domain)
        $isMainWebsite = !str_contains($host, '.') || 
                        preg_match('/^[^.]+\.[^.]+$/', $host); // Matches domain.com pattern (any main domain)

        // Debug logging (you can remove this later)
        \Log::info('RoleMiddleware Debug', [
            'host' => $host,
            'isLocal' => $isLocal,
            'isMobileApi' => $isMobileApi,
            'isMainWebsite' => $isMainWebsite,
            'user_tenant_id' => $user->tenant_id ?? 'null',
            'str_starts_with_result' => str_starts_with($host, 'api.'),
            'strpos_result' => strpos($host, 'api.') === 0
        ]);

        if (!$isLocal) {
            // For mobile API requests (api.domain.com), accept without strict subdomain checking
            if ($isMobileApi) {
                // Set a default tenant or allow access
                app()->instance('tenant_id', $user->tenant_id);
                app()->instance('domain', null);
            }
            // For main website requests, accept without subdomain checking
            elseif ($isMainWebsite) {
                // Allow access for main website
                app()->instance('tenant_id', $user->tenant_id);
                app()->instance('domain', null);
            }
            // For subdomain requests, perform normal domain lookup
            else {
                // Lookup domain from the DB (only for subdomain environments)
                $domain = Domain::where('domain', $host)->first();

                if (!$domain) {
                    // If domain not found, try to be more flexible
                    // Check if user has a tenant_id and allow access
                    if ($user->tenant_id) {
                        app()->instance('tenant_id', $user->tenant_id);
                        app()->instance('domain', null);
                    } else {
                        return response()->json(['message' => 'Domain not found'], Response::HTTP_NOT_FOUND);
                    }
                } else {
                    // Check if user belongs to the domain's tenant
                    if ($user->tenant_id !== $domain->tenant_id) {
                        return response()->json(['message' => 'Unauthorized tenant access'], Response::HTTP_FORBIDDEN);
                    }

                    // Set domain/tenant globally
                    app()->instance('tenant_id', $domain->tenant_id);
                    app()->instance('domain', $domain);
                }
            }
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
