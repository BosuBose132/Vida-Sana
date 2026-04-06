const express = require("express");
const { calculateCalories } = require("../controllers/calorieController");

const router = express.Router();

router.post("/calculate", calculateCalories);

module.exports = router;
