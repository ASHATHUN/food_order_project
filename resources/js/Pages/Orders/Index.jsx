import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Index() {
    const { cart = {}, tables = [] } = usePage().props; // รับข้อมูลโต๊ะจาก Inertia
    const cartArray = Array.isArray(cart) ? cart : Object.values(cart); // แปลงเป็น array ถ้า cart เป็น object

    const [selectedTable, setSelectedTable] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCartEmpty, setIsCartEmpty] = useState(cartArray.length === 0);

    console.log(route("welcome"));

    // คำนวณราคารวม
    useEffect(() => {
        const price = cartArray.reduce(
            (sum, item) => sum + parseFloat(item.price) * item.quantity,
            0
        );
        setTotalPrice(price);
        setIsCartEmpty(cartArray.length === 0);
    }, [cartArray]);

    const handleSubmitOrder = () => {
        if (!selectedTable) {
            alert("Please select a table before placing your order!");
            Inertia.visit(route("welcome"));
            return;
        }

        const formattedCart = cartArray.map((item) => ({
            menu_item_id: item.menu_item_id ?? item.id,
            name: item.name,
            unit_price: parseFloat(item.price),
            quantity: item.quantity,
        }));

        Inertia.post(
            "/orders/store",
            {
                table_id: selectedTable,
                cart: formattedCart,
                total_price: totalPrice,
            },
            {
                onSuccess: () => {
                    alert("Order placed successfully!");
                    Inertia.visit(route("welcome"));
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                    alert("An error occurred!");
                },
            }
        );
    };

    const handleRemoveItem = (menuItemId) => {
        Inertia.post(
            "/cart/remove",
            { menu_item_id: menuItemId },
            {
                onSuccess: () => {
                    alert("Item removed from cart!");
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                    alert("An error occurred while removing the item!");
                },
            }
        );
    };

    return (
        <div className="container mx-auto p-6 bg-orange-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Your Order</h1>

            {isCartEmpty ? (
                <p className="text-center text-gray-500 text-lg">
                    No items in your cart
                </p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto ">
                    <h3 className="text-xl font-semibold mb-4">
                        Total Items : {cartArray.length}
                    </h3>
                    <ul className="space-y-4">
                        {cartArray.map((item) => (
                            <li
                                key={item.menu_item_id ?? item.id}
                                className="flex items-center border-b pb-2"
                            >
                                <div className="flex items-center flex-grow mr-4">
                                    <span className="font-medium text-gray-600 truncate">
                                        {item.name}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-4">
                                        {item.quantity} pcs - {item.price} ฿
                                    </span>

                                    <button
                                        onClick={() =>
                                            handleRemoveItem(
                                                item.menu_item_id ?? item.id
                                            )
                                        }
                                        className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-xl font-semibold mt-6">
                        Total Price:{" "}
                        <span className="text-green-600">{totalPrice} ฿</span>
                    </h3>

                    {/* Dropdown เลือกโต๊ะ */}
                    <div className="mt-6">
                        <label className="block text-lg font-bold mb-2">
                            Select a Table:
                        </label>
                        <select
                            value={selectedTable}
                            onChange={(e) => setSelectedTable(e.target.value)}
                            className="border p-2 rounded w-full text-gray-600"
                        >
                            <option value="">
                                -- Please select a table --
                            </option>
                            {tables.map((table) => (
                                <option key={table.id} value={table.id}>
                                    {table.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ปุ่มยืนยันคำสั่งซื้อ */}
                    <button
                        onClick={handleSubmitOrder}
                        className="mt-6 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Confirm Order
                    </button>

                    <button
                        onClick={() => Inertia.visit(route("welcome"))}
                        className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Back to Menu
                    </button>
                </div>
            )}
        </div>
    );
}
