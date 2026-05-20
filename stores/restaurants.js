import { defineStore } from 'pinia'

export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({
    restaurants: [],
    restaurant: null,
    loading: false,
    error: null,
    restaurantLoading: false,
    restaurantError: null
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null

      try {
        const data = await $fetch('http://localhost:3000/restaurants')

        this.restaurants = data
      } catch (err) {
        if (err?.status === 400 || err?.status === 404) {
          this.error = err?.data?.message || err.message
        } else {
          this.error = err?.data?.message || err.message || 'Erreur API'
        }
      } finally {
        this.loading = false
      }
    },

    async fetchBySlug(slug) {
      this.restaurantLoading = true
      this.restaurantError = null

      try {
        const data = await $fetch(`http://localhost:3000/restaurants/${slug}`)

        this.restaurant = data
      } catch (err) {
        if (err?.status === 400 || err?.status === 404) {
          this.restaurantError = err?.data?.message || err.message
        } else {
          this.restaurantError = err?.data?.message || err.message || 'Erreur API'
        }
      } finally {
        this.restaurantLoading = false
      }
    }
  }
})