import { ref } from '@vue/reactivity'
import { projectAuth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {
    const response = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPending.value = false
    return response
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
    isPending.value = false
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin