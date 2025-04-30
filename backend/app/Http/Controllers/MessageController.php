<?php

namespace App\Http\Controllers;

use App\Events\ClinicPatientMessage;
use App\Events\TestMessageEvent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            $userId = Auth::id();
            
            $data = $request->validate([
                'message' => 'required|string',
                'reciver_id' => 'nullable|sometimes|exists:users,id',
            ]);

            // Get user with role
            $sender = User::with("role")->find($userId);
            
            if (!$sender) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], Response::HTTP_NOT_FOUND);
            }
            
            if (!$sender->role) {
                return response()->json([
                    'success' => false,
                    'message' => 'User role not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $receiver_id = ($sender->role->name == "patient")
                ? 'clinc'
                : $data['reciver_id'];

            $message = Message::create([
                'message'    => $data['message'],
                'sender_id'  => $userId,
                'reciver_id' => $receiver_id,
            ]);

    broadcast(new ClinicPatientMessage(
        $message,
        $userId,
        $receiver_id
    ));

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => $message  // Changed from $userId to $message
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
public function getConversation(String $id, Request $request)
{
    try {
        // Verify the user exists
        $user = User::findOrFail($id);
        $requestQuery = $request->query();

        $perPage = filter_var($requestQuery['per_page'] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        $messages = Message::select([
                'message',
                'created_at',
                DB::raw('CASE 
                    WHEN sender_id = "' . $id . '" THEN "sent" 
                    ELSE "received" 
                END as type')
            ])
            ->where(function($query) use ($id) {
                $query->where('sender_id', $id)
                    ->where('reciver_id', 'clinc');
            })
            ->orWhere('reciver_id', $id)
            ->orderBy('created_at', 'desc');

        $paginatedMessages = $messages->paginate($perPage);

        // Transform the collection to match desired structure
        $transformedMessages = collect($paginatedMessages->items())->map(function ($message) {
            return [
                'message' => $message->message,
                'type' => $message->type,
                'created_at' => $message->created_at
            ];
        });

        return response()->json([
            'success' => true,
            'user'=>$user,
            'data' => $transformedMessages,
            'pagination' => [
                'total' => $paginatedMessages->total(),
                'per_page' => $paginatedMessages->perPage(),
                'current_page' => $paginatedMessages->currentPage(),
                'last_page' => $paginatedMessages->lastPage(),
                'has_more_pages' => $paginatedMessages->hasMorePages(),
                'from' => $paginatedMessages->firstItem(),
                'to' => $paginatedMessages->lastItem()
            ]
        ]);

    }catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'An error occurred while fetching conversation',
            'error' => $e->getMessage()
        ], 500);
    }
}}