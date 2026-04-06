function getActivityMultiplier(activity) {
  const activityMap = {
    Sedentary: 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extra Active": 1.9,
  };

  return activityMap[activity];
}

function calculateBMR({ gender, weight, height, age }) {
  if (gender === "Male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }

  if (gender === "Female") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return 10 * weight + 6.25 * height - 5 * age;
}
function adjustCaloriesByGoal(maintenanceCalories, goal) {
  if (goal === "Lose Weight") {
    return maintenanceCalories - 500;
  }

  if (goal === "Gain Weight") {
    return maintenanceCalories + 300;
  }

  return maintenanceCalories;
}
function calculateDailyCalories(userData) {
  const bmr = calculateBMR(userData);
  const activityMultiplier = getActivityMultiplier(userData.activity);
  const maintenanceCalories = bmr * activityMultiplier;
  const targetCalories = adjustCaloriesByGoal(
    maintenanceCalories,
    userData.goal,
  );

  return {
    bmr: Math.round(bmr),
    maintenanceCalories: Math.round(maintenanceCalories),
    targetCalories: Math.round(targetCalories),
  };
}
