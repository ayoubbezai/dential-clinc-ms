<?php 
namespace Database\Seeders;
use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    public function run()
    {
        // Create 50 fake patients
        Patient::factory()->count(1000)->create();
    }
}