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
            }]);


                  if(!empty($requestQuery["search"])){

            $search = $requestQuery["search"];
            $data->where(function($query) use ($search){
                $query->where('users.name', 'like', '%' . $search . '%');
            }
        );

        }

        $paginatedData =$data->paginate($perPage);


        // Transform the result
        $transformedData = $paginatedData->getCollection()->map(function ($user) {
            $lastMessage = null;
            $messageType = null;

            $lastSent = $user->sentMessages->first();
            $lastReceived = $user->receivedMessages->first();

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

            return [
                'id' => $user->id,
                'name' => $user->name,
                'last_message' => $lastMessage ? [
                    'id' => $lastMessage->id,
                    'message' => $lastMessage->message,
                    'created_at' => $lastMessage->created_at,
                    'updated_at' => $lastMessage->updated_at
                ] : null,
                'message_type' => $messageType
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $transformedData,
            'pagination' => [
                'total' => $paginatedData->total(),
                'per_page' => $paginatedData->perPage(),
                'current_page' => $paginatedData->currentPage(),
                'last_page' => $paginatedData->lastPage(),
                'from' => $paginatedData->firstItem(),
                'to' => $paginatedData->lastItem(),
                'has_more_pages' => $paginatedData->hasMorePages(),
                'next_page_url' => $paginatedData->nextPageUrl(),
                'prev_page_url' => $paginatedData->previousPageUrl(),
            ]
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