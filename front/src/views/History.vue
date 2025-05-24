<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h2 class="text-2xl font-extrabold mb-6 flex items-center gap-2">📁 Historique des analyses</h2>
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border border-green-100">
      <ul class="space-y-4">
        <li v-for="item in items" :key="item.id" class="flex items-center gap-3 animate-fade-in">
          <span class="text-2xl">{{ item.emoji }}</span>
          <span>
            {{ item.objet }} → <b :class="item.color">{{ item.cible }}</b>
            <span class="ml-2 text-xs text-gray-400">({{ item.date }})</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const items = [
  { id: 1, objet: "Bouteille plastique", cible: "Poubelle jaune", color: "text-yellow-700", emoji: "🧴", date: "Aujourd'hui" },
  { id: 2, objet: "Pomme", cible: "Compost", color: "text-green-700", emoji: "🍏", date: "Hier" },
  { id: 3, objet: "Brique alimentaire", cible: "Poubelle jaune", color: "text-yellow-700", emoji: "🧃", date: "Cette semaine" },
]
</script>
<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
</style>
