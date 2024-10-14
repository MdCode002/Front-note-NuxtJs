<template>
  <div class="w-2/4 h-full p-4 bg-white dark:bg-[#1c1c1e] overflow-y-hidden">
    <div class="flex justify-between">
      <Icon name="i-tabler:trash" class="text-xl text-[#ebb800] cursor-pointer" @click="deletePost" />
      <Icon name="i-clarity:note-line" class="text-xl text-[#ebb800] cursor-pointer" @click="createPost" />
    </div>
    <div v-if="postStore.activePost && !postStore.isLoadingEditor" class="w-full h-full pt-2 ">
      <textarea 
        v-model="postStore.activePost.content" 
        class="w-full h-full bg-transparent"
      ></textarea>
    </div>
    <div v-else-if="postStore.isLoadingEditor" class="w-full h-full flex items-center justify-center">
      <Icon name="i-eos-icons:bubble-loading" class="text-xl text-[#ebb800] cursor-pointer" />
    </div>
    <div v-else>
      <p>Aucune note sélectionnée ou disponible.</p>
    </div>
  </div>
</template>

<script setup>


const postStore = usePostStore()
const folderStore = useFolderStore()

function createPost() {
  postStore.createPost({
    title: 'Nouvelle note',
    content: 'Contenu de la note',
    folder_id: folderStore.activeFolder
  })
}

function deletePost() {
  if (postStore.activePost) {
    postStore.deletePost(postStore.activePost.id)
  }
}
</script>
