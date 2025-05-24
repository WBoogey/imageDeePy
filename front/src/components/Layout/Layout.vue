<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
    <AppHeader />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-6 md:p-12 overflow-y-auto transition-all duration-300">
        <transition name="fade" mode="out-in">
          <RouterView />
        </transition>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import Sidebar from './Sidebar.vue'
import Footer from './Footer.vue'
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s cubic-bezier(0.4,0,0.2,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>