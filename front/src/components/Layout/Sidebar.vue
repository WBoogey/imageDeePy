<script setup lang="ts">
import { useAuthStore } from '@/stores/auth' // adapte le chemin si besoin
const auth = useAuthStore()
</script>

<template>
  <aside class="w-60 bg-white/80 border-r border-green-100 flex flex-col py-8 px-4 gap-4 shadow-xl h-[90vh] mt-7 ml-4 rounded-2xl justify-between backdrop-blur-md animate-fade-in">
    <nav class="flex flex-col gap-3">
      <RouterLink
        to="/analyser"
        class="flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition
        hover:bg-green-50 hover:text-green-700"
        active-class="bg-green-100 text-green-700 shadow"
      >
        <span>🖼️</span> <span>Analyser une image</span>
      </RouterLink>
      <RouterLink
        to="/historique"
        :class="[
          'flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition hover:bg-yellow-50 hover:text-yellow-700',
          !auth.isAuthenticated ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
        ]"
        active-class="bg-yellow-100 text-yellow-700 shadow"
        :tabindex="!auth.isAuthenticated ? -1 : 0"
      >
        <span>📁</span> <span>Historique</span>
      </RouterLink>
      <RouterLink
        to="/profil"
        :class="[
          'flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition hover:bg-blue-50 hover:text-blue-700',
          !auth.isAuthenticated ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
        ]"
        active-class="bg-blue-100 text-blue-700 shadow"
        :tabindex="!auth.isAuthenticated ? -1 : 0"
      >
        <span>👤</span> <span>Profil</span>
      </RouterLink>
    </nav>
    <!-- ... -->
  </aside>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateX(-24px);}
  to { opacity: 1; transform: translateX(0);}
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
</style>
