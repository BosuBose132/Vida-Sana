const calculatorForm = document.getElementById("calculatorForm");

if (calculatorForm) {
  calculatorForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const activity = document.getElementById("activity").value;
    const goal = document.getElementById("goal").value;
    const allergies = document.getElementById("allergies").value.trim();

    const calorieResult = document.getElementById("calorieResult");
    const calorieMessage = document.getElementById("calorieMessage");
    const bmrResult = document.getElementById("bmrResult");
    const maintenanceResult = document.getElementById("maintenanceResult");
    const goalResult = document.getElementById("goalResult");
    const calculateBtn = document.getElementById("calculateBtn");
    function resetCalculatorResults() {
      calorieResult.textContent = "-- kcal/day";
      calorieMessage.textContent =
        "Fill in your details and click Calculate to receive your estimated calorie target and supporting health metrics.";
      bmrResult.textContent = "-- kcal/day";
      maintenanceResult.textContent = "-- kcal/day";
      goalResult.textContent = "--";
    }
    if (!age || !gender || !height || !weight || !activity || !goal) {
      resetCalculatorResults();
      calorieMessage.textContent =
        "Please complete all required fields before calculating.";
      return;
    }

    if (Number(age) <= 0 || Number(height) <= 0 || Number(weight) <= 0) {
      resetCalculatorResults();
      calorieMessage.textContent =
        "Age, height, and weight must be greater than 0.";
      return;
    }
    try {
      calculateBtn.disabled = true;
      calculateBtn.textContent = "Calculating...";

      calorieResult.textContent = "-- kcal/day";
      calorieMessage.textContent =
        "Please wait while we calculate your daily calorie needs.";
      bmrResult.textContent = "-- kcal/day";
      maintenanceResult.textContent = "-- kcal/day";
      goalResult.textContent = goal;
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
        resetCalculatorResults();
        calorieResult.textContent = "-- kcal/day";
        calorieMessage.textContent =
          result.message || "Something went wrong. Please try again.";
        return;
      }

      calorieResult.textContent = `${result.data.targetCalories} kcal/day`;
      calorieMessage.textContent = `This calorie target supports your selected goal of ${goal.toLowerCase()}.`;
      bmrResult.textContent = `${result.data.bmr} kcal/day`;
      maintenanceResult.textContent = `${result.data.maintenanceCalories} kcal/day`;
      goalResult.textContent = goal;
      calorieMessage.textContent = `BMR: ${result.data.bmr} kcal/day | Maintenance: ${result.data.maintenanceCalories} kcal/day`;
    } catch (error) {
      resetCalculatorResults();
      calorieResult.textContent = "-- kcal/day";
      calorieMessage.textContent =
        "Unable to connect to the backend. Please make sure the server is running.";
      console.error("Calculator API error:", error);
    } finally {
      calculateBtn.disabled = false;
      calculateBtn.textContent = "Calculate Calories";
    }
  });
  calculatorForm.addEventListener("reset", function () {
    setTimeout(() => {
      resetCalculatorResults();
    }, 0);
  });
}
