import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";

const AdminRoute = ({ element }) => {
  const currentUser = useSelector(selectUser);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const isAdmin = userDetails && userDetails.isAdmin;

  return isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
