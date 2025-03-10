// src/stores/auth.ts
import { defineStore } from 'pinia'

interface User {
  // Define the properties of the user object here
}

interface AuthState {
  user: User | null,
  token: string | null,
  isAuth: boolean,
}
// eslint-disable-next-line import/prefer-default-export
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: '',
    token: null,
    isAuth: false,
  }),
  actions: {
    async setUser(newUser: User) {
      console.log('🚀 ~ setUser ~ newUser:', newUser)
      this.user = newUser
    },
    async login({ email, password }: { email: string, password: string }) {
      // Realiza la petición al backend para obtener el token
      const { public: { API_BASE_URL } } = useRuntimeConfig()
      const response = await fetch(`${API_BASE_URL}auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Credenciales inválidas')
      }

      const data = await response.json()
      console.log('🚀 ~ login ~ data:', data)
      // this.token = data.token
      this.user = data.data.user

      localStorage.setItem('user', JSON.stringify(data.data.user))
      // Guarda el token en localStorage
      // localStorage.setItem('auth_token', this.token as string)
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('user')
      window.location.href = '/'
    },
    initializeAuth() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        // Aquí puedes realizar una llamada al backend para obtener la información del usuario
      }
    },
    async checkSesion() {
      const { public: { API_BASE_URL } } = useRuntimeConfig()
      try {
        const response = await fetch(`${API_BASE_URL}check/`, {
          credentials: 'include',
        })
        console.log('🚀 ~ checkSesion ~ response:', response)
        if (response.status === 401) {
          return false
        }
        return true
      } catch (error) {
        throw new Error('No se pudo verificar la sesión')
      }
    },
    async logOut() {
      const { public: { API_BASE_URL } } = useRuntimeConfig()
      try {
        const response = await fetch(`${API_BASE_URL}logout/`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('No se pudo cerrar la sesión')
        }
        this.logout()
      } catch (error) {
        throw new Error('No se pudo cerrar la sesión')
      }
    },
  },
})
