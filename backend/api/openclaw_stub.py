# api/openclaw_stub.py
import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RealityCheck OpenClaw Stub")

# Allow frontend / Chrome extension to call
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for hackathon/demo
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load mock claims ---
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../config"))
mock_file = os.path.join(BASE_DIR, "mock_data.json")

with open(mock_file) as f:
    mock_claims = json.load(f)

# --- Endpoints ---

@app.get("/")
def root():
    return {"status": "OpenClaw stub backend running"}

@app.get("/claims")
def get_claims():
    """
    Returns preloaded mock claims
    """
    return {"claims": mock_claims}

@app.post("/analyze")
async def analyze_claim(claim: dict):
    """
    Simulate OpenClaw + Agnes AI output.
    Expects JSON: { "text": "Claim text here", "url": "optional" }
    Returns JSON: { "credibility_score": int, "flag": "✅/❌", "reasoning": str }
    """
    text = claim.get("text", "")

    # stub logic: mark anything with 'fake' as low credibility
    if "fake" in text.lower() or "xyz" in text.lower():
        score = 20
        flag = "❌"
        reasoning = "Claim contains signals of misinformation (stub)."
    else:
        score = 85
        flag = "✅"
        reasoning = "Claim appears credible (stub)."

    return {
        "credibility_score": score,
        "flag": flag,
        "reasoning": reasoning,
        "references": ["https://example.com/fact-check"]
    }
