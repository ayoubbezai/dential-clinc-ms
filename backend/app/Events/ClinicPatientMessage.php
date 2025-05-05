<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Queue\SerializesModels;

class ClinicPatientMessage implements ShouldBroadcast
{

    use InteractsWithSockets, SerializesModels;

    public $message;
    public $patientId;

    public function __construct($message, $patientId)
    {
        $this->message = $message;
        $this->patientId = $patientId;
    }

    public function broadcastOn()
    {
    return new PrivateChannel("chat.patient.{$this->patientId}");
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}