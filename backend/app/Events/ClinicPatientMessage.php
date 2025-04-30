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
    public $senderId;
    public $patientId;

    public function __construct($message, $senderId, $patientId)
    {
        $this->message = $message;
        $this->senderId = $senderId;
        $this->patientId = $patientId;
    }

    public function broadcastOn()
    {
        // Channel name format: clinic.patient.{patientId}
        return new PrivateChannel('patient.1');
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}