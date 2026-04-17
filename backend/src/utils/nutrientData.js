//Nutrients to Watch for Vegans: A Guide to Essential Nutrients and Vegan Sources
const nutrientsToWatch = [
  {
    name: "Vitamin B12",
    whyItMatters:
      "Supports nerve function and red blood cell formation. It is one of the most important nutrients to plan carefully during a vegan transition.",
    veganSources: [
      "Fortified plant milk",
      "Fortified breakfast cereals",
      "Nutritional yeast",
      "B12 supplements",
    ],
    beginnerTip:
      "Many vegan diets need reliable fortified foods or supplements for Vitamin B12.",
  },
  {
    name: "Iron",
    whyItMatters: "Helps carry oxygen in the blood and supports energy levels.",
    veganSources: [
      "Lentils",
      "Beans",
      "Chickpeas",
      "Tofu",
      "Spinach",
      "Pumpkin seeds",
    ],
    beginnerTip:
      "Pair iron-rich foods with vitamin C foods like citrus, tomatoes, or bell peppers to support absorption.",
  },
  {
    name: "Calcium",
    whyItMatters:
      "Supports bone health, teeth, muscle function, and nerve signaling.",
    veganSources: [
      "Fortified plant milk",
      "Calcium-set tofu",
      "Kale",
      "Bok choy",
      "Tahini",
      "Fortified orange juice",
    ],
    beginnerTip:
      "Choose fortified plant milks or calcium-rich greens regularly.",
  },
  {
    name: "Vitamin D",
    whyItMatters:
      "Supports bone health, immune function, and helps the body use calcium.",
    veganSources: [
      "Sunlight exposure",
      "Fortified plant milk",
      "Fortified cereals",
      "Vitamin D supplements",
    ],
    beginnerTip:
      "Vitamin D can be low in many diets, especially with limited sunlight exposure.",
  },
  {
    name: "Omega-3",
    whyItMatters:
      "Supports heart health, brain function, and inflammation balance.",
    veganSources: [
      "Chia seeds",
      "Flax seeds",
      "Walnuts",
      "Hemp seeds",
      "Algae-based omega-3 supplements",
    ],
    beginnerTip:
      "Include chia or flax seeds often, and consider algae-based DHA/EPA sources if needed.",
  },
  {
    name: "Iodine",
    whyItMatters: "Supports thyroid function, which helps regulate metabolism.",
    veganSources: [
      "Iodized salt",
      "Seaweed in small amounts",
      "Some fortified foods",
    ],
    beginnerTip:
      "Use iodine sources carefully because both too little and too much iodine can be a concern.",
  },
  {
    name: "Protein",
    whyItMatters:
      "Supports muscle repair, fullness, immune function, and overall body maintenance.",
    veganSources: [
      "Lentils",
      "Chickpeas",
      "Beans",
      "Tofu",
      "Tempeh",
      "Seitan",
      "Quinoa",
    ],
    beginnerTip:
      "Include a protein source in each main meal, especially if your goal is muscle gain or weight management.",
  },
  {
    name: "Selenium",
    whyItMatters:
      "Supports thyroid health, antioxidant function, and immune health.",
    veganSources: [
      "Brazil nuts",
      "Whole grains",
      "Sunflower seeds",
      "Beans",
      "Mushrooms",
    ],
    beginnerTip:
      "Brazil nuts are rich in selenium, but only a small amount is usually needed.",
  },
];
const goalPriorityMap = {
  "Gain Weight": ["Protein", "Iron", "Calcium", "Omega-3"],
  "Lose Weight": ["Protein", "Iron", "Vitamin B12", "Calcium"],
  "Maintain Weight": ["Vitamin B12", "Iron", "Calcium", "Vitamin D"],
  "Improve General Health": [
    "Vitamin B12",
    "Vitamin D",
    "Omega-3",
    "Iodine",
    "Selenium",
  ],
};

const restrictionSourceMap = {
  soy: ["Tofu", "Tempeh", "Soy milk", "Edamame"],
  nut: ["Almonds", "Cashews", "Walnuts", "Brazil nuts", "Nut butters"],
  gluten: ["Seitan"],
};

module.exports = {
  nutrientsToWatch,
  goalPriorityMap,
  restrictionSourceMap,
};
