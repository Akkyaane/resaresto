import { defineStore } from 'pinia'

export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({
    restaurants: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null

      try {
        const data = await $fetch('http://localhost:3000/restaurants/')

        this.restaurants = data
      } catch (err) {
        this.error = err.message || 'Erreur API'
      } finally {
        this.loading = false
      }
    }
  }
})