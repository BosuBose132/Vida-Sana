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
