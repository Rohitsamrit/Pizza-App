const express = require("express");

//router onject
const router = express.Router();
const {
  getAllPizzaController,
  addPizzaController,
  getPizzaByIdController,
  updatePizzaController,
  deletePizzaController,
} = require("../controllers/pizzaCtrl");

//get all pizza
router.get("/getAllPizzas", getAllPizzaController);

//add pizza
router.post("/addPizza", addPizzaController);

//getpizzabyid
router.post("/getPizzaById", getPizzaByIdController);

// updatepizza
router.post("/updatePizza", updatePizzaController);

//deletepizza
router.post("/deletePizza", deletePizzaController);

module.exports = router;
