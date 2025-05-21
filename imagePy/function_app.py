import azure.functions as func
import logging
import os
import json
import base64
from typing import Dict, Optional
from io import BytesIO

from PIL import Image
from transformers import pipeline
import torch

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# ----------------- CONFIGURATION -----------------
HF_MODEL_ID = os.getenv("HF_MODEL_ID", "microsoft/resnet-50")
DEVICE = 0 if torch.cuda.is_available() else -1
logging.info("Loading HF model %s on device %s", HF_MODEL_ID, DEVICE)
_PIPE = pipeline("image-classification", model=HF_MODEL_ID, device=DEVICE)

# CORS — autoriser la provenance du front (par défaut tout, à sécuriser en prod)
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")
CORS_HEADERS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

# ----------------- MAPPINGS TRI & RÉUTILISATION -----------------
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
    "plastic bottle": "Transformez-la en pot de fleurs ou en arrosoir.",
    "glass bottle": "Utilisez-la comme vase ou lampe déco DIY.",
    "can": "Coupez-la pour créer un pot à crayons ou un mini-cache-pot.",
    "jar": "Idéal pour conserver des aliments en vrac ou fabriquer une bougie maison.",
}

# ----------------- HELPER -----------------

def _classify_image(image: bytes) -> Dict[str, Optional[str]]:
    img = Image.open(BytesIO(image)).convert("RGB")
    preds = _PIPE(img, top_k=1)
    best_label = preds[0]["label"]
    best_label_lc = best_label.lower()
    return {
        "label": best_label,
        "bin": _CATEGORY_TO_BIN.get(best_label_lc, _CATEGORY_TO_BIN["__default__"]),
        "reuse": _CATEGORY_TO_REUSE.get(best_label_lc),
    }

# ----------------- HTTP ENTRYPOINT -----------------

@app.function_name(name="classify_waste")
@app.route(route="classify_waste", methods=["POST", "OPTIONS"])
def classify_waste(req: func.HttpRequest) -> func.HttpResponse:
    """Endpoint principal : reçoit une image et renvoie le tri + idée réutilisation."""

    # 0️⃣ CORS preflight
    if req.method == "OPTIONS":
        return func.HttpResponse("", status_code=204, headers=CORS_HEADERS)

    logging.info("Received a waste classification request")

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

        result = _classify_image(image_bytes)
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
