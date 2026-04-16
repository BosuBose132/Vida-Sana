const { nutrientsToWatch } = require("../utils/nutrientData");
const { successResponse } = require("../utils/apiResponse");

function getNutrientsToWatch(req, res) {
  return res
    .status(200)
    .json(
      successResponse(
        "Nutrients to watch during vegan transition retrieved successfully",
        nutrientsToWatch,
      ),
    );
}

module.exports = {
  getNutrientsToWatch,
};
