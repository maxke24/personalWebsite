<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from './components/Navigation.vue'
import Terminal from './components/Terminal.vue'

const showTerminal = ref(false)

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === '`' || event.key === '~') {
    event.preventDefault()
    showTerminal.value = !showTerminal.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div id="app">
    <Navigation />
    <RouterView />
    <Terminal v-if="showTerminal" @close="showTerminal = false" />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
