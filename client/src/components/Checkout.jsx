

import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Checkout = ({ subTotal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const tokenHandler = async (token) => {
    setIsLoading(true);
    setError(null);

    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (!cartItems || !userDetails) {
      setError("Cart items or user details not found. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/v1/order/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          subTotal,
          cartItems,
          userDetails,
          shippingAddress: {
            address_line1: token.card.address_line1,
            address_line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Clear cart items from local storage
        localStorage.removeItem("cart");
        // Show a success message
        alert(
          "Your order has been placed successfully. Your cart has been cleared."
        );
        // Refresh the page
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to place order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51PfxERBoPKUyqPB6lan5KHR3IthMteUVd025nJ3TOr9Vy5VH9sSaDwnemimb2dG6f0Rm6jKqZXhXidHRqGJ9wSEy00EQkUnRFG"
        currency="INR"
      >
        <button
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;

// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";

// const Checkout = ({ subTotal }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const tokenHandler = async (token) => {
//     setIsLoading(true);
//     setError(null);

//     const cartItems = JSON.parse(localStorage.getItem("cart"));
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));

//     if (!cartItems || !userDetails) {
//       setError("Cart items or user details not found. Please try again.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("/api/v1/order/placeOrder", {
//         token,
//         subTotal,
//         cartItems,
//         userDetails,
//         shippingAddress: token.card.address_line1,
//         shippingCity: token.card.address_city,
//         shippingCountry: token.card.address_country,
//         shippingZip: token.card.address_zip,
//       });

//       if (response.status === 200) {
//         const data = response.data;
//         console.log(data.message);
//         // Clear cart items from local storage
//         localStorage.removeItem("cart");
//         // Show a success message
//         alert(
//           "Your order has been placed successfully. Your cart has been cleared."
//         );
//         // Refresh the page
//         window.location.reload();
//       } else {
//         const errorData = response.data;
//         setError(
//           errorData.message || "Failed to place order. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An unexpected error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       {error && (
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
//           role="alert"
//         >
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}
//       <StripeCheckout
//         amount={subTotal * 100}
//         shippingAddress
//         token={tokenHandler}
//         stripeKey="pk_test_51PfxERBoPKUyqPB6lan5KHR3IthMteUVd025nJ3TOr9Vy5VH9sSaDwnemimb2dG6f0Rm6jKqZXhXidHRqGJ9wSEy00EQkUnRFG"
//         currency="INR"
//       >
//         <button
//           className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Pay Now"}
//         </button>
//       </StripeCheckout>
//     </div>
//   );
// };

// export default Checkout;
