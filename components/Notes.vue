<template>
  <div class="w-1/4 h-full bg-white dark:bg-[#1c1c1e]  border-r dark:border-[rgb(0,0,0)] border-neutral-300 overflow-y-auto p-4">
    <div class="relative mb-4">
      <input 
        type="text" 
        class="w-full dark:bg-[#343436] bg-neutral-300    rounded-xl dark:text-white text-black p-1 px-10 outline-none" 
        placeholder="Recherche dans toutes les notes" 
        v-model="recherche"
      />
      <Icon 
        :name="recherche ? 'i-eos-icons:bubble-loading' : 'ion:search-outline'" 
        class="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-[#1d1d1d] dark:text-[#9a9a9b]"
      />
      <Icon 
        v-if="recherche"
        name="i-zondicons:close-solid" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1d1d1d] dark:text-[#9a9a9b] cursor-pointer"
        @click="recherche = ''"
      />
    </div>
  </div>
</template>

<script setup>
const recherche = ref('')
</script>
