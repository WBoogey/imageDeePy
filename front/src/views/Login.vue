<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {toast} from 'vue-sonner'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref<string>('')
const password = ref<string >('')

const handleSubmit = async()=>{
  const data = {
    email: email.value,
    password: password.value
  }
  try {
    await auth.login(data)
    toast.success('connexion réussie')
    router.push('/Dashboard/analyser')
  } catch (error) {
    console.log(error)
    toast.error('Erreur lors de la connexion')
  }
}


</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Login
          </h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form @submit.prevent="handleSubmit()" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              v-model="email"
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input v-model="password" id="password" name="password" type="password" required />
          </div>
          <Button  type="submit" class="w-full text-background">
            Login
          </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="/auth/register" class="underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="../assets/Image_banner.jpg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover border-l-4 border-gray-200 shadow-none bg-gradient-to-r from-white via-gray-50 to-gray-100"
      >
    </div>
  </div>
</template>
