import { useFetch } from '#app'
import { defineStore } from 'pinia'
export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: {},
    folderPosts: {},
    activePost: null,
    isLoadingEditor: false
  }),
  actions: {
    async fetchPosts() {
      try {
        const authStore = useAuthStore()
        this.isLoadingEditor = true
        const data = await $fetch(`${useRuntimeConfig().public.apiBase}/posts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: 'application/json'
          }
        })

        // Afficher les données de l'utilisateur pour le débogage
        console.log('posts data fetch:', data)

        // Enregistrer les données de l'utilisateur dans l'état
        
        this.posts = data
        console.log('posts state:', this.posts)
        this.isLoadingEditor = false
      } catch (error) {
        console.error('Fetch posts error:', error)
        this.isLoadingEditor = false
        throw error
      }
    },
    async createPost(post) {
      try {
        const authStore = useAuthStore()
        this.isLoadingEditor = true
        const response = await $fetch(`${useRuntimeConfig().public.apiBase}/posts`, {
          method: 'POST',
          body: post,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
           
          }
        })
        console.log('post created:', response)
        this.folderPosts.push(response)
        this.posts.push(response)
        this.isLoadingEditor = false
      } catch (error) {
        console.error('Create folder post :', error)
        throw error
      }
    },
    async updatePost(post) {
      try {
        const { data, error } = await useFetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          body: post
        })
        if (error.value) throw new Error(error.value)

        const index = this.posts.findIndex(p => p.id === post.id)
        if (index !== -1) {
          this.posts[index] = data.value
        }
      } catch (error) {
        console.error('Update post error:', error)
        throw error
      }
    },
    async deletePost(postsId) {
      try {
        const authStore = useAuthStore()
        this.isLoadingEditor = true
        const response =  await $fetch(`${useRuntimeConfig().public.apiBase}/posts/${postsId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: 'application/json'
          }
        })

        // Cette ligne filtre le tableau 'folders' pour supprimer le dossier avec l'ID spécifié
        // Elle crée un nouveau tableau contenant tous les dossiers sauf celui qui correspond à l'ID supprimé
        // Cela met à jour l'état local immédiatement après la suppression réussie sur le serveur
        this.folderPosts = this.folderPosts.filter(post => post.id !== postsId)
        this.posts = this.posts.filter(post => post.id !== postsId)
        this.isLoadingEditor = false
      } catch (error) {
        console.error('Destroy folder error:', error)
        this.isLoadingEditor = false
        throw error
      }
    },
    async fetchPostsByFolder(folderId) {
      this.folderPosts = this.posts.filter(post => post.folder_id === folderId)
    },
    async activePost(postId){
      this.activePost = this.posts.find(post => post.id === postId)
    }
  },
})
