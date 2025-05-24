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
        <input id="file-upload" type="file" class="hidden" @change="handleFile"/>
      </label>
      <div v-if="preview" class="mt-4 flex flex-col items-center">
        <img :src="preview" class="max-h-32 rounded-lg shadow" />
        <button class="mt-4 px-5 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow animate-pulse">
          Envoyer l’image
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dragActive = ref(false)
const preview = ref<string | null>(null)
function handleFile(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    preview.value = URL.createObjectURL(files[0])
  }
}
function handleDrop(e: DragEvent) {
  dragActive.value = false
  const files = e.dataTransfer?.files
  if (files && files[0]) {
    preview.value = URL.createObjectURL(files[0])
  }
}
</script>
