<div align="center">
  <img src="public/hero-farm.jpg" alt="CropDiversify" width="600" />
  <h1>CropDiversify</h1>
  <p><strong>AI-powered crop recommendation platform for sustainable farming in Karnataka</strong></p>
</div>

---

## Overview

CropDiversify is an academic project built to help farmers in Karnataka make smarter, data-driven decisions about crop selection and farm management. The platform uses advanced machine learning (XGBoost) to analyze soil, climate, and market data, providing personalized crop recommendations that improve yield, profit, and soil health.

## Features

- 🌾 AI-powered crop recommendations (English & Kannada)
- 📊 Data-driven insights for soil, climate, and market conditions
- 🔄 Crop rotation and diversification strategies
- 🧑‍🌾 Farmer-friendly UI (React + Tailwind)
- 🗣️ Language toggle: English ↔ Kannada (full UI and chatbot)
- 🔒 Credentials protected: `.env` files are gitignored

## Technology Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn-ui
- Backend: FastAPI (Python), OpenAI-compatible API
- ML: XGBoost, Pydantic models

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+

### Setup
```sh
# Clone the repository
git clone https://github.com/Yashwanth003/crop-sahayaka.git
cd crop-sahayaka-main

# Install frontend dependencies
npm install

# Start frontend dev server
npm run dev

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
uvicorn main:app --reload