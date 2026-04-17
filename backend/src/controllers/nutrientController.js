const {
  nutrientsToWatch,
  goalPriorityMap,
  restrictionSourceMap,
} = require("../utils/nutrientData");
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
function getPersonalizedNutrients(req, res) {
  const { goal, allergies } = req.body;

  const priorityNames = goalPriorityMap[goal] || [
    "Vitamin B12",
    "Iron",
    "Calcium",
    "Vitamin D",
  ];

  const allergyText = (allergies || "").toLowerCase();

  const restrictedSources = [];

  Object.keys(restrictionSourceMap).forEach((restriction) => {
    if (allergyText.includes(restriction)) {
      restrictedSources.push(...restrictionSourceMap[restriction]);
    }
  });

  const priorityNutrients = nutrientsToWatch
    .filter((nutrient) => priorityNames.includes(nutrient.name))
    .map((nutrient) => {
      const adjustedSources = nutrient.veganSources.filter(
        (source) => !restrictedSources.includes(source),
      );

      return {
        ...nutrient,
        veganSources: adjustedSources,
      };
    });

  return res.status(200).json(
    successResponse("Personalized nutrient guidance generated successfully", {
      priorityNutrients,
      restrictedSources,
      note: "These nutrients are highlighted based on your selected goal and food restrictions. This is educational guidance and not medical advice.",
    }),
  );
}

module.exports = {
  getNutrientsToWatch,
  getPersonalizedNutrients,
};
