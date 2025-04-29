<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function getAllConversation(Request $request)
{
    try {
        $requestQuery = $request->query();
        $perPage = filter_var($requestQuery['per_page'] ?? 15, FILTER_VALIDATE_INT) ?: 15;
        $perPage = max($perPage, 1);

        $data = User::select('users.id', 'users.name')
            ->leftJoin('roles', 'users.role_id', '=', 'roles.id')
            ->where('roles.name', 'patient')
            ->leftJoin(DB::raw("
                (
                    SELECT 
                        sender_id as user_id, 
                        MAX(created_at) as last_message_at,
                        'sent' as message_type
                    FROM messages
                    GROUP BY sender_id
                    UNION ALL
                    SELECT 
                        reciver_id as user_id, 
                        MAX(created_at) as last_message_at,
                        'received' as message_type
                    FROM messages
                    GROUP BY reciver_id
                ) as last_messages
            "), 'users.id', '=', 'last_messages.user_id')
            ->orderByDesc('last_messages.last_message_at')
            ->orderByRaw('last_messages.last_message_at IS NULL')
            ->with(['sentMessages' => function($query) {
                $query->orderBy('created_at', 'desc')->limit(1);
            }, 'receivedMessages' => function($query) {
                $query->orderBy('created_at', 'desc')->limit(1);
            }])
            ->paginate($perPage);

        // Transform the result to include only the last message
        $data->getCollection()->transform(function ($user) {
            $lastMessage = null;
            $messageType = null;

            // Get the last sent message (already limited to 1 by the eager load)
            $lastSent = $user->sentMessages->first();
            // Get the last received message (already limited to 1 by the eager load)
            $lastReceived = $user->receivedMessages->first();

            // Determine which one is the most recent
            if ($lastSent && $lastReceived) {
                if ($lastSent->created_at > $lastReceived->created_at) {
                    $lastMessage = $lastSent;
                    $messageType = 'sent';
                } else {
                    $lastMessage = $lastReceived;
                    $messageType = 'received';
                }
            } elseif ($lastSent) {
                $lastMessage = $lastSent;
                $messageType = 'sent';
            } elseif ($lastReceived) {
                $lastMessage = $lastReceived;
                $messageType = 'received';
            }

            // Remove the full messages collections
            unset($user->sentMessages);
            unset($user->receivedMessages);

            // Attach only the last message details
            if ($lastMessage) {
                $user->last_message = $lastMessage;
                $user->message_type = $messageType;
            } else {
                $user->last_message = null;
                $user->message_type = null;
            }

            return $user;
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ], Response::HTTP_OK);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to get conversations',
            'error' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

}