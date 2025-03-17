<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'patient_name' => $this->faker->name(), // Not encrypted
            'phone' => Crypt::encryptString($this->faker->phoneNumber()), // Encrypt phone
            'gender' => $this->faker->randomElement(['male', 'female']), // Not encrypted
            'age' => $this->faker->numberBetween(1, 100), // Not encrypted
            'notes' => Crypt::encryptString($this->faker->sentence()), // Encrypt notes
            'diseases' => Crypt::encryptString($this->faker->randomElement([ // Encrypt diseases
                'Hypertension', 'Diabetes', 'Asthma', 'Migraine', 'Arthritis',
                'High Cholesterol', 'Allergies', 'Anemia', 'Heart Disease',
                'Osteoporosis', 'Chronic Kidney Disease', 'Depression',
                "Alzheimer's", 'Anxiety', 'Gout'
            ])),
        ];
    }
}