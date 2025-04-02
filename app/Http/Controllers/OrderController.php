<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use App\Models\OrderMenuItem;
use Illuminate\Support\Facades\Log;

use function Laravel\Prompts\alert;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurantTables = DB::table('restaurant_tables')->get(); // ดึงข้อมูลโต๊ะจากฐานข้อมูล
        $cart = session('cart', []); // ดึงข้อมูลตะกร้าจาก Session


        return Inertia::render('Orders/Index', [
            'cart' => $cart,  // ส่ง cart ไปที่ React
            'tables' => $restaurantTables, // ส่งข้อมูลโต๊ะไปที่ React
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            // ตรวจสอบค่าที่ได้รับ
            Log::info('Order Data:', $request->all());

            $data = $request->validate([
                'table_id' => 'required|integer|exists:restaurant_tables,id',
                'cart' => 'required|array',
                'cart.*.menu_item_id' => 'required|exists:menu_items,id',
                'cart.*.quantity' => 'required|integer|min:1',
                'cart.*.unit_price' => 'required|numeric|min:0',
                'total_price' => 'required|numeric|min:0',
            ]);

            // บันทึกข้อมูลออเดอร์
            $order = Order::create([
                'table_id' => $data['table_id'],
                'total_price' => $data['total_price'],
                'status' => 'pending',
            ]);


            foreach ($data['cart'] as $item) {
                OrderMenuItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item['menu_item_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'], // Use `unit_price`
                    'total_price' => $item['quantity'] * $item['unit_price'], // Calculate total price
                ]);
            }

            session()->flush('cart');

            return Inertia::render('OrderConfirmation', [
                'message' => 'Order created successfully!',
                'order' => $order, // ส่งข้อมูลคำสั่งซื้อ
            ]);
        } catch (\Exception $e) {
            Log::error('Order Error: ' . $e->getMessage());

            return Inertia::render('OrderError', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order) {}

    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
        ]);

        // เรียกข้อมูลตะกร้าที่เก็บไว้ใน session
        $cart = Session::get('cart', []);

        $menuItemId = $request->menu_item_id;

        if (isset($cart[$menuItemId])) {
            // ถ้ามีอยู่แล้วให้เพิ่มจำนวนสินค้า
            $cart[$menuItemId]['quantity'] += 1;
        } else {
            // ถ้ายังไม่มี ให้เพิ่มสินค้าใหม่เข้าไป
            $cart[$menuItemId] = [
                'id' => $menuItemId,
                'name' => $request->name,
                'price' => $request->price,
                'quantity' => 1,
            ];
        }

        // บันทึกข้อมูลลง Session
        session(['cart' => $cart]);

        return Inertia::render('Welcome', [
            'message' => 'Item added to cart',
            'cart' => $cart,
            'count' => count($cart),
        ]);
    }

    public function removeFromCart(Request $request)
    {
        $validated = $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
        ]);

        // ดึงข้อมูลตะกร้าจาก session
        $cart = session('cart', []);

        $menuItemId = $request->menu_item_id;

        if (isset($cart[$menuItemId])) {
            unset($cart[$menuItemId]); // ลบสินค้าออกจากตะกร้า
            session(['cart' => $cart]); // อัปเดต session
        }

        return Inertia::render('CartPage', [
            'cart' => $cart,
            'count' => count($cart),
        ]);
    }
}
