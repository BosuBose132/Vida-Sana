CREATE TABLE users (
user_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50),
email VARCHAR(20),
password VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE food_replacements (
    replacement_id INT PRIMARY KEY AUTO_INCREMENT,
    non_vegan_item VARCHAR(50),
    vegan_alternatives VARCHAR(50),
    nutrient_focus VARCHAR(50),
    replacement_reason VARCHAR(50),
    usage_type VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE food_categories(category_id INT AUTO_INCREMENT PRIMARY KEY,category_name VARCHAR(50));
 CREATE TABLE vegan_foods(food_id INT AUTO_INCREMENT PRIMARY KEY,food_name VARCHAR(50),category_id INT,calories FLOAT,protein FLOAT,carbs FLOAT, fats FLOAT,FOREIGN KEY (category_id) REFERENCES food_categories(category_id),fiber FLOAT,iron FLOAT,calcium FLOAT,omega_3 FLOAT,is_nut_free BOOLEAN,is_soy_free BOOLEAN,is_gluten_free BOOLEAN,goal_tag VARCHAR(50),description TEXT,CHECK (goal_tag IN ('muscle_gain', 'weight_loss', 'maintenance')));
 ALTER TABLE vegan_foods
    -> ADD fiber FLOAT,
    -> ADD iron FLOAT,
    -> ADD calcium FLOAT,
    -> ADD omega_3 FLOAT,
    -> ADD is_nut_free BOOLEAN,
    -> ADD is_soy_free BOOLEAN,
    -> ADD is_gluten_free BOOLEAN,
    -> ADD goal_tag VARCHAR(50),
    -> ADD description TEXT;
    ALTER TABLE vegan_foods
    -> ADD FOREIGN KEY (category_id) REFERENCES food_categories(category_id);
    ALTER TABLE vegan_foods
    -> MODIFY goal_tag ENUM('muscle_gain','weight_loss','maintenance');
    

