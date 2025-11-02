<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\sys_role;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // create roles first so role_id references exist
        sys_role::firstOrCreate(['name' => 'Admin']);
        sys_role::firstOrCreate(['name' => 'Doctor']);
        sys_role::firstOrCreate(['name' => 'Patient']);

        // then create the user that references a role
        User::create([
            'full_name' => 'Admin01',
            'email' => 'GxNlZ@example.com',
            'phone' => '1234567890',
            'password' => bcrypt('password'),
            'role_id' => 1,
        ]);
    }
}
