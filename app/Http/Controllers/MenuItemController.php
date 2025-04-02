<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $category_id = $request->input('category_id');

        $menuItems = DB::table('menu_items')
            ->join('categories', 'menu_items.category_id', '=', 'categories.id')
            ->select(
                'menu_items.id',
                'menu_items.name',
                'menu_items.description',
                'menu_items.price',
                'menu_items.image',
                'categories.id as category_id',
                'categories.name as category_name'
            )
            ->when($category_id, function ($query) use ($category_id) {
                return $query->where('menu_items.category_id', $category_id);
            })
            ->get();

        // ดึงข้อมูลหมวดหมู่ทั้งหมด
        $categories = DB::table('categories')->select('id', 'name')->get();

        dd(Category::pluck('name'));



        return Inertia::render('Welcome', [
            'menuItems' => $menuItems,
            'categories' => $categories, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = DB::table('categories')->get(); // ดึงข้อมูลหมวดหมู่ทั้งหมด
        return Inertia::render('Menu/Create', [
            'categories' => $categories,  // ส่งข้อมูลหมวดหมู่ไปยังหน้า Create
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info($request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);


        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images', 'public');
        }

        DB::transaction(function () use ($validated, $request) {
            Log::info('Insert Menu:', [
                'name' => $validated['name'],
                'price' => $validated['price'],
                'description' => $validated['description'],
                'category_id' => $validated['category_id'],
                'image' => $validated['image'] ?? null,
            ]);

            DB::table('menu_items')->insert([
                'name' => $validated['name'],
                'price' => $validated['price'],
                'description' => $validated['description'],
                'category_id' => $validated['category_id'],
                'image' => $validated['image'] ?? null,
            ]);
        });
        return redirect()->route('welcome')->with('success', 'Menu item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MenuItem $menuItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MenuItem $menuItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MenuItem $menuItem)
    {
        //
    }
}
