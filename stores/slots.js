import { defineStore } from 'pinia'

export const useSlotsStore = defineStore('slots', {
  state: () => ({
    slots: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchByRestaurantAndDate(slug, restaurantId, date) {
      this.loading = true
      this.error = null

      try {
        const data = await $fetch(`http://localhost:3000/restaurants/${slug}/slots`, {
          query: {
            id: restaurantId,
            date,
          }
        })

        this.slots = Array.isArray(data) ? data : []
      } catch (err) {
        if (err?.status === 400 || err?.status === 404) {
          this.error = err?.data?.message || err.message
        } else {
          this.error = err?.data?.message || err.message || 'Erreur API'
        }
      } finally {
        this.loading = false
      }
    }
  }
})
