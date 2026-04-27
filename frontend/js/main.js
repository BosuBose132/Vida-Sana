const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://vida-sana-production.up.railway.app";

const calculatorForm = document.getElementById("calculatorForm");
const nutrientsList = document.getElementById("nutrientsList");

const personalizedNutrientsList = document.getElementById(
  "personalizedNutrientsList",
);
const personalizedNutrientsNote = document.getElementById(
  "personalizedNutrientsNote",
);
//recommendations page elements
const recommendationsList = document.getElementById("recommendationsList");
const recommendationsState = document.getElementById("recommendationsState");
const recommendationSummaryText = document.getElementById(
  "recommendationSummaryText",
);

const profileTargetCalories = document.getElementById("profileTargetCalories");
const profileGoal = document.getElementById("profileGoal");
const profileAllergies = document.getElementById("profileAllergies");
const profileActivity = document.getElementById("profileActivity");

async function loadPersonalizedNutrients(goal, allergies) {
  if (!personalizedNutrientsList || !personalizedNutrientsNote) {
    return;
  }

  personalizedNutrientsList.innerHTML =
    '<div class="text-muted small">Loading personalized nutrient guidance...</div>';

  try {
    const response = await fetch(`${API_BASE_URL}/api/nutrients/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal,
        allergies,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      personalizedNutrientsList.innerHTML =
        '<div class="text-muted small">Unable to load personalized nutrients right now.</div>';
      return;
    }

    personalizedNutrientsNote.textContent = result.data.note;
    personalizedNutrientsList.innerHTML = "";

    result.data.priorityNutrients.forEach((nutrient) => {
      const nutrientCard = document.createElement("div");
      nutrientCard.className = "personalized-nutrient-card";

      const sourcesHtml = nutrient.veganSources
        .map(
          (source) => `<span class="personalized-source-pill">${source}</span>`,
        )
        .join("");

      nutrientCard.innerHTML = `
        <h6 class="fw-bold mb-2">${nutrient.name}</h6>
        <p class="text-muted small mb-2">${nutrient.whyItMatters}</p>
        <div class="personalized-source-list">
          ${sourcesHtml}
        </div>
        <p class="personalized-tip mt-3 mb-0">${nutrient.beginnerTip}</p>
      `;

      personalizedNutrientsList.appendChild(nutrientCard);
    });
  } catch (error) {
    personalizedNutrientsList.innerHTML =
      '<div class="text-muted small">Unable to connect to personalized nutrient API.</div>';
    console.error("Personalized nutrients API error:", error);
  }
}
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

      const response = await fetch(`${API_BASE_URL}/api/calories/calculate`, {
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
      });

      const result = await response.json();

      if (!response.ok) {
        calorieResult.textContent = "-- kcal/day";
        calorieMessage.textContent = result.message || "Something went wrong.";
        return;
      }

      calorieResult.textContent = `${result.data.targetCalories} kcal/day`;
      calorieMessage.textContent = `BMR: ${result.data.bmr} kcal/day | Maintenance: ${result.data.maintenanceCalories} kcal/day`;
      loadPersonalizedNutrients(goal, allergies);
      //Save data to localStorage for recommendations page
      const recommendationProfile = {
        targetCalories: result.data.targetCalories,
        bmr: result.data.bmr,
        maintenanceCalories: result.data.maintenanceCalories,
        age,
        gender,
        height,
        weight,
        activity,
        goal,
        allergies,
      };

      sessionStorage.setItem(
        "vidaSanaRecommendationProfile",
        JSON.stringify(recommendationProfile),
      );
    } catch (error) {
      calorieResult.textContent = "-- kcal/day";
      calorieMessage.textContent =
        "Unable to connect to the backend. Please make sure the server is running.";
      console.error("Calculator API error:", error);
    }
  });
}
// Load nutrients to watch on page load
async function loadNutrientsToWatch() {
  if (!nutrientsList) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/nutrients`);
    const result = await response.json();

    if (!response.ok) {
      nutrientsList.innerHTML =
        '<span class="text-muted small">Unable to load nutrients right now.</span>';
      return;
    }

    nutrientsList.innerHTML = "";

    result.data.forEach((nutrient) => {
      const nutrientPill = document.createElement("span");
      nutrientPill.className = "nutrient-pill";
      nutrientPill.textContent = nutrient.name;

      nutrientsList.appendChild(nutrientPill);
    });
  } catch (error) {
    nutrientsList.innerHTML =
      '<span class="text-muted small">Unable to connect to nutrient API.</span>';
    console.error("Nutrients API error:", error);
  }
}
function buildNutritionRows(food) {
  const nutritionItems = [
    { label: "Calories", value: Number(food.calories), max: 700, unit: "kcal" },
    { label: "Protein", value: Number(food.protein), max: 35, unit: "g" },
    { label: "Carbs", value: Number(food.carbs), max: 70, unit: "g" },
    { label: "Fats", value: Number(food.fats), max: 50, unit: "g" },
    { label: "Fiber", value: Number(food.fiber), max: 20, unit: "g" },
    { label: "Iron", value: Number(food.iron), max: 10, unit: "mg" },
    { label: "Calcium", value: Number(food.calcium), max: 300, unit: "mg" },
    { label: "Omega-3", value: Number(food.omega_3), max: 3, unit: "g" },
  ];

  return nutritionItems
    .map((item) => {
      const percentage = Math.max(
        6,
        Math.min((item.value / item.max) * 100, 100),
      );

      return `
        <div class="nutrition-progress-row">
          <div class="nutrition-progress-top">
            <span class="nutrition-progress-label">${item.label}</span>
            <span class="nutrition-progress-value">${item.value.toFixed(2)} ${item.unit}</span>
          </div>
          <div class="nutrition-progress-track">
            <div class="nutrition-progress-fill" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function buildRecommendationCard(food) {
  return `
    <article class="recommendation-food-card compact-hover-card">
      <div class="compact-card-header">
        <div class="compact-card-icon">
          <i class="bi bi-flower1"></i>
        </div>
        <div>
          <h4 class="compact-card-title mb-1">${food.food_name}</h4>
          <span class="compact-card-category">${food.category_name}</span>
        </div>
      </div>

      <p class="compact-card-description">
        ${food.description}
      </p>

      <div class="compact-card-hover-hint">
        <i class="bi bi-bar-chart-line me-1"></i>
        Hover to view nutrition
      </div>

      <div class="compact-hover-panel">
        <div class="compact-hover-header">
          <h6 class="mb-0">Nutrition Overview</h6>
          <span class="compact-hover-subtitle">Per ${food.serving_basis}</span>
        </div>

        <div class="nutrition-progress-list">
          ${buildNutritionRows(food)}
        </div>
      </div>
    </article>
  `;
}
async function loadRecommendationsPage() {
  if (
    !recommendationsList ||
    !recommendationsState ||
    !recommendationSummaryText
  ) {
    return;
  }

  const storedProfile = sessionStorage.getItem("vidaSanaRecommendationProfile");

  if (!storedProfile) {
    recommendationsState.innerHTML =
      '<p class="text-muted mb-0">No calculator profile was found. Please complete the calculator first.</p>';
    recommendationSummaryText.textContent =
      "Complete the calculator first to see personalized food recommendations.";
    return;
  }

  let profile;
  try {
    profile = JSON.parse(storedProfile);
  } catch (error) {
    recommendationsState.innerHTML =
      '<p class="text-muted mb-0">Stored calculator data is invalid. Please complete the calculator again.</p>';
    recommendationSummaryText.textContent =
      "Please recalculate your profile to load recommendations.";
    return;
  }

  if (profileTargetCalories) {
    profileTargetCalories.textContent = `${profile.targetCalories} kcal/day`;
  }

  if (profileGoal) {
    profileGoal.textContent = profile.goal || "--";
  }

  if (profileAllergies) {
    profileAllergies.textContent = profile.allergies || "None";
  }

  if (profileActivity) {
    profileActivity.textContent = profile.activity || "--";
  }

  try {
    recommendationsState.innerHTML =
      '<p class="text-muted mb-0">Loading personalized recommendations from the database...</p>';

    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetCalories: profile.targetCalories,
        goal: profile.goal,
        allergies: profile.allergies,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      recommendationsState.innerHTML = `<p class="text-muted mb-0">${result.message || "Unable to load recommendations."}</p>`;
      return;
    }

    const foods = result.data.recommendedFoods || [];

    recommendationSummaryText.textContent = `Showing foods matched to your goal of ${result.data.goal}. Hover on any item to view nutrition values.`;

    if (foods.length === 0) {
      recommendationsState.innerHTML =
        '<p class="text-muted mb-0">No matching foods were found for the selected filters.</p>';
      return;
    }

    recommendationsList.innerHTML = foods
      .map((food) => buildRecommendationCard(food))
      .join("");

    recommendationsState.classList.add("d-none");
    recommendationsList.classList.remove("d-none");
  } catch (error) {
    recommendationsState.innerHTML =
      '<p class="text-muted mb-0">Unable to connect to the recommendations API right now.</p>';
    console.error("Recommendations page error:", error);
  }
}

loadRecommendationsPage();
loadNutrientsToWatch();
