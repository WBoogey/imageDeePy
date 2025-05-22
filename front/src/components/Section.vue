<template>
  <div class="container flex mt-10 justify-around ">
    <section class="">
      <h2 class="text-xl font-semibold mb-10">
        À propos
      </h2>
      <p class="max-w-90">
        Découvrez les bienfaits du recyclage et
        l'importance de protéger notre environnement
        pour les generations futures.
      </p>
    </section>
    <section>
      <h2 class="text-xl font-semibold mt-2 mb-9">
        Matériaux recyclables
      </h2>
      <ul class="list-disc flex flex-wrap max-w-40 justify-between gap-11">
        <li v-for="(mat, index) in materiaux"  :key="index" class="">
          {{ mat }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

  const materiaux = ref([
    "Papier",
    "Plastique",
    "Métal",
    "Verre",
    "Organique"
  ])
</script>