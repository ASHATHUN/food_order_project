import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

export default function Welcome({
    auth,
    menuItems = [],
    restaurant_tables = [],
}) {
    console.log("Tables:", restaurant_tables);

    const [selectedTable, setSelectedTable] = useState(""); // State สำหรับโต๊ะที่เลือก
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        if (!selectedTable) {
            alert("กรุณาเลือกโต๊ะก่อน");
            return;
        }

        Inertia.post(
            `/orders/add/${item.id}`,
            {
                table_id: selectedTable, // ส่งค่า table_id
                quantity: 1,
            },
            {
                onSuccess: () => alert(`${item.name} added to cart!`),
                onError: (errors) => alert(`Failed to add: ${errors.message}`),
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

            <div className="min-h-screen bg-orange-100 dark:bg-gray-900 p-6">
                <div className="flex justify-center mb-6 h-52">
                    <img
                        src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/488183988_595725206834352_6292035432484476891_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zJB5_y154C0Q7kNvgFEAMZM&_nc_oc=Adm15gElZdzXNXHlaUAcIuorigDg7fUCjAwsk2a7qtDGvr0v3LwIDrf9-AUzmlcfuyQ&_nc_zt=23&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=-NLFmYnkQhdvDYr-i2BA2g&oh=00_AYE7VjgaZmHJg8_SHGrdVw0_xaXFlAc3xN4nJ-0TuB6Apw&oe=67F18EF9"
                        alt=""
                    />
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    เมนูอาหาร
                </h1>

                <div className="flex justify-end mb-6">
                    <Link
                        href={route("orders.index")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                        <span>เช็คสินค้าที่สั่ง</span>
                    </Link>
                </div>

                {/* Table Selection */}
                <div className="mb-6">
                    <label
                        htmlFor="table"
                        className="block text-gray-700 dark:text-gray-100"
                    >
                        เลือกโต๊ะ
                    </label>
                    <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="mt-2 p-2 border rounded"
                    >
                        <option value="" disabled>
                            เลือกโต๊ะ
                        </option>
                        {restaurant_tables && restaurant_tables.length > 0 ? (
                            restaurant_tables.map((table) => (
                                <option key={table.id} value={table.id}>
                                    {`โต๊ะ ${table.name}`}
                                </option>
                            ))
                        ) : (
                            <option disabled>ไม่มีโต๊ะให้เลือก</option>
                        )}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems && menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                            >
                                {item.image ? (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${item.image}`}
                                        alt="Profile"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}

                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {item.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    {item.description ||
                                        "No description available"}
                                </p>
                                <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">
                                    Price: ${item.price}
                                </p>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
                            ไม่มีเมนูอาหาร
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
