// ver 5
// import { usePage } from "@inertiajs/react";
// import { useState, useEffect } from "react";
// import { Inertia } from "@inertiajs/inertia";

// export default function Index() {
//     const { cart = [], tables = [] } = usePage().props; // รับข้อมูลโต๊ะจาก Inertia และใช้ default เป็น array
//     const [selectedTable, setSelectedTable] = useState(""); // เก็บค่าที่เลือก
//     const [totalPrice, setTotalPrice] = useState(0); // เก็บราคาสุทธิ
//     const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0); // เช็คว่าตะกร้าว่างหรือไม่

//     // ตรวจสอบว่า cart เป็น array หรือไม่
//     useEffect(() => {
//         console.log("Is cart an array?", Array.isArray(cart)); // ตรวจสอบว่า cart เป็น array หรือไม่
//     }, [cart]);

//     // คำนวณราคาเมื่อ cart เปลี่ยน
//     useEffect(() => {
//         // ตรวจสอบว่า cart เป็น array จริงๆ
//         if (Array.isArray(cart)) {
//             const price = cart.reduce(
//                 (sum, item) => sum + item.price * item.quantity,
//                 0
//             );
//             setTotalPrice(price);
//             setIsCartEmpty(cart.length === 0);
//         } else {
//             console.error("Cart is not an array:", cart);
//         }
//     }, [cart]);

//     const handleSubmitOrder = () => {
//         if (!selectedTable) {
//             alert("กรุณาเลือกโต๊ะก่อนสั่งซื้อ!");
//             return;
//         }

//         // ✅ เปลี่ยน price เป็น unit_price ก่อนส่งไป Backend
//         const formattedCart = cart.map((item) => ({
//             menu_item_id: item.menu_item_id ?? item.id,
//             name: item.name,
//             unit_price: item.price, // ✅ ใช้ unit_price แทน price
//             quantity: item.quantity,
//         }));

//         console.log("Formatted Cart:", formattedCart);

//         Inertia.post(
//             "/orders/store",
//             {
//                 table_id: selectedTable,
//                 cart: formattedCart,
//                 total_price: totalPrice,
//             },
//             {
//                 onSuccess: () => {
//                     alert("สั่งซื้อสำเร็จ!");
//                 },
//                 onError: (errors) => {
//                     console.error("Error:", errors);
//                     alert("เกิดข้อผิดพลาด!");
//                 },
//             }
//         );
//     };

//     return (
//         <div>
//             <h1>ตะกร้าสินค้า</h1>

//             {isCartEmpty ? (
//                 <p>ไม่มีสินค้าในตะกร้า</p>
//             ) : (
//                 <div>
//                     <h3>จำนวนสินค้าที่สั่ง: {cart.length}</h3>
//                     <ul>
//                         {Array.isArray(cart) &&
//                             cart.map((item) => (
//                                 <li key={item.menu_item_id}>
//                                     {item.name} - {item.quantity} ชิ้น -{" "}
//                                     {item.price} บาท
//                                 </li>
//                             ))}
//                     </ul>
//                     <h3>ราคารวม: {totalPrice} บาท</h3>

//                     {/* Dropdown เลือกโต๊ะ */}
//                     <div className="mt-4">
//                         <label className="block text-lg font-bold">
//                             เลือกโต๊ะ:
//                         </label>
//                         <select
//                             value={selectedTable}
//                             onChange={(e) => setSelectedTable(e.target.value)}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">-- กรุณาเลือกโต๊ะ --</option>
//                             {tables.map((table) => (
//                                 <option key={table.id} value={table.id}>
//                                     {table.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* ปุ่มยืนยันคำสั่งซื้อ */}
//                     <button
//                         onClick={handleSubmitOrder}
//                         className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         ยืนยันคำสั่งซื้อ
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// ver 6
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

    // คำนวณราคารวมเมื่อ cart เปลี่ยน
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
            alert("กรุณาเลือกโต๊ะก่อนสั่งซื้อ!");
            Inertia.visit(route("welcome"));
            return;
        }

        // แปลง cart ให้ใช้ unit_price แทน price
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
                    alert("สั่งซื้อสำเร็จ!");
                    Inertia.visit(route("welcome"));
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                    alert("เกิดข้อผิดพลาด!");
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
                    alert("ลบสินค้าสำเร็จ!");
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                    alert("เกิดข้อผิดพลาดในการลบสินค้า!");
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
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <span className="font-medium text-gray-600">{item.name}</span>
                                <span className="text-gray-600">
                                    {item.quantity} pcs - {item.price} ฿
                                </span>
                                <button
                                    onClick={() =>
                                        handleRemoveItem(
                                            item.menu_item_id ?? item.id
                                        )
                                    }
                                    className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                                >
                                    Remove
                                </button>
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
