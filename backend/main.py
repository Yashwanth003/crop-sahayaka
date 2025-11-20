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

# Configure CORS - Allow both common dev ports and localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
    ],
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


# --- AI Model Interaction (GitHub Models Only) ---
# Initialize OpenAI client configured for GitHub Models inference endpoint.
# Requires GITHUB_TOKEN environment variable with appropriate permissions.
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
GITHUB_MODELS_BASE_URL = "https://models.github.ai/inference"
GITHUB_MODELS_NAME = "gpt-4o"

if not GITHUB_TOKEN:
    print("WARNING: GITHUB_TOKEN not set. AI features will not work.")
    client = None
else:
    try:
        print(f"\n[INIT] Initializing GitHub Models client...")
        print(f"[INIT] Base URL: {GITHUB_MODELS_BASE_URL}")
        print(f"[INIT] Model: {GITHUB_MODELS_NAME}")
        print(f"[INIT] Token present: {bool(GITHUB_TOKEN)}")
        client = OpenAI(base_url=GITHUB_MODELS_BASE_URL, api_key=GITHUB_TOKEN)
        print(f"[INIT] GitHub Models client initialized successfully!")
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        print(f"[INIT ERROR] Error initializing GitHub Models client: {e}\n{tb}")
        client = None

def create_ai_prompt(data: CropRequest) -> str:
    """Creates a detailed prompt for the AI model with crops, vegetables, and fruits."""
    return f"""
    Based on the following parameters for a farm in Karnataka, India:
    - District: {data.district}
    - Season: {data.season}
    - Annual Rainfall: {data.rainfall} mm
    - Fertilizer Use: {data.fertilizer} kg/ha
    - Pesticide Use: {data.pesticide} ltr/ha

    Provide a comprehensive crop diversification plan including:
    1. Major field crops (cereals, pulses, oilseeds)
    2. Vegetables (for income diversification and nutrition)
    3. Fruits (perennial and seasonal options)
    
    Generate realistic and contextually appropriate recommendations for the specified location.
    The JSON response must strictly adhere to the following structure, with no extra text or explanations:
    {{
      "metrics": {{
        "cropDiversity": "<a number between 1 and 10 representing the number of viable diverse options>",
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
          "name": "<Crop/Vegetable/Fruit Name 1>",
          "category": "<'Crop' | 'Vegetable' | 'Fruit'>",
          "confidence": <a prediction confidence percentage between 80 and 98>,
          "yield": "<expected yield in t/ha or kg/ha>",
          "profit": "<estimated profit in INR, e.g., '₹8,854'>",
          "benefit": <a diversification benefit score from 75 to 98>
        }},
        {{
          "name": "<Crop/Vegetable/Fruit Name 2>",
          "category": "<'Crop' | 'Vegetable' | 'Fruit'>",
          "confidence": <a prediction confidence percentage between 75 and 95>,
          "yield": "<expected yield in t/ha or kg/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 70 to 95>
        }},
        {{
          "name": "<Crop/Vegetable/Fruit Name 3>",
          "category": "<'Crop' | 'Vegetable' | 'Fruit'>",
          "confidence": <a prediction confidence percentage between 70 and 92>,
          "yield": "<expected yield in t/ha or kg/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 65 to 90>
        }},
        {{
          "name": "<Crop/Vegetable/Fruit Name 4>",
          "category": "<'Crop' | 'Vegetable' | 'Fruit'>",
          "confidence": <a prediction confidence percentage between 68 and 90>,
          "yield": "<expected yield in t/ha or kg/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 60 to 88>
        }},
        {{
          "name": "<Crop/Vegetable/Fruit Name 5>",
          "category": "<'Crop' | 'Vegetable' | 'Fruit'>",
          "confidence": <a prediction confidence percentage between 65 and 88>,
          "yield": "<expected yield in t/ha or kg/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 60 to 85>
        }},
        {{
          "name": "<Additional Crop/Vegetable/Fruit Name 6>",
          "category": "<'Crop' | 'Vegetable' | 'Fruit'>",
          "confidence": <a prediction confidence percentage between 60 and 85>,
          "yield": "<expected yield in t/ha or kg/ha>",
          "profit": "<estimated profit in INR>",
          "benefit": <a diversification benefit score from 55 to 80>
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
            detail="AI client is not initialized. Ensure GITHUB_TOKEN is set in backend/.env"
        )

    prompt = create_ai_prompt(request)
    # build system prompt with language instruction
    lang = (request.language or 'en').lower()
    system_message = {
        "role": "system",
        "content": (
            "You are an expert agricultural AI assistant named Crop-Sahayaka. Your purpose is to provide comprehensive crop diversification recommendations for farmers in Karnataka, India. "
            "Your recommendations MUST include a mix of: (1) field crops (cereals, pulses, oilseeds), (2) vegetables (for nutrition and market income), and (3) fruits (perennial or seasonal varieties). "
            "You must analyze the user's input and return your analysis only in a valid, minified JSON format. Do not include any explanatory text, markdown formatting, or anything outside of the JSON object. "
            "Ensure each recommendation includes a 'category' field set to either 'Crop', 'Vegetable', or 'Fruit' based on the type of produce. "
        )
    }

    if lang.startswith('kn'):
        system_message["content"] += "Respond strictly in Kannada."
    else:
        system_message["content"] += "Respond strictly in English."

    print(f"\n[RECOMMENDATIONS DEBUG] Language: {lang}")
    
    try:
        print(f"[RECOMMENDATIONS DEBUG] Calling GitHub Models API...")
        chat_completion = client.chat.completions.create(
            messages=[
                system_message,
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            model=GITHUB_MODELS_NAME,
            temperature=0.5,
        )

        response_content = chat_completion.choices[0].message.content
        print(f"[RECOMMENDATIONS DEBUG] Response received: {str(response_content)[:200]}...")
        # SDK might return parsed object or a string — handle both
        if isinstance(response_content, (dict, list)):
            return response_content
        try:
            return json.loads(response_content)
        except Exception:
            # fallback: return as-is
            return response_content

    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        print(f"\n[RECOMMENDATIONS ERROR] An error occurred during recommendations:")
        print(f"[RECOMMENDATIONS ERROR] Exception: {e}")
        print(f"[RECOMMENDATIONS ERROR] Traceback:\n{tb}")
        raise HTTPException(status_code=500, detail="Failed to get recommendations from GitHub Models API.")
    
@app.post("/chat")
async def handle_chat(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="AI client not initialized. Ensure GITHUB_TOKEN is set in backend/.env")

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
    
    print(f"\n[CHAT DEBUG] Incoming request - Language: {lang}, Message count: {len(request.messages)}")
    print(f"[CHAT DEBUG] Messages to send: {messages_with_system_prompt}")
    
    try:
        print(f"[CHAT DEBUG] Calling GitHub Models API with model={GITHUB_MODELS_NAME}...")
        chat_completion = client.chat.completions.create(
            messages=messages_with_system_prompt,
            model=GITHUB_MODELS_NAME,
            temperature=0.7,
            max_tokens=200,
        )
        reply = chat_completion.choices[0].message.content
        print(f"[CHAT DEBUG] Response received: {reply[:100]}...")
        return {"reply": reply}
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        print(f"\n[CHAT ERROR] An error occurred during chat:")
        print(f"[CHAT ERROR] Exception: {e}")
        print(f"[CHAT ERROR] Traceback:\n{tb}")
        raise HTTPException(status_code=500, detail=f"Failed to get chat response from GitHub Models API: {str(e)}")
