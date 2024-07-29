import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiUserLine, RiFileListLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaPizzaSlice } from "react-icons/fa"; // Importing from FontAwesome
import { selectUser } from "../redux/features/userSlice"; // Import the selector

function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails || !userDetails.isAdmin) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const buttons = [
    {
      label: "All Users",
      path: "/admin/userlist",
      icon: RiUserLine,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "All Pizzas",
      path: "/admin/pizzalist",
      icon: FaPizzaSlice,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      label: "Add New Pizza",
      path: "/admin/addnewpizza",
      icon: IoMdAdd,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      label: "All Orders",
      path: "/admin/orderlist",
      icon: RiFileListLine,
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center bg-gray-800 text-white py-4 mb-8 rounded-lg shadow-md">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button.path)}
            className={`${button.color} text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center`}
          >
            <button.icon className="mr-2 text-2xl" />
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
