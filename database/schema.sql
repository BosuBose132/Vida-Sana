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

