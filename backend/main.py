import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from typing import List, Optional

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class CropRequest(BaseModel):
    district: str
    season: str
    rainfall: str
    fertilizer: str
    pesticide: str
    language: Optional[str] = 'en'

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    language: Optional[str] = 'en'


# --- AI Model Interaction ---
try:
    client = OpenAI(
        base_url="https://models.github.ai/inference",
        api_key=os.environ.get("GITHUB_TOKEN"),
    )
except Exception as e:
    print(f"Error initializing OpenAI client: {e}")
    client = None

def create_ai_prompt(data: CropRequest) -> str:
    """Creates a detailed prompt for the AI model."""
    return f"""
    Based on the following parameters for a farm in Karnataka, India:
    - District: {data.district}
    - Season: {data.season}
    - Annual Rainfall: {data.rainfall} mm
    - Fertilizer Use: {data.fertilizer} kg/ha
    - Pesticide Use: {data.pesticide} ltr/ha

    Provide a crop diversification plan. Generate realistic and contextually appropriate data for the specified location.
    The JSON response must strictly adhere to the following structure, with no extra text or explanations:
    {{
      "metrics": {{
        "cropDiversity": "<a number between 1 and 10 representing the number of viable diverse crops>",
        "soilHealth": "<a score out of 10.0 indicating potential soil health improvement>",
        "resilience": "<a score out of 10.0 indicating resilience to climate and market changes>"
      }},
      "radarData": [
        {{"category": "Sustainability", "value": <percentage between 70 and 95>}},
        {{"category": "Resilience", "value": <percentage between 70 and 95>}},
        {{"category": "Profit Stability", "value": <percentage between 65 and 90>}},
        {{"category": "Soil Health", "value": <percentage between 70 and 95>}},
        {{"category": "Diversification", "value": <percentage between 70 and 95>}}
      ],
      "recommendations": [
        {{
          "name": "<Crop Name 1>",
          "confidence": <a prediction confidence percentage between 80 and 98>,
          "yield": "<expected yield in t/ha>",
          "profit": "<estimated profit in INR, e.g., '₹8,854'>",
          "benefit": <a diversification benefit score from 75 to 98>
        }},
        {{
          "name": "<Crop Name 2>",
          "confidence": <a prediction confidence percentage between 75 and 95>,
          "yield": "<expected yield in t/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 70 to 95>
        }},
        {{
          "name": "<Crop Name 3>",
          "confidence": <a prediction confidence percentage between 70 and 92>,
          "yield": "<expected yield in t/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 65 to 90>
        }},
        {{
          "name": "<Crop Name 4>",
          "confidence": <a prediction confidence percentage between 68 and 90>,
          "yield": "<expected yield in t/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 60 to 88>
        }},
        {{
          "name": "<Crop Name 5>",
          "confidence": <a prediction confidence percentage between 65 and 88>,
          "yield": "<expected yield in t/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 60 to 85>
        }}
      ]
    }}
    """

# --- API Endpoint ---
@app.post("/recommendations")
async def get_crop_recommendations(request: CropRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="AI client is not initialized. Check your GITHUB_TOKEN."
        )

    prompt = create_ai_prompt(request)
    # build system prompt with language instruction
    lang = (request.language or 'en').lower()
    system_message = {
        "role": "system",
        "content": (
            "You are an expert agricultural AI assistant named Crop-Sahayaka. Your purpose is to provide crop diversification recommendations for farmers in Karnataka, India. "
            "You must analyze the user's input and return your analysis only in a valid, minified JSON format. Do not include any explanatory text, markdown formatting, or anything outside of the JSON object. "
        )
    }

    if lang.startswith('kn'):
        system_message["content"] += "Respond strictly in Kannada."
    else:
        system_message["content"] += "Respond strictly in English."

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                system_message,
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            model="openai/gpt-4o",
            response_format={"type": "json_object"},
            temperature=0.5,
        )

        response_content = chat_completion.choices[0].message.content
        # SDK might return parsed object or a string — handle both
        if isinstance(response_content, (dict, list)):
            return response_content
        try:
            return json.loads(response_content)
        except Exception:
            # fallback: return as-is
            return response_content

    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Failed to get recommendations from AI model.")
    
@app.post("/chat")
async def handle_chat(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="AI client not initialized.")

    # Prepend the system prompt that defines the chatbot's persona and expertise
    lang = (request.language or 'en').lower()
    system_prompt = {
        "role": "system",
        "content": (
            "You are 'AgriBot', a friendly and knowledgeable AI assistant for Indian farmers, specializing in the agriculture of Karnataka. Your expertise includes crop management, soil health, pest control, modern farming techniques, and government schemes relevant to Karnataka. Provide concise, helpful, and easy-to-understand answers. If a question is outside of this domain, politely state that you can only answer agriculture-related questions."
        )
    }

    if lang.startswith('kn'):
        system_prompt["content"] += " Reply in Kannada."
    else:
        system_prompt["content"] += " Reply in English."

    messages_with_system_prompt = [system_prompt] + [msg.dict() for msg in request.messages]
    
    try:
        chat_completion = client.chat.completions.create(
            messages=messages_with_system_prompt,
            model="openai/gpt-4o",
            temperature=0.7,
            max_tokens=200,
        )
        reply = chat_completion.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get chat response from AI model: {str(e)}")
