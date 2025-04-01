<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employees')->insert([
            ['name' => 'wan', 'position' => 'cook'],
            ['name' => 'itim', 'position' => 'cook'],
            ['name' => 'beam', 'position' => 'counter'],
            ['name' => 'mai', 'position' => 'counter'],
            ['name' => 'noey', 'position' => 'server'],
            ['name' => 'gam', 'position' => 'drink'],
            ['name' => 'ju', 'position' => 'drink'],
        ]);
    }
}
