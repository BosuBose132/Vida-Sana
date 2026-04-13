const { calculateDailyCalories } = require("../utils/calorieCalculator");
const { successResponse, errorResponse } = require("../utils/apiResponse");

function calculateCalories(req, res) {
  try {
    const { age, gender, height, weight, activity, goal, allergies } = req.body;
    if (!age || !gender || !height || !weight || !activity || !goal) {
      return res
        .status(400)
        .json(errorResponse("All required fields must be provided"));
    }
    if (Number(age) <= 0 || Number(height) <= 0 || Number(weight) <= 0) {
      return res
        .status(400)
        .json(errorResponse("Age, height, and weight must be greater than 0"));
    }
    const validGenders = ["Male", "Female", "Prefer not to say"];
    const validActivities = [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
      "Extra Active",
    ];
    const validGoals = [
      "Maintain Weight",
      "Lose Weight",
      "Gain Weight",
      "Improve General Health",
    ];
    if (!validGenders.includes(gender)) {
      return res.status(400).json(errorResponse("Invalid gender value"));
    }
    if (!validActivities.includes(activity)) {
      return res.status(400).json(errorResponse("Invalid activity level"));
    }
    if (!validGoals.includes(goal)) {
      return res.status(400).json(errorResponse("Invalid goal value"));
    }
    const result = calculateDailyCalories({
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      activity,
      goal,
      allergies: allergies || "",
    });
    return res
      .status(200)
      .json(successResponse("Calorie calculation successful", result));
  } catch (error) {
    console.error("Calorie calculation error:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
}

module.exports = {
  calculateCalories,
};
