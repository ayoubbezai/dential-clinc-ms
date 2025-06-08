<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        // Get the current tenant id, implement your logic here
        $tenantId = Auth::user()->tenant_id ?? null;

        if ($tenantId) {
            $builder->where('tenant_id', $tenantId);
        }
    }
}
