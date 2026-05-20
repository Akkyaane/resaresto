<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <h1>ResaResto</h1>
      </div>
      <ul class="navbar-links">
        <li>
          <NuxtLink to="/restaurants">Restaurants</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/reservations/by-token">Rechercher un restaurant</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: rgba(250, 246, 238, 0.88);
  border-bottom: 1px solid rgba(106, 125, 95, 0.16);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(14px);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #243224;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}

.navbar-links a {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  color: #4f6150;
  text-decoration: none;
  font-weight: 700;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.navbar-links a:hover {
  color: #22301f;
  background: rgba(64, 90, 54, 0.08);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 0.85rem;
    justify-content: center;
  }

  .navbar-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
