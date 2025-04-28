<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    //
    protected $fillable = ['user_id','last_message'];

     public function messages(){
        return $this->hadMany(Message::class);
    }
     public function user(){
        return $this->belongsTo(User::class);
    }
}
