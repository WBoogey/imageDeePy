<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <div class="flex justify-between items-center  px-6 text-center lg:pr-25 lg:pl-25 lg:pt-10">
    <div class="text-shadow-lg/40 font-bold text-6xl cursor-pointer">
      CloudVision
    </div>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='/auth/login'
            class="cursor-pointer relative text-lg inline-block after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
            Se connecter
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem class="m-4">
          <NavigationMenuLink href="/Dashboard/analyser" class="cursor-pointer relative text-lg inline-block after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              Mode invitée
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>