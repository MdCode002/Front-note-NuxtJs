<template>
   <header class="dark:bg-[#323236] bg-[#f2f2f7] text-white px-4 py-1 flex justify-between items-center">
      <h1 class="text-xl font-bold text-[#ebb800]">Notes</h1>
      <div class="flex items-center gap-6 justify-center">
        <button @click="toggleDarkMode" class="flex items-center gap-2">
          <Icon :name="isDarkMode ? 'i-carbon:moon' : 'i-carbon:sun'" class="text-xl dark:text-[#dbdbdb] text-[#38383c]" />
        </button>
        <DropdownMenu class="mr-4">
          <DropdownMenuTrigger>
            <Icon name="i-carbon:user-avatar-filled" class="text-3xl dark:text-[#dbdbdb] text-[#38383c] cursor-pointer pr-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="dark:bg-[#1c1c1e] bg-white   shadow-xl">
            <DropdownMenuLabel class="dark:bg-[#38383c] bg-[#eeeef0]">
              <h1 class="dark:text-white text-black">{{ user.name }}</h1>
              <p class="dark:text-gray-400 text-gray-500">{{ user.email }}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem class="hover:bg-[#3d3d3d] cursor-pointer" @click="logout">
              <Icon name="i-carbon:logout" class="mr-2 text-red-500" />
              <p class="mr-2 text-red-500">Déconnexion</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
 
      
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ref, onMounted } from 'vue'

let isDarkMode = ref(false)
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    user.darkmode(true)
  } else {
    document.documentElement.classList.remove('dark')
    user.darkmode(false)
  }
}
const router = useRouter()

const user = useAuthStore()
console.log(user)
const logout = () => {
  user.logout()
  router.push('/')
}

// Vérifier le mode préféré de l'utilisateur au chargement
onMounted(() => {
  if (user.is_dark === null) {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    isDarkMode.value = user.is_dark
  }
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
