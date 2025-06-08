<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Concerns\HasUuids; // Import UUID trait
use App\Traits\BelongsToTenant;




class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory,HasApiTokens, Notifiable,HasUuids;
    use BelongsToTenant;
    



    protected $keyType = 'string'; // UUID is stored as a string
    public $incrementing = false; // Disable auto-incrementing IDs

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'tenant_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

      public function role()
    {
        return $this->belongsTo(Role::class);
    }
      public function hasRole($role)
    {
        return $this->role && $this->role->name === $role;
    }

     // A user has one patient
     
    public function patient()
    {
        return $this->hasOne(Patient::class, 'user_id', 'id');    
    }

    public function events(){
        return $this->hasMany(Event::class);
    }
public function sentMessages()
{
    return $this->hasMany(Message::class, 'sender_id');
}

public function receivedMessages()
{
    return $this->hasMany(Message::class, 'reciver_id');
}
}
