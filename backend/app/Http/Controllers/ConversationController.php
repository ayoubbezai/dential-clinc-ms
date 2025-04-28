<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Conversation;
use App\Models\User;

class ConversationController extends Controller
{
    public function startConversation(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id' => 'required',
            ]);
            $user = User::find($data['user_id']);

            if(!$user){
                return response()->json([
            'success' => false,
            'message' => 'user not found',
        ],Response::HTTP_NOT_FOUND);
            }

            $userId = $user->id;


            // Check if conversation already exists for this user
            $conversation = Conversation::where('user_id', $userId)->first();

            if (!$conversation) {
                // Create new conversation
                $conversation = Conversation::create([
                    'user_id' => $userId,
                ]);

                        return response()->json([
            'success' => true,
            'conversation_id' => $conversation->id,
            'message' => 'Conversation started successfully.',
        ],Response::HTTP_CREATED);
            }else{
                        return response()->json([
            'success' => true,
            'conversation_id' => $conversation->id,
            'message' => 'Conversation already exict .',
                        ],Response::HTTP_OK);
            }


        } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'error starting conversation',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }

          public function getAllConversation(Request $request)
    {
        try {
            $requestQuery = $request->query();
            $perPage = filter_var($requestQuery['per_page'] ?? 15, FILTER_VALIDATE_INT) ?: 15;
            $perPage = max($perPage, 1);

            // Step 1: Get existing conversations
            $conversations = Conversation::select(['id', 'user_id', 'last_message'])
                ->with(['user:id,name'])
                ->paginate($perPage);

            $conversationCount = $conversations->count();
            $missingCount = $perPage - $conversationCount;

            $items = collect(); // empty collection to combine data

            // Format existing conversations
            foreach ($conversations as $conversation) {
                $items->push([
                    'conversation_id' => $conversation->id,
                    'last_message' => $conversation->last_message,
                    'user' => [
                        'id' => $conversation->user->id,
                        'name' => $conversation->user->name,
                    ],
                ]);
            }

            // Step 2: If less than perPage, get users without conversation
            if ($missingCount > 0) {
               $usersWithoutConversation = User::select('id', 'name', 'role_id')
                ->whereHas('role', function($query) {
                    $query->where('name', 'patient');
                })
                ->whereDoesntHave('conversation')
                ->limit($missingCount)
                ->with('role:id,name') 
                ->get();

                foreach ($usersWithoutConversation as $user) {
                    $items->push([
                        'conversation_id' => null, 
                        'last_message' => null,
                        'user' => [
                            'id' => $user->id,
                            'name' => $user->name,
                        ],
                    ]);
                }
            }

            $response = [
                'success' => true,
                'message' => 'Data fetched successfully',
                'data' => $items,
                'pagination' => [
                    'total_items' => $conversations->total(),
                    'items_per_page' => $perPage,
                    'current_page' => $conversations->currentPage(),
                    'total_pages' => $conversations->lastPage(),
                    'from' => $conversations->firstItem(),
                    'to' => $conversations->lastItem(),
                ],
            ];

            return response()->json($response, Response::HTTP_OK);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get conversations',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
