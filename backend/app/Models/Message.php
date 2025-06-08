<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Message extends Model
{
    //

       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }

    protected $fillable = [
        'message',
        'sender_id',
        'reciver_id','tenant_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
