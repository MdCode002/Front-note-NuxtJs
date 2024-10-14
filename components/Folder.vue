<template>
  <div class="w-1/4 h-full bg-white dark:bg-[#202023] flex flex-col justify-between border-r dark:border-[rgb(0,0,0)] border-neutral-300 overflow-y-auto px-5 pt-6">
    <div v-if="!folderStore.isLoading"  class="flex flex-col gap-2">
      <div v-if="newFolder" class="flex flex-row items-center  gap-2 cursor-pointer p-2 rounded-lg">
        <Icon name="ion:folder-outline" class="text-[#ebb800] text-xl" />
        <input 
          v-model="newFolderName" 
          type="text" 
          class="dark:bg-[#202023] bg-white dark:text-white border-solid border-[#ebb800] text-black w-full"
          placeholder="Nouveau dossier"
          autofocus
          @keyup.enter="createFolder"
          @blur="cancelNewFolder"
        >
      </div>
      <div v-for="(folder,index) in folderStore.folders" @click="isActiveFolder(folder.id,index)" :key="folder.id" class="flex flex-row items-center gap-2 cursor-pointer dark:hover:bg-[#4b4b51] p-2 rounded-lg group" :class="{' bg-[#ebb800] hover:bg-[#ebb800] dark:hover:bg-[#ebb800]': isActive === index}">
        <Icon name="ion:folder-outline" class="text-[#c7a52b]  text-xl" :class="{' text-[#f8efcc]': isActive === index} "/>
        <h2 class="dark:text-white font-semibold text-black text-sm flex-grow">{{ folder.name }}</h2>
        <DropdownMenu class="mr-4">
          <DropdownMenuTrigger>
            <Icon name="i-icon-park-twotone:more-two"  class="dark:text-[#c4c4c4] text-[#858585] text-xl opacity-0 group-hover:opacity-100 transition-opacity ease-in" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="dark:bg-[#1c1c1e] bg-white   shadow-xl">
            <DropdownMenuItem class="hover:bg-[#3d3d3d] cursor-pointer" @click="deleteFolder(folder.id)">
              <Icon name="i-tabler:trash" class="mr-2 text-red-500" />
              <p class="mr-2 text-red-500">Supprimer</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div v-if="Object.keys(folderStore.folders).length === 0 && !newFolder " class="flex flex-col justify-center items-center" >
        <Icon name="i-tabler:folder-off" class="text-[#ebb800] text-4xl" />
        <p class="text-[#ebb800] text-sm">Aucun dossier trouvé</p>
      </div>

    </div>

    <div v-if="folderStore.isLoading" class="flex flex-col gap-2">
      <Skeleton class="w-2/4 h-10 bg-gray-200 dark:bg-[#3f3f44]" />
      <Skeleton class="w-3/4 h-10 bg-gray-200 dark:bg-[#3f3f44]" />
      <Skeleton class="w-full h-10 bg-gray-200 dark:bg-[#3f3f44]" />
    </div>
    
    <div class="flex flex-col gap-2 mb-4">
      <div class="flex flex-row items-center gap-2 py-2 cursor-pointer hover:bg-[#4b4b51] transition-colors duration-300 p-2 rounded-lg" @click="showNewFolderInput">
        <Icon name="i-ei:plus" class="text-[#ebb800] text-2xl" />
        <h2 class="text-[#ebb800] text-sm font-bold">Nouveau Dossier</h2>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const folderStore = useFolderStore()
const newFolder = ref(false)
const newFolderName = ref('')
let isActive = ref(0)
const postStore = usePostStore()
function isActiveFolder(id, index) {
  isActive.value = index
  postStore.fetchPostsByFolder(id).then(() => {
    if (postStore.folderPosts.length > 0) {
      postStore.activePost = postStore.folderPosts[0]
    } else {
      postStore.activePost = null
    }
  })
  folderStore.activeFolder = id
}

function showNewFolderInput() {
  newFolder.value = true
}

function cancelNewFolder() {
  newFolder.value = false
  newFolderName.value = ''
}

function deleteFolder(folderId) {
  folderStore.destroyed(folderId)
}

function createFolder() {
  if (newFolderName.value.trim()) {
    folderStore.createFolder({name:newFolderName.value})
    cancelNewFolder()
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      folderStore.fetchFolders(),
      postStore.fetchPosts()
    ]);
    if (folderStore.folders.length > 0) {
      await postStore.fetchPostsByFolder(folderStore.folders[0].id);
    } else {
      // Gérez le cas où il n'y a pas de dossiers
      console.log('Aucun dossier trouvé');
      // Vous pouvez réinitialiser les posts ou afficher un message à l'utilisateur
      postStore.posts = [];
      postStore.currentPost = null;
    }
  } catch (error) {
    console.error('Erreur lors du chargement initial:', error);
  }
});
</script>

