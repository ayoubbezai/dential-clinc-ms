<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $fillable = ['domain', 'tenant_id'];

    // If you want, you can add relationship to Tenant here
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
