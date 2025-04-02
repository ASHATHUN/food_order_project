<?php

namespace App\Http\Controllers;

use App\Models\OrderMenuItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderMenuItemController extends Controller
{
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
            ->orderBy('order_id', 'desc')
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
