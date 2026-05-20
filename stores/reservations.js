import { defineStore } from 'pinia'

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    reservation: null,
    loading: false,
    error: null,
  }),

  actions: {
    async createReservation(payload) {
      this.loading = true
      this.error = null

      try {
        const data = await $fetch('http://localhost:3000/reservations', {
          method: 'POST',
          body: payload,
        })

        this.reservation = data
        return data
      } catch (err) {
        if (err?.status === 400 || err?.status === 404) {
          this.error = err?.data?.message || err.message
        } else {
          this.error = err?.data?.message || err.message || 'Erreur API'
        }

        return null
      } finally {
        this.loading = false
      }
    },
  },
})
