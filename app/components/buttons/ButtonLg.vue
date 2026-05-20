<template>
  <button class="btn-lg">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-lg {
  width: 100%;
  padding: 0.85rem 1.4rem;
  background: linear-gradient(135deg, #425d36 0%, #6a8259 100%);
  color: #f7fbf5;
  border: 1px solid rgba(39, 55, 31, 0.08);
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  box-shadow: 0 10px 20px rgba(66, 93, 54, 0.16);
}

.btn-lg:hover {
  background: linear-gradient(135deg, #4c6a40 0%, #7b9465 100%);
}

.btn-lg:active {
  background: linear-gradient(135deg, #38502f 0%, #62774f 100%);
}
</style>
