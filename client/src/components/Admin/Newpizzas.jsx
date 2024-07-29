import React, { useState } from "react";

function NewPizzas() {
  const [formData, setFormData] = useState({
    name: "",
    smallPrice: "",
    mediumPrice: "",
    largePrice: "",
    image: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/v1/pizza/addPizza", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pizza: {
            name: formData.name,
            image: formData.image,
            description: formData.description,
            category: formData.category,
            prices: {
              small: formData.smallPrice,
              medium: formData.mediumPrice,
              large: formData.largePrice,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new pizza");
      }

      setSuccess(true);
      setFormData({
        name: "",
        smallPrice: "",
        mediumPrice: "",
        largePrice: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-2">
            Add New Pizza
          </h1>
          <p className="text-purple-600">
            Create a delicious new pizza for your menu
          </p>
        </div>

        {loading && (
          <div className="text-center text-purple-500 mb-4">Loading...</div>
        )}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            Pizza Added Successfully
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              className="block text-purple-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Pizza Name
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              id="name"
              type="text"
              placeholder="Deluxe Veggie"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-purple-700 text-sm font-bold mb-2"
                htmlFor="smallPrice"
              >
                Small Price
              </label>
              <input
                className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="smallPrice"
                type="number"
                placeholder="9.99"
                name="smallPrice"
                value={formData.smallPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-purple-700 text-sm font-bold mb-2"
                htmlFor="mediumPrice"
              >
                Medium Price
              </label>
              <input
                className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="mediumPrice"
                type="number"
                placeholder="12.99"
                name="mediumPrice"
                value={formData.mediumPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-purple-700 text-sm font-bold mb-2"
                htmlFor="largePrice"
              >
                Large Price
              </label>
              <input
                className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="largePrice"
                type="number"
                placeholder="15.99"
                name="largePrice"
                value={formData.largePrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-purple-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              id="image"
              type="text"
              placeholder="https://example.com/pizza-image.jpg"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-purple-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              id="description"
              placeholder="A delicious pizza topped with fresh vegetables..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              className="block text-purple-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add New Pizza"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPizzas;
