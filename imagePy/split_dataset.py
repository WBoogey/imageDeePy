import os
import shutil
import random

SOURCE_DIR = "my_dataset"
DEST_DIR = "waste_data"
SPLIT_RATIO = 0.8  # 80% train, 20% val

def split_dataset():
    for class_name in os.listdir(SOURCE_DIR):
        src_class_dir = os.path.join(SOURCE_DIR, class_name)
        images = [f for f in os.listdir(src_class_dir) if f.endswith((".jpg", ".jpeg", ".png"))]
        random.shuffle(images)

        split_idx = int(len(images) * SPLIT_RATIO)
        train_images = images[:split_idx]
        val_images = images[split_idx:]

        for split, split_images in [("train", train_images), ("val", val_images)]:
            split_class_dir = os.path.join(DEST_DIR, split, class_name)
            os.makedirs(split_class_dir, exist_ok=True)

            for img in split_images:
                src_img_path = os.path.join(src_class_dir, img)
                dst_img_path = os.path.join(split_class_dir, img)
                shutil.copyfile(src_img_path, dst_img_path)

if __name__ == "__main__":
    split_dataset()
    print("✅ Dataset split done.")
