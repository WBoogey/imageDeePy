<script setup lang="ts">
import { Button } from '@/components/ui/button';

</script>
<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col lg:flex-row gap-5 lg:gap-10 lg:p-10">
      <section class="flex-1 flex-col gap-35 min-w-0  lg:m-auto lg:gap-45 ">
        <h1 class="mt-15 lg:mt-0 text-6xl lg:text-8xl  leading-20 lg:leading-30 max-w-24  font-bold font-(family-name:--font-sans)">
          Recyclez
          facilement
        </h1>
        <span class="font-medium  max-w-100  leading-8 font-(family-name:--font-sans) lg:text-xl">
          Une solution pour recycler
          vos déchets
        </span>
        <div class="flex mt-20 gap-8 ">
          <RouterLink to="/auth/login">
            <Button class="bg-green-500 p-4 lg:p-6 border-1 border-(--primary-foreground) rounded-(--radius) text-background text-center hover:bg-secondary hover:text-primary-foreground hover:border-primary hover:border-1 transition-all duration-300">
              Se connecter
            </Button>
          </RouterLink>
          <RouterLink to="/Dashboard/analyser">
            <Button class="bg-secondary p-4 lg:p-6 border-1 border-(--primary) hover:bg-primary-foreground hover:text-secondary transition-all duration-300 text-(--primary-foreground) rounded-(--radius)">
              Mode invitée
            </Button>
          </RouterLink>
        </div>
      </section>
      <section class="min-w-0 w-full lg:w-[650px] lg:h-[775px] h-[200px] bg-no-repeat bg-cover bg-[url('../assets/Image_banner.jpg')]">
      </section>
    </div>
  </div>
</template>