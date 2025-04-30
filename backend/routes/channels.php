<?php

use Illuminate\Support\Facades\Broadcast;

// // Public test channel (no authentication)
// Broadcast::channel('test-channel', function () {
//     return true;
// });


Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('patient.{id}', function ($user, $patientId) {
    // Check if user is authenticated and has permission to access this patient's channel
    return $user && (
        $user->hasRole('dentist') || 
        $user->hasRole('receptionist') || 
        $user->id === $patientId
    );
});
