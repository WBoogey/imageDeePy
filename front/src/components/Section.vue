<template>
  <div class="container flex mt-10 justify-around ">
    <section class="">
      <h2 class="font-semibold">
        À propos
      </h2>
      <p class="max-w-90">
        Découvrez les bienfaits du recyclage et
        l'importance de protéger notre environnement
        pour les generations futures.
      </p>
    </section>
    <section>
      <h2 class="font-semibold">
        Matériaux recyclables
      </h2>
      <ul>
        <li v-for="(mat, index) in materiaux"  :key="index" class="decoration">
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