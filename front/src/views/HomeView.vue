<template>
  <div class="max-w-md mx-auto bg-white shadow rounded-2xl p-6">
    <h1 class="text-2xl font-bold mb-4 text-center">Classificateur de déchets</h1>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="block w-full text-sm mb-4"
      @change="reset"
    />

    <button
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl disabled:opacity-60"
      :disabled="loading"
      @click="classify"
    >
      <span v-if="loading">Analyse…</span>
      <Button v-else>Classifier</Button>
    </button>

    <p v-if="error" class="mt-4 text-red-600">⚠️ {{ error }}</p>

    <div v-if="result" class="mt-6 space-y-3 text-lg">
      <p><strong>Objet détecté&nbsp;:</strong> {{ result.label }}</p>
      <p class="flex items-center gap-2">
        <strong>Poubelle&nbsp;:</strong>
        <span
          class="inline-block w-5 h-5 rounded"
          :class="result.bin === 'jaune' ? 'bg-yellow-400' : 'bg-gray-800'"
        ></span>
        {{ result.bin }}
      </p>
      <p v-if="result.reuse" class="italic text-green-700">💡 {{ result.reuse }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Button } from '@/components/ui/button'

// TODO: change if your API runs elsewhere
const API_URL = 'http://localhost:7071/api/classify_waste'

const fileInput = ref(null)
const loading = ref(false)
const error = ref(null)
const result = reactive({ label: '', bin: '', reuse: null })

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
/* Un léger thème si Tailwind n'est pas disponible */
</style>

