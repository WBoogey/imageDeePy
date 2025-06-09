from transformers import (
    ViTImageProcessor,
    ViTForImageClassification,
    Trainer,
    TrainingArguments
)
from datasets import load_dataset
from PIL import Image, ExifTags, UnidentifiedImageError
from sklearn.metrics import accuracy_score
import torch
import os

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Training on: {device}")

# Load dataset
dataset = load_dataset("imagefolder", data_dir="waste_data", split={"train": "train", "validation": "validation"})
labels = dataset["train"].features["label"].names

# ViT processor
processor = ViTImageProcessor.from_pretrained("google/vit-base-patch16-224-in21k")
orientation_tag = next((k for k, v in ExifTags.TAGS.items() if v == 'Orientation'), None)

def transform(example):
    try:
        image = example["image"]
        if image.mode != "RGB":
            image = image.convert("RGB")
        if hasattr(image, "getexif"):
            exif = image.getexif()
            if orientation_tag in exif:
                del exif[orientation_tag]
        inputs = processor(images=image, return_tensors="pt")
        return {
            "pixel_values": inputs["pixel_values"].squeeze(0),
            "label": example["label"]
        }
    except (UnidentifiedImageError, OSError, ValueError):
        return {"pixel_values": None, "label": None}

# Transform and filter dataset
dataset = dataset.map(transform, batched=False)
dataset["train"] = dataset["train"].filter(lambda x: x["pixel_values"] is not None and x["label"] is not None)
dataset["validation"] = dataset["validation"].filter(lambda x: x["pixel_values"] is not None and x["label"] is not None)

print("Train size:", len(dataset["train"]))
print("Val size:", len(dataset["validation"]))
print("Labels:", labels)

# Model
model = ViTForImageClassification.from_pretrained(
    "google/vit-base-patch16-224-in21k",
    num_labels=len(labels),
    id2label={str(i): label for i, label in enumerate(labels)},
    label2id={label: str(i) for i, label in enumerate(labels)},
)

# Metrics
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = torch.tensor(logits).argmax(dim=-1)
    return {"accuracy": accuracy_score(labels, preds)}

# Training arguments
training_args = TrainingArguments(
    output_dir="./vit-waste-model",
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    num_train_epochs=5,
    logging_dir="./logs",
    remove_unused_columns=False,
    push_to_hub=False,
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    greater_is_better=True,
    save_total_limit=1,
)

# Custom collator
def custom_collator(batch):
    pixel_values = []
    labels = []
    for item in batch:
        val = item["pixel_values"]
        if isinstance(val, list):
            val = torch.tensor(val)
        elif not isinstance(val, torch.Tensor):
            raise TypeError(f"Expected tensor but got {type(val)}")
        pixel_values.append(val)
        labels.append(item["label"])
    return {
        "pixel_values": torch.stack(pixel_values),
        "labels": torch.tensor(labels)
    }

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
    data_collator=custom_collator,
    compute_metrics=compute_metrics,
)

# Train and save
trainer.train()
model.save_pretrained("vit-waste-model", safe_serialization=True)
processor.save_pretrained("vit-waste-model")
print("✅ Model training complete.")
print("✅ Model saved to vit-waste-model.")
