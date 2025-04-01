import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";

export default function Index({ orders, auth, menuItems }) {
    const totalPrice = orders.reduce(
        (sum, order) => sum + order.quantity * order.menu_item?.price,
        0
    );

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
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>

            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Order Receipt</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center border-b py-4"
                        >
                            <img
                                src={order.menu_item?.image_url}
                                alt={order.menu_item?.name}
                                className="w-16 h-16 rounded mr-4"
                            />
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold">
                                    {order.menu_item?.name || "-"}
                                </h2>
                                <p className="text-gray-600">
                                    ${order.menu_item?.price.toFixed(2)} each
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        Inertia.post(
                                            `/orders/${order.id}/decrease`
                                        )
                                    }
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mx-1"
                                >
                                    -
                                </button>
                                <span className="px-4">{order.quantity}</span>
                                <button
                                    onClick={() =>
                                        Inertia.post(
                                            `/orders/${order.id}/increase`
                                        )
                                    }
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mx-1"
                                >
                                    +
                                </button>
                            </div>
                            <p className="ml-6 text-lg font-bold">
                                $
                                {(
                                    order.quantity * order.menu_item?.price
                                ).toFixed(2)}
                            </p>
                            <button
                                onClick={() =>
                                    Inertia.delete(`/orders/${order.id}`)
                                }
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-6"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <div className="mt-6 text-right text-xl font-bold">
                        Total: ${totalPrice.toFixed(2)}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={() => Inertia.visit("/products")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back to Products
                        </button>
                        <button
                            onClick={() => Inertia.post("/orders/checkout")}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}   
