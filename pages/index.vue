<template class="bg-[#1c1c1e]">
<div class="h-screen w-screen bg-[#1c1c1e]">
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto shadow-2xl" src="/assets/images/logo.png" alt="Note" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Se connecter à votre compte</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
          <div class="mt-2"> 
            <input id="email" name="email"  type="email" placeholder="example@gmail.com" autocomplete="email" v-model="email"  class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f5d255] sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
            
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" placeholder="********" autocomplete="current-password" v-model="password" class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f5d255] sm:text-sm sm:leading-6" />
          </div>
        </div>
        <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
        <div class="flex justify-center">
          <Button :disabled="isLoading" class="mt-4 bg-[#ffc600] font-semibold leading-6 text-white shadow-sm hover:bg-[#f5d255] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5d255]">
            <Icon name="line-md:loading-loop" class="w-4 h-4 mr-2 animate-spin " v-if="isLoading" />
            {{ isLoading ? 'Veuillez patienter...' : 'Se connecter' }}
          </Button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Vous n'avez pas de compte ?
        <a href="#" class="font-semibold leading-6 text-white hover:text-neutral-500">S'inscrire</a>
      </p>
    </div>
    </div>
</div>
</template>
<script setup>
import { Button } from '@/components/ui/button'
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const handleSubmit = async () => {
  try {
    error.value = ''
    
    // Vérification si l'email et le mot de passe sont remplis
    if (!email.value || !password.value) {
      error.value = 'Veuillez remplir tous les champs.'
      return
    }
    
    isLoading.value = true  // Démarre le chargement
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/notes')
  } catch (err) {
    error.value = 'Identifiants invalides. Veuillez réessayer.'
    console.error('Erreur de connexion:', err)
  } finally {
    isLoading.value = false  // Arrête le chargement
  }
}
</script>