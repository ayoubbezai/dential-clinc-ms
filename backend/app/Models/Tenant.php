<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Database\Models\Domain;

class Tenant extends BaseTenant
{
    protected $fillable = ['id', 'data'];

    public function domains()
    {
        return $this->hasMany(Domain::class);
    }
}
