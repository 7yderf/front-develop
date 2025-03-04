// src/middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // ejecutar solo en el lado del cliente
  // if (process.client) {
  //   const authStore = useAuthStore()
  //   console.log('🚀 ~ defineNuxtRouteMiddleware ~ authStore:', authStore.user)
  //   console.log('🚀 ~ defineNuxtRouteMiddleware ~ from:', from)
  //   console.log('🚀 ~ defineNuxtRouteMiddleware ~ to:', to)

  //   try {
  //     const check = await authStore.checkSesion()
  //     console.log('🚀 ~ defineNuxtRouteMiddleware ~ authStore.user:', check)
  //     if (!check) {
  //       return navigateTo('/SingIn')
  //     }
  //     return true
  //   } catch (error) {
  //     return navigateTo('/SingIn')
  //   }
  // }
})
