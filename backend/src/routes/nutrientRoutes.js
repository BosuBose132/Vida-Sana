const express = require("express");
const { getNutrientsToWatch } = require("../controllers/nutrientController");

const router = express.Router();

router.get("/", getNutrientsToWatch);

module.exports = router;
