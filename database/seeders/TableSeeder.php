<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restaurant_tables')->insert([
            ['name' => 'Table 1'],
            ['name' => 'Table 2'],
            ['name' => 'Table 3'],
            ['name' => 'Table 4'],
            ['name' => 'Table 5'],
            ['name' => 'Table 6'],
            ['name' => 'Table 7'],
            ['name' => 'Table 8'],
        ]);
        
    }
}
