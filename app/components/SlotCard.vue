<template>
  <article class="slot-card">
    <div class="slot-header">
      <p class="time">{{ slot.time }}</p>
      <span class="slot-badge">{{ slot.availableSeats }} places</span>
    </div>

    <p class="availability">Créneau disponible pour réserver rapidement.</p>

    <div class="slot-action">
      <ButtonSm>Sélectionner</ButtonSm>
    </div>
  </article>
</template>

<script setup>
defineProps({
  slot: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.slot-card {
  background: linear-gradient(180deg, #fdfaf4 0%, #efe8dc 100%);
  border: 1px solid rgba(101, 118, 88, 0.14);
  border-radius: 20px;
  padding: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 12px 28px rgba(68, 66, 49, 0.08);
}

.slot-card:hover {
  transform: none;
  box-shadow: 0 12px 28px rgba(68, 66, 49, 0.08);
}

.slot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.time {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #253224;
}

.slot-badge {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(93, 117, 76, 0.1);
  color: #556d4d;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.availability {
  margin: 0 0 1rem;
  color: #5f695d;
  font-size: 0.92rem;
  line-height: 1.5;
}

.slot-action {
  display: flex;
  justify-content: center;
}
</style>
