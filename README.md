# 🌱 Vida Sana – Compassion in Every Meal

Vida Sana is a web application designed to help individuals transition to a vegan lifestyle through personalized nutrition guidance, calorie calculation, vegan food recommendations, and educational resources.

The name “Vida Sana” means **Healthy Life**, reflecting the mission of helping users maintain a balanced and healthy plant-based lifestyle in a simple and accessible way.

---
## Try Now
https://vida-sana-8o14.vercel.app/

---

## Project Overview

Many people want to adopt a vegan lifestyle for health, ethical, or environmental reasons, but often struggle with:

- Understanding vegan nutrition
- Replacing animal-based nutrients properly
- Planning balanced meals
- Finding reliable nutritional information
- Calculating daily calorie requirements

Vida Sana solves these challenges by providing everything in a single platform.

---

## Features

### Personalized Calorie Calculator
Users can enter:
- Age
- Height
- Weight
- Gender
- Activity level
- Fitness goal

The application calculates daily calorie requirements using standard nutritional formulas.

---

### Vegan Food Recommendations
Based on the user's calorie goals and preferences, Vida Sana recommends plant-based foods with:
- Calories
- Protein
- Carbohydrates
- Healthy fats

Recommendations are filtered based on:
- Allergies
- Dietary restrictions
- Nutritional goals
---

### Vegan Nutrition Database
A curated database of vegan foods including:
- Lentils
- Tofu
- Chickpeas
- Quinoa
- Nuts
- Seeds
- Soy products
- Plant-based alternatives

Each food item contains nutritional information for better decision-making.

---

### Vegan Food Replacement Guide
Helps users replace common non-vegan foods with vegan alternatives.

Examples:
| Non-Vegan Food | Vegan Alternative |
|---|---|
| Meat | Tofu, Lentils |
| Milk | Almond Milk, Soy Milk |
| Eggs | Flaxseed Mix, Tofu |
| Butter | Vegan Butter, Coconut Oil |

---

### Nutritional Awareness
Vida Sana educates users about important nutrients often monitored in vegan diets:
- Vitamin B12
- Iron
- Calcium
- Vitamin D
- Omega-3
- Protein
- Iodine
- Selenium

---

## Technologies Used

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## Installation and Setup

### Clone the repository

git clone https://github.com/your-username/Vida-Sana.git
cd Vida-Sana

---

## Install Dependencies

npm install

---

## Configure Environment Variables

Create .env files

MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=yourpassword
MYSQLDATABASE=vidasana
MYSQLPORT=3306
PORT=3000

---

## Setup Databases

Run:

schema.sql
seed.sql

inside MySQL Workbench or Railway SQL console.

---

## Start the Server
npm start

Server runs on:

http://localhost:3000

---

## API Endpoint

Calculate Calories
POST /api/calories/calculate
Sample Request
{
  "age": 25,
  "gender": "male",
  "height": 175,
  "weight": 70,
  "activity": "moderate",
  "goal": "maintain"
}

---

## Deployment

Frontend

Deployed using: Vercel

Backend

Deployed using: Railway

---

## Expected Outcomes

Vida Sana aims to:

- Simplify the transition to veganism
- Improve nutritional awareness
- Help users maintain balanced diets
- Provide personalized vegan guidance
- Reduce confusion caused by scattered online resources

## Future Enhancements

Planned future implementations include:

🤖 AI-powered meal planning
💬 AI nutrition assistant/chatbot
🍲 Vegan recipe recommendation system
🛒 Vegan e-commerce integration
📱 Mobile application
📈 Nutrition tracking dashboard
🧠 Personalized health analytics

## 👨‍💻 Team Members
Bose Babu Bade
Nilaya Kondapally
Srikanth Mangali

## ❤️ Vision

Vida Sana is more than a college project, it is a vision to create a platform that makes healthy plant-based living simple, educational, and accessible for everyone.

“Compassion in Every Meal.”



