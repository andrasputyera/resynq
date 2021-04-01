<template>
  <div class="home">
    <div v-if="error" class="error">Could not retrieve playlist</div>
    <div v-if="documents">
      <ListView :playlists="documents" />  
    </div>  
  </div>
</template>

<script>
// @ is an alias to /src
import ListView from '@/components/ListView'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { ListView },
  setup() {
    const { error, documents } = getCollection('playlists')

    return { error, documents }
  }
}
</script>
