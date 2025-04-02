<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['table_id'];

    public function orderMenuItems()
    {
        return $this->hasMany(OrderMenuItem::class);
    }
}
