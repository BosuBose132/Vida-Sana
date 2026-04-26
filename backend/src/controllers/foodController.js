const pool = require("../config/db");
const { successResponse, errorResponse } = require("../utils/apiResponse");

async function getFoods(req, res) {
  try {
    const { category, search } = req.query;

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
        vf.description
      FROM vegan_foods vf
      JOIN food_categories fc
        ON vf.category_id = fc.category_id
      WHERE 1 = 1
    `;

    const params = [];

    if (category && category.trim() !== "") {
      query += " AND fc.category_name = ?";
      params.push(category);
    }

    if (search && search.trim() !== "") {
      query += " AND vf.food_name LIKE ?";
      params.push(`%${search}%`);
    }

    query += " ORDER BY vf.food_name ASC";

    const [foods] = await pool.query(query, params);

    return res
      .status(200)
      .json(successResponse("Foods retrieved successfully", foods));
  } catch (error) {
    console.error("Foods API error:", error);
    return res.status(500).json(errorResponse("Internal server error"));
  }
}

module.exports = {
  getFoods,
};
