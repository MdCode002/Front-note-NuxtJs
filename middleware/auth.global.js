// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  if (import.meta.client) {
    const router = useRouter()
      const token = localStorage.getItem('token');
      if (!token && to.path !== '/' && to.path !== '/register') {
        return router.push('/')
      }
      if (token && (to.path === '/' || to.path === '/register')) {
        return router.push('/notes')
      }
    }
  })
  