<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getAllHistories, deleteHistory } from '@/services/history.api'
import type { ImageOutputResponse } from '@/types/history'

const auth = useAuthStore()
const histories = ref<ImageOutputResponse[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchHistories() {
  if (!auth.isUsers?.id) return
  isLoading.value = true
  error.value = null
  try {
    histories.value = await getAllHistories(auth.isUsers.id)
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    isLoading.value = false
  }
}

async function handleDelete(id: number) {
  if (!confirm('Supprimer cet historique ?')) return
  try {
    await deleteHistory(id)
    histories.value = histories.value.filter(h => h.id !== id)
  } catch (e) {
    error.value = (e as Error).message
  }
}

onMounted(fetchHistories)
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h2 class="text-2xl font-extrabold mb-6 flex items-center gap-2">📁 Historique des analyses</h2>
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border border-green-100">
      <div v-if="isLoading" class="text-center text-green-700">Chargement...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <ul v-else class="space-y-4">
        <li v-for="item in histories" :key="item.id" class="flex items-center gap-3 animate-fade-in">
          <span class="text-2xl">🖼️</span>
          <span>
            {{ item.prompt }} → <b class="text-green-700">{{ item.imageUrl }}</b>
            <span class="ml-2 text-xs text-gray-400">({{ new Date(item.createdAt).toLocaleString() }})</span>
          </span>
          <button
            class="ml-auto px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
            @click="handleDelete(item.id)"
            title="Supprimer"
          >Supprimer</button>
        </li>
        <li v-if="histories.length === 0" class="text-gray-400 text-center">Aucun historique pour l’instant.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
</style>