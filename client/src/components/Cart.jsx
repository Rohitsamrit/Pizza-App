// src/screens/Cart.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/features/cartSlice";
import { FaPlus, FaMinus } from "react-icons/fa";
import Checkout from "./Checkout";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromCart = (name, varient) => {
    dispatch(removeFromCart({ name, varient }));
  };

  const handleUpdateQuantity = (name, varient, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ name, varient, quantity: newQuantity }));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h4 className="font-bold">{item.name}</h4>
                  <p>Varient: {item.varient}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.name,
                        item.varient,
                        item.quantity - 1
                      )
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l"
                  >
                    <FaMinus />
                  </button>
                  <span className="bg-gray-100 text-gray-800 font-bold py-1 px-4">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.name,
                        item.varient,
                        item.quantity + 1
                      )
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.name, item.varient)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Total: ₹{getTotalPrice().toFixed(2)}
            </h3>

            <Checkout subTotal={getTotalPrice().toFixed(2)} />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
