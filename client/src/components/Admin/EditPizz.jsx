import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PizzaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 inline-block mr-2 text-purple-600"
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

const EditPizz = () => {
  const [pizza, setPizza] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    prices: {
      small: "",
      medium: "",
      large: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.post("/api/v1/pizza/getPizzaById", {
          pizzaId,
        });
        const fetchedPizza = response.data;
        // Handle prices whether they come as an object or an array
        const prices = Array.isArray(fetchedPizza.prices)
          ? fetchedPizza.prices[0]
          : fetchedPizza.prices || { small: "", medium: "", large: "" };
        setPizza({
          name: fetchedPizza.name,
          description: fetchedPizza.description,
          category: fetchedPizza.category,
          image: fetchedPizza.image,
          prices,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch pizza details");
        setLoading(false);
      }
    };
    fetchPizza();
  }, [pizzaId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "small" || name === "medium" || name === "large") {
      setPizza((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [name]: value,
        },
      }));
    } else {
      setPizza((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.post("/api/v1/pizza/updatePizza", {
        updatedPizza: {
          _id: pizzaId,
          ...pizza,
          prices: pizza.prices, // Send prices as an object, not an array
        },
      });
      setLoading(false);
      setSuccessMessage("Pizza updated successfully!");
      setTimeout(() => {
        navigate("/admin/pizzalist");
      }, 2000);
    } catch (err) {
      setError("Failed to update pizza");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-purple-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800 flex items-center">
          <PizzaIcon />
          Edit Pizza
        </h1>
      </div>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded"
          role="alert"
        >
          <p className="font-bold">Success</p>
          <p>{successMessage}</p>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={pizza.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={pizza.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={pizza.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={pizza.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="small"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Small Price
                </label>
                <input
                  type="number"
                  id="small"
                  name="small"
                  value={pizza.prices.small}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="medium"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Medium Price
                </label>
                <input
                  type="number"
                  id="medium"
                  name="medium"
                  value={pizza.prices.medium}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="large"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Large Price
                </label>
                <input
                  type="number"
                  id="large"
                  name="large"
                  value={pizza.prices.large}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/admin/pizzalist"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Pizza"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPizz;
