
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";

// export default function Dashboard({ orderMenuItems }) {
//     return (
//         <AuthenticatedLayout>
//             <Head title="Dashboard" />
//             <div className="p-4">
//                 <h1 className="text-2xl font-bold mb-4">Order Menu Items</h1>
//                 {orderMenuItems && orderMenuItems.length > 0 ? (
//                     <table className="table-auto w-full border-collapse border border-gray-300">
//                         <thead>
//                             <tr>
                                
//                                 <th className="border border-gray-300 px-4 py-2">Order ID</th>
//                                 <th className="border border-gray-300 px-4 py-2">Menu Item ID</th>
//                                 <th className="border border-gray-300 px-4 py-2">Quantity</th>
//                                 <th className="border border-gray-300 px-4 py-2">Unit Price</th>
//                                 <th className="border border-gray-300 px-4 py-2">Total Price</th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orderMenuItems.map((item) => (
//                                 <tr key={item.id}>
                                    
//                                     <td className="border border-gray-300 px-4 py-2">{item.order_id}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{item.menu_item_id}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{item.unit_price}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{item.total_price}</td>
                                    
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No data available.</p>
//                 )}
//             </div>
//         </AuthenticatedLayout>
//     );
// }

//  ver2
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ orders }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Order List</h1>
                {orders && orders.length > 0 ? (
                    <div>
                        {orders.map((order) => (
                            <div key={order.order_id} className="mb-6 p-4 border rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-2">Order ID: {order.order_id}</h2>
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2">Menu Name</th>
                                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                            <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                                            <th className="border border-gray-300 px-4 py-2">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.unit_price}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.total_price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h3 className="text-lg font-bold mt-4">Total Bill: {order.total_bill} บาท</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

