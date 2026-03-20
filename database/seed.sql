INSERT INTO food_categories(category_name) VALUES('Protein'),('Carbs'),('Healthy_Fats'),('Fiber-Rich'),('Iron-Rich');
 INSERT INTO vegan_foods
    -> (food_name, category_id, calories, protein, carbs, fats, fiber, iron, calcium, omega_3, is_nut_free, is_soy_free, is_gluten_free, goal_tag, description)
    -> VALUES
    -> ('Lentils', 1, 116, 9.0, 20.0, 0.4, 8.0, 3.3, 19, 0.1, 1, 1, 1, 'muscle_gain', 'Lentils are high in protein and fiber, great for muscle building and digestion.'),
    -> ('Chickpeas', 1, 164, 9.0, 27.0, 2.6, 8.0, 2.9, 49, 0.1, 1, 1, 1, 'muscle_gain', 'Chickpeas are rich in protein and carbs, supporting muscle growth and energy.'),
    -> ('Tofu', 2, 76, 8.0, 2.0, 4.8, 1.9, 1.8, 350, 0.3, 1, 0, 1, 'muscle_gain', 'Tofu is a soy-based protein, low in carbs, great for muscle repair.'),
    -> ('Tempeh', 2, 193, 19.0, 9.4, 11.0, 5.0, 2.7, 111, 0.6, 1, 0, 1, 'muscle_gain', 'Tempeh is fermented soy, high in protein and fiber for gut health.'),
    -> ('Quinoa', 3, 120, 4.4, 21.3, 1.9, 2.8, 1.5, 17, 0.1, 1, 1, 1, 'weight_loss', 'Quinoa is a complete protein grain, great for energy and weight management.'),
    -> ('Oats', 3, 389, 16.9, 66.3, 6.9, 10.6, 4.7, 54, 0.1, 1, 1, 1, 'weight_loss', 'Oats are high in fiber, slow-digesting carbs, perfect for weight control.'),
    -> ('Brown Rice', 3, 216, 5.0, 44.8, 1.8, 3.5, 0.8, 10, 0.0, 1, 1, 1, 'maintenance', 'Brown rice is a whole grain, providing complex carbs and fiber for sustained energy.'),
    -> ('Chia Seeds', 4, 486, 16.5, 42.1, 30.7, 34.4, 7.7, 631, 17.8, 1, 1, 1, 'muscle_gain', 'Chia seeds are high in omega-3, fiber, and protein, great for heart and muscle health.'),
    -> ('Flax Seeds', 4, 534, 18.3, 28.9, 42.2, 27.3, 5.7, 255, 22.8, 1, 1, 1, 'muscle_gain', 'Flax seeds are rich in omega-3 and fiber, supporting digestion and anti-inflammation.'),
    -> ('Almonds', 4, 575, 21.1, 21.6, 49.9, 12.5, 3.7, 264, 0.0, 0, 1, 1, 'muscle_gain', 'Almonds provide healthy fats, protein, and vitamin E for energy and heart health.'),
    -> ('Soy Milk', 2, 54, 3.3, 6.3, 1.8, 0.6, 0.4, 123, 0.4, 1, 0, 1, 'maintenance', 'Soy milk is plant-based protein, calcium-fortified, good for bone health.'),
    -> ('Peanut Butter', 4, 588, 25.0, 20.0, 50.0, 6.0, 0.6, 80, 0.0, 0, 1, 1, 'muscle_gain', 'Peanut butter is high in healthy fats and protein, ideal for energy and muscle growth.'),
    -> ('Black Beans', 1, 132, 8.9, 23.7, 0.5, 8.7, 2.1, 27, 0.0, 1, 1, 1, 'weight_loss', 'Black beans are rich in protein and fiber, perfect for satiety and weight management.'),
    -> ('Edamame', 2, 121, 11.9, 8.9, 5.2, 5.0, 2.3, 61, 0.3, 1, 0, 1, 'muscle_gain', 'Edamame is young soybeans, high in protein, fiber, and antioxidants.'),
    -> ('Avocado', 4, 160, 2.0, 9.0, 15.0, 7.0, 0.6, 12, 0.1, 1, 1, 1, 'weight_loss', 'Avocado is rich in healthy fats and fiber, supports heart health and satiety.');
Query OK, 15 rows affected (0.03 sec)
Records: 15  Duplicates: 0  Warnings: 0