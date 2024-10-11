import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(credentials) {
   try {
     // Effectuer la requête de connexion à l'API
     const response = await $fetch(`${useRuntimeConfig().public.apiBase}/login`, {
       method: 'POST',
       body: credentials
     })

     // Afficher la réponse entière dans la console pour la vérifier
     console.log('Login full response:', response)

     // Extraire les données de la réponse
     const data = response

     // Vérifier que l'API a bien renvoyé un access_token
     if (!data || !data.access_token) {
       throw new Error('Invalid login response: access_token is missing')
     }

     // Enregistrer le token et l'utilisateur
     this.token = data.access_token
     localStorage.setItem('token', data.access_token)
     await this.fetchUser()
   } catch (error) {
     // Afficher les erreurs de connexion
     console.error('Login error:', error)
     throw error
   }
 },

    async fetchUser() {
      try {
        // Effectuer une requête pour récupérer les informations de l'utilisateur
        const data = await $fetch(`${useRuntimeConfig().public.apiBase}/user`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        // Afficher les données de l'utilisateur pour le débogage
        console.log('User data:', data)

        // Enregistrer les données de l'utilisateur dans l'état
        this.user = data
      } catch (error) {
        // Afficher les erreurs lors de la récupération de l'utilisateur
        console.error('Fetch user error:', error)
        throw error
      }
    },

    logout() {
      // Réinitialiser les informations d'authentification et supprimer le token local
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
