import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const PizzaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 inline-block mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
);

export default function AllPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get("/api/v1/pizza/getAllPizzas");
        setPizzas(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post("/api/v1/pizza/deletePizza", { pizzaId: id }); // Send ID in the request body
      setPizzas(pizzas.filter((pizza) => pizza._id !== id));
      swal("Deleted!", "Pizza has been deleted successfully.", "success");
    } catch (err) {
      setError(err.message);
      swal("Error", err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pizzas.map((pizza) => (
        <div
          key={pizza._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
        >
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {pizza.name}
            </h2>
            <p className="text-gray-600 mb-2">{pizza.category}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Small: ${pizza.prices[0].small}
              </p>
              <p className="text-sm text-gray-500">
                Medium: ${pizza.prices[0].medium}
              </p>
              <p className="text-sm text-gray-500">
                Large: ${pizza.prices[0].large}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to={`/admin/editpizza/${pizza._id}`}
                className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <EditIcon />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(pizza._id)}
                className="flex items-center text-red-600 hover:text-red-800 transition duration-300"
              >
                <DeleteIcon />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {pizzas.map((pizza) => (
        <div
          key={pizza._id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-lg"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={pizza.image}
                alt={pizza.name}
              />
            </div>
            <div className="p-8 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {pizza.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{pizza.category}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/editpizza/${pizza._id}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    <EditIcon />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pizza._id)}
                    className="flex items-center text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Small: ${pizza.prices[0].small}
                  </p>
                  <p className="text-sm text-gray-500">
                    Medium: ${pizza.prices[0].medium}
                  </p>
                  <p className="text-sm text-gray-500">
                    Large: ${pizza.prices[0].large}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          <PizzaIcon />
          All Pizzas
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <GridIcon />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <ListIcon />
          </button>
        </div>
      </div>
      {viewMode === "grid" ? renderGridView() : renderListView()}
    </div>
  );
}
