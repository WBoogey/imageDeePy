import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { type userType , type registerType, type registerResponseType , type LoginType , type loginResponseType} from '../types/types'


export const useAuthStore = defineStore('auth', () => {
  const cookie = useCookies()
  const isUsers =ref<userType | null>()
  const token = computed<string | undefined>(()=> cookie.get('jwt'))


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
        cookie.set('jwt', json.token)
        console.log(json.token)
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
        cookie.set('jwt', json.token)
        console.log(json.token)
        return json
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  
  const fetchUser = async () =>{
    if (!token.value) return
    console.log(token.value)
    try {
      const res = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      const json: userType = await res.json()
      isUsers.value = json
      console.log(`user depuis fethc ${isUsers.value}`)
    } catch (err) {
      console.error('Erreur utilisateur', err)
    }
  }

  const logout = ()=>{
    cookie.remove('jwt'),
    isUsers.value = null
  }

  return { isUsers, token, register, login, logout , fetchUser }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}