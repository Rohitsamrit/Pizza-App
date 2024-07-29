import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Allorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/v1/order/getallorders");
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching orders: " + err.message);
      setLoading(false);
      swal("Error", "Failed to fetch orders: " + err.message, "error");
    }
  };

  const updateDeliveryStatus = async (orderId) => {
    try {
      const response = await axios.post("/api/v1/order/updatedeliverystatus", {
        orderId,
      });
      if (response.data.success) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, isDeliverd: true } : order
          )
        );
        swal("Success!", "Delivery status updated successfully.", "success");
      } else {
        setError("Failed to update delivery status");
        swal("Error", "Failed to update delivery status", "error");
      }
    } catch (err) {
      setError("Error updating delivery status: " + err.message);
      swal("Error", "Error updating delivery status: " + err.message, "error");
    }
  };

  if (loading)
    return <div className="text-center py-4 text-purple-600">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-purple-50">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">All Orders</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Order Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Delivery Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-purple-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.orderAmount?.toFixed(2) || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.isDeliverd
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.isDeliverd ? "Delivered" : "Not Delivered"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!order.isDeliverd && (
                    <button
                      onClick={() => updateDeliveryStatus(order._id)}
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allorders;
