from PIL import Image, UnidentifiedImageError
from pathlib import Path

def clean_directory(dataset_dir: str):
    root = Path(dataset_dir)
    for split in ["train", "validation"]:
        for class_dir in (root / split).iterdir():
            if not class_dir.is_dir():
                continue
            for img_path in class_dir.iterdir():
                if not img_path.suffix.lower() in [".jpg", ".jpeg", ".png"]:
                    print(f"Deleting unsupported file: {img_path}")
                    img_path.unlink()
                    continue
                try:
                    with Image.open(img_path) as img:
                        img.verify()  # just verify, no need to load
                except (UnidentifiedImageError, OSError, ValueError) as e:
                    print(f"[✘] Removing corrupted image: {img_path}")
                    img_path.unlink()

if __name__ == "__main__":
    clean_directory("waste_data")
