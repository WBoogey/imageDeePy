import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { type userType , type registerType, type registerResponseType , type LoginType , type loginResponseType} from '../types/types'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', () => {
  const cookie = useCookies()
  const isUsers =ref<userType | null>()
  const token = computed<string | undefined>(()=> cookie.get('jwt'))
  const isAuthenticated = computed(() => !!token.value)
  const router = useRouter()


  const register = async (data: registerType): Promise<registerResponseType> => {
    try {
      const res = await fetch('http://localhost:8001/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if(!res.ok){
        throw new Error("erreur lors de l'inscription")
      }else{
        const json :registerResponseType = await res.json()
        cookie.set('jwt', json.jwt)
        isUsers.value = json.user
        return json
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const login = async (data: LoginType): Promise<loginResponseType> => {
    try {
      const res = await fetch('http://localhost:8001/users/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if(!res.ok){
        throw new Error("erreur lors de la connexion")
      }else{
        const json:loginResponseType = await res.json()
        cookie.set('jwt', json.jwt)
        isUsers.value = json.user
        return json
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const fetchUser = async () =>{
    if (!token.value) return
    try {
      if (!isUsers.value) {
        // Décoder le token pour récupérer l'id
        const payload = JSON.parse(atob(token.value.split('.')[1]))
        const userId = payload.sub
        const res = await fetch(`http://localhost:8001/users/find/${userId}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        if (!res.ok) throw new Error('Utilisateur non trouvé')
        const json: userType = await res.json()
        isUsers.value = json
      }
    } catch (err) {
      console.error('Erreur utilisateur', err)
    }
  }

  const logout = ()=>{
    cookie.remove('jwt'),
    router.push('/')
    isUsers.value = null
  }

  return { isUsers, token, isAuthenticated, register, login, logout , fetchUser }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}