<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StockUnit;

class StockUnitsSeeder extends Seeder
{
    public function run()
    {
        $units = [
            'Box', 'Bottle', 'Strip', 'Tablet', 'Packet', 'Sachet', 
            'ml', 'l', 'mg', 'g', 'kg', 'vial', 'tube', 'capsule', 
            'ampoule', 'drop', 'syringe', 'dose', 'suppository'
        ];

        foreach ($units as $unit) {
            StockUnit::create(['name' => $unit]);
        }
    }
}
