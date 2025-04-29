<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $data = $request->validate([
            'message' => 'required|string',
            'reciver_id' => 'required|exists:users,id', 
        ]);

        $sender_id = Auth::id();

        $message = Message::create([
            'message'     => $data['message'],
            'sender_id'   => $sender_id,
            'reciver_id'  => $data['reciver_id'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }
}
