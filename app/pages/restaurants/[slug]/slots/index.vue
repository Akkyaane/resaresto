<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurantsStore } from '../../../../../stores/restaurants'
import { useSlotsStore } from '../../../../../stores/slots'

const route = useRoute()
const restaurantsStore = useRestaurantsStore()
const slotsStore = useSlotsStore()

const restaurantId = computed(() => {
	const queryValue = route.query.restaurantId
	return Array.isArray(queryValue) ? queryValue[0] : queryValue
})

const selectedDate = computed(() => {
	const queryValue = route.query.date
	return Array.isArray(queryValue) ? queryValue[0] : queryValue
})

const loadData = async () => {
	const slug = route.params.slug
	const id = restaurantId.value
	const date = selectedDate.value

	if (!slug || !id || !date) {
		slotsStore.error = 'Parametres manquants pour charger les creneaux.'
		return
	}

	await Promise.all([
		restaurantsStore.fetchBySlug(slug),
		slotsStore.fetchByRestaurantAndDate(id, date)
	])
}

const reserveSlot = async (slot) => {
	const restaurant = restaurantsStore.restaurant

	if (!restaurant || !slot) {
		return
	}

	await navigateTo({
		path: '/reservations',
		query: {
			restaurantId: restaurant.id,
			restaurantName: restaurant.name,
			timeSlotId: slot.id,
			slotDate: slot.date,
			slotStartTime: slot.startTime,
			slotEndTime: slot.endTime,
		},
	})
}

onMounted(loadData)
</script>
<template>
	<div class="slots-layout">
		<Navbar />

		<main class="slots-container">
			<div class="slots-header">
				<h1>Créneaux disponibles</h1>
				<p v-if="restaurantsStore.restaurant" class="slots-subtitle">
					{{ restaurantsStore.restaurant.name }}
				</p>
			</div>

			<p v-if="slotsStore.loading || restaurantsStore.restaurantLoading" class="state-message">
				Chargement...
			</p>

			<p
				v-else-if="slotsStore.error || restaurantsStore.restaurantError"
				class="state-message state-message--error"
			>
				{{ slotsStore.error || restaurantsStore.restaurantError }}
			</p>

			<div v-else-if="slotsStore.slots.length" class="slots-grid">
				<SlotCard
					v-for="slot in slotsStore.slots"
					:key="slot.id"
					:slot="slot"
					@reserve="reserveSlot"
				/>
			</div>

			<p v-else class="state-message">Aucun créneau disponible pour cette date.</p>
		</main>

		<Footer />
	</div>
</template>
<style scoped>
.slots-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.slots-container {
	flex: 1;
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	padding: 2rem 1rem 3rem;
}

.slots-header {
	margin-bottom: 1.4rem;
}

.slots-header h1 {
	margin: 0;
	color: #22301f;
	font-size: clamp(1.7rem, 3.1vw, 2.45rem);
}

.slots-subtitle {
	margin: 0.45rem 0 0;
	color: #4f6150;
	font-weight: 700;
}

.slots-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(260px, 320px));
	justify-content: center;
	gap: 1rem;
}

.state-message {
	margin: 0;
	color: #4f6150;
	font-weight: 600;
}

.state-message--error {
	color: #d32f2f;
}

@media (max-width: 1024px) {
	.slots-grid {
		grid-template-columns: repeat(2, minmax(260px, 320px));
	}
}

@media (max-width: 768px) {
	.slots-grid {
		grid-template-columns: minmax(260px, 320px);
	}
}
</style>