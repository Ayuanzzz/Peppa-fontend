import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDataStore = defineStore('userData', () => {
    const userData = ref({})
    function getUserData() {
        userData.value = JSON.parse(localStorage.getItem('userData'))
    }
    return { userData, getUserData }
})