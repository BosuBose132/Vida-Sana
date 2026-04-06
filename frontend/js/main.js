const calculatorForm = document.getElementById("calculatorForm");

if (calculatorForm) {
  calculatorForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const activity = document.getElementById("activity").value;
    const goal = document.getElementById("goal").value;
    const allergies = document.getElementById("allergies").value;

    const calorieResult = document.getElementById("calorieResult");
    const calorieMessage = document.getElementById("calorieMessage");

    try {
      calorieResult.textContent = "Calculating...";
      calorieMessage.textContent =
        "Please wait while we calculate your daily calorie needs.";

      const response = await fetch(
        "http://localhost:3000/api/calories/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age,
            gender,
            height,
            weight,
            activity,
            goal,
            allergies,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        calorieResult.textContent = "-- kcal/day";
        calorieMessage.textContent = result.message || "Something went wrong.";
        return;
      }

      calorieResult.textContent = `${result.data.targetCalories} kcal/day`;
      calorieMessage.textContent = `BMR: ${result.data.bmr} kcal/day | Maintenance: ${result.data.maintenanceCalories} kcal/day`;
    } catch (error) {
      calorieResult.textContent = "-- kcal/day";
      calorieMessage.textContent =
        "Unable to connect to the backend. Please make sure the server is running.";
      console.error("Calculator API error:", error);
    }
  });
}
