<template>
  <div class="home-container">
    <!-- Logo -->
    <img
      class="logo"
      src="c:\Users\Izato\Downloads\recyclage.png"
      alt="Recyc'Art logo"
    />
    <!-- Titre -->
    <h1>Bienvenue sur Recyc'Art</h1>
    <p>Choisissez une image pour identifier le déchet :</p>

    <!-- Upload Image -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="upload-input"
      @change="reset"
    />

    <!-- Bouton d'analyse -->
    <div class="btn-container">
      <button @click="classify">
        ♻️ Identifier un déchet
      </button>
    </div>

    <!-- Affichage des résultats -->
    <div v-if="error" class="error">
      ⚠️ {{ error }}
    </div>

    <div v-if="result.label" class="result">
      <p><strong>Objet détecté :</strong> {{ result.label }}</p>
      <p class="flex items-center gap-2">
        <strong>Poubelle : </strong>
        <span
          class="inline-block w-5 h-5 rounded-full"
          :class="result.bin === 'jaune' ? 'bg-yellow-400' : 'bg-gray-700'"
        ></span>
        <span>{{ result.bin }}</span>
      </p>
      <p v-if="result.reuse" class="italic text-green-700">💡 {{ result.reuse }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const fileInput = ref(null)
const loading = ref(false)
const error = ref(null)
const result = reactive({ label: '', bin: '', reuse: null })

const API_URL = 'http://localhost:7071/api/classify_waste'

function reset() {
  error.value = null
  Object.assign(result, { label: '', bin: '', reuse: null })
}

async function classify() {
  reset()
  const file = fileInput.value?.files[0]
  if (!file) {
    error.value = 'Sélectionnez une image.'
    return
  }
  loading.value = true
  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': file.type || 'image/jpeg' },
      body: file,
    })
    const data = await resp.json()
    if (!resp.ok) throw new Error(data.error || 'Erreur API')
    Object.assign(result, data)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #e0f7fa, #fff);
  display: flex;
  justify-content: center;  /* Centre horizontalement */
  align-items: center;     /* Centre verticalement */
  height: 100vh;
  text-align: center;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;     /* Centre horizontalement tous les éléments */
  justify-content: center; /* Centre verticalement tous les éléments */
  width: 100%;
  max-width: 600px;        /* Limite la largeur pour un meilleur alignement */
  padding: 20px;           /* Espace autour du contenu */
  text-align: center;      /* Centre le texte à l'intérieur des éléments */
  padding-left: 530px;          /* Décale le contenu vers la droite */
  padding-top: 230px
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.upload-input {
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid #009688;
  cursor: pointer;
}

.btn-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  max-width: 300px;
}

button {
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
  background-color: #009688;
  color: white;
}

button:hover {
  background-color: #00796b;
  transform: scale(1.05);
}

.error {
  color: red;
}

.result {
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 8px;
}

.result strong {
  font-weight: bold;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 1.5rem;
}

@media (min-width: 600px) {
  .btn-container {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
