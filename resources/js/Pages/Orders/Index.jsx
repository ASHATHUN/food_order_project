// // import React from "react";
// // import { usePage } from "@inertiajs/react";

// // export default function Index({ tables }) {
// //     const { cart } = usePage().props; // ดึงข้อมูลจาก session

// //     const totalPrice = cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

// //     const tableCount = tables ? tables.length : 0; // จำนวนโต๊ะที่มีในระบบ

// //     return (
// //         <div>

// //             <h1>ตะกร้าสินค้า</h1>
// //             {cart && cart.length === 0 ? (
// //                 <p>ไม่มีสินค้าในตะกร้า</p>
// //             ) : (
// //                 <div>
// //                     <h3>จำนวนสินค้าที่สั่ง: {cart ? cart.length : 0}</h3>
// //                     <ul>
// //                         {cart &&
// //                             cart.map((item) => (
// //                                 <li key={item.menu_item_id}>
// //                                     {item.name} - {item.quantity} ชิ้น - {item.price} บาท
// //                                 </li>
// //                             ))}
// //                     </ul>
// //                     <h3>ราคารวม: {totalPrice} บาท</h3>

// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// import { usePage } from "@inertiajs/react";
// import { useState } from "react";

// import { Inertia } from "@inertiajs/inertia";

// export default function Index({}) {
//     const { cart = [], tables = [] } = usePage().props; // ดึงข้อมูลจาก session
//     console.log("ตะกร้าสินค้า:", cart);
//     console.log("ข้อมูลโต๊ะ:", tables);
//     const [selectedTable, setSelectedTable] = useState(""); // เก็บค่าที่เลือก
//     const totalPrice = cart
//         ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         : 0;

//     const handleSubmitOrder = () => {
//         if (!selectedTable) {
//             alert("กรุณาเลือกโต๊ะก่อนสั่งซื้อ!");
//             return;
//         }

//         Inertia.post("/orders/store", {
//             table_id: selectedTable,
//             cart: cart,
//             total_price: totalPrice,
//         });
//     };

//     return (
//         <div>
//             <h1>ตะกร้าสินค้า</h1>

//             {cart && cart.length === 0 ? (
//                 <p>ไม่มีสินค้าในตะกร้า</p>
//             ) : (
//                 <div>
//                     <h3>จำนวนสินค้าที่สั่ง: {cart.length}</h3>
//                     <ul>
//                         {cart.map((item) => (
//                             <li key={item.menu_item_id}>
//                                 {item.name} - {item.quantity} ชิ้น -{" "}
//                                 {item.price} บาท
//                             </li>
//                         ))}
//                     </ul>
//                     <h3>ราคารวม: {totalPrice} บาท</h3>

//                     {/* Dropdown เลือกโต๊ะ */}
//                     <div className="mt-4">
//                         <label className="block text-lg font-bold">
//                             เลือกโต๊ะ:
//                         </label>
//                         <select
//                             id="table"
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

// import { usePage } from "@inertiajs/react";
// import { useState } from "react";
// import { Inertia } from "@inertiajs/inertia";

// export default function Index() {
//     const { cart = [], tables = [] } = usePage().props; // รับข้อมูลโต๊ะจาก Inertia
//     const [selectedTable, setSelectedTable] = useState(""); // เก็บค่าที่เลือก
//     // const totalPrice = cart.reduce(
//     //     (sum, item) => sum + item.price * item.quantity,
//     //     0
//     // );

//     let totalPrice = 0;

//     for (let i = 0; i < cart.length; i++) {
//         let item = cart[i]; // ดึงข้อมูลสินค้าทีละตัว
//         let itemTotal = item.price * item.quantity; // คำนวณราคาของสินค้าแต่ละตัว
//         totalPrice += itemTotal; // รวมเข้ากับตัวแปรสะสม
//     }

//     console.log(totalPrice); // ผลลัพธ์: 330

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

//             {cart.length === 0 ? (
//                 <p>ไม่มีสินค้าในตะกร้า</p>
//             ) : (
//                 <div>
//                     <h3>จำนวนสินค้าที่สั่ง: {cart.length}</h3>
//                     <ul>
//                         {cart.map((item) => (
//                             <li key={item.menu_item_id}>
//                                 {item.name} - {item.quantity} ชิ้น -{" "}
//                                 {item.price} บาท
//                             </li>
//                         ))}
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

// import { usePage } from "@inertiajs/react";
// import { useState } from "react";
// import { Inertia } from "@inertiajs/inertia";

// export default function Index() {
//     const { cart = [], tables = [] } = usePage().props; // รับข้อมูลโต๊ะจาก Inertia
//     const [selectedTable, setSelectedTable] = useState(""); // เก็บค่าที่เลือก
//     const totalPrice = Array.isArray(cart)
//         ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         : 0;

//         const cartItems = Array.isArray(cart) ? cart : [];

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
//                     // รีเฟรชเฉพาะข้อมูลตะกร้า
//                     Inertia.reload({ only: ['cart'] });
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

//             {cart.length === 0 ? (
//                 <p>ไม่มีสินค้าในตะกร้า</p>
//             ) : (
//                 <div>
//                     <h3>จำนวนสินค้าที่สั่ง: {cart.length}</h3>
//                     <ul>
//                     {cartItems.map((item) => (
//                             <li key={item.menu_item_id}>
//                                 {item.name} - {item.quantity} ชิ้น -{" "}
//                                 {item.price} บาท
//                             </li>
//                         ))}
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

// ver 3
// import { usePage } from "@inertiajs/react";
// import { useState } from "react";
// import { Inertia } from "@inertiajs/inertia";

// export default function Index() {
//     const { cart = [], tables = [] } = usePage().props; // รับข้อมูลโต๊ะจาก Inertia
//     const [selectedTable, setSelectedTable] = useState(""); // เก็บค่าที่เลือก
//     const totalPrice = cart.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     );

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

//             {cart.length === 0 ? (
//                 <p>ไม่มีสินค้าในตะกร้า</p>
//             ) : (
//                 <div>
//                     <h3>จำนวนสินค้าที่สั่ง: {cart.length}</h3>
//                     <ul>
//                         {cart.map((item) => (
//                             <li key={item.menu_item_id}>
//                                 {item.name} - {item.quantity} ชิ้น -{" "}
//                                 {item.price} บาท
//                             </li>
//                         ))}
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

// ver 4
// import { usePage } from "@inertiajs/react";
// import { useState, useEffect } from "react";
// import { Inertia } from "@inertiajs/inertia";

// export default function Index() {
//     const { cart = [], tables = [] } = usePage().props; // รับข้อมูลโต๊ะจาก Inertia
//     const [selectedTable, setSelectedTable] = useState(""); // เก็บค่าที่เลือก
//     const [totalPrice, setTotalPrice] = useState(0); // เก็บราคาสุทธิ
//     const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0); // เช็คว่าตะกร้าว่างหรือไม่

//     // คำนวณราคาเมื่อ cart เปลี่ยน
//     useEffect(() => {
//         const price = cart.reduce(
//             (sum, item) => sum + item.price * item.quantity,
//             0
//         );
//         setTotalPrice(price);
//         setIsCartEmpty(cart.length === 0);
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
//                         {cart.map((item) => (
//                             <li key={item.menu_item_id}>
//                                 {item.name} - {item.quantity} ชิ้น -{" "}
//                                 {item.price} บาท
//                             </li>
//                         ))}
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
                },
                onError: (errors) => {
                    console.error("Error:", errors);
                    alert("เกิดข้อผิดพลาด!");
                },
            }
        );
    };

    return (
        <div>
            <h1>ตะกร้าสินค้า</h1>

            {isCartEmpty ? (
                <p>ไม่มีสินค้าในตะกร้า</p>
            ) : (
                <div>
                    <h3>จำนวนสินค้าที่สั่ง: {cartArray.length}</h3>
                    <ul>
                        {cartArray.map((item) => (
                            <li key={item.menu_item_id ?? item.id}>
                                {item.name} - {item.quantity} ชิ้น - {item.price} บาท
                            </li>
                        ))}
                    </ul>
                    <h3>ราคารวม: {totalPrice} บาท</h3>

                    {/* Dropdown เลือกโต๊ะ */}
                    <div className="mt-4">
                        <label className="block text-lg font-bold">
                            เลือกโต๊ะ:
                        </label>
                        <select
                            value={selectedTable}
                            onChange={(e) => setSelectedTable(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">-- กรุณาเลือกโต๊ะ --</option>
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
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        ยืนยันคำสั่งซื้อ
                    </button>
                </div>
            )}
        </div>
    );
}

