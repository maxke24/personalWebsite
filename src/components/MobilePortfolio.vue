<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const categoryColors = {
  About: '#8aadf4',      // blue
  Education: '#b7bdf8',   // lavender
  Experiences: '#c6a0f6', // mauve
  Projects: '#f5bde6',    // pink
  Extras: '#a6da95'       // green
}

onMounted(async () => {
  try {
    const response = await fetch('/data.json')
    data.value = await response.json()
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
})

const getCategoryColor = (category: string): string => {
  return categoryColors[category as keyof typeof categoryColors] || '#8aadf4'
}

const openModal = (category: string, nodeData: NodeData) => {
  selectedNode.value = { data: nodeData, category }
}

const closeModal = () => {
  selectedNode.value = null
}
</script>

<template>
  <div class="mobile-portfolio">
    <!-- Static Neural Network Header -->
    <div class="neural-header">
      <svg viewBox="0 0 300 120" class="network-decoration">
        <!-- Background connections -->
        <line x1="50" y1="30" x2="150" y2="30" stroke="rgba(138, 173, 244, 0.2)" stroke-width="1.5"/>
        <line x1="50" y1="60" x2="150" y2="60" stroke="rgba(138, 173, 244, 0.2)" stroke-width="1.5"/>
        <line x1="50" y1="90" x2="150" y2="90" stroke="rgba(138, 173, 244, 0.2)" stroke-width="1.5"/>

        <line x1="150" y1="30" x2="250" y2="45" stroke="rgba(183, 189, 248, 0.2)" stroke-width="1.5"/>
        <line x1="150" y1="60" x2="250" y2="60" stroke="rgba(183, 189, 248, 0.2)" stroke-width="1.5"/>
        <line x1="150" y1="90" x2="250" y2="75" stroke="rgba(183, 189, 248, 0.2)" stroke-width="1.5"/>

        <!-- Nodes -->
        <circle cx="50" cy="30" r="8" fill="#24273a" stroke="#8aadf4" stroke-width="2"/>
        <circle cx="50" cy="60" r="8" fill="#24273a" stroke="#8aadf4" stroke-width="2"/>
        <circle cx="50" cy="90" r="8" fill="#24273a" stroke="#8aadf4" stroke-width="2"/>

        <circle cx="150" cy="30" r="8" fill="#24273a" stroke="#b7bdf8" stroke-width="2"/>
        <circle cx="150" cy="60" r="8" fill="#24273a" stroke="#b7bdf8" stroke-width="2"/>
        <circle cx="150" cy="90" r="8" fill="#24273a" stroke="#b7bdf8" stroke-width="2"/>

        <circle cx="250" cy="45" r="8" fill="#24273a" stroke="#c6a0f6" stroke-width="2"/>
        <circle cx="250" cy="60" r="8" fill="#24273a" stroke="#f5bde6" stroke-width="2"/>
        <circle cx="250" cy="75" r="8" fill="#24273a" stroke="#a6da95" stroke-width="2"/>
      </svg>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <div v-else class="content">
      <div
        v-for="(category, categoryName) in data"
        :key="categoryName"
        class="category-section"
      >
        <div class="category-header">
          <div class="node-icon" :style="{ borderColor: getCategoryColor(String(categoryName)) }">
            <div class="node-inner" :style="{ backgroundColor: getCategoryColor(String(categoryName)) }"></div>
          </div>
          <h2 :style="{ color: getCategoryColor(String(categoryName)) }">{{ categoryName }}</h2>
        </div>

        <div class="cards-container">
          <div
            v-for="(item, key) in category"
            :key="key"
            class="card"
            @click="openModal(String(categoryName), item)"
          >
            <div class="card-connector" :style="{ backgroundColor: getCategoryColor(String(categoryName)) }"></div>
            <div class="card-content">
              <h3>{{ item.Title }}</h3>
              <p v-if="item.Date" class="date">{{ item.Date }}</p>
              <p class="description">
                {{ item.Description.substring(0, 120) }}{{ item.Description.length > 120 ? '...' : '' }}
              </p>
              <span class="read-more">Tap to read more →</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="selectedNode" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeModal" aria-label="Close">×</button>

          <div class="modal-header">
            <div class="node-icon" :style="{ borderColor: getCategoryColor(selectedNode.category) }">
              <div class="node-inner" :style="{ backgroundColor: getCategoryColor(selectedNode.category) }"></div>
            </div>
            <div>
              <span class="category-badge" :style="{ backgroundColor: getCategoryColor(selectedNode.category) }">
                {{ selectedNode.category }}
              </span>
              <h2>{{ selectedNode.data.Title }}</h2>
              <p v-if="selectedNode.data.Date" class="date">{{ selectedNode.data.Date }}</p>
            </div>
          </div>

          <div class="modal-body">
            <p>{{ selectedNode.data.Description }}</p>
            <a
              v-if="selectedNode.data.Link"
              :href="selectedNode.data.Link"
              target="_blank"
              rel="noopener"
              class="btn btn-primary"
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mobile-portfolio {
  min-height: 100vh;
  padding-bottom: 2rem;
}

.neural-header {
  padding: 2rem 1rem 1rem;
  background: linear-gradient(180deg, var(--ctp-mantle) 0%, var(--ctp-base) 100%);
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.network-decoration {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
}

.content {
  padding: 0 1rem;
}

.category-section {
  margin-bottom: 2.5rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
}

.node-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ctp-base);
  flex-shrink: 0;
}

.node-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.category-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.cards-container {
  position: relative;
  padding-left: 2rem;
}

.cards-container::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--ctp-surface0);
}

.card {
  position: relative;
  background: var(--ctp-surface0);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.card:active {
  transform: scale(0.98);
}

.card:hover {
  border-color: var(--ctp-surface2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-connector {
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--ctp-base);
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--ctp-text);
}

.date {
  font-size: 0.85rem;
  color: var(--ctp-subtext0);
  margin-bottom: 0.75rem;
  font-style: italic;
}

.description {
  color: var(--ctp-subtext1);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.read-more {
  color: var(--ctp-blue);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background-color: var(--ctp-surface0);
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  position: relative;
  border: 1px solid var(--ctp-surface1);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--ctp-surface1);
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ctp-text);
  font-size: 1.5rem;
  line-height: 1;
  transition: all 0.2s ease;
}

.close-btn:active {
  background: var(--ctp-surface2);
  transform: scale(0.95);
}

.modal-header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-right: 2rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  color: var(--ctp-base);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.modal-header h2 {
  color: var(--ctp-text);
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
}

.modal-header .date {
  margin: 0;
}

.modal-body {
  line-height: 1.8;
}

.modal-body p {
  margin-bottom: 1.5rem;
  color: var(--ctp-subtext1);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--ctp-blue);
  color: var(--ctp-base);
}

.btn-primary:active {
  background-color: var(--ctp-sapphire);
  transform: scale(0.97);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(-20px);
}
</style>
