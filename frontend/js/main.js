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

loadNutrientsToWatch();
