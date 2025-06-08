<?php

namespace App\Traits;

trait BelongsToTenant
{
    // Example: scope to filter queries by tenant_id
    public function scopeForTenant($query, $tenantId)
    {
        return $query->where('tenant_id', $tenantId);
    }

    // You can add more tenant-related methods here
}
