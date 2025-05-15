<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;


class AgentController extends Controller
{
    public function ask(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'question' => 'required|string',
            'deepSearch' => 'nullable|boolean',
        ]);

        try {
            $userId = Auth::id();

            // Make the HTTP request to the external API
            $response = Http::post('http://127.0.0.1:8000/ask', [
                'question' => $validated['question'],
                "deepSearch" => $validated['deepSearch'] ?? false,
                "userId" => $userId,
            ]);

            if ($response->successful()) {
                return response()->json([
                    'answer' => $response->json(),
                    'status' => 'success',
                ]);
            } else {
                return response()->json([
                    'error' => 'External API request failed',
                    'details' => $response->body(),
                ], 502); // Bad Gateway
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to connect to the external API',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}