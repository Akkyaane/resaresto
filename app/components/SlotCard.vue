<template>
  <article class="slot-card">
    <p class="slot-line"><strong>Date :</strong> {{ formattedDate }}</p>
    <p class="slot-line"><strong>Heure de debut :</strong> {{ slot.startTime }}</p>
    <p class="slot-line"><strong>Heure de fin :</strong> {{ slot.endTime }}</p>
    <p class="slot-line"><strong>Capacite totale :</strong> {{ slot.totalCapacity }}</p>
    <p class="slot-line"><strong>Couverts reserves :</strong> {{ slot.bookedCovers }}</p>
    <p class="slot-line"><strong>Statut :</strong> {{ translatedStatus }}</p>

    <div class="slot-action">
      <ButtonSm class="reserve-button" @click="$emit('reserve', slot)">Reserver</ButtonSm>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  slot: {
    type: Object,
    required: true,
  },
})

defineEmits(['reserve'])

const statusMap = {
  free: 'Libre',
  full: 'Complet',
  canceled: 'Annulé',
  confirmed: 'Confirmé',
}

const translatedStatus = computed(() => statusMap[props.slot.status] || props.slot.status)

const formattedDate = computed(() => {
  if (!props.slot.date) {
    return '-'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${props.slot.date}T00:00:00`))
})
</script>

<style scoped>
.slot-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  background:
    radial-gradient(circle at 100% 0%, rgba(151, 178, 131, 0.18), transparent 36%),
    linear-gradient(180deg, #fffdf8 0%, #f3ecde 100%);
  border: 1px solid rgba(99, 118, 84, 0.18);
  border-radius: 20px;
  padding: 1.05rem;
  box-shadow: 0 14px 30px rgba(57, 60, 42, 0.09);
}

.slot-line {
  margin: 0;
  color: #556454;
  font-size: 0.91rem;
  line-height: 1.5;
  padding-bottom: 0.45rem;
  border-bottom: 1px dashed rgba(95, 112, 83, 0.2);
}

.slot-line strong {
  color: #2f402c;
}

.slot-action {
  margin-top: 0.7rem;
  display: flex;
  justify-content: stretch;
}

.slot-action :deep(.reserve-button) {
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

.slot-action :deep(.reserve-button:hover) {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #4a6840 0%, #7f9b6c 100%);
  border-color: rgba(48, 69, 40, 0.24);
}

.slot-action :deep(.reserve-button:active) {
  transform: translateY(0);
}
</style>
