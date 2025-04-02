// // import { Head, Link } from "@inertiajs/react";
// // import { Inertia } from "@inertiajs/inertia";
// // import React, { useState, useEffect } from "react";

// // export default function Welcome({ auth, menuItems = [] }) {
// //     const [cartCount, setCartCount] = useState(0);
// //     const [selectedCategory, setSelectedCategory] = useState("All");

// //     useEffect(() => {
// //         fetch("/api/cart-count")
// //             .then((response) => response.json())
// //             .then((data) => setCartCount(data.count));
// //     }, []);

// //     const handleAddToCart = (item) => {
// //         Inertia.post(
// //             "/orders/add-to-cart",
// //             {
// //                 menu_item_id: item.id,
// //                 name: item.name,
// //                 price: item.price,
// //                 quantity: 1,
// //             },
// //             {
// //                 onSuccess: () => {
// //                     fetch("/api/cart-count")
// //                         .then((response) => response.json())
// //                         .then((data) => setCartCount(data.count));
// //                 },
// //             }
// //         );
// //     };

// //     const handleCategoryClick = (category) => {
// //         setSelectedCategory(category);
// //     };

// //     const filteredMenuItems =
// //         selectedCategory === "All"
// //             ? menuItems
// //             : menuItems.filter((item) => item.category === selectedCategory);

// //     return (
// //         <>
// //             <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
// //                 {auth.user ? (
// //                     <Link
// //                         href={route("dashboard")}
// //                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
// //                     >
// //                         Dashboard
// //                     </Link>
// //                 ) : (
// //                     <>
// //                         <Link href={route("login")} className="px-3 py-2 text-black">
// //                             Log in
// //                         </Link>
// //                         <Link href={route("register")} className="px-3 py-2 text-black">
// //                             Register
// //                         </Link>
// //                     </>
// //                 )}
// //             </nav>

// //             <div className="min-h-screen bg-orange-100 p-6">
// //                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">MENU</h1>

// //                 <div className="flex justify-end mb-6">
// //                     <button
// //                         onClick={() => Inertia.visit(route("orders.index"))}
// //                         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
// //                     >
// //                         <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
// //                     </button>
// //                 </div>

// //                 <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
// //                     <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Categories</h2>
// //                     <div className="flex gap-2">
// //                         {["All", "Hot Menu", "Ice Menu", "Smoothie", "Bread", "Toast", "Frozen Bread"].map((category) => (
// //                             <button
// //                                 key={category}
// //                                 className={`${
// //                                     selectedCategory === category ? "bg-yellow-600" : "bg-yellow-500"
// //                                 } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
// //                                 onClick={() => handleCategoryClick(category)}
// //                             >
// //                                 {category}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //                     {filteredMenuItems.length > 0 ? (
// //                         filteredMenuItems.map((item) => (
// //                             <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
// //                                 {item.image ? (
// //                                     <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.name} />
// //                                 ) : (
// //                                     <span>No Image</span>
// //                                 )}

// //                                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.name}</h2>
// //                                 <p className="text-gray-600 dark:text-gray-400 mt-2">
// //                                     {item.description || "No description available"}
// //                                 </p>
// //                                 <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">Price: ${item.price}</p>
// //                                 <button
// //                                     onClick={() => handleAddToCart(item)}
// //                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //                                 >
// //                                     Add to Cart
// //                                 </button>
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">ไม่มีเมนูอาหาร</p>
// //                     )}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }

// // import { Head, Link } from "@inertiajs/react";
// // import { Inertia } from "@inertiajs/inertia";
// // import React, { useState, useEffect } from "react";

// // export default function Welcome({ auth, menuItems = [] }) {
// //     const [cartCount, setCartCount] = useState(0);
// //     const [selectedCategory, setSelectedCategory] = useState("All");
// //     const [categories, setCategories] = useState(["All"]); // เริ่มต้นด้วย "All"

// //     useEffect(() => {
// //         fetch("/api/cart-count")
// //             .then((response) => response.json())
// //             .then((data) => setCartCount(data.count));

// //         // ดึง category จาก menuItems มาใส่ใน state categories
// //         const uniqueCategories = [
// //             "All",
// //             ...new Set(menuItems.map((item) => item.category)),
// //         ];
// //         setCategories(uniqueCategories);
// //     }, [menuItems]); // เพิ่ม menuItems เป็น dependency เพื่อให้ useEffect ทำงานเมื่อ menuItems เปลี่ยนแปลง

// //     const handleAddToCart = (item) => {
// //         Inertia.post(
// //             "/orders/add-to-cart",
// //             {
// //                 menu_item_id: item.id,
// //                 name: item.name,
// //                 price: item.price,
// //                 quantity: 1,
// //             },
// //             {
// //                 onSuccess: () => {
// //                     fetch("/api/cart-count")
// //                         .then((response) => response.json())
// //                         .then((data) => setCartCount(data.count));
// //                 },
// //             }
// //         );
// //     };

// //     const handleCategoryClick = (category) => {
// //         setSelectedCategory(category);
// //     };

// //     const filteredMenuItems =
// //         selectedCategory === "All"
// //             ? menuItems
// //             : menuItems.filter((item) => item.category === selectedCategory);

// //     return (
// //         <>
// //             <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
// //                 {auth.user ? (
// //                     <Link
// //                         href={route("dashboard")}
// //                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
// //                     >
// //                         Dashboard
// //                     </Link>
// //                 ) : (
// //                     <>
// //                         <Link href={route("login")} className="px-3 py-2 text-black">
// //                             Log in
// //                         </Link>
// //                         <Link href={route("register")} className="px-3 py-2 text-black">
// //                             Register
// //                         </Link>
// //                     </>
// //                 )}
// //             </nav>

// //             <div className="min-h-screen bg-orange-100 p-6">
// //                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">MENU</h1>

// //                 <div className="flex justify-end mb-6">
// //                     <button
// //                         onClick={() => Inertia.visit(route("orders.index"))}
// //                         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
// //                     >
// //                         <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
// //                     </button>
// //                 </div>

// //                 <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
// //                     <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Categories</h2>
// //                     <div className="flex gap-2">
// //                         {categories.map((category) => (
// //                             <button
// //                                 key={category}
// //                                 className={`${
// //                                     selectedCategory === category ? "bg-yellow-600" : "bg-yellow-500"
// //                                 } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
// //                                 onClick={() => handleCategoryClick(category)}
// //                             >
// //                                 {category}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //                     {filteredMenuItems.length > 0 ? (
// //                         filteredMenuItems.map((item) => (
// //                             <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
// //                                 {item.image ? (
// //                                     <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.name} />
// //                                 ) : (
// //                                     <span>No Image</span>
// //                                 )}

// //                                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.name}</h2>
// //                                 <p className="text-gray-600 dark:text-gray-400 mt-2">
// //                                     {item.description || "No description available"}
// //                                 </p>
// //                                 <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">Price: ${item.price}</p>
// //                                 <button
// //                                     onClick={() => handleAddToCart(item)}
// //                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //                                 >
// //                                     Add to Cart
// //                                 </button>
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">ไม่มีเมนูอาหาร</p>
// //                     )}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }

// // import { Head, Link } from "@inertiajs/react";
// // import { Inertia } from "@inertiajs/inertia";
// // import React, { useState, useEffect } from "react";

// // export default function Welcome({ auth, menuItems = [] }) {
// //     const [cartCount, setCartCount] = useState(0);
// //     const [selectedCategory, setSelectedCategory] = useState("All");
// //     const [categories, setCategories] = useState(["All"]);

// //     useEffect(() => {
// //         fetch("/api/cart-count")
// //             .then((response) => response.json())
// //             .then((data) => setCartCount(data.count));

// //         // ดึง category จาก menuItems มาใส่ใน state categories
// //         const uniqueCategories = ["All", ...new Set(menuItems.map((item) => item.category?.name))];
// //         setCategories(uniqueCategories);
// //     }, [menuItems]);

// //     const handleAddToCart = (item) => {
// //         Inertia.post(
// //             "/orders/add-to-cart",
// //             {
// //                 menu_item_id: item.id,
// //                 name: item.name,
// //                 price: item.price,
// //                 quantity: 1,
// //             },
// //             {
// //                 onSuccess: () => {
// //                     fetch("/api/cart-count")
// //                         .then((response) => response.json())
// //                         .then((data) => setCartCount(data.count));
// //                 },
// //             }
// //         );
// //     };

// //     const handleCategoryClick = (category) => {
// //         setSelectedCategory(category);
// //     };

// //     const filteredMenuItems =
// //         selectedCategory === "All"
// //             ? menuItems
// //             : menuItems.filter((item) => item.category?.name === selectedCategory);

// //     return (
// //         <>
// //             <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
// //                 {auth.user ? (
// //                     <Link
// //                         href={route("dashboard")}
// //                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
// //                     >
// //                         Dashboard
// //                     </Link>
// //                 ) : (
// //                     <>
// //                         <Link href={route("login")} className="px-3 py-2 text-black">
// //                             Log in
// //                         </Link>
// //                         <Link href={route("register")} className="px-3 py-2 text-black">
// //                             Register
// //                         </Link>
// //                     </>
// //                 )}
// //             </nav>

// //             <div className="min-h-screen bg-orange-100 p-6">
// //                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">MENU</h1>

// //                 <div className="flex justify-end mb-6">
// //                     <button
// //                         onClick={() => Inertia.visit(route("orders.index"))}
// //                         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
// //                     >
// //                         <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
// //                     </button>
// //                 </div>

// //                 <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
// //                     <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Categories</h2>
// //                     <div className="flex gap-2">
// //                         {categories.map((category) => (
// //                             <button
// //                                 key={category}
// //                                 className={`${
// //                                     selectedCategory === category ? "bg-yellow-600" : "bg-yellow-500"
// //                                 } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
// //                                 onClick={() => handleCategoryClick(category)}
// //                             >
// //                                 {category}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //                     {filteredMenuItems.length > 0 ? (
// //                         filteredMenuItems.map((item) => (
// //                             <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
// //                                 {item.image ? (
// //                                     <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.name} />
// //                                 ) : (
// //                                     <span>No Image</span>
// //                                 )}

// //                                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.name}</h2>
// //                                 <p className="text-gray-600 dark:text-gray-400 mt-2">
// //                                     {item.description || "No description available"}
// //                                 </p>
// //                                 <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">Price: ${item.price}</p>
// //                                 <button
// //                                     onClick={() => handleAddToCart(item)}
// //                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //                                 >
// //                                     Add to Cart
// //                                 </button>
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">ไม่มีเมนูอาหาร</p>
// //                     )}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }
// //  version 1

// import { Link } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";
// import React, { useState, useEffect } from "react";

// export default function Welcome({ auth, menuItems = [] }) {
//     const [cartCount, setCartCount] = useState(0);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [categories, setCategories] = useState(["All"]);

//     useEffect(() => {
//         fetch("/api/cart-count")
//             .then((response) => response.json())
//             .then((data) => setCartCount(data.count));

//         // ดึง category จาก menuItems มาใส่ใน state categories
//         const uniqueCategories = [
//             "All",
//             ...new Set(menuItems.map((item) => item.category_name)),
//         ];
//         setCategories(uniqueCategories);
//     }, [menuItems]);

//     const handleAddToCart = (item) => {
//         Inertia.post(
//             "/orders/add-to-cart",
//             {
//                 menu_item_id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 quantity: 1,
//             },
//             {
//                 onSuccess: () => {
//                     fetch("/api/cart-count")
//                         .then((response) => response.json())
//                         .then((data) => setCartCount(data.count));
//                 },
//             }
//         );
//     };

//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);
//     };

//     const filteredMenuItems =
//         selectedCategory === "All"
//             ? menuItems
//             : menuItems.filter(
//                   (item) => item.category_name === selectedCategory
//               );

//     return (
//         <>
//             <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
//                 {auth.user ? (
//                     <Link
//                         href={route("dashboard")}
//                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
//                     >
//                         Dashboard
//                     </Link>
//                 ) : (
//                     <>
//                         <Link
//                             href={route("login")}
//                             className="px-3 py-2 text-black"
//                         >
//                             Log in
//                         </Link>
//                         <Link
//                             href={route("register")}
//                             className="px-3 py-2 text-black"
//                         >
//                             Register
//                         </Link>
//                     </>
//                 )}
//             </nav>

//             <div className="min-h-screen bg-orange-100 p-6">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                     MENU
//                 </h1>

//                 <div className="flex justify-end mb-6">
//                     <button
//                         onClick={() => Inertia.visit(route("orders.index"))}
//                         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//                     >
//                         <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//                     <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//                         Categories
//                     </h2>
//                     <div className="flex gap-2">
//                         {categories.map((category) => (
//                             <button
//                                 key={category}
//                                 className={`${
//                                     selectedCategory === category
//                                         ? "bg-yellow-600"
//                                         : "bg-yellow-500"
//                                 } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
//                                 onClick={() => handleCategoryClick(category)}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {filteredMenuItems.length > 0 ? (
//                         filteredMenuItems.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
//                             >
//                                 {item.image ? (
//                                     <img
//                                         src={`/storage/${item.image}`}
//                                         alt={item.name}
//                                         className="w-full h-40 object-cover rounded"
//                                     />
//                                 ) : (
//                                     <span>No Image</span>
//                                 )}

//                                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                                     {item.name}
//                                 </h2>
//                                 <p className="text-gray-600 dark:text-gray-400 mt-2">
//                                     {item.description ||
//                                         "No description available"}
//                                 </p>
//                                 <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">
//                                     Price: ${item.price}
//                                 </p>
//                                 <button
//                                     onClick={() => handleAddToCart(item)}
//                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
//                             ไม่มีเมนูอาหาร
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// version 2
// import { Link } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";
// import React, { useState, useEffect } from "react";

// export default function Welcome({ auth, menuItems = [] }) {
//     const [cartCount, setCartCount] = useState(0);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [categories, setCategories] = useState(["All"]);

//     useEffect(() => {
//         // ดึงจำนวนสินค้าในตะกร้า
//         fetch("/api/cart-count")
//             .then((response) => response.json())
//             .then((data) => setCartCount(data.count));

//         // ดึงหมวดหมู่จาก menuItems มาใส่ใน state categories
//         const uniqueCategories = [
//             "All",
//             ...new Set(menuItems.map((item) => item.category_name)),
//         ];
//         setCategories(uniqueCategories);
//     }, [menuItems]);

//     // ฟังก์ชันเพิ่มสินค้าในตะกร้า
//     const handleAddToCart = (item) => {
//         Inertia.post(
//             "/orders/add-to-cart",
//             {
//                 menu_item_id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 quantity: 1,
//             },
//             {
//                 onSuccess: () => {
//                     fetch("/api/cart-count")
//                         .then((response) => response.json())
//                         .then((data) => setCartCount(data.count));
//                 },
//             }
//         );
//     };

//     // ฟังก์ชันกรองเมนูตามหมวดหมู่ที่เลือก
//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);

//         // กรณีเลือกหมวดหมู่ที่ไม่ใช่ All จะส่งคำขอไปที่เซิร์ฟเวอร์เพื่อกรองเมนู
//         if (category !== "All") {
//             Inertia.get(route("menu.index"), { category: category });
//         }
//     };

//     // กรองเมนูที่จะแสดงตามหมวดหมู่ที่เลือก
//     const filteredMenuItems =
//         selectedCategory === "All"
//             ? menuItems
//             : menuItems.filter(
//                   (item) => item.category_name === selectedCategory
//               );

//     return (
//         <>
//             <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
//                 {auth.user ? (
//                     <Link
//                         href={route("dashboard")}
//                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
//                     >
//                         Dashboard
//                     </Link>
//                 ) : (
//                     <>
//                         <Link
//                             href={route("login")}
//                             className="px-3 py-2 text-black"
//                         >
//                             Log in
//                         </Link>
//                         <Link
//                             href={route("register")}
//                             className="px-3 py-2 text-black"
//                         >
//                             Register
//                         </Link>
//                     </>
//                 )}
//             </nav>

//             <div className="min-h-screen bg-orange-100 p-6">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                     MENU
//                 </h1>

//                 <div className="flex justify-end mb-6">
//                     <button
//                         onClick={() => Inertia.visit(route("orders.index"))}
//                         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//                     >
//                         <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//                     <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//                         Categories
//                     </h2>
//                     <div className="flex gap-2">
//                         {categories.map((category) => (
//                             <button
//                                 key={category}
//                                 className={`${
//                                     selectedCategory === category
//                                         ? "bg-yellow-600"
//                                         : "bg-yellow-500"
//                                 } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
//                                 onClick={() => handleCategoryClick(category)}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {filteredMenuItems.length > 0 ? (
//                         filteredMenuItems.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
//                             >
//                                 {item.image ? (
//                                     <img
//                                         src={`/storage/${item.image}`}
//                                         alt={item.name}
//                                         className="w-full h-40 object-cover rounded"
//                                     />
//                                 ) : (
//                                     <span>No Image</span>
//                                 )}

//                                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                                     {item.name}
//                                 </h2>
//                                 <p className="text-gray-600 dark:text-gray-400 mt-2">
//                                     {item.description ||
//                                         "No description available"}
//                                 </p>
//                                 <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">
//                                     Price: ${item.price}
//                                 </p>
//                                 <button
//                                     onClick={() => handleAddToCart(item)}
//                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
//                             ไม่มีเมนูอาหาร
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// // version 3
// import { Link } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";
// import React, { useState, useEffect } from "react";

// export default function Welcome({ auth, menuItems = [], categories = [] }) {
//     const [cartCount, setCartCount] = useState(0);
//     const [selectedCategory, setSelectedCategory] = useState("All");

//     useEffect(() => {
//         console.log(categories); // ดูค่าของ categories ว่ามีการส่งมาหรือไม่
//     }, [categories]);

//     useEffect(() => {
//         // ดึงจำนวนสินค้าในตะกร้า
//         fetch("/api/cart-count")
//             .then((response) => response.json())
//             .then((data) => setCartCount(data.count));
//     }, []);

//     // ฟังก์ชันเพิ่มสินค้าในตะกร้า
//     const handleAddToCart = (item) => {
//         Inertia.post(
//             "/orders/add-to-cart",
//             {
//                 menu_item_id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 quantity: 1,
//             },
//             {
//                 onSuccess: () => {
//                     fetch("/api/cart-count")
//                         .then((response) => response.json())
//                         .then((data) => setCartCount(data.count));
//                 },
//             }
//         );
//     };

//     // ฟังก์ชันกรองเมนูตามหมวดหมู่ที่เลือก
//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);

//         // ส่งคำขอไปยังเซิร์ฟเวอร์เพื่อกรองเมนูตามหมวดหมู่
//         Inertia.get(route("menu.index"), {
//             category_id: category === "All" ? "" : category,
//         });
//     };

//     return (
//         <>
//             <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
//                 {auth.user ? (
//                     <Link
//                         href={route("dashboard")}
//                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
//                     >
//                         Dashboard
//                     </Link>
//                 ) : (
//                     <>
//                         <Link
//                             href={route("login")}
//                             className="px-3 py-2 text-black"
//                         >
//                             Log in
//                         </Link>
//                         <Link
//                             href={route("register")}
//                             className="px-3 py-2 text-black"
//                         >
//                             Register
//                         </Link>
//                     </>
//                 )}
//             </nav>

//             <div className="min-h-screen bg-orange-100 p-6">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                     MENU
//                 </h1>

//                 <div className="flex justify-end mb-6">
//                     <button
//                         onClick={() => Inertia.visit(route("orders.index"))}
//                         className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//                     >
//                         <span>เช็คสินค้าที่สั่ง ({cartCount})</span>
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//                     <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//                         Categories
//                     </h2>
//                     <div className="flex gap-2">
//                         {categories.map((category) => (
//                             <button
//                                 key={category}
//                                 className={`${
//                                     selectedCategory === category
//                                         ? "bg-yellow-600"
//                                         : "bg-yellow-500"
//                                 } hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition`}
//                                 onClick={() => handleCategoryClick(category)}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {menuItems.length > 0 ? (
//                         menuItems.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
//                             >
//                                 {item.image ? (
//                                     <img
//                                         src={`/storage/${item.image}`}
//                                         alt={item.name}
//                                         className="w-full h-40 object-cover rounded"
//                                     />
//                                 ) : (
//                                     <span>No Image</span>
//                                 )}

//                                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                                     {item.name}
//                                 </h2>
//                                 <p className="text-gray-600 dark:text-gray-400 mt-2">
//                                     {item.description ||
//                                         "No description available"}
//                                 </p>
//                                 <p className="text-gray-800 dark:text-gray-200 font-bold mt-4">
//                                     Price: ${item.price}
//                                 </p>
//                                 <button
//                                     onClick={() => handleAddToCart(item)}
//                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
//                             ไม่มีเมนูอาหาร
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// version 4
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter"; // นำเข้า CategoryFilter component

export default function Welcome({ auth, menuItems = [], categories = [] }) {
    const [cartCount, setCartCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        // ดึงจำนวนสินค้าในตะกร้า
        fetch("/api/cart-count")
            .then((response) => response.json())
            .then((data) => setCartCount(data.count));
    }, []);

    // ฟังก์ชันเพิ่มสินค้าในตะกร้า
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
                onSuccess: () => {
                    fetch("/api/cart-count")
                        .then((response) => response.json())
                        .then((data) => setCartCount(data.count));
                },
            }
        );
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        Inertia.visit(route("welcome"), {
            method: "get",
            data: { category_id: categoryId === "All" ? "" : categoryId },
        });
    };

    return (
        <>
            <nav className="flex items-center justify-end px-6 py-4 bg-orange-400 dark:bg-gray-900">
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
                <div
                    className="bg-cover bg-center p-6 shadow-lg rounded-lg mb-6 w-6/12 h-96 center mx-auto"
                    style={{
                        backgroundImage:
                            "url('https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/488183988_595725206834352_6292035432484476891_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zJB5_y154C0Q7kNvgFEAMZM&_nc_oc=Adm15gElZdzXNXHlaUAcIuorigDg7fUCjAwsk2a7qtDGvr0v3LwIDrf9-AUzmlcfuyQ&_nc_zt=23&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=1MBoGjUgFCIzzQsklTpXpA&oh=00_AYH198UvxFJZfOIhe8g3dXi6yIRonaYiUaK5vlo0V8WHDw&oe=67F350F9')",
                    }}
                />
                <br />
                <h1 className="text-6xl font-bold font-sans text-center text-gray-800 mb-6">
                    MENU
                </h1>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => Inertia.visit(route("orders.index"))}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        <span>Check Orders ({cartCount})</span>
                    </button>
                </div>

                <div className="flex flex-wrap justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Categories
                    </h2>
                    {/* ใช้งาน CategoryFilter component */}
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryClick={handleCategoryClick}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                            >
                                {item.image ? (
                                    <img
                                        src={`/storage/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-80 object-cover rounded"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                                <br />

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
                                    className="mt-4 bg-yellow-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded w-full"
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
