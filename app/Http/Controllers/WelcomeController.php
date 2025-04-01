<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Table; // Ensure the Table model exists in the App\Models namespace
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class WelcomeController extends Controller
{
    /**
     * Show the welcome page with menu items and tables.
     */
    public function welcome()
    {
        $restaurantTables = DB::table('restaurant_tables')->get(); // Fetch all tables
        $menuItems = DB::table('menu_items')->get(); // Fetch menu items

        return Inertia::render('Welcome', [
            'restaurant_tables' => $restaurantTables,
            'menuItems' => $menuItems,
        ]);
    }
}
