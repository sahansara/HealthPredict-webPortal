<?php

namespace App\Http\Middleware;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        if (!$request->user() || $request->user()->role_id !== 1) {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        // Log when the correct admin role is detected
        if ($request->user() && $request->user()->role_id === 1) {
            \Log::info('Admin access granted for user ID: ' . $request->user()->id);
        }

        return $next($request);
    }
}