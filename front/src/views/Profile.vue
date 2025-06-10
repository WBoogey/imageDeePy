<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h2 class="text-2xl font-extrabold mb-6 flex items-center gap-2">
      <span>👤</span> Profil & Empreinte carbone
    </h2>
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border border-green-100 flex flex-col items-center gap-4">
      <img :src="`https://api.dicebear.com/7.x/adventurer/svg?seed=${auth.isUsers?.username || 'Steve'}`" class="w-20 h-20 rounded-full border-2 border-green-200 shadow" />
      <span class="text-xl font-bold text-green-700">{{ auth.isUsers?.username || 'Utilisateur' }}</span>
      <span class="text-gray-500 text-sm">{{ auth.isUsers?.email }}</span>
      <div class="flex gap-8 mt-4">
        <div class="flex flex-col items-center">
          <span class="font-semibold text-gray-500">Analyses</span>
          <span class="text-2xl font-extrabold text-green-600 animate-count">12</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-semibold text-gray-500">Déchets triés</span>
          <span class="text-2xl font-extrabold text-green-600 animate-count">12/12</span>
        </div>
      </div>
      <div class="mt-4 text-green-700 font-bold flex items-center gap-2">
        <span>🌱 Empreinte carbone :</span>
        <span class="text-lg">Faible</span>
        <span class="bg-green-100 text-green-700 px-2 py-1 rounded-xl text-xs">Éco-citoyen ⭐</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes count {
  from { transform: scale(0.95);}
  to { transform: scale(1);}
}
.animate-count {
  animation: count 0.6s cubic-bezier(0.4,0,0.2,1);
}
</style>
