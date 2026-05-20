<script setup>
import { onMounted } from "vue";
import { useRestaurantsStore } from "../../../stores/restaurants";

const restaurantsStore = useRestaurantsStore();

onMounted(() => {
  restaurantsStore.fetchAll();
});
</script>

<template>
  <div class="restaurants-layout">
    <Navbar />

    <main class="restaurants-container">
      <div class="restaurants-header">
        <h1>Des adresses simples et délicieuses</h1>
      </div>

      <p v-if="restaurantsStore.loading" class="state-message">Chargement...</p>

      <p v-else-if="restaurantsStore.error" class="state-message state-message--error">
        {{ restaurantsStore.error }}
      </p>

      <div class="restaurants-grid" v-else>
        <RestaurantCard
          v-for="restaurant in restaurantsStore.restaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.restaurants-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 12%, rgba(201, 219, 187, 0.35), transparent 26%),
    radial-gradient(circle at 88% 18%, rgba(113, 137, 97, 0.15), transparent 28%),
    linear-gradient(180deg, rgba(251, 247, 240, 0.88) 0%, rgba(239, 232, 220, 0.96) 100%);
}

.restaurants-container {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 3.25rem 1rem 4.5rem;
}

.restaurants-header {
  margin-bottom: 2rem;
  text-align: center;
}

.restaurants-header h1 {
  margin: 0;
  font-size: clamp(2.1rem, 3.3vw, 3.45rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #243224;
}

.restaurants-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: stretch;
  grid-auto-rows: 1fr;
}

.restaurants-grid > * {
  height: 100%;
}

.state-message {
  margin: 0 0 1.5rem;
  color: #4f6150;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.01em;
}

.state-message--error {
  color: #d32f2f;
}

/* Responsive */
@media (max-width: 1024px) {
  .restaurants-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .restaurants-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    grid-auto-rows: auto;
  }

  .restaurants-header h1 {
    font-size: 1.8rem;
  }

  .restaurants-container {
    padding: 2rem 1rem 3rem;
  }
}
</style>
