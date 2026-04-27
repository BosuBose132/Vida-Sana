const express = require("express");
const {
  getNutrientsToWatch,
  getPersonalizedNutrients,
} = require("../controllers/nutrientController");

const router = express.Router();

router.get("/", getNutrientsToWatch);
router.post("/recommend", getPersonalizedNutrients);

module.exports = router;
