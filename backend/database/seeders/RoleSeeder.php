<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        Role::create(['name' => 'dentist']);
        Role::create(['name' => 'receptionist']);
        Role::create(['name' => 'patient']);
    }
}
