import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ orders }) {
    const [sortOrder, setSortOrder] = useState("desc"); // ค่าเริ่มต้นเรียงจากใหม่ไปเก่า

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    };

    // เรียงลำดับ orders ตาม order_id
    const sortedOrders = [...orders].sort((a, b) => 
        sortOrder === "desc" ? b.order_id - a.order_id : a.order_id - b.order_id
    );
    return (
        <AuthenticatedLayout>
            <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
            <Head title="Dashboard" />
            <div className="p-7">
                <h1 className="text-4xl font-bold mb-4 flex justify-center">Order List</h1>
                {/* ปุ่มสำหรับสลับการเรียง */}
                <div className="flex justify-end mb-4">
                        <button 
                            onClick={toggleSortOrder} 
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-700 transition"
                        >
                            Sort: {sortOrder === "desc" ? "Newest → Oldest" : "Oldest → Newest"}
                        </button>
                    </div>

                    {sortedOrders && sortedOrders.length > 0 ? (
                        <div>
                            {sortedOrders.map((order) => (
                                <div key={order.order_id} className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
                                    <h2 className="text-xl font-semibold mb-2">Order ID: {order.order_id}</h2>
                                    <table className="table-auto w-full border-collapse border border-gray-900">
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-400 px-4 py-2 bg-blue-200">Menu Name</th>
                                                <th className="border border-gray-400 px-4 py-2 bg-blue-200">Quantity</th>
                                                <th className="border border-gray-400 px-4 py-2 bg-blue-200">Unit Price</th>
                                                <th className="border border-gray-400 px-4 py-2 bg-blue-200">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                                                    <td className="border border-gray-400 px-4 py-2">{item.quantity}</td>
                                                    <td className="border border-gray-400 px-4 py-2">{item.unit_price}</td>
                                                    <td className="border border-gray-400 px-4 py-2">{item.total_price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <h3 className="text-xl font-bold mt-4 text-green-700 justify-end flex">
                                        Total Bill: {order.total_bill} บาท
                                    </h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No orders available.</p>
                    )}
            </div>
            </div>
        </AuthenticatedLayout>
    );
}

