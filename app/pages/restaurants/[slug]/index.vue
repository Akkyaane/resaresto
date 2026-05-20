<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurantsStore } from '../../../../stores/restaurants'

const route = useRoute()
const restaurantsStore = useRestaurantsStore()

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
	weekday: 'long',
	day: '2-digit',
	month: 'long'
})

const toIsoDate = (date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}

const dates = computed(() => {
	const days = []
	const base = new Date()

	for (let i = 0; i < 7; i += 1) {
		const day = new Date(base)
		day.setDate(base.getDate() + i)

		days.push({
			iso: toIsoDate(day),
			label: dateFormatter.format(day)
		})
	}

	return days
})

const selectDate = async (date) => {
	const slug = route.params.slug

	if (!restaurantsStore.restaurant && slug) {
		await restaurantsStore.fetchBySlug(slug)
	}

	const restaurantId = restaurantsStore.restaurant?.id
	const restaurantName = restaurantsStore.restaurant?.name

	if (!restaurantId) {
		return
	}

	await navigateTo({
		path: `/restaurants/${slug}/slots`,
		query: {
			date,
			restaurantId,
			restaurantName
		}
	})
}

onMounted(() => {
	restaurantsStore.fetchBySlug(route.params.slug)
})
</script>

<template>
	<div class="restaurant-detail-layout">
		<Navbar />

		<main class="restaurant-detail-container">
			<p v-if="restaurantsStore.restaurantLoading" class="state-message">Chargement...</p>

			<p
				v-else-if="restaurantsStore.restaurantError"
				class="state-message state-message--error"
			>
				{{ restaurantsStore.restaurantError }}
			</p>

			<section v-else-if="restaurantsStore.restaurant" class="restaurant-detail-content">
				<div class="restaurant-image-wrap">
					<img
						:src="restaurantsStore.restaurant.imageUrl"
						:alt="restaurantsStore.restaurant.name"
						class="restaurant-image"
					>
				</div>

				<div class="restaurant-content">
					<h1>{{ restaurantsStore.restaurant.name }}</h1>
					<p class="restaurant-description">{{ restaurantsStore.restaurant.description }}</p>
					<p class="restaurant-meta">{{ restaurantsStore.restaurant.address }}</p>
					<p class="restaurant-meta">{{ restaurantsStore.restaurant.cuisineType }}</p>
				</div>

				<div class="booking-section">
					<h2>Réservez maintenant !</h2>

					<div class="dates-grid">
						<button
							v-for="day in dates"
							:key="day.iso"
							type="button"
							class="date-button"
							@click="selectDate(day.iso)"
						>
							{{ day.label }}
						</button>
					</div>
				</div>
			</section>
		</main>

		<Footer />
	</div>
</template>

<style scoped>
.restaurant-detail-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.restaurant-detail-container {
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	padding: 2rem 1rem 3rem;
	flex: 1;
}

.restaurant-detail-content {
	max-width: 980px;
	margin: 0 auto;
}

.restaurant-image-wrap {
	width: 100%;
	aspect-ratio: 16 / 8;
	background: #e9e2d5;
	border-radius: 18px;
	overflow: hidden;
}

.restaurant-image {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.restaurant-content {
	padding: 1.25rem;
	border-bottom: 1px solid rgba(101, 118, 88, 0.2);
}

.restaurant-content h1 {
	margin: 0;
	color: #22301f;
	font-size: 1.65rem;
}

.restaurant-description {
	margin: 0.9rem 0;
	color: #5d6959;
	line-height: 1.55;
}

.restaurant-meta {
	margin: 0.4rem 0;
	color: #4f6150;
}

.booking-section {
	padding: 1.25rem;
}

.booking-section h2 {
	margin: 0 0 1rem;
	color: #22301f;
	font-size: 1.3rem;
}

.dates-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 0.75rem;
}

.date-button {
	width: 100%;
	border: 1px solid rgba(64, 90, 54, 0.22);
	background: rgba(66, 93, 54, 0.08);
	color: #33452e;
	border-radius: 12px;
	padding: 0.72rem 0.8rem;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	text-transform: capitalize;
	transition: background-color 0.2s ease;
}

.date-button:hover {
	background: rgba(66, 93, 54, 0.15);
}

.state-message {
	margin: 0;
	color: #4f6150;
	font-weight: 600;
}

.state-message--error {
	color: #d32f2f;
}

@media (max-width: 900px) {
	.dates-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.restaurant-image-wrap {
		aspect-ratio: 16 / 10;
	}
}

@media (max-width: 640px) {
	.dates-grid {
		grid-template-columns: 1fr;
	}
}
</style>