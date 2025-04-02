<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        // รับค่าหมวดหมู่จาก query string เช่น ?category=Hot Menu
        $category = $request->query('category', 'All');

        // ถ้าหมวดหมู่เป็น "All" ให้ดึงเมนูทั้งหมด
        if ($category === 'All') {
            $menuItems = MenuItem::all();
        } else {
            // ดึงเมนูที่ตรงกับหมวดหมู่ที่เลือก
            $menuItems = MenuItem::where('category', $category)->get();
        }

        return Inertia::render('Menu', [
            'menuItems' => $menuItems,
            'selectedCategory' => $category
        ]);
    }
}
