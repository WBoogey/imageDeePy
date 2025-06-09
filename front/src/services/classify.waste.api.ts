import { reactive, ref } from "vue"

const fileInput = ref(null)
const loading = ref(false)
const error = ref<string | null>(null)
const result = reactive({ label: '', bin: '', reuse: null })

const API_URL = 'http://localhost:7071/api/classify_waste'

function reset() {
  error.value = null
  Object.assign(result, { label: '', bin: '', reuse: null })
}




export const FectClassifyWaste=()=>{
  reset()
  const file = fileInput.value?.files[0]
  if (!file) {
    error.value = 'Sélectionnez une image.'
    return
  }
  loading.value = true
  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': file.type || 'image/jpeg' },
      body: file,
    })
    const data = await resp.json()
    if (!resp.ok) throw new Error(data.error || 'Erreur API')
    Object.assign(result, data)
  } catch (e) {
    error.value = e.message
  }
}