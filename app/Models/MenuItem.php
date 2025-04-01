<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class MenuItem extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'price',
        'category',
        'description',
        'image_path',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
