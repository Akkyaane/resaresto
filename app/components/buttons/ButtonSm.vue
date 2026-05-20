<template>
  <button class="btn-sm">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-sm {
  width: fit-content;
  padding: 0.55rem 0.95rem;
  background: rgba(66, 93, 54, 0.08);
  color: #425d36;
  border: 1px solid rgba(66, 93, 54, 0.14);
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.btn-sm:hover {
  background: rgba(66, 93, 54, 0.14);
  border-color: rgba(66, 93, 54, 0.22);
  transform: translateY(-1px);
}

.btn-sm:active {
  transform: translateY(0);
}
</style>
