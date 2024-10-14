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
    <div v-if="!postStore.isLoading" class="flex flex-col gap-2">
      <div v-for="post in postStore.folderPosts" :key="post.id" class="flex w-full cursor-pointer rounded-lg p-2 flex-col gap-2 px-8" @click="activePost(post)" :class="{ 'bg-white dark:bg-[#525253]': post.id === postStore.activePost.id }" >
          <p class="text-2xl font-bold">{{ post.title }}</p>
          <div class="flex flex-row  items-center gap-2">
            <p class="text-sm font-bold">{{ new Date(post.created_at).toLocaleDateString() }}</p>
            <p class="text-sm">{{ post.content.length > 10 ? post.content.slice(0, 10) + '...' : post.content }}</p>
          </div>

      </div>

    </div>
  </div>
</template>

<script setup>
const recherche = ref('')
const postStore = usePostStore()
const router = useRouter()
function activePost(post){
  postStore.activePost = post
}

</script>
