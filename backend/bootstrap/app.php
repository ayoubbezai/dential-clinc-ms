<?php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
       
        // Global API Middleware (Sanctum for SPA authentication)
        $middleware->api([
            EnsureFrontendRequestsAreStateful::class,
                App\Http\Middleware\CorsMiddleware::class,

        ]);
        

        // Middleware Aliases
        $middleware->alias([
            'role' => RoleMiddleware::class,
            'throttle' => ThrottleRequests::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
                // Handle rate limit exceptions globally
        $exceptions->renderable(function (ThrottleRequestsException $e, $request) {
            return response()->json([
                'error' => 'Too many requests',
                'message' => 'You are making too many requests. Please slow down.',
                'retry_after' => $e->getHeaders()['Retry-After'] ?? 60 // Retry time in seconds
            ], Response::HTTP_TOO_MANY_REQUESTS);
        });

    })
    ->create();
