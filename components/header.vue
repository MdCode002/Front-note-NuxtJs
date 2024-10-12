<template>
   <header class="dark:bg-[#323236] bg-[#f2f2f7] text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-[#ebb800]">Notes</h1>
      <div class="flex items-center gap-6 justify-center">
        <button @click="toggleDarkMode" class="flex items-center gap-2">
          <Icon :name="isDarkMode ? 'i-carbon:sun' : 'i-carbon:moon'" class="text-xl dark:text-[#dbdbdb] text-[#38383c]" />
        </button>
        <DropdownMenu class="mr-4">
          <DropdownMenuTrigger>
            <Icon name="i-carbon:user-avatar-filled" class="text-3xl dark:text-[#dbdbdb] text-[#38383c] cursor-pointer pr-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="dark:bg-[#1c1c1e] bg-white   shadow-xl">
            <DropdownMenuLabel class="dark:bg-[#38383c] bg-[#eeeef0]">
              <h1 class="dark:text-white text-black">John Doe</h1>
              <p class="dark:text-gray-400 text-gray-500">john@doe.com</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled="true">
            </DropdownMenuItem>
            <DropdownMenuItem class="hover:bg-[#3d3d3d] ">
              <Icon name="i-carbon:logout" class="mr-2 text-red-500" />
              <p class="mr-2 text-red-500">Déconnexion</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
 
      
</template>
<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Vérifier le mode préféré de l'utilisateur au chargement
onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
