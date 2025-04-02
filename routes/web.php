<?php

use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use App\Models\MenuItem;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderMenuItemController;
use App\Models\OrderMenuItem;
use App\Http\Controllers\CategoryController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//         'menuItems' => MenuItem::all(),
//         'categories' => Category::all(), // ดึงข้อมูลหมวดหมู่ทั้งหมด
//     ]);    
// })->name('welcome');

Route::get('/', function (\Illuminate\Http\Request $request) {
    $categoryId = $request->query('category_id'); // รับค่า category_id จาก URL

    // สร้าง query เมนู โดยกรองตาม category_id ถ้ามีค่า
    $query = MenuItem::query();
    if ($categoryId) {
        $query->where('category_id', $categoryId);
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'menuItems' => $query->get(), // ดึงเฉพาะเมนูของหมวดหมู่ที่เลือก
        'categories' => Category::all(), // ดึงข้อมูลหมวดหมู่ทั้งหมด
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/menu/create', [MenuItemController::class, 'create'])->name('menu.create');

Route::post('/menu/store', [MenuItemController::class, 'store'])->name('menu.store');


Route::post('/orders/add-to-cart', [OrderController::class, 'addToCart'])->name('orders.addToCart');

Route::get('/orders/cart', [OrderController::class, 'index'])->name('orders.index');
Route::get('/api/cart-count', function () {
    $cart = session('cart', []);
    return response()->json(['count' => count($cart)]);
});

Route::post('/orders/store', [OrderController::class, 'store'])->name('orders.store');

Route::get('/dashboard', [OrderMenuItemController::class, 'dashboard'])->name('dashboard');

Route::get('/api/categories', [CategoryController::class, 'index']);



require __DIR__ . '/auth.php';
