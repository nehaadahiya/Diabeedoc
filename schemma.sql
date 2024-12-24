CREATE DATABASE DiabeedocDB;

USE DiabeedocDB;

-- Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('patient', 'admin') NOT NULL
);

-- FoodItems Table
CREATE TABLE FoodItems (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(100) NOT NULL,
    food_category VARCHAR(50),
    calories INT,
    sugar_content INT,
    fiber_content INT,
    protein_content INT
);

-- HealthEvaluations Table
CREATE TABLE HealthEvaluations (
    evaluation_id INT AUTO_INCREMENT PRIMARY KEY,
    food_id INT,
    health_score DECIMAL(5,2),
    evaluation_date DATE,
    FOREIGN KEY (food_id) REFERENCES FoodItems(food_id)
);

-- Recommendations Table
CREATE TABLE Recommendations (
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    recommended_food_id INT,
    recommendation_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (recommended_food_id) REFERENCES FoodItems(food_id)
);
