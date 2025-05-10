<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AgentController extends Controller
{
    public function ask(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'question' => 'required|string',
        ]);

        try {
            // Make the HTTP request to the external API
            $response = Http::post('http://192.168.1.8:8001/ask', [
                'question' => $validated['question'],
            ]);

            // Check if the request was successful
            if ($response->successful()) {
                return response()->json([
                    'answer' => $response->json(), // or $response->json()['answer'] if structured
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