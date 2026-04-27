const foodsList = document.getElementById("foodsList");
const foodsState = document.getElementById("foodsState");
const foodsFilterBar = document.getElementById("foodsFilterBar");
const foodsSearchInput = document.getElementById("foodsSearchInput");
const foodsSearchBtn = document.getElementById("foodsSearchBtn");

let currentFoodsCategory = "";
let currentFoodsSearch = "";

const foodImageMap = {
  tofu: "../assets/tofu.jpeg",
  lentils: "../assets/lentils.jpeg",
  chickpeas: "../assets/chickpeas.jpeg",
  quinoa: "../assets/Quinoa.jpeg",
  almonds: "../assets/Almonds.jpeg",
  "chia seeds": "../assets/chiaseeds.jpeg",
  spinach: "../assets/spinach.jpeg",
  oats: "../assets/oats.jpeg",
  "brown rice": "../assets/brown-rice.jpeg",
  broccoli: "../assets/broccoli.jpeg",
  "peanut butter": "../assets/peanut-butter.jpeg",
  "soy milk": "../assets/soy-milk.jpeg",
  "sweet potato": "../assets/sweet-potato.jpeg",
  "black beans": "../assets/black-beans.jpeg",
  avocado: "../assets/avocado.jpeg",
  "pumpkin seeds": "../assets/pumpkin-seeds.jpeg",
  hummus: "../assets/hummus.jpeg",
  "oat milk": "../assets/oat-milk.jpeg",
  "chickpeas salad mix": "../assets/chickpea-salad-mix.jpeg",
  edamame: "../assets/edamame.jpeg",
  "flax seeds": "../assets/flax-seeds.jpeg",
  "quinoa bowl base": "../assets/quinoa-bowl.jpeg",
  tempeh: "../assets/tempeh.jpeg",
};

function getFoodImage(foodName) {
  const key = foodName.trim().toLowerCase();
  return foodImageMap[key] || "../assets/default-food.jpeg";
}

function buildFoodCard(food, index) {
  return `
    <div class="col-md-6 col-lg-4 col-xl-3 food-fade-in" style="animation-delay: ${index * 0.05}s;">
      <div class="food-db-card h-100">
        <img
          src="${getFoodImage(food.food_name)}"
          alt="${food.food_name}"
          class="food-db-image"
        />

        <div class="food-db-card-body">
          <h5 class="food-db-title mb-2">${food.food_name}</h5>
          <p class="food-db-description mb-0">
            ${food.description || "A nutritious vegan food option for your plant-based journey."}
          </p>
        </div>
      </div>
    </div>
  `;
}

async function loadFoods() {
  if (!foodsList || !foodsState) {
    return;
  }

  try {
    foodsState.classList.remove("d-none");
    foodsList.classList.add("d-none");
    foodsState.innerHTML =
      '<p class="text-muted mb-0">Loading foods from the database...</p>';

    const params = new URLSearchParams();
    if (currentFoodsCategory) params.append("category", currentFoodsCategory);
    if (currentFoodsSearch) params.append("search", currentFoodsSearch);

    const response = await fetch(
      `http://localhost:3000/api/foods?${params.toString()}`,
    );
    const result = await response.json();

    if (!response.ok) {
      foodsState.innerHTML = `<p class="text-muted mb-0">${result.message || "Unable to load foods."}</p>`;
      return;
    }

    const foods = result.data || [];

    if (foods.length === 0) {
      foodsState.innerHTML =
        '<p class="text-muted mb-0">No foods found for this filter.</p>';
      return;
    }

    foodsList.innerHTML = foods
      .map((food, index) => buildFoodCard(food, index))
      .join("");
    foodsState.classList.add("d-none");
    foodsList.classList.remove("d-none");
  } catch (error) {
    foodsState.innerHTML =
      '<p class="text-muted mb-0">Unable to connect to the foods API right now.</p>';
    console.error("Foods page error:", error);
  }
}

if (foodsFilterBar) {
  foodsFilterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    foodsFilterBar.querySelectorAll(".vs-chip").forEach((chip) => {
      chip.classList.remove("is-active");
    });

    button.classList.add("is-active");
    currentFoodsCategory = button.dataset.category || "";
    loadFoods();
  });
}

if (foodsSearchBtn) {
  foodsSearchBtn.addEventListener("click", () => {
    currentFoodsSearch = foodsSearchInput.value.trim();
    loadFoods();
  });
}

if (foodsSearchInput) {
  foodsSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      currentFoodsSearch = foodsSearchInput.value.trim();
      loadFoods();
    }
  });
}

loadFoods();
