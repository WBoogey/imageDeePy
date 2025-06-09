import azure.functions as func
import logging
import os
import json
import base64
from typing import Dict, Optional
from io import BytesIO
from PIL import Image
from transformers import ViTImageProcessor, ViTForImageClassification
import torch
import torch.nn.functional as F
from requests_toolbelt.multipart import decoder

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# Model loading
MODEL_PATH = "vit-waste-model"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

logging.info("Loading local ViT model from %s", MODEL_PATH)
model = ViTForImageClassification.from_pretrained(MODEL_PATH).to(DEVICE)
processor = ViTImageProcessor.from_pretrained(MODEL_PATH)
id2label = model.config.id2label
logging.info(f"Model loaded with labels: {id2label}")

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")
CORS_HEADERS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

_CATEGORY_TO_BIN = {
    "plastic bottle": "jaune",
    "plastic": "jaune",
    "can": "jaune",
    "aluminium can": "jaune",
    "paper": "jaune",
    "cardboard": "jaune",
    "glass bottle": "jaune",
    "glass": "jaune",
    "__default__": "noire",
}

_CATEGORY_TO_REUSE = {
    "plastic bottle": "Transformez-la en pot de fleurs, en arrosoir ou en brique écologique.",
    "glass bottle": "Utilisez-la comme vase, bougeoir ou lampe déco DIY.",
    "can": "Coupez-la pour créer un pot à crayons ou un mini-cache-pot.",
    "cardboard": "Découpez-le pour fabriquer une boîte de rangement ou un support pour tablette.",
    "glass_bottle": "Recyclez-la ou transformez-la en carafe ou en objet décoratif.",
    "plastic_bottle": "Réalisez une mangeoire à oiseaux ou un porte-stylo.",
}

_CARBON_EMISSIONS = {
    "can": 0.2,                  # Aluminium
    "cardboard": 0.1,            # Papier/carton
    "glass bottle": 0.8,         # Variante ancienne
    "glass_bottle": 0.8,
    "plastic bottle": 1.5,       # Variante ancienne
    "plastic_bottle": 1.5,
    "__default__": 0.0           # On évite 'unknown' (tu peux mettre -1 si besoin)
}

def _predict_label(image: Image.Image) -> str:
    inputs = processor(images=image, return_tensors="pt").to(DEVICE)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=-1)
        confidence, pred = probs.max(dim=-1)
        confidence = confidence.item()
        pred = pred.item()
        logging.info(f"Predicted index: {pred} with confidence: {confidence:.2f}")
        if confidence < 0.5:
            return "unknown"
        return id2label.get(pred, "unknown")


def _handle_image(image_bytes: bytes) -> Dict[str, Optional[str]]:
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    label = _predict_label(image)
    label_lc = label.lower()
    return {
        "label": label,
        "bin": _CATEGORY_TO_BIN.get(label_lc, _CATEGORY_TO_BIN["__default__"]),
        "reuse": _CATEGORY_TO_REUSE.get(label_lc),
        "carbon_footprint_kgCO2e": _CARBON_EMISSIONS.get(label_lc, _CARBON_EMISSIONS["__default__"]),
    }

@app.function_name(name="classify_waste")
@app.route(route="classify_waste", methods=["POST", "OPTIONS"])
def classify_waste(req: func.HttpRequest) -> func.HttpResponse:
    if req.method == "OPTIONS":
        return func.HttpResponse("", status_code=204, headers=CORS_HEADERS)

    logging.info("Received a classification request")

    try:
        ctype = req.headers.get("content-type", "").lower()
        if ctype.startswith("application/json"):
            body = json.loads(req.get_body())
            encoded = body.get("image")
            if not encoded:
                raise ValueError("JSON payload must contain field 'image' (base64).")
            image_bytes = base64.b64decode(encoded)
        else:
            image_bytes = req.get_body()
        if not image_bytes:
            raise ValueError("No image data found in request.")

        result = _handle_image(image_bytes)
        return func.HttpResponse(
            json.dumps(result, ensure_ascii=False),
            mimetype="application/json",
            status_code=200,
            headers=CORS_HEADERS,
        )


    except Exception as exc:
        logging.exception("Bad request or internal error")
        return func.HttpResponse(
            json.dumps({"error": str(exc)}),
            status_code=400,
            headers=CORS_HEADERS,
        )
