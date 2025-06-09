<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string >('')

const handleSubmit = async()=>{
  const data = {
    username: username.value,
    email: email.value,
    password: password.value
  }
  try {
    await auth.register(data)
    toast.success('Inscription réussie')
    router.push('/Dashboard')
  } catch (error) {
    console.log(error)
    toast.error('Erreur lors de l inscription')
  }
}
</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Register
          </h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form @submit.prevent="handleSubmit()"  class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">username</Label>
            <Input
              v-model="username"
              id="username"
              type="text"
              placeholder="Ehoura Yvann"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="email">email</Label>
            <Input
              v-model="email"
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
            <Input v-model="password" id="password" type="password" required />
          </div>
          <Button type="submit"  class="w-full">
            Register
          </Button>
          <Button variant="outline" class="w-full">
            Login with Google
          </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="/auth/login" class="underline">
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
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
