import "./App.css";
import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Terms from "./components/Terms";
import Topbar from "./components/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import HomeScreen from "./screens/HomeScreen";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import OrderPage from "./components/Orderpage";
import AdminDashboard from "./components/AdminDashBoard";
import UserList from "./components/Admin/Allusers";
import PizzaList from "./components/Admin/AllPizzas";
import AddNewPizza from "./components/Admin/Newpizzas";
import OrderList from "./components/Admin/Allorders";
import AdminRoute from "./AdminRoute"; // Import the AdminRoute component
import EditPizz from "./components/Admin/EditPizz";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<Error />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={<div>Catch-all Route: {window.location.pathname}</div>}
        />

        {/* <Route path="/admin/:pizzaId" element={<EditPizz />} /> */}

        <Route path="/orders" element={<OrderPage />} />

        {/* Admin routes protected by AdminRoute */}
        <Route
          path="/admin/dashboard"
          element={<AdminRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/userlist"
          element={<AdminRoute element={<UserList />} />}
        />
        <Route
          path="/admin/pizzalist"
          element={<AdminRoute element={<PizzaList />} />}
        />
        <Route
          path="/admin/addnewpizza"
          element={<AdminRoute element={<AddNewPizza />} />}
        />

        <Route
          path="/admin/orderlist"
          element={<AdminRoute element={<OrderList />} />}
        />

        <Route
          path="/admin/editpizza/:pizzaId"
          element={<AdminRoute element={<EditPizz />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
