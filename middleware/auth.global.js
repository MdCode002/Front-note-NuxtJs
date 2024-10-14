// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  if (import.meta.client) {
    const authStore = useAuthStore()
    const router = useRouter()
      const token = authStore.token;
      if (!token && to.path !== '/' && to.path !== '/register') {
        return router.push('/')
      }
      if (token && (to.path === '/' || to.path === '/register')) {
        return router.push('/notes')
      }
    }
  })
  