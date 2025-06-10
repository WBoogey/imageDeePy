<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <header class="flex items-center justify-between px-8 py-4 bg-white/80 shadow-2xl z-20 backdrop-blur-md rounded-b-2xl border-b border-green-100">
    <div class="flex items-center gap-4">
      <img :src="`https://api.dicebear.com/7.x/adventurer/svg?seed=${auth.isUsers?.username || 'Invite'}`" class="w-10 h-10" />
      <RouterLink
        v-if="!auth.isAuthenticated"
        to="/"
        class="text-shadow-lg/40 font-bold text-green-700 text-3xl cursor-pointer"
      >CloudVision</RouterLink>
      <span
        v-else
        class="text-shadow-lg/40 font-bold text-green-700 text-3xl cursor-pointer"
      >CloudVision</span>
      <span class="ml-3 px-3 py-1 rounded-full bg-green-50 text-green-500 text-xs font-bold shadow">v1.0 BETA</span>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 pl-4 border-l border-gray-200">
        <span class="hidden md:inline font-bold text-green-700">{{ auth.isUsers?.username || 'Invité(e)' }}</span>
        <button
          v-if="auth.isAuthenticated"
          @click="auth.logout"
          class="ml-4 px-3 py-1 rounded bg-red-100 text-red-700 font-semibold text-xs hover:bg-red-200 transition"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </header>
</template>
