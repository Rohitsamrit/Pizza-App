import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../components/Pizza";
import {
  getPizzasRequest,
  getPizzasSuccess,
  getPizzasFail,
} from "../redux/features/pizzaSlice";
import axios from "axios";

function HomeScreen() {
  const dispatch = useDispatch();
  const { pizzas, loading, error } = useSelector((state) => state.pizzas);

  useEffect(() => {
    const fetchPizzas = async () => {
      dispatch(getPizzasRequest());
      try {
        const response = await axios.get("/api/v1/pizza/getAllPizzas");
        dispatch(getPizzasSuccess(response.data));
      } catch (error) {
        dispatch(getPizzasFail(error.message));
      }
    };

    fetchPizzas();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {pizzas.map((pizza) => (
          <Pizza key={pizza.name} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
