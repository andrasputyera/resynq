<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up for an account</h3>
        <input type="text" placeholder="Username" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if=!isPending>Register for free!</button>
        <button v-if=isPending disabled>Loading</button>
    </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
   setup() {
        const { error, signup, isPending } = useSignup()
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const handleSubmit = async () => {
            const response = await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                router.push({ name: 'CreatePlaylist' })
            }
        }

        return { displayName, email, password, handleSubmit, error, isPending }
    } 
}
</script>

<style scoped>

</style>