const express = require("express");
const cors = require("cors");

const calorieRoutes = require("./src/routes/calorieRoutes");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/calories", calorieRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vida Sana backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
