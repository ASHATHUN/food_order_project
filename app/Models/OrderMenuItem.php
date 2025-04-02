<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderMenuItem extends Model
{
    use HasFactory;

    protected $table = 'order_menu_items'; // ระบุชื่อตาราง

    protected $fillable = [
        'order_id',
        'menu_item_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    // ความสัมพันธ์กับ Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // ความสัมพันธ์กับ MenuItem
    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
