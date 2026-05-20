<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useReservationsStore } from '../../../../stores/reservations'

const route = useRoute()
const reservationsStore = useReservationsStore()
const localError = ref('')
const tokenInput = ref('')

const getRouteToken = () => {
  const queryToken = route.query.token
  const normalizedQueryToken = Array.isArray(queryToken) ? queryToken[0] : queryToken

  if (normalizedQueryToken) {
    return String(normalizedQueryToken).trim()
  }

  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  return String(slug || '').trim()
}

const statusMap = {
  confirmed: 'Confirmee',
  canceled: 'Annulee',
  cancelled: 'Annulee',
  pending: 'En attente',
}

const translatedStatus = computed(() => {
  const status = reservationsStore.reservation?.status
  return statusMap[status] || status || '-'
})

const formattedDate = computed(() => {
  const date = reservationsStore.reservation?.slot?.date
  if (!date) {
    return '-'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
})

const loadReservation = async (token) => {
  localError.value = ''

  if (!token) {
    reservationsStore.reservation = null
    localError.value = 'Token manquant.'
    return
  }

  const postResponse = await reservationsStore.postByToken(token)
  if (!postResponse) {
    return
  }

  await reservationsStore.fetchByToken(token)
}

const searchReservation = async () => {
  const token = tokenInput.value.trim()
  localError.value = ''

  if (!token) {
    localError.value = 'Veuillez saisir un token.'
    return
  }

  const currentToken = getRouteToken()

  if (currentToken !== token) {
    await navigateTo({
      path: '/reservations/by-token',
      query: {
        token,
      },
    })
    return
  }

  await loadReservation(token)
}

const cancelReservation = async () => {
  const reservationId = reservationsStore.reservation?.id
  const token = tokenInput.value.trim()

  if (!reservationId || !token) {
    return
  }

  const response = await reservationsStore.cancelReservation(reservationId, token)
  if (!response) {
    return
  }

  await reservationsStore.fetchByToken(token)
}

const initializeFromRoute = async () => {
  const routeToken = getRouteToken()

  if (!routeToken) {
    tokenInput.value = ''
    localError.value = ''
    reservationsStore.error = null
    reservationsStore.reservation = null
    return
  }

  tokenInput.value = routeToken
  await loadReservation(tokenInput.value)
}

onMounted(initializeFromRoute)

watch(
  () => [route.params.slug, route.query.token],
  async () => {
    await initializeFromRoute()
  }
)
</script>

<template>
  <div class="reservation-token-layout">
    <Navbar />

    <main class="reservation-token-container">
      <section class="reservation-token-card">
        <h1>Rechercher ma reservation</h1>

        <form class="search-form" @submit.prevent="searchReservation">
          <FormGroup
            input-id="reservation-token"
            label="Token"
            placeholder="Saisissez votre token"
            autocomplete="off"
            v-model="tokenInput"
          />

          <ButtonLg class="search-button" type="submit" :disabled="reservationsStore.loading">
            {{ reservationsStore.loading ? 'Chargement...' : 'Rechercher' }}
          </ButtonLg>
        </form>

        <p v-if="localError || reservationsStore.error" class="state-error">
          {{ localError || reservationsStore.error }}
        </p>

        <section v-if="reservationsStore.reservation" class="reservation-result">
          <p><strong>Nom du restaurant :</strong> {{ reservationsStore.reservation.restaurant?.name || '-' }}</p>
          <p><strong>Statut :</strong> {{ translatedStatus }}</p>
          <p><strong>Message :</strong> {{ reservationsStore.reservation.message || '-' }}</p>
          <p><strong>Date :</strong> {{ formattedDate }}</p>
          <p><strong>Heure de debut :</strong> {{ reservationsStore.reservation.slot?.startTime || '-' }}</p>
          <p><strong>Heure de fin :</strong> {{ reservationsStore.reservation.slot?.endTime || '-' }}</p>
          <p><strong>Nombre de couverts :</strong> {{ reservationsStore.reservation.covers ?? '-' }}</p>
          <p><strong>Nom du client :</strong> {{ reservationsStore.reservation.customer?.name || '-' }}</p>
          <p><strong>E-mail :</strong> {{ reservationsStore.reservation.customer?.email || '-' }}</p>
          <p><strong>Telephone :</strong> {{ reservationsStore.reservation.customer?.phone || '-' }}</p>

          <div class="cancel-wrap">
            <ButtonSm class="cancel-button" :disabled="reservationsStore.loading" @click="cancelReservation">
              Annuler
            </ButtonSm>
          </div>
        </section>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.reservation-token-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.reservation-token-container {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

.reservation-token-card {
  max-width: 760px;
  margin: 0 auto;
  background: linear-gradient(180deg, #fffdf8 0%, #f2ebdd 100%);
  border: 1px solid rgba(99, 118, 84, 0.16);
  border-radius: 18px;
  box-shadow: 0 16px 34px rgba(57, 60, 42, 0.1);
  padding: 1.2rem;
}

.reservation-token-card h1 {
  margin: 0 0 1rem;
  text-align: center;
  color: #243224;
}

.search-form {
  margin-bottom: 1rem;
}

.search-form :deep(.search-button) {
  width: 100%;
}

.state-error {
  margin: 0 0 1rem;
  color: #d32f2f;
  font-weight: 700;
}

.reservation-result {
  border: 1px solid rgba(92, 111, 79, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  padding: 0.95rem;
}

.reservation-result p {
  margin: 0 0 0.5rem;
  color: #536351;
}

.reservation-result p strong {
  color: #243224;
}

.cancel-wrap {
  margin-top: 0.9rem;
  display: flex;
  justify-content: flex-end;
}

.cancel-wrap :deep(.cancel-button) {
  background: rgba(208, 42, 42, 0.12);
  border-color: rgba(179, 36, 36, 0.3);
  color: #9f1f1f;
}

.cancel-wrap :deep(.cancel-button:hover) {
  background: rgba(208, 42, 42, 0.2);
  border-color: rgba(179, 36, 36, 0.4);
}

@media (max-width: 768px) {
  .reservation-token-card {
    padding: 1rem;
  }

  .cancel-wrap {
    justify-content: center;
  }
}
</style>
