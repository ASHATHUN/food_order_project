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
