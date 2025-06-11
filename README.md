# Classificateur de Déchets

Ce projet est une application web permettant de classifier des déchets à partir d'une image, en indiquant la poubelle appropriée et en suggérant une idée de réutilisation. Il se compose d'un front-end en Vue 3 (Vite) et d'une API Python déployée sous Azure Functions utilisant un modèle de classification d'images.

## Structure du projet

- `front/` : Application web Vue 3 (Vite, Pinia, Vue Router, Cypress, Vitest)
- `imagePy/` : API Azure Functions en Python (transformers, torch, Pillow)
- `back/` : (Répertoire réservé, actuellement vide)

## Prérequis

- Node.js ≥ 18
- npm ≥ 9
- Python ≥ 3.8
- Accès à un GPU recommandé pour de meilleures performances (sinon CPU)

## Installation

### Frontend

```sh
cd front
npm install

### Frontend

cd imagePy
python -m venv .venv
source .venv/bin/activate
pip install -r 

###Lancer l'API localement

cd imagePy
func start

###Lancer le front

cd front
npm run dev
Lien de la Présentation:https://www.canva.com/design/DAGp_w7NS-E/4App767Qra5oyYxbxWGb6w/view?utm_content=DAGp_w7NS-E&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7ea1ff381e
