<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useReservationsStore } from '../../../stores/reservations'
import ButtonLg from '../../components/buttons/ButtonLg.vue'

const route = useRoute()
const reservationsStore = useReservationsStore()
const formError = ref('')

const form = reactive({
	customerName: '',
	customerEmail: '',
	customerPhone: '',
	covers: 1,
})

const queryValue = (key) => {
	const value = route.query[key]
	return Array.isArray(value) ? value[0] : value
}

const restaurantId = computed(() => queryValue('restaurantId'))
const restaurantName = computed(() => queryValue('restaurantName') || '-')
const timeSlotId = computed(() => queryValue('timeSlotId'))
const slotDate = computed(() => queryValue('slotDate') || '-')
const slotStartTime = computed(() => queryValue('slotStartTime') || '-')
const slotEndTime = computed(() => queryValue('slotEndTime') || '-')

const extractReservationToken = (response) => {
	return (
		response?.token ||
		response?.reservation?.token ||
		response?.data?.token ||
		response?.reservationToken ||
		response?.data?.reservationToken ||
		reservationsStore.reservation?.token ||
		''
	)
}

const submitReservation = async () => {
	formError.value = ''

	if (!restaurantId.value || !timeSlotId.value) {
		formError.value = 'Informations de reservation manquantes.'
		return
	}

	const payload = {
		restaurantId: restaurantId.value,
		timeSlotId: timeSlotId.value,
		customerName: form.customerName,
		customerEmail: form.customerEmail,
		customerPhone: form.customerPhone,
		covers: Number(form.covers),
	}

	const response = await reservationsStore.createReservation(payload)
	const token = extractReservationToken(response)

	if (token) {
		await navigateTo({
			path: '/reservations/by-token',
			query: {
				token,
			},
		})
		return
	}

	if (!reservationsStore.error) {
		formError.value = 'Reservation creee, mais token introuvable dans la reponse API.'
	}
}
</script>
<template>
	<div class="reservation-layout">
		<Navbar />

		<main class="reservation-container">
			<section class="reservation-card">
				<h1>Réserver une table</h1>

				<div class="reservation-summary">
					<p><strong>Restaurant :</strong> {{ restaurantName }}</p>
					<p><strong>Date :</strong> {{ slotDate }}</p>
					<p><strong>Heure de début :</strong> {{ slotStartTime }}</p>
					<p><strong>Heure de fin :</strong> {{ slotEndTime }}</p>
				</div>

				<form class="reservation-form" @submit.prevent="submitReservation">
					<FormGroup
						input-id="customer-name"
						label="Nom"
						placeholder="Joe Doe"
						autocomplete="name"
						required
						v-model="form.customerName"
					/>

					<FormGroup
						input-id="customer-email"
						label="E-mail"
						type="email"
						placeholder="john.doe@example.com"
						autocomplete="email"
						required
						v-model="form.customerEmail"
					/>

					<FormGroup
						input-id="customer-phone"
						label="Téléphone"
						type="tel"
						placeholder="06 00 00 00 00"
						autocomplete="tel"
						required
						v-model="form.customerPhone"
					/>

					<FormGroup
						input-id="covers"
						label="Nombre de couverts"
						type="number"
						min="1"
						step="1"
						required
						v-model="form.covers"
					/>

					<p v-if="formError || reservationsStore.error" class="form-error">
						{{ formError || reservationsStore.error }}
					</p>

					<ButtonLg class="confirm-button" type="submit" :disabled="reservationsStore.loading">
						{{ reservationsStore.loading ? 'Envoi...' : 'Confirmer' }}
					</ButtonLg>
				</form>
			</section>
		</main>

		<Footer />
	</div>
</template>
<style scoped>
.reservation-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.reservation-container {
	flex: 1;
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	padding: 2rem 1rem 3rem;
}

.reservation-card {
	max-width: 680px;
	margin: 0 auto;
	background: linear-gradient(180deg, #fffdf8 0%, #f2ebdd 100%);
	border: 1px solid rgba(99, 118, 84, 0.16);
	border-radius: 18px;
	box-shadow: 0 16px 34px rgba(57, 60, 42, 0.1);
	padding: 1.2rem;
}

.reservation-card h1 {
	margin: 0 0 1rem;
	color: #243224;
	text-align: center;
}

.reservation-summary {
	border: 1px solid rgba(92, 111, 79, 0.2);
	border-radius: 12px;
	background: rgba(255, 255, 255, 0.72);
	padding: 0.85rem 0.95rem;
	margin-bottom: 1rem;
}

.reservation-summary p {
	margin: 0 0 0.4rem;
	color: #536351;
	font-size: 0.92rem;
}

.reservation-form {
	margin-top: 0.8rem;
}

.form-error {
	margin: 0 0 1rem;
	color: #d32f2f;
	font-weight: 700;
}

.reservation-form :deep(.confirm-button) {
	margin-top: 0.35rem;
	width: 100%;
	min-width: 0;
	border-radius: 12px;
	padding: 0.62rem 1.1rem;
	border: 1px solid rgba(48, 69, 40, 0.14);
	background: linear-gradient(135deg, #3f5934 0%, #6f8b5c 100%);
	color: #f5faef;
	box-shadow: 0 10px 18px rgba(63, 89, 52, 0.22);
	display: inline-flex;
	justify-content: center;
}

.reservation-form :deep(.confirm-button:hover) {
	transform: translateY(-1px);
	background: linear-gradient(135deg, #4a6840 0%, #7f9b6c 100%);
	border-color: rgba(48, 69, 40, 0.24);
}

.reservation-form :deep(.confirm-button:active) {
	transform: translateY(0);
}

.reservation-form :deep(.confirm-button:disabled) {
	opacity: 0.7;
	cursor: not-allowed;
	transform: none;
	box-shadow: none;
}

@media (max-width: 768px) {
	.reservation-card {
		padding: 1rem;
	}
}
</style>