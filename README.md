# HRMS-lite
HRMS Lite – Employee & Attendance Management System
Project Overview

HRMS Lite is a lightweight Human Resource Management System that allows an admin to manage employee records and track employee attendance through a simple web interface.

The system demonstrates full-stack development including frontend, backend, database persistence, and deployment.

Live Application

Frontend (User Interface):
[text](https://app-deploy-eight.vercel.app/)

Backend API:
[text](https://hrms-lite-95zq.onrender.com)
Tech Stack
Frontend

React (Vite)

Axios

HTML/CSS

Backend

FastAPI (Python)

SQLAlchemy ORM

Database

SQLite

Deployment

Frontend: Vercel

Backend: Render

Code Repository: GitHub

Features Implemented
Employee Management

Add employee

View employee list

Delete employee

Unique employee ID validation

Attendance Management

Mark attendance

View attendance records

Attendance per employee

Backend Features

RESTful API

Server-side validation

Proper HTTP responses

Error handling

Running Locally
Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs on:

http://127.0.0.1:8000

Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

Assumptions & Limitations

Single admin user (no authentication)

SQLite database used for simplicity

No payroll or leave management

Future Improvements

Authentication system

Dashboard analytics

Role-based access

Employee search & filters

Author

Aahana Tyagi
