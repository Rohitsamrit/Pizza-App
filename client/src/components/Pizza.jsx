import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";



function Pizza({ pizza }) {
  const [varient, setVarient] = useState(pizza.varients[0]);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const userDetails = localStorage.getItem("userDetails");

    if (!userDetails) {
      alert("You need to login first before adding items to the cart.");
      return;
    }
    dispatch(
      addToCart({
        name: pizza.name,
        varient,
        quantity,
        price: pizza.prices[0][varient] * quantity,
        image: pizza.image,
      })
    );
    // Optional: You could show a success message here
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-64 object-cover cursor-pointer"
        src={pizza.image}
        alt={pizza.name}
        onClick={() => setShowModal(true)}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{pizza.name}</div>
        <p>{pizza.category}</p>
        <hr className="my-2" />
        <div className="flex justify-between mb-4">
          <div>
            <h6 className="font-semibold">Variants</h6>

            <select
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {pizza.varients.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h6 className="font-semibold">Quantity</h6>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {[...Array(10).keys()].map((v) => (
                <option key={v + 1} value={v + 1}>
                  {v + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            Price: ₹{pizza.prices[0][varient] * quantity}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Add to cart
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-5 bg-white w-11/12 md:max-w-md mx-auto rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{pizza.name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h5 className="font-semibold mb-2">Description:</h5>
            <p>{pizza.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pizza;
