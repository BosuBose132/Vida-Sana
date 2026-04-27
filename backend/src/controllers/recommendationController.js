const pool = require("../config/db");
const { successResponse, errorResponse } = require("../utils/apiResponse");

async function getRecommendations(req, res) {
  try {
    const { targetCalories, goal, allergies } = req.body;

    if (!targetCalories || !goal) {
      return res
        .status(400)
        .json(errorResponse("Target calories and goal are required"));
    }

    let goalTag = "maintenance";

    if (goal === "Gain Weight") {
      goalTag = "muscle_gain";
    } else if (goal === "Lose Weight") {
      goalTag = "weight_loss";
    } else if (goal === "Improve General Health") {
      goalTag = "general_health";
    }

    let query = `
      SELECT 
        vf.food_id,
        vf.food_name,
        fc.category_name,
        vf.calories,
        vf.protein,
        vf.carbs,
        vf.fats,
        vf.fiber,
        vf.iron,
        vf.calcium,
        vf.omega_3,
        vf.serving_basis,
        vf.is_nut_free,
        vf.is_soy_free,
        vf.is_gluten_free,
        vf.goal_tag,
        vf.description
      FROM vegan_foods vf
      JOIN food_categories fc ON vf.category_id = fc.category_id
      WHERE vf.goal_tag = ?
    `;

    const queryParams = [goalTag];
    const allergyText = (allergies || "").toLowerCase();

    if (allergyText.includes("nut")) {
      query += " AND vf.is_nut_free = TRUE";
    }

    if (allergyText.includes("soy")) {
      query += " AND vf.is_soy_free = TRUE";
    }

    if (allergyText.includes("gluten")) {
      query += " AND vf.is_gluten_free = TRUE";
    }

    query += " ORDER BY vf.protein DESC, vf.fiber DESC LIMIT 10";

    const [foods] = await pool.query(query, queryParams);

    const recommendations = foods.map((food) => ({
      ...food,
      recommendationReason: getRecommendationReason(goal, food),
    }));

    return res.status(200).json(
      successResponse("Recommendations retrieved successfully", {
        targetCalories,
        goal,
        allergies: allergies || "None",
        recommendedFoods: recommendations,
      }),
    );
  } catch (error) {
    console.error("Recommendations error:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
}

function getRecommendationReason(goal, food) {
  if (goal === "Gain Weight") {
    return `${food.food_name} is recommended because it supports higher energy intake and provides strong protein or healthy fat value.`;
  }

  if (goal === "Lose Weight") {
    return `${food.food_name} is recommended because it supports satiety with useful protein and fiber per 100g.`;
  }

  if (goal === "Improve General Health") {
    return `${food.food_name} is recommended because it is nutrient-dense and supports a balanced vegan transition.`;
  }

  return `${food.food_name} is recommended because it fits a balanced maintenance-focused vegan diet.`;
}

module.exports = {
  getRecommendations,
};
