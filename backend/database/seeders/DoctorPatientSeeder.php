<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\Patient;

class DoctorPatientSeeder extends Seeder
{
    public function run(): void
    {
        // Create 3 doctors and 5 patients each without using factories
        for ($i = 0; $i < 3; $i++) {
            $doctor = Doctor::create([
                'full_name' => 'Doctor '.$i.' '.uniqid(),
                'email' => 'doctor'.$i.'_'.uniqid().'@example.com',
                'phone' => '1234567890',
                'address' => '123 Main St',
                'profile_picture' => null,
                'specialization' => 'General',
                'password' => bcrypt('password'),
            ]);

            for ($j = 0; $j < 5; $j++) {
                $patient = Patient::create([
                    'name' => 'Patient '.$i.'-'.$j.' '.uniqid(),
                    'date_of_birth' => now()->subYears(30)->toDateString(),
                    'gender' => 'Other',
                    'address' => '456 Elm St',
                    'phone_number' => '0987654321',
                    'age' => '30',
                    'password' => bcrypt('password'),
                    'profile_image' => null,
                    'national_id' => uniqid('nid_'),
                    'email' => 'patient'.$i.'_'.$j.'_'.uniqid().'@example.com',
                ]);

                $doctor->patients()->attach($patient->id, [
                    'assigned_at' => now(),
                    'is_primary' => false,
                    'status' => 'active'
                ]);
            }
        }

        // Optionally assign existing patient to multiple doctors (avoid duplicate attach)
        $doc1 = Doctor::first();
        $patient = Patient::first();
        if ($doc1 && $patient) {
            $doc1->patients()->syncWithoutDetaching([
                $patient->id => ['assigned_at' => now(), 'is_primary' => true, 'status' => 'active']
            ]);
        }
    }
}
