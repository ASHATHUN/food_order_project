import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useEffect } from "react";

export default function Welcome({ auth, menuItems = [] }) {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetch("/api/cart-count")
            .then((response) => response.json())
            .then((data) => setCartCount(data.count));
    }, []);

    

    const handleAddToCart = (item) => {
        Inertia.post(
            "/orders/add-to-cart",
            {
                menu_item_id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
            },
            {
                onSuccess: (page) => {
                    // อัปเดตจำนวนสินค้าในตะกร้า หลังจากเพิ่มสินค้าเสร็จ
                    fetch("/api/cart-count")
                        .then((response) => response.json())
                        .then((data) => setCartCount(data.count));
                },
            }
        );
    };

    return (
        <>
            <nav className="flex items-center justify-end px-6 py-4 bg-red-500 dark:bg-gray-900">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="px-3 py-2 text-black"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="px-3 py-2 text-black"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>

            <div className="min-h-screen bg-orange-100 p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    เมนูอาหาร
                </h1>

                {/* ปุ่มไปตะกร้า */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => Inertia.visit(route("orders.index"))}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    >
                        <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
                    </button>
                </div>

                {/* แสดงเมนูอาหาร */}
                <div>
                    <h1>เมนูอาหาร</h1>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {item.name} - {item.price} บาท
                                <button onClick={() => handleAddToCart(item)}>
                                    เพิ่มลงตะกร้า
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
