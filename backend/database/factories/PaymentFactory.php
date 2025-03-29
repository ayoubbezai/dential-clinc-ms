<?php

namespace Database\Factories;
use App\Models\Payment;
use App\Models\Folder;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition()
    {
        return [
            'folder_id' => Folder::inRandomOrder()->first()->id,
            'amount' => $this->faker->randomFloat(2, 10, 1000), // Random amount
            'type' => $this->faker->randomElement(['income']),
            'created_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}
