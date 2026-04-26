const express = require("express");
const cors = require("cors");

const nutrientRoutes = require("./src/routes/nutrientRoutes");
const calorieRoutes = require("./src/routes/calorieRoutes");
const recommendationRoutes = require("./src/routes/recommendationRoutes");
const foodRoutes = require("./src/routes/foodRoutes");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/foods", foodRoutes);
app.use("/api/calories", calorieRoutes);
app.use("/api/nutrients", nutrientRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vida Sana backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
