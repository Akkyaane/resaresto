<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
:root {
  color-scheme: light;
}

html,
body,
#__nuxt {
  min-height: 100%;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at top left, rgba(188, 208, 173, 0.3), transparent 30%),
    radial-gradient(circle at bottom right, rgba(77, 99, 68, 0.12), transparent 28%),
    linear-gradient(180deg, #f6f1e8 0%, #efe8db 100%);
  color: #1f261f;
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
}

.app-shell {
  min-height: 100vh;
}
</style>
