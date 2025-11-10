<script setup lang="ts">
interface NodeData {
  Title: string
  Description: string
  Date?: string
  Link?: string
  Image?: string
}

defineProps<{
  node: { data: NodeData; category: string } | null
}>()

const emit = defineEmits<{
  close: []
}>()

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="node" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-content">
        <button class="close-btn" @click="emit('close')" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-header">
          <span class="category-badge">{{ node.category }}</span>
          <h2>{{ node.data.Title }}</h2>
          <p v-if="node.data.Date" class="date">{{ node.data.Date }}</p>
        </div>

        <div class="modal-body">
          <p>{{ node.data.Description }}</p>
          <a
            v-if="node.data.Link"
            :href="node.data.Link"
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
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--ctp-surface0);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
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
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ctp-text);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--ctp-surface2);
  transform: rotate(90deg);
}

.modal-header {
  margin-bottom: 1.5rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--ctp-blue);
  color: var(--ctp-base);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.modal-header h2 {
  color: var(--ctp-text);
  margin-bottom: 0.5rem;
}

.date {
  color: var(--ctp-subtext0);
  font-size: 0.9rem;
  font-style: italic;
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
  margin-top: 1rem;
}

.btn svg {
  transition: transform 0.2s ease;
}

.btn:hover svg {
  transform: translate(2px, -2px);
}

/* Transition animations */
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

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    max-height: 90vh;
  }

  .modal-header h2 {
    font-size: 1.5rem;
  }
}
</style>
