import { defineStore } from 'pinia'

export const itemStore = defineStore('item', {
    state: () => ({
        name: ''
    }),
    actions: {
        changeName(newName) {
            this.name = newName
        }
    }
})