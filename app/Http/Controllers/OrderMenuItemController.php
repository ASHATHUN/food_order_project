<?php

namespace App\Http\Controllers;

use App\Models\OrderMenuItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderMenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderMenuItem $order_menu_item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderMenuItem $order_menu_item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderMenuItem $order_menu_item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderMenuItem $order_menu_item)
    {
        //
    }

    // public function dashboard()
    // {
    //     $orderMenuItems = DB::table('order_menu_items')
    //     ->join('orders', 'order_menu_items.order_id', '=', 'orders.id')
    //     ->join('menu_items', 'order_menu_items.menu_item_id', '=', 'menu_items.id')
    //     ->select(
    //         'order_menu_items.id as order_menu_item_id',
    //         'orders.id as order_id',
    //         'menu_items.id as menu_item_id',
    //         'menu_items.name as menu_item_name',    
    //         'menu_items.price as menu_item_price',
    //         'order_menu_items.quantity as quantity',
    //         'order_menu_items.unit_price as unit_price',
    //         'order_menu_items.total_price as total_price',
    //         'orders.table_id as table_id',
    //         'orders.created_at as order_created_at',
    //         'orders.updated_at as order_updated_at'
    //     )->get();

    //     return Inertia::render('Dashboard', [
    //         'orderMenuItems' => $orderMenuItems
    //     ]);
    // }
    public function dashboard()
{
    $orders = OrderMenuItem::select(
        'order_id',
        'menu_item_id',
        'quantity',
        'unit_price',
        'total_price'
    )
    ->with('menuItem:id,name') // ดึงชื่อของเมนูจากตาราง menu_items
    ->get()
    ->groupBy('order_id') // แยกตาม order_id
    ->map(function ($items, $orderId) {
        return [
            'order_id' => $orderId,
            'items' => $items->map(function ($item) {
                return [
                    'name' => $item->menuItem->name ?? 'Unknown', // แสดงชื่อเมนู
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'total_price' => $item->total_price,
                ];
            }),
            'total_bill' => $items->sum('total_price'), // รวมราคารวมของบิล
        ];
    })
    ->values();

    return Inertia::render('Dashboard', [
        'orders' => $orders
    ]);
}
}
