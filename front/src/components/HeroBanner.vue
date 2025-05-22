<script setup lang="ts">
import { Button } from '@/components/ui/button';

</script>
<template>
  <div class="container ml-15">
    <div class="flex gap-20">
      <section class="flex flex-col gap-35">
        <h1 class="mt-15 text-6xl leading-20 max-w-24  font-bold font-(family-name:--font-sans)">
          Recyclez
          facilement
        </h1>
        <span class="font-medium  max-w-100 leading-8 font-(family-name:--font-sans) ">
          Une solution pour recycler
          vos déchets
        </span>
        <div class="flex mt-20 gap-8">
          <Button class=" bg-primary p-3 border-1 border-(--primary-foreground) rounded-(--radius) text-background text-center hover:bg-secondary hover:text-primary-foreground hover:border-primary hover:border-1 transition-all duration-300">
            Se connecter
          </Button>
          <Button class="bg-secondary p-4 border-1 border-(--primary) hover:bg-primary-foreground hover:text-secondary transition-all duration-300 text-(--primary-foreground) rounded-(--radius)">
            Mode invitée
          </Button>
        </div>
      </section>
      <section class=" w-[65%] h-[800px] bg-no-repeat bg-cover bg-[url('../assets/Image_banner.svg')]">
      </section>
    </div>
  </div>
</template>