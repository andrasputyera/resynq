<template>
    <form @submit.prevent="submitHandle">
        <h4>Create New Playlist </h4>
        <input type="text" placeholder="Playlist title" required v-model="title">
        <textarea placeholder="Playlist description" required v-model="description"></textarea>
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <div class="error"></div>
        <button>Create</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage'

export default {
    setup() {
        const { url, filePath, uploadImage } = useStorage()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        // Allowed file types
        const types = ['image/png', 'image/jpeg']
        
        const handleChange = (event) => {
            // Choosing a file
            const selected = event.target.files[0]
            // Determine if image was selected or not
            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select a proper image file (png or jpg)'
            }
        }
        
        const submitHandle = async () => {
            if (file.value) {
                await uploadImage(file.value)
                console.log('image uploaded, url: ', url.value )
            }
        }

        return { title, description, handleChange, fileError, submitHandle }

    }
}
</script>

<style scoped>
  /* form {
    background: white;
  } */
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>