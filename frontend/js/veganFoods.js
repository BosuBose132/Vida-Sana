const foodsList = document.getElementById("foodsList");
const foodsState = document.getElementById("foodsState");
const foodsFilterBar = document.getElementById("foodsFilterBar");
const foodsSearchInput = document.getElementById("foodsSearchInput");
const foodsSearchBtn = document.getElementById("foodsSearchBtn");

let currentFoodsCategory = "";
let currentFoodsSearch = "";

function buildFoodCard(food) {
  return `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="food-db-card h-100">
        <div class="food-db-card-body">
          <div class="food-db-top">
            <div class="food-db-icon"><i class="bi bi-flower1"></i></div>
            <div>
              <h5 class="food-db-title mb-1">${food.food_name}</h5>
              <span class="food-db-category">${food.category_name}</span>
            </div>
          </div>

          <p class="food-db-description mt-3">
            ${food.description || "A nutritious vegan food option for your plant-based journey."}
          </p>

          <div class="food-db-meta">
            <div><span>Calories</span><strong>${food.calories} kcal</strong></div>
            <div><span>Protein</span><strong>${food.protein}g</strong></div>
            <div><span>Carbs</span><strong>${food.carbs}g</strong></div>
            <div><span>Fats</span><strong>${food.fats}g</strong></div>
          </div>
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

    foodsList.innerHTML = foods.map(buildFoodCard).join("");
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
