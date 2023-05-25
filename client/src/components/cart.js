// import React, { useState, useEffect } from "react";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Load cart data from localStorage on component mount
//     const savedCartItems = localStorage.getItem("cartItems");
//     if (savedCartItems) {
//       setCartItems(JSON.parse(savedCartItems));
//     }
//   }, []);

//   useEffect(() => {
//     // Update localStorage whenever cartItems change
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (book) => {
//     const updatedCartItems = [...cartItems, book];
//     setCartItems(updatedCartItems);
//   };

//   return (
//     <div>
//       <h2>Cart</h2>
//       {cartItems.length > 0 ? (
//         <ul>
//           {cartItems.map((item, index) => (
//             <li key={index}>{item.title}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//       <button onClick={() => addToCart({ title: "Book Title" })}>
//         Add Book to Cart
//       </button>
//     </div>
//   );
// }

// export default Cart;