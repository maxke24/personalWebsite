<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const sampleTexts = {
  easy: "The quick brown fox jumps over the lazy dog. This is a simple typing test to help you improve your speed and accuracy. Keep practicing and you will get better!",
  medium: "In the world of programming, attention to detail is crucial. Every semicolon, bracket, and indentation matters. Writing clean, readable code is an art that takes years to master.",
  hard: "Artificial intelligence and machine learning are revolutionizing the technology landscape. Neural networks, with their intricate architectures and sophisticated algorithms, are pushing the boundaries of what machines can accomplish."
}

const selectedDifficulty = ref<keyof typeof sampleTexts>('easy')
const text = ref(sampleTexts.easy)
const userInput = ref('')
const started = ref(false)
const finished = ref(false)
const startTime = ref(0)
const endTime = ref(0)
const errors = ref(0)

const typedText = computed(() => userInput.value)
const currentChar = computed(() => text.value[userInput.value.length] || '')
const remainingText = computed(() => text.value.slice(userInput.value.length))

const wpm = computed(() => {
  if (!started.value || !userInput.value) return 0
  const currentTime = finished.value ? endTime.value : Date.now()
  const timeInMinutes = (currentTime - startTime.value) / 1000 / 60
  const words = userInput.value.length / 5
  return Math.round(words / timeInMinutes) || 0
})

const accuracy = computed(() => {
  if (!userInput.value) return 100
  const total = userInput.value.length
  const correct = total - errors.value
  return Math.round((correct / total) * 100)
})

const progress = computed(() => {
  return (userInput.value.length / text.value.length) * 100
})

const handleInput = (event: Event) => {
  const input = (event.target as HTMLInputElement).value
  const lastChar = input[input.length - 1]
  const expectedChar = text.value[input.length - 1]

  if (!started.value) {
    started.value = true
    startTime.value = Date.now()
  }

  if (lastChar !== expectedChar) {
    errors.value++
  }

  userInput.value = input

  if (userInput.value === text.value) {
    finished.value = true
    endTime.value = Date.now()
  }
}

const reset = () => {
  userInput.value = ''
  started.value = false
  finished.value = false
  startTime.value = 0
  endTime.value = 0
  errors.value = 0
}

const changeDifficulty = (difficulty: keyof typeof sampleTexts) => {
  selectedDifficulty.value = difficulty
  text.value = sampleTexts[difficulty]
  reset()
}

watch(finished, (isFinished) => {
  if (isFinished) {
    // Could add confetti or celebration animation here
    console.log('Test completed!')
  }
})
</script>

<template>
  <main class="typing-test-view">
    <div class="container">
      <section class="header fade-in">
        <h1>Typing <span class="text-accent-mauve">Speed</span> Test</h1>
        <p>Test your typing speed and accuracy. Choose a difficulty and start typing!</p>
      </section>

      <section class="difficulty-selector">
        <button
          v-for="(content, difficulty) in sampleTexts"
          :key="difficulty"
          class="btn"
          :class="{ 'btn-primary': selectedDifficulty === difficulty }"
          @click="changeDifficulty(difficulty as keyof typeof sampleTexts)"
        >
          {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
        </button>
      </section>

      <section class="stats-panel">
        <div class="stat">
          <div class="stat-value">{{ wpm }}</div>
          <div class="stat-label">WPM</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ accuracy }}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ errors }}</div>
          <div class="stat-label">Errors</div>
        </div>
      </section>

      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>

      <section class="typing-area">
        <div class="text-display">
          <span class="typed-text correct">{{ typedText }}</span>
          <span class="current-char">{{ currentChar }}</span>
          <span class="remaining-text">{{ remainingText.slice(1) }}</span>
        </div>

        <input
          v-model="userInput"
          type="text"
          class="hidden-input"
          :disabled="finished"
          @input="handleInput"
          placeholder="Start typing here..."
          autofocus
        />

        <div v-if="finished" class="completion-message">
          <h2>🎉 Congratulations!</h2>
          <p>You completed the test!</p>
          <p class="final-stats">
            <strong>{{ wpm }} WPM</strong> with <strong>{{ accuracy }}% accuracy</strong>
          </p>
          <button class="btn btn-primary" @click="reset">Try Again</button>
        </div>

        <div v-if="!started && !finished" class="start-message">
          Click in the text area and start typing...
        </div>
      </section>

      <button v-if="started && !finished" class="btn reset-btn" @click="reset">
        Reset
      </button>
    </div>
  </main>
</template>

<style scoped>
.typing-test-view {
  flex: 1;
  padding: 3rem 0;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header p {
  color: var(--ctp-subtext0);
  font-size: 1.1rem;
}

.difficulty-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stats-panel {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ctp-blue);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--ctp-subtext0);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--ctp-surface0);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ctp-blue), var(--ctp-mauve));
  transition: width 0.1s ease;
}

.typing-area {
  background-color: var(--ctp-surface0);
  border-radius: 12px;
  padding: 2rem;
  min-height: 300px;
  position: relative;
  border: 2px solid var(--ctp-surface1);
  transition: border-color 0.3s ease;
}

.typing-area:focus-within {
  border-color: var(--ctp-blue);
}

.text-display {
  font-size: 1.5rem;
  line-height: 2;
  font-family: 'Courier New', monospace;
  word-wrap: break-word;
  user-select: none;
}

.typed-text {
  color: var(--ctp-green);
}

.current-char {
  background-color: var(--ctp-blue);
  color: var(--ctp-base);
  padding: 0 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.remaining-text {
  color: var(--ctp-subtext0);
}

.hidden-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: text;
  font-size: 16px;
}

.start-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--ctp-subtext0);
  font-size: 1.2rem;
  text-align: center;
  pointer-events: none;
}

.completion-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(36, 39, 58, 0.98);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: fadeIn 0.5s ease-out;
}

.completion-message h2 {
  font-size: 2.5rem;
  margin: 0;
}

.completion-message p {
  margin: 0;
  font-size: 1.2rem;
}

.final-stats {
  color: var(--ctp-blue) !important;
  font-size: 1.5rem !important;
  margin-top: 1rem !important;
}

.reset-btn {
  display: block;
  margin: 2rem auto 0;
}

@media (max-width: 768px) {
  .typing-test-view {
    padding: 2rem 0;
  }

  .stats-panel {
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .text-display {
    font-size: 1.2rem;
    line-height: 1.8;
  }

  .typing-area {
    padding: 1.5rem;
    min-height: 250px;
  }

  .difficulty-selector {
    flex-wrap: wrap;
  }
}
</style>
