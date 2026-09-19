# Mental Health Prediction System

A Machine Learning based Mental Health Prediction System that predicts a student's mental health score based on academic, social media usage, lifestyle and stress-related information.

The project provides a REST API using FastAPI and an interactive frontend built with HTML, CSS and JavaScript.

---

## Project Overview

This project uses a trained Machine Learning model to predict a student's mental health score from the following information:

- Age
- Gender
- Country
- Academic Level
- Most Used Social Media Platform
- Purpose of Social Media Usage
- Average Daily Usage Hours
- Daily Unlocks
- Study Hours
- Physical Activity Hours
- Sleep Hours
- Stress Level

The trained model is served through a FastAPI backend.

---

## Features

- Machine Learning based prediction
- FastAPI REST API
- Interactive web interface
- Pydantic input validation
- CORS enabled
- Swagger API documentation
- Pre-trained Machine Learning model
- Responsive frontend
- Real-time prediction through API

---

## Technologies Used

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- Pandas
- Joblib

### Machine Learning

- Scikit-learn
- Pre-trained ML model

### Frontend

- HTML5
- CSS3
- JavaScript

---

## Project Structure

```text
mental-health-prediction-ml/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Mental_Health_Model.pkl
├── main.py
├── requirements.txt
├── README.md
└── .gitignore
