<?php

use Illuminate\Support\Facades\Broadcast;

// // Public test channel (no authentication)
// Broadcast::channel('test-channel', function () {
//     return true;
// });


Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.patient.{id}', function ($user, $patientId) {
    return $user && (
        $user->hasRole('dentist') ||
        $user->hasRole('receptionist') ||
        $user->id === $patientId
    );
});
