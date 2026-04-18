CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE food_categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE vegan_foods (
  food_id INT PRIMARY KEY AUTO_INCREMENT,
  food_name VARCHAR(100) NOT NULL UNIQUE,
  category_id INT NOT NULL,
  calories DECIMAL(6,2) NOT NULL,
  protein DECIMAL(6,2) NOT NULL,
  carbs DECIMAL(6,2) NOT NULL,
  fats DECIMAL(6,2) NOT NULL,
  fiber DECIMAL(6,2) DEFAULT 0,
  iron DECIMAL(6,2) DEFAULT 0,
  calcium DECIMAL(6,2) DEFAULT 0,
  omega_3 DECIMAL(6,2) DEFAULT 0,
  serving_basis VARCHAR(20) NOT NULL DEFAULT '100g',
  is_nut_free BOOLEAN NOT NULL DEFAULT TRUE,
  is_soy_free BOOLEAN NOT NULL DEFAULT TRUE,
  is_gluten_free BOOLEAN NOT NULL DEFAULT TRUE,
  goal_tag ENUM('muscle_gain', 'weight_loss', 'maintenance', 'general_health') NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES food_categories(category_id)
);

CREATE TABLE food_replacements (
  replacement_id INT PRIMARY KEY AUTO_INCREMENT,
  non_vegan_item VARCHAR(100) NOT NULL,
  vegan_alternatives VARCHAR(255) NOT NULL,
  nutrient_focus VARCHAR(100),
  replacement_reason VARCHAR(255),
  usage_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);