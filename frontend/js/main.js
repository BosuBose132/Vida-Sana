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
    const response = await fetch(
      "http://localhost:3000/api/nutrients/recommend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          allergies,
        }),
      },
    );

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
    const response = await fetch("http://localhost:3000/api/nutrients");
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
function buildNutritionChart(food) {
  const chartItems = [
    {
      label: "Protein",
      value: Number(food.protein),
      max: 30,
    },
    {
      label: "Carbs",
      value: Number(food.carbs),
      max: 70,
    },
    {
      label: "Fats",
      value: Number(food.fats),
      max: 50,
    },
    {
      label: "Fiber",
      value: Number(food.fiber),
      max: 20,
    },
  ];

  return chartItems
    .map((item) => {
      const height = Math.max(10, Math.min((item.value / item.max) * 100, 100));

      return `
        <div class="chart-bar-group">
          <div class="chart-bar-track">
            <div class="chart-bar" style="height: ${height}%"></div>
          </div>
          <div class="chart-label">${item.label}</div>
          <div class="chart-value">${item.value}g</div>
        </div>
      `;
    })
    .join("");
}
function buildRecommendationCard(food) {
  const badges = [];

  if (food.is_nut_free) {
    badges.push('<span class="recommendation-flag">Nut Free</span>');
  }

  if (food.is_soy_free) {
    badges.push('<span class="recommendation-flag">Soy Free</span>');
  }

  if (food.is_gluten_free) {
    badges.push('<span class="recommendation-flag">Gluten Free</span>');
  }

  return `
    <article class="food-card-compact">
      <div class="food-card-top">
        <div class="food-card-icon">
          <i class="bi bi-flower1"></i>
        </div>
        <div class="food-card-heading">
          <h5 class="food-card-title mb-1">${food.food_name}</h5>
          <span class="recommendation-category-badge">${food.category_name}</span>
        </div>
      </div>

      <div class="food-card-meta">
        <span class="food-serving">Per ${food.serving_basis}</span>
        <span class="food-calories">${food.calories} kcal</span>
      </div>

      <p class="food-card-description">${food.description}</p>

      <div class="macro-preview">
        <div class="macro-pill protein">
          <span>Protein</span>
          <strong>${food.protein}g</strong>
        </div>
        <div class="macro-pill carbs">
          <span>Carbs</span>
          <strong>${food.carbs}g</strong>
        </div>
        <div class="macro-pill fats">
          <span>Fats</span>
          <strong>${food.fats}g</strong>
        </div>
      </div>

      <div class="recommendation-badges compact">
        ${badges.join("")}
      </div>

      <div class="food-hover-panel">
        <div class="hover-grid">
          <div class="hover-item"><span>Fiber</span><strong>${food.fiber}g</strong></div>
          <div class="hover-item"><span>Iron</span><strong>${food.iron} mg</strong></div>
          <div class="hover-item"><span>Calcium</span><strong>${food.calcium} mg</strong></div>
          <div class="hover-item"><span>Omega-3</span><strong>${food.omega_3} g</strong></div>
        </div>

        <div class="hover-reason">
          ${food.recommendationReason}
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

    const response = await fetch("http://localhost:3000/api/recommendations", {
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

    recommendationSummaryText.textContent = `Showing foods matched to your goal of ${result.data.goal}. Nutrition values are displayed using the serving basis listed on each food card.`;

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
