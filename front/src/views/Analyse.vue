<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h2 class="text-2xl font-extrabold mb-6 flex items-center gap-2">
      <span>🖼️</span> Analysez votre déchet
    </h2>
    <div
      class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-green-100 flex flex-col items-center gap-4 transition-all duration-300 hover:shadow-2xl"
      @dragover.prevent="dragActive = true"
      @dragleave.prevent="dragActive = false"
      @drop.prevent="handleDrop"
      :class="dragActive ? 'ring-2 ring-green-400' : ''"
    >
      <label for="file-upload" class="cursor-pointer w-full text-center py-4 border-2 border-dashed border-green-300 rounded-xl hover:bg-green-50 transition">
        <span class="block text-green-700 font-semibold mb-1">Glissez-déposez une image ici</span>
        <span class="text-gray-400 text-xs">(ou cliquez pour sélectionner un fichier)</span>
        <input id="file-upload" type="file" accept="image/*" class="hidden" @change="handleFile"/>
      </label>
      
      <!-- Affichage de l'image et bouton d'envoi -->
      <div v-if="preview" class="mt-4 flex flex-col items-center">
        <img :src="preview" class="max-h-32 rounded-lg shadow" />
        <button 
          @click="classifyWaste"
          :disabled="isLoading"
          class="mt-4 px-5 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
          :class="isLoading ? 'animate-pulse' : ''"
        >
          {{ isLoading ? 'Analyse en cours...' : 'Envoyer l\'image' }}
        </button>
      </div>

      <!-- Affichage des résultats -->
      <div v-if="result" class="mt-6 w-full">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 class="font-bold text-green-800 mb-2">Résultat de l'analyse :</h3>
          <ul class="text-green-700 text-sm space-y-1">
          <li><b>Catégorie détectée :</b> {{ result.label }}</li>
          <li><b>Poubelle conseillée :</b> {{ result.bin }}</li>
          <li><b>Idée de réutilisation :</b> {{ result.reuse ?? 'Aucune suggestion' }}</li>
          <li><b>Empreinte carbone (kgCO₂e) :</b> {{ result.carbon_footprint_kgCO2e }}</li>
        </ul>
          <p class="mt-2 text-sm text-gray-600">Cette analyse est basée sur un modèle d'IA et peut ne pas être précise à 100%.</p>
        </div>
      </div>

      <!-- Affichage des erreurs -->
      <div v-if="error" class="mt-6 w-full">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="font-bold text-red-800 mb-2">Erreur :</h3>
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createHistory } from '@/services/history.api'
import type { ImageInputRequest } from '@/types/history'
import { useAuthStore } from '@/stores/auth' // si tu veux l'userId
import { ref } from 'vue'
const auth = useAuthStore()
const userId = auth.isUsers?.id 

const dragActive = ref(false)
const preview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const result = ref<any>(null)
const error = ref<string | null>(null)

function handleFile(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    selectedFile.value = files[0]
    preview.value = URL.createObjectURL(files[0])
    // Reset les résultats précédents
    result.value = null
    error.value = null
  }
}

function handleDrop(e: DragEvent) {
  dragActive.value = false
  const files = e.dataTransfer?.files
  if (files && files[0]) {
    selectedFile.value = files[0]
    preview.value = URL.createObjectURL(files[0])
    // Reset les résultats précédents
    result.value = null
    error.value = null
  }
}

async function classifyWaste() {
  if (!selectedFile.value) {
    error.value = 'Aucun fichier sélectionné'
    return
  }

  isLoading.value = true

  try {
    const response = await fetch('http://localhost:7071/api/classify_waste', {
      method: 'POST',
      body: selectedFile.value,
      headers: {
        'Content-Type': selectedFile.value.type || 'image/jpeg',
      },
      mode: 'cors',
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Erreur API')
    result.value = data
    if (userId) {
    const historyData: ImageInputRequest = {
      userId,
      prompt: data.label, // ou un prompt personnalisé
      imageUrl: preview.value || '', // ou l'URL de l'image uploadée si tu la stockes
      createdAt: new Date()
    }
    
    try {
      await createHistory(historyData)
      // Optionnel : afficher un message de succès ou mettre à jour l'historique local
    } catch (e) {
      console.error('Erreur lors de l\'enregistrement de l\'historique', e)
    }
}
  } catch (e) {
    console.error(e)
    error.value = e instanceof Error ? e.message : 'Erreur inconnue'
  } finally {
    isLoading.value = false
  }
}

</script>