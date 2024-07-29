import React, { useState, useEffect, useRef } from "react";
import { MdLocalOffer } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineDown,
} from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import {
  selectIsLoggedIn,
  selectUser,
  setUser,
  clearUser,
} from "../redux/features/userSlice";

const Topbar = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      dispatch(setUser(JSON.parse(userDetails)));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    dispatch(clearUser());
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleNavigation = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms and Conditions", href: "/terms" },
    {
      name: "Cart",
      href: "/cart",
      icon: (
        <div className="relative">
          <AiOutlineShoppingCart className="text-2xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-indigo-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Order",
      href: "/orders",
      icon: <FaClipboardList className="text-2xl" />,
    },
  ];

  const renderUserMenu = () => {
    if (isLoggedIn && currentUser) {
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
          >
            <AiOutlineUser className="text-lg mr-1" />
            <span>{currentUser.name}</span>
            <AiOutlineDown className="ml-1" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={() => handleNavigation("/orders")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaClipboardList className="inline mr-2" />
                Orders
              </button>
              {currentUser.isAdmin && (
                <button
                  onClick={() => handleNavigation("/admin/dashboard")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <RiDashboardLine className="inline mr-2" />
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <AiOutlineLogout className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          to="/login"
          className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
        >
          <AiOutlineLogin className="text-lg mr-1" />
          <span>Login</span>
        </Link>
      );
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-auto rounded-full border-2 border-white shadow-md"
                src="https://static.vecteezy.com/system/resources/previews/000/331/796/non_2x/vector-pizzeria-logo-template.jpg"
                alt="YourLogo"
              />
            </div>
            <div className="hidden md:block ml-6">
              <div className="flex items-center space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                  >
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    <span>{item.name}</span>
                  </Link>
                ))}
                {renderUserMenu()}
              </div>
            </div>
          </div>
          <div className="flex items-center md:ml-6">
            <MdLocalOffer className="text-yellow-300 mr-2 text-xl" />
            <span className="text-white text-sm font-medium hidden md:block">
              Free Home Delivery on Order Above 500/- Rupees
            </span>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <span>{item.name}</span>
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/orders"
                  className="flex items-center text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  <FaClipboardList className="mr-2" />
                  Orders
                </Link>
                {currentUser.isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                  >
                    <RiDashboardLine className="mr-2" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:bg-white hover:bg-opacity-20 w-full px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                >
                  <AiOutlineLogout className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                <AiOutlineLogin className="mr-2" />
                Login
              </Link>
            )}
          </div>
          <div className="px-4 py-3 bg-indigo-700 bg-opacity-50">
            <div className="flex items-center">
              <MdLocalOffer className="text-yellow-300 mr-2 text-xl" />
              <span className="text-white text-sm font-medium">
                Free Home Delivery on Order Above 500/- Rupees
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
