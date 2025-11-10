<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NeuralNetwork from '../components/NeuralNetwork.vue'
import NodeModal from '../components/NodeModal.vue'
import MobilePortfolio from '../components/MobilePortfolio.vue'

interface NodeData {
  Title: string
  Description: string
  Date?: string
  Link?: string
  Image?: string
}

interface Layer {
  [key: string]: NodeData
}

interface NetworkData {
  [category: string]: Layer
}

const data = ref<NetworkData>({})
const selectedNode = ref<{ data: NodeData; category: string } | null>(null)
const loading = ref(true)
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 768)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(async () => {
  window.addEventListener('resize', handleResize)

  try {
    const response = await fetch('/data.json')
    data.value = await response.json()
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleNodeClick = (node: { data: NodeData; category: string }) => {
  selectedNode.value = node
}
</script>

<template>
  <main class="home-view">
    <!-- Mobile View -->
    <template v-if="isMobile">
      <div class="mobile-hero fade-in">
        <h1>
          <span class="text-accent-blue">Jelle Max</span>
        </h1>
        <p class="subtitle">Data Science Student & AI Enthusiast</p>
      </div>
      <MobilePortfolio />
    </template>

    <!-- Desktop View -->
    <template v-else>
      <div class="container">
        <section class="hero fade-in">
          <h1>
            Hi, I'm <span class="text-accent-blue">Jelle Max</span>
          </h1>
          <p class="subtitle">
            Data Science Student & AI Enthusiast
          </p>
          <p class="description">
            Explore my journey through the neural network below. Click on any node to learn more about my experiences, education, and projects.
          </p>
          <p class="hint">
            <span class="keyboard-key">~</span> Press the tilde key for a surprise
          </p>
        </section>

        <section v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Loading neural network...</p>
        </section>

        <section v-else class="network-section">
          <NeuralNetwork :data="data" @node-click="handleNodeClick" />
        </section>
      </div>

      <NodeModal :node="selectedNode" @close="selectedNode = null" />
    </template>
  </main>
</template>

<style scoped>
.home-view {
  flex: 1;
  padding: 3rem 0;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: var(--ctp-subtext1);
  margin-bottom: 1.5rem;
}

.description {
  max-width: 700px;
  margin: 0 auto 1rem;
  color: var(--ctp-subtext0);
  font-size: 1.1rem;
}

.hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--ctp-subtext0);
  font-size: 0.9rem;
  margin-top: 2rem;
}

.keyboard-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 0.5rem;
  background-color: var(--ctp-surface0);
  border: 2px solid var(--ctp-surface1);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: var(--ctp-text);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.loading p {
  color: var(--ctp-subtext0);
}

.network-section {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  background-color: var(--ctp-mantle);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--ctp-surface0);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.mobile-hero {
  text-align: center;
  padding: 2rem 1rem 1rem;
  background: linear-gradient(180deg, var(--ctp-mantle) 0%, transparent 100%);
}

.mobile-hero h1 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.mobile-hero .subtitle {
  font-size: 1.1rem;
  color: var(--ctp-subtext1);
}

@media (max-width: 768px) {
  .home-view {
    padding: 0;
  }
}
</style>
