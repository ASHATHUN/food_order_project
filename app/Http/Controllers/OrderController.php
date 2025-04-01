<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('menuItem')->get(); // Fetch orders with related menu items
        return Inertia::render('Orders/Index', [
            'orders' => Order::with('menuItem')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $menuItems = MenuItem::all(); // Fetch all menu items for the order form
        return Inertia::render('Orders/Create', [
            'menuItems' => MenuItem::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'menu_items' => 'required|array', // Ensure menu items are provided as an array
            'menu_items.*.menu_item_id' => 'exists:menu_items,id', // Validate each menu item ID
            'menu_items.*.quantity' => 'required|integer|min:1', // Validate quantity
        ]);

        DB::transaction(function () use ($validated) {
            // แทรกข้อมูลที่ตาราง orders (สมมติว่าไม่มีการเก็บชื่อผู้ใช้ในตอนนี้)
            foreach ($validated['menu_items'] as $item) {
                $menuItem = MenuItem::findOrFail($item['menu_item_id']); // ค้นหาเมนูจาก ID ที่ได้รับ
    
                DB::table('orders')->insert([
                    'table_id' => $validated['table_id'],
                    'menu_item_id' => $item['menu_item_id'],
                    'quantity' => $item['quantity'],
                    'total_price' => $menuItem->price * $item['quantity'], // คำนวณราคาทั้งหมด
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(order $order)
    {
        $order->load('menuItem'); // Load related menu item for the order
        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(order $order)
    {
        $menuItems = MenuItem::all(); // Fetch all menu items for editing
        $order->load('menuItem'); // Load related menu items
        return Inertia::render('Orders/Edit', [
            'order' => $order,
            'menuItems' => $menuItems,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, order $order)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1', // Ensure valid quantity
        ]);

        DB::transaction(function () use ($order, $validated) {
            $menuItem = MenuItem::findOrFail($order->menu_item_id);

            // อัปเดต quantity และคำนวณราคาใหม่
            $order->update([
                'quantity' => $validated['quantity'],
                'total_price' => $menuItem->price * $validated['quantity'], // คำนวณราคาทั้งหมดใหม่
            ]);
        });

        return redirect()->route('orders.show', $order->id)->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(order $order)
    {
        DB::transaction(function () use ($order) {
            $order->delete(); // ลบรายการออเดอร์
        });

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully.');
    }

    public function addToCart(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'table_id' => 'required|exists:tables,id',
                'quantity' => 'required|integer|min:1',
            ]);

            $menuItem = MenuItem::findOrFail($id);

            DB::transaction(function () use ($validated, $menuItem) {
                // เช็คว่าออเดอร์มีอยู่แล้วไหม
                $order = Order::where('table_id', $validated['table_id'])
                    ->where('menu_item_id', $menuItem->id)
                    ->first();

                // ถ้าไม่มีออเดอร์ เพิ่มรายการใหม่
                if (!$order) {
                    Order::create([
                        'table_id' => $validated['table_id'],
                        'menu_item_id' => $menuItem->id,
                        'quantity' => $validated['quantity'],
                        'total_price' => $menuItem->price * $validated['quantity'],
                    ]);
                } else {
                    // ถ้ามีอยู่แล้ว เพิ่ม quantity และอัปเดตราคา
                    $order->update([
                        'quantity' => $order->quantity + $validated['quantity'],
                        'total_price' => $order->quantity * $menuItem->price,
                    ]);
                }
            });

            return redirect()->route('orders.index')->with('success', 'Product added to cart!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to add product to cart.');
        }
    }
}
