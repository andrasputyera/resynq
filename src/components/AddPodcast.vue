<template>
    <div class="add-podcast">
        <button v-if="!showForm" @click="showForm = true">Add Episode</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a new podcast</h4>
            <input type="text" placeholder="Episode title" required v-model="title">
            <input type="text" placeholder="Artist" required v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
   props: ['playlist'],
   setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false) 
    const { updateDoc } = useDocument('playlists', props.playlist.id)

    const handleSubmit = async () => {
      const newEpisode = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
      }
      await updateDoc({
        episodes: [...props.playlist.episodes, newEpisode]
      })
      title.value = ''
      artist.value = ''
    }

    return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style scoped>
  .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>