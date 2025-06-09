from duckduckgo_search import DDGS
import os
import requests

def download_images(query, folder, max_results=30):
    os.makedirs(folder, exist_ok=True)
    with DDGS() as ddgs:
        results = ddgs.images(query, max_results=max_results)
        for i, result in enumerate(results):
            try:
                img_data = requests.get(result["image"], timeout=5).content
                with open(f"{folder}/{i+1}.jpg", "wb") as f:
                    f.write(img_data)
            except Exception as e:
                print(f"Erreur téléchargement {result['image']}: {e}")

# Liste des classes + requêtes associées
classes = {
    "plastic_bottle": "plastic bottle waste",
    "glass_bottle": "glass bottle waste",
    "can": "soda can waste",
    "cardboard": "cardboard box waste",
    "paper": "paper waste",
    "aluminium_foil": "aluminium foil waste",
}

for label, query in classes.items():
    download_images(query, folder=f"my_dataset/{label}", max_results=30)
