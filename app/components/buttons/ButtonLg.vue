<template>
  <button class="btn-lg">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-lg {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.9rem 1.35rem;
  background: linear-gradient(135deg, #36502d 0%, #5e7a4d 52%, #7d9b67 100%);
  color: #f6fbf2;
  border: 1px solid rgba(38, 56, 30, 0.16);
  border-radius: 14px;
  font-size: 0.96rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
  box-shadow: 0 12px 24px rgba(52, 77, 42, 0.24);
}

.btn-lg:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #3f5c35 0%, #698856 52%, #8ba976 100%);
  border-color: rgba(38, 56, 30, 0.28);
  box-shadow: 0 14px 28px rgba(52, 77, 42, 0.3);
}

.btn-lg:active {
  transform: translateY(0);
  background: linear-gradient(135deg, #324828 0%, #557045 52%, #73905e 100%);
  box-shadow: 0 8px 18px rgba(52, 77, 42, 0.24);
}

.btn-lg:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 4px rgba(132, 164, 109, 0.32),
    0 12px 24px rgba(52, 77, 42, 0.24);
}

.btn-lg:disabled {
  cursor: not-allowed;
  transform: none;
  opacity: 0.72;
  box-shadow: none;
  background: linear-gradient(135deg, #879980 0%, #a1b29a 100%);
  border-color: rgba(70, 84, 66, 0.16);
}
</style>
