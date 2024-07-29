const pizzaModel = require("../models/pizzaModel");

//getAllPizzaController
const getAllPizzaController = async (req, res) => {
  try {
    const pizzas = await pizzaModel.find({});
    res.send(pizzas);
  } catch (error) {
    res.json({ message: error });
  }
};

//addPizzaController
const addPizzaController = async (req, res) => {
  const pizza = req.body.pizza;
  try {
    const newPizza = new pizzaModel({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "larg"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newPizza.save();
    res.status(201).send("New Pizza Added");
  } catch (error) {
    res.json({ message: error });
  }
};
//getPizzaByIdController
const getPizzaByIdController = async (req, res) => {
  const pizzaId = req.body.pizzaId;
  try {
    const pizza = await pizzaModel.findOne({ _id: pizzaId });
    res.send(pizza);
  } catch (error) {
    res.json({ message: error });
  }
};

//updatePizzaController
const updatePizzaController = async (req, res) => {
  const updatedPizza = req.body.updatedPizza;
  try {
    await pizzaModel.findOneAndUpdate(
      { _id: updatedPizza._id },
      {
        name: updatedPizza.name,
        description: updatedPizza.description,
        image: updatedPizza.image,
        category: updatedPizza.category,
        prices: [updatedPizza.prices],
      }
    );
    res.status(200).json("Pizza Updated");
  } catch (error) {
    res.json({ message: error });
  }
};


const deletePizzaController = async (req, res) => {
  const pizzaId = req.body.pizzaId;
  try {
    await pizzaModel.findOneAndDelete({ _id: pizzaId });
    res.status(200).json({ message: "Pizza Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPizzaController,
  addPizzaController,
  getPizzaByIdController,
  updatePizzaController,
  deletePizzaController,
};
