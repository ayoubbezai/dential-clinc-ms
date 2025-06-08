<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait BelongsToTenant
{
    public static function bootBelongsToTenant()
    {
        static::creating(function ($model) {
            if (Auth::check() && !$model->tenant_id) {
                $model->tenant_id = Auth::user()->tenant_id;
            }
        });
    }
}
