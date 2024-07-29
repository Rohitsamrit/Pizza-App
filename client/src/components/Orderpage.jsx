import React, { useState, useEffect } from "react";
import axios from "axios";

function Orderspage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userDetailsString = localStorage.getItem("userDetails");
        if (!userDetailsString) {
          throw new Error("User details not found in localStorage");
        }

        const userDetails = JSON.parse(userDetailsString);
        const userId = userDetails._id;

        console.log("Fetching orders for user ID:", userId);

        const response = await axios.post("/api/v1/order/getuserorder", {
          userid: userId,
        });

        console.log("Full response from server:", response);
        console.log("Response data:", JSON.stringify(response.data, null, 2));

        if (Array.isArray(response.data) && response.data.length === 0) {
          console.log("Server returned an empty array of orders");
        } else if (!Array.isArray(response.data)) {
          console.log("Server did not return an array as expected");
        }

        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response) {
          console.error("Error response from server:", err.response.data);
        }
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!orders || orders.length === 0) return <NoOrdersFound />;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-12 animate-fade-in-down">
          Your Orders
        </h1>
        {selectedOrder ? (
          <OrderDetails
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
          />
        ) : (
          <OrderList orders={orders} onSelectOrder={setSelectedOrder} />
        )}
      </div>
    </div>
  );
}

function OrderList({ orders, onSelectOrder }) {
  console.log("Orders in OrderList:", orders);

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => onSelectOrder(order)}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-indigo-600">
              Order #{order._id ? order._id.slice(-6) : "N/A"}
            </h2>
            <p className="text-sm text-gray-500">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "Date N/A"}
            </p>
          </div>
          <p className="mt-2 text-gray-600">
            Total: ₹
            {order.orderAmount ? Number(order.orderAmount).toFixed(2) : "N/A"}
          </p>
          <p className={`mt-1 ${getStatusColor(order.isDeliverd)}`}>
            Status:{" "}
            {order.isDeliverd !== undefined
              ? order.isDeliverd
                ? "Delivered"
                : "Pending"
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}

function OrderDetails({ order, onBack }) {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order #{order._id.slice(-6)}</h2>
          <button
            onClick={onBack}
            className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors duration-300"
          >
            Back to List
          </button>
        </div>
        <p className="text-sm opacity-75 mt-2">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="p-6 space-y-6">
        <OrderDetailsContent order={order} />
        <ShippingInfo address={order.shippingAddress} />
        <OrderItems items={order.orderItems} />
      </div>
    </div>
  );
}

function OrderDetailsContent({ order }) {
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-600">
      <DetailItem
        label="Total Amount"
        value={`$${Number(order.orderAmount).toFixed(2)}`}
      />
      <DetailItem
        label="Status"
        value={order.isDeliverd ? "Delivered" : "Pending"}
        className={getStatusColor(order.isDeliverd)}
      />
      <DetailItem label="Transaction ID" value={order.transectionId || "N/A"} />
      <DetailItem
        label="Total Items"
        value={calculateTotalQuantity(order.orderItems)}
      />
    </div>
  );
}

function DetailItem({ label, value, className }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={`text-lg font-semibold ${className}`}>{value}</p>
    </div>
  );
}

function ShippingInfo({ address }) {
  if (!address) return null;
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Shipping Info
      </h3>
      <p className="text-gray-600">{address.address_line1 || "N/A"}</p>
      <p className="text-gray-600">
        {address.city || "N/A"}, {address.country || "N/A"}{" "}
        {address.postal_code || "N/A"}
      </p>
    </div>
  );
}

function OrderItems({ items }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Items</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.flatMap((item) =>
              item.cartItems.map((cartItem, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{cartItem.name}</td>
                  <td className="px-4 py-3">{cartItem.varient}</td>
                  <td className="px-4 py-3">{cartItem.quantity}</td>
                  <td className="px-4 py-3">${cartItem.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className="text-red-500 text-center py-12 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
      <p>{error}</p>
    </div>
  );
}

function NoOrdersFound() {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">No orders found</h2>
      <p className="text-gray-500">
        Looks like you haven't placed any orders yet.
      </p>
    </div>
  );
}

function getStatusColor(isDeliverd) {
  return isDeliverd ? "text-green-500" : "text-yellow-500";
}

function calculateTotalQuantity(orderItems) {
  return orderItems.reduce((total, item) => {
    return (
      total +
      item.cartItems.reduce(
        (itemTotal, cartItem) => itemTotal + cartItem.quantity,
        0
      )
    );
  }, 0);
}

export default Orderspage;
