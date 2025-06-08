<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\BelongsToTenant;
use App\Scopes\TenantScope;
class Folder extends Model
{
    //
    use HasFactory;
       
    use BelongsToTenant;

    protected static function booted()
    {
        static::addGlobalScope(new TenantScope);
    }


    protected $fillable =[
        "patient_id",
        "folder_name",
        "price",
        "status"
        ,'tenant_id'
    ];

    //defiend relationships

     public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
     public function visits()
    {
        return $this->hasMany(FolderVisit::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    // public function files()
    // {
    //     return $this->hasMany(File::class);
    // }


    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function attachments()
{
    return $this->hasMany(Attachment::class);
}
}
