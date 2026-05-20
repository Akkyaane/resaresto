<template>
  <div v-if="isVisible" class="error-popup">
    <div class="error-content">
      <p class="error-message">{{ message }}</p>
      <button class="close-btn" @click="close">×</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.error-popup {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.error-content {
  background: rgba(255, 248, 247, 0.96);
  border: 1px solid rgba(211, 47, 47, 0.22);
  border-radius: 18px;
  padding: 0.95rem 1rem;
  min-width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 18px 36px rgba(51, 27, 22, 0.14);
  backdrop-filter: blur(10px);
}

.error-message {
  margin: 0;
  color: #c62828;
  font-weight: 700;
  flex-grow: 1;
}

.close-btn {
  background: none;
  border: none;
  color: #c62828;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #7f1d1d;
}
</style>
