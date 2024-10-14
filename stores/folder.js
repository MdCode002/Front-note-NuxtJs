import { defineStore } from 'pinia'

export const useFolderStore = defineStore('folder', {
  state: () => ({
        folders: {},
        activeFolder: null,
        isLoading: false
  }),
  actions: {
    async fetchFolders() {
      try {
        const authStore = useAuthStore()
        this.isLoading = true
        // Effectuer une requête pour récupérer les informations de l'utilisateur
        const data = await $fetch(`${useRuntimeConfig().public.apiBase}/folders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: 'application/json'
          }
        })

        // Afficher les données de l'utilisateur pour le débogage
        console.log('folders data fetch:', data)

        // Enregistrer les données de l'utilisateur dans l'état
        this.folders = data
        this.isLoading = false
      } catch (error) {
        // Afficher les erreurs lors de la récupération de l'utilisateur
        console.error('Fetch folders error:', error)
        this.isLoading = false
        throw error
      }
    },
    async createFolder(folder) {
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`${useRuntimeConfig().public.apiBase}/folders`, {
          method: 'POST',
          body: folder,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
           
          }
        })
        console.log('Folder created:', response)
        this.folders.push(response)
      } catch (error) {
        console.error('Create folder error:', error)
        throw error
      }
    },
    async destroyed(folderId) {
      try {
        const authStore = useAuthStore()
        const response =  await $fetch(`${useRuntimeConfig().public.apiBase}/folders/${folderId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: 'application/json'
          }
        })

        // Cette ligne filtre le tableau 'folders' pour supprimer le dossier avec l'ID spécifié
        // Elle crée un nouveau tableau contenant tous les dossiers sauf celui qui correspond à l'ID supprimé
        // Cela met à jour l'état local immédiatement après la suppression réussie sur le serveur
        this.folders = this.folders.filter(folder => folder.id !== folderId)
      } catch (error) {
        console.error('Destroy folder error:', error)
        throw error
      }
    },
  }
})