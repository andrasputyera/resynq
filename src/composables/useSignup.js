import { ref } from '@vue/reactivity'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPending.value = true

  try {
    const response = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!response) {
      throw new Error('Could not complete signup')
    }
    await response.user.updateProfile({ displayName })
    error.value = null
    isPending.value = false
    
    return response
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, signup, isPending }
}

export default useSignup