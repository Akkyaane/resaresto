<script setup>
defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="restaurant-card">
    <div class="card-visual">
      <div class="card-image">
        <img :src="restaurant.imageUrl" :alt="restaurant.name" />
      </div>
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ restaurant.name }}</h3>
      <p class="card-description">{{ restaurant.description }}</p>

      <div class="card-tags">
        <span class="card-tag">{{ restaurant.cuisineType }}</span>
        <span class="card-tag card-tag--soft">{{ restaurant.address }}</span>
      </div>

      <NuxtLink :to="`/restaurants/${restaurant.slug || restaurant.id}`" class="card-button">
        Réserver
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.restaurant-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: linear-gradient(180deg, #fefbf5 0%, #f2ecde 100%);
  border: 1px solid rgba(101, 118, 88, 0.16);
  border-radius: 22px;
  overflow: hidden;
  transition:
    box-shadow 0.25s ease;
  min-height: 100%;
  box-shadow: 0 14px 30px rgba(68, 66, 49, 0.09);
}

.restaurant-card:hover {
  box-shadow: 0 18px 34px rgba(68, 66, 49, 0.12);
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(14, 23, 15, 0.02) 0%, rgba(68, 81, 57, 0.24) 100%);
  pointer-events: none;
}

.restaurant-card:hover .card-image img {
  transform: none;
}

.card-content {
  padding: 0.95rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
}

.card-title {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #22301f;
}

.card-description {
  margin: 0;
  color: #5d6959;
  font-size: 0.88rem;
  line-height: 1.5;
  line-clamp: 3;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.5em * 3);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-tag {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.38rem 0.72rem;
  border-radius: 999px;
  background: rgba(91, 117, 76, 0.1);
  color: #46613b;
  font-size: 0.8rem;
  line-height: 1.2;
}

.card-tag--soft {
  background: rgba(255, 255, 255, 0.7);
  color: #5a6657;
}

.card-button {
  margin-top: auto;
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1.1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #405a36 0%, #688258 100%);
  color: #f7fbf5;
  font-weight: 700;
  font-size: 0.92rem;
  letter-spacing: 0.01em;
  box-shadow: 0 10px 18px rgba(64, 90, 54, 0.16);
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.card-button:hover {
  background: linear-gradient(135deg, #4c6a40 0%, #7b9465 100%);
  box-shadow: 0 12px 22px rgba(64, 90, 54, 0.2);
}

@media (max-width: 768px) {
  .card-image {
    aspect-ratio: 16 / 8.5;
  }

  .card-content {
    padding: 0.9rem 0.9rem 0.95rem;
  }
}
</style>
