import { projectStorage } from '@/firebase/config'
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
    const url = ref(null)
    const filePath = ref(null)
    const error = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const response = await storageRef.put(file)
            url.value = await response.ref.getDownloadURL()
        } catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async (path) => {
        // This is a different ref than the one listed above
        const storageRef = projectStorage.ref(path)

        try {
            await storageRef.delete()
        } catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage