<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $role = Role::create(['name' => 'admin']);
        $role2 = Role::create(['name' => 'staff']);


        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@app.com',
            'phone' => '800000000',
            'password' => Hash::make("password")
        ]);
        $user->assignRole('admin');
    }
}
