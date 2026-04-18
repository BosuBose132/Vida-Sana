INSERT INTO users (name, email, password)
VALUES
('Heremoine Granger', 'hgranger08@gmail.com', 'Heremoine#08'),
('Lara Johnson', 'larajohnson123@gmail.com', 'larajohn@23'),
('Harry Potter', 'harrypotter8@gmail.com', 'Potter#Hogwarts'),
('Ron Whisley', 'ronwhisley80@gmail.com', 'spider@whisley'),
('Severus Snape', 'severuslily02@gmail.com', 'lilypotter@2');


INSERT INTO food_replacements (non_vegan_item, vegan_alternatives, nutrient_focus, replacement_reason, usage_type, notes)
VALUES
('Chicken', 'tofu/tempeh', 'protein', 'Avoid Animal meat and eat plant protein', 'curry/stir/grill', 'Tofu absorbs flavours well and tempeh has a firm, meat like texture'),
('Beef', 'Lentils/Mushrooms/Soychunks', 'Protein/Iron', 'Replace red meat with plant-based protein', 'Burgers/Curries/Bolognese', 'Lentils and soy chunks give similar protein with less fat'),
('Fish', 'Tofu/Jackfruit/Banana Blossom', 'Protein', 'Avoid seafood and choose plant alternatives', 'Fry/Curries/Tacos', 'Banana blossom mimics flaky fish texture very well'),
('Eggs', 'Flaxxed Egg/Chia seed Egg', 'Binding/Omega-3', 'Replace eggs for vegan baking', 'Baking / Pancakes', 'Forms gel that works as a natural binder' ),
('Milk', 'Soy Milk / Oat Milk / Almond Milk', 'Calcium', 'Replace dairy milk with plant milk', 'Tea / Coffee / Cereal', 'Soy milk is closest in protein to dairy milk'),
('Cheese', 'Cashew Cheese / Nutritional Yeast', 'Calcium', 'Avoid dairy cheese', 'Pasta / Pizza / Sauces', 'Nutritional yeast gives cheesy flavor without dairy'),
('Butter', 'Vegan Butter / Coconut Oil / Olive Oil', 'Healthy Fats', 'Replace dairy fat with plant fat', 'Cooking / Baking', 'Olive oil is heart-friendly and widely usable'),
('Yogurt', 'Coconut Yogurt / Soy Yogurt / Almond Yogurt', 'Probiotics', 'Replace dairy yogurt', 'Breakfast / Snacks', 'Plant yogurts provide probiotics without lactose'),
('Ice Cream', 'Coconut Milk Ice Cream / Almond Milk Ice Cream', 'Healthy Fats', 'Avoid dairy desserts', 'Desserts', 'Coconut base gives creamy texture naturally'),
('Mayonnaise', 'Vegan Mayo / Avocado', 'Healthy Fats', 'Replace egg-based mayo', 'Sandwich / Dressing', 'Avocado adds creaminess with healthy fats'),
('Bacon', 'Tempeh Bacon / Coconut Bacon', 'Protein', 'Avoid processed mea', 'Breakfast / Sandwiches', 'Tempeh gives smoky flavor and chewy texture'),
('Sausage', 'Plant-based Sausage / Tofu Sausage', 'Protein', 'Replace processed meat', 'Grilling / Breakfast', 'Plant sausages mimic taste and texture well'),
('Ground Meat', 'Lentils / Crumbled Tofu', 'Protein', 'Replace minced meat', 'Tacos / Curries / Pasta', 'Lentils give similar texture and absorb spices well'),
('Pork', 'Jackfruit / Mushrooms', 'Fiber', 'Avoid high-fat meat', 'BBQ / Stir-fry', 'Jackfruit mimics shredded meat texture'),
('Turkey', 'Tofu / Seitan', 'Protein', 'Replace poultry meat', 'Roasting / Sandwiches', 'Seitan has very close meat-like texture'),
('Egg (scramble)', 'Tofu Scramble', 'Protein', 'Replace eggs in breakfast', 'Breakfast', 'Tofu mimics scrambled eggs in texture and color'),
('Egg (baking)', 'Applesauce / Mashed Banana', 'Binding', 'Replace eggs in baking', 'Cakes / Muffins', 'Adds moisture and natural sweetness'),
('Egg (fluffy texture)', 'Aquafaba', 'Texture / Binding', 'Replace egg whites', 'Baking / Desserts', 'Whips like egg whites for fluffy texture'),
('Cream', 'Coconut Cream / Cashew Cream', 'Healthy Fats', 'Replace dairy cream', 'Curries / Soups', 'Cashew cream is smooth and neutral in taste'),
('Buttermilk', 'Plant Milk + Lemon Juice', 'Acidity', 'Replace fermented dairy', 'Baking', 'Creates same tangy effect for recipes'),
('Heavy Cream', 'Cashew Cream / Coconut Cream', 'Healthy Fats', 'Avoid heavy dairy fat', 'Pasta / Sauces', 'Provides richness without cholesterol'),
('Condensed Milk', 'Coconut Condensed Milk', 'Sugar / Texture', 'Replace dairy condensed milk', 'Desserts', 'Works well in sweets with similar thickness'),
('Sour Cream', 'Cashew Cream / Vegan Sour Cream', 'Healthy Fats', 'Replace fermented dairy', 'Dips / Toppings', 'Tangy and creamy like original'),
('Paneer', 'Tofu', 'Protein', 'Replace dairy cheese cubes', 'Curries', 'Tofu absorbs spices better than paneer'),
('Ghee', 'Coconut Oil / Vegan Butter', 'Healthy Fats', 'Replace animal fat', 'Cooking', 'Coconut oil gives similar richness'),
('Honey', 'Maple Syrup / Agave Syrup', 'Natural Sweetener', 'Avoid animal-derived sweetener', 'Drinks / Desserts', 'Maple syrup is a natural plant-based option');

INSERT INTO food_categories(category_name) VALUES('Protein'),('Carbs'),('Healthy Fats'),('Fiber Rich'),('Iron Rich');
 INSERT INTO vegan_foods (
  food_name,
  category_id,
  calories,
  protein,
  carbs,
  fats,
  fiber,
  iron,
  calcium,
  omega_3,
  serving_basis,
  is_nut_free,
  is_soy_free,
  is_gluten_free,
  goal_tag,
  description
)
VALUES
  ('Lentils', 1, 116, 9.0, 20.0, 0.4, 8.0, 3.3, 19, 0.1, '100g', TRUE, TRUE, TRUE, 'muscle_gain', 'Lentils are high in protein and fiber, great for muscle building and digestion.'),
  ('Chickpeas', 1, 164, 9.0, 27.0, 2.6, 8.0, 2.9, 49, 0.1, '100g', TRUE, TRUE, TRUE, 'muscle_gain', 'Chickpeas are rich in protein and carbs, supporting muscle growth and energy.'),
  ('Tofu', 1, 76, 8.0, 2.0, 4.8, 1.9, 1.8, 350, 0.3, '100g', TRUE, FALSE, TRUE, 'muscle_gain', 'Tofu is a soy-based protein, low in carbs, great for muscle repair.'),
  ('Tempeh', 1, 193, 19.0, 9.4, 11.0, 5.0, 2.7, 111, 0.6, '100g', TRUE, FALSE, TRUE, 'muscle_gain', 'Tempeh is fermented soy, high in protein and fiber for gut health.'),
  ('Quinoa', 2, 120, 4.4, 21.3, 1.9, 2.8, 1.5, 17, 0.1, '100g', TRUE, TRUE, TRUE, 'weight_loss', 'Quinoa is a complete protein grain, great for energy and weight management.'),
  ('Oats', 2, 389, 16.9, 66.3, 6.9, 10.6, 4.7, 54, 0.1, '100g', TRUE, TRUE, TRUE, 'weight_loss', 'Oats are high in fiber, slow-digesting carbs, perfect for weight control.'),
  ('Brown Rice', 2, 216, 5.0, 44.8, 1.8, 3.5, 0.8, 10, 0.0, '100g', TRUE, TRUE, TRUE, 'maintenance', 'Brown rice is a whole grain, providing complex carbs and fiber for sustained energy.'),
  ('Chia Seeds', 3, 486, 16.5, 42.1, 30.7, 34.4, 7.7, 631, 17.8, '100g', TRUE, TRUE, TRUE, 'general_health', 'Chia seeds are high in omega-3, fiber, and protein, great for heart and muscle health.'),
  ('Flax Seeds', 3, 534, 18.3, 28.9, 42.2, 27.3, 5.7, 255, 22.8, '100g', TRUE, TRUE, TRUE, 'general_health', 'Flax seeds are rich in omega-3 and fiber, supporting digestion and anti-inflammation.'),
  ('Almonds', 3, 575, 21.1, 21.6, 49.9, 12.5, 3.7, 264, 0.0, '100g', FALSE, TRUE, TRUE, 'muscle_gain', 'Almonds provide healthy fats, protein, and vitamin E for energy and heart health.'),
  ('Soy Milk', 3, 54, 3.3, 6.3, 1.8, 0.6, 0.4, 123, 0.4, '100g', TRUE, FALSE, TRUE, 'maintenance', 'Soy milk is plant-based protein, calcium-fortified, good for bone health.'),
  ('Peanut Butter', 3, 588, 25.0, 20.0, 50.0, 6.0, 0.6, 80, 0.0, '100g', FALSE, TRUE, TRUE, 'muscle_gain', 'Peanut butter is high in healthy fats and protein, ideal for energy and muscle growth.'),
  ('Black Beans', 1, 132, 8.9, 23.7, 0.5, 8.7, 2.1, 27, 0.0, '100g', TRUE, TRUE, TRUE, 'weight_loss', 'Black beans are rich in protein and fiber, perfect for satiety and weight management.'),
  ('Edamame', 1, 121, 11.9, 8.9, 5.2, 5.0, 2.3, 61, 0.3, '100g', TRUE, FALSE, TRUE, 'muscle_gain', 'Edamame is young soybeans, high in protein, fiber, and antioxidants.'),
  ('Avocado', 3, 160, 2.0, 9.0, 15.0, 7.0, 0.6, 12, 0.1, '100g', TRUE, TRUE, TRUE, 'general_health', 'Avocado is rich in healthy fats and fiber, supports heart health and satiety.');

