<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Event extends Model
{
    //

       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }

 protected $fillable =[
        "start_date",
        "start_time",
        "end_date",
        "end_time",
        "location",
        "user_id",
        "people",
        "title","calendarId",'tenant_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
