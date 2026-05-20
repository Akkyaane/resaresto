<template>
  <div class="form-group">
    <label :for="inputId" class="form-label">{{ label }}</label>
    <input :id="inputId" :type="type" :placeholder="placeholder" class="form-input" />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  inputId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1.25rem;
}

.form-label {
  font-weight: 800;
  color: #4f5d48;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.form-input {
  padding: 0.9rem 1rem;
  border: 1px solid rgba(79, 93, 72, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #22301f;
  font-size: 0.96rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(66, 93, 54, 0.5);
  box-shadow: 0 0 0 4px rgba(120, 146, 104, 0.14);
}
</style>
