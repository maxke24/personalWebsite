<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

const emit = defineEmits<{
  close: []
}>()

interface CommandHistory {
  command: string
  output: string
}

const input = ref('')
const history = ref<CommandHistory[]>([])
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const terminalRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

const commands: Record<string, () => string> = {
  help: () => `Available commands:
  help       - Show this help message
  about      - Learn about Jelle Max
  skills     - List technical skills
  contact    - Get contact information
  education  - View education history
  experience - View work experience
  projects   - View recent projects
  whoami     - Display current user
  date       - Show current date and time
  ls         - List available sections
  tree       - Display portfolio structure
  cat        - View specific info (try: cat skills)
  pwd        - Print working directory
  history    - Show command history
  neofetch   - System information
  quote      - Random motivational quote
  coffee     - Brew some coffee ☕
  sudo       - Try to get root access
  clear      - Clear the terminal
  easter-egg - Find the hidden message
  exit       - Close the terminal`,

  about: () => `Jelle Max - Data Science Student & AI Enthusiast

I'm passionate about artificial intelligence, data science, and learning new technologies.
Currently studying at Open University, I spend my free time exploring AI concepts,
working on personal projects, and diving into server administration.

Outside of tech, I'm fascinated by automobiles and motorcycles!`,

  whoami: () => `visitor
You are browsing as a guest user on jellemax.be`,

  date: () => {
    const now = new Date()
    return now.toString()
  },

  ls: () => `about/          education/      experiences/    projects/       extras/
skills/         contact/        terminal/       typing-test/

Use 'cat <section>' to view details`,

  tree: () => `portfolio/
├── about/
│   └── bio.txt
├── education/
│   ├── hdc-latin.txt
│   ├── hdc-economy.txt
│   ├── miniemeninstituut-commerce.txt
│   ├── miniemeninstituut-it.txt
│   ├── howest-ai.txt
│   └── open-university-master.txt
├── experiences/
│   ├── bioplanet.txt
│   ├── stag-lodge-stables.txt
│   └── various-projects.txt
├── projects/
│   ├── neural-network-viz.ts
│   ├── terminal.vue
│   └── typing-test.vue
└── contact/
    ├── github
    ├── linkedin
    └── instagram`,

  pwd: () => `/home/jellemax/portfolio`,

  cat: () => `cat: missing operand
Try 'cat skills' or 'cat about'
Available: skills, about, contact, education, experience`,

  skills: () => `Technical Skills:
  • Data Science & Machine Learning
  • Python, JavaScript/TypeScript
  • Vue.js, React, Node.js
  • Server Administration & DevOps
  • Database Management (SQL, NoSQL)
  • Web Development & API Design
  • Git & Version Control
  • Docker & Containerization`,

  education: () => `Education History:
  📚 Master AI - Open University (2022 - Present)
     Currently pursuing Master's in Artificial Intelligence
     Focus on advanced AI concepts and techniques

  🎓 AI & Business Professional - Howest (2019 - 2022)
     Specialized in Artificial Intelligence and Business
     Rigorous curriculum in AI and machine learning

  💻 IT Management - Miniemeninstituut (2017 - 2019)
     Deep dive into informatics and IT management
     Internship abroad at Stag Lodge Stables, London

  📊 Commerce - Miniemeninstituut (2015 - 2017)
     Foundation for IT management studies

Type 'cat education' for the same info`,

  experience: () => `Work Experience:
  💼 Various Development Projects
     Full-stack development, AI implementations
     Client projects and personal portfolio work

  🐴 Stag Lodge Stables, London (Internship)
     Developed administrative application and website
     Automated appointment system from scratch
     Team collaboration and client communication

  🌱 Bioplanet, Korbeek-lo (Student Job)
     Shelf filling and cash register operations
     Customer service and teamwork skills

Type 'cat experience' for the same info`,

  contact: () => `Contact Information:
  📧 Email: Available on LinkedIn
  💼 GitHub: github.com/maxke24
  🔗 LinkedIn: linkedin.com/in/jellemax
  📸 Instagram: @red_riding_elmo

Feel free to reach out for collaborations or opportunities!`,

  projects: () => `Recent Projects:
  🧠 Neural Network Portfolio Visualization
     Interactive canvas-based visualization with physics
     Vue.js 3 + TypeScript + Catppuccin Macchiato theme

  ⌨️  Typing Speed Test Game
     Multiple difficulty levels, WPM tracking
     Real-time accuracy feedback

  💻 Terminal Easter Egg (you're using it!)
     Fully functional terminal emulator
     Command history and autocomplete

  🎨 Portfolio Website Redesign
     Modern, responsive, accessible design
     Built with Vue 3, Vite, and TypeScript

Check out my GitHub for more: github.com/maxke24`,

  history: () => {
    if (commandHistory.value.length === 0) {
      return 'No commands in history yet.'
    }
    return commandHistory.value
      .map((cmd, index) => `  ${index + 1}  ${cmd}`)
      .join('\n')
  },

  neofetch: () => `                    visitor@jellemax.be
       ___          -------------------------
      (.. |         OS: Website v2.0 (Vue.js 3)
      (<> |         Host: jellemax.be
     / __  \\        Kernel: Vite 7.2
    ( /  \\ /|       Shell: Terminal v1.0
   _/\\ __)/_)       Resolution: Responsive
   \\/-____\\/        Theme: Catppuccin Macchiato
                    Terminal: Custom Vue Component
                    CPU: Your Browser
                    Memory: Optimized
                    Packages: Vue, TypeScript, Pinia`,

  quote: (): string => {
    const quotes: string[] = [
      '"The only way to do great work is to love what you do." - Steve Jobs',
      '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"The best error message is the one that never shows up." - Thomas Fuchs',
      '"Learning never exhausts the mind." - Leonardo da Vinci',
      '"AI is the new electricity." - Andrew Ng',
      '"Data is the new oil." - Clive Humby'
    ]
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return quotes[randomIndex] as string
  },

  coffee: () => `
                    (
                     )
                  .-_____-.
             .-'  ______   \`.
            (   .-'      \`-.  )
             \`-(  COFFEE!  )-'
                \`-._____.-'

☕ Brewing a fresh cup of coffee...
[████████████████████] 100%

Your coffee is ready! Perfect for a coding session.
Type 'quote' for some inspiration while you sip!`,

  sudo: () => `[sudo] password for visitor:
sudo: Permission denied.

Nice try! But you don't have root access here. 😄
This is a read-only portfolio - no sudo needed!

Fun fact: I do have sudo access on my actual servers though!`,

  clear: () => {
    history.value = []
    return ''
  },

  'easter-egg': () => `🎉 Congratulations! You found the easter egg!

Here's a secret: The neural network visualization uses physics-based
animations with spring forces and mouse repulsion. Try moving your
cursor near the nodes to see them dance away!

Also, the color scheme is Catppuccin Macchiato - one of the most
aesthetically pleasing color palettes for developers. 🌙

Pro tip: Try the 'neofetch' command for a fun surprise!`,

  exit: () => {
    emit('close')
    return 'Goodbye! Press ~ to come back anytime.'
  },
}

const processCommand = (cmd: string) => {
  const trimmedCmd = cmd.trim().toLowerCase()

  if (!trimmedCmd) return

  commandHistory.value.push(cmd)
  historyIndex.value = commandHistory.value.length

  const command = commands[trimmedCmd]
  const output = command
    ? command()
    : `Command not found: ${cmd}\nType 'help' for available commands.`

  if (trimmedCmd !== 'clear') {
    history.value.push({
      command: cmd,
      output,
    })
  }

  input.value = ''
  nextTick(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight
    }
  })
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (historyIndex.value > 0) {
      historyIndex.value--
      input.value = commandHistory.value[historyIndex.value] || ''
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++
      input.value = commandHistory.value[historyIndex.value] || ''
    } else {
      historyIndex.value = commandHistory.value.length
      input.value = ''
    }
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  focusInput()
  history.value.push({
    command: '',
    output: `Welcome to Jelle Max Terminal v1.0
Type 'help' to see available commands.`,
  })
})
</script>

<template>
  <div class="terminal-overlay" @click="emit('close')">
    <div class="terminal-window" @click.stop>
      <div class="terminal-header">
        <div class="terminal-buttons">
          <button class="btn-close" @click="emit('close')" aria-label="Close">×</button>
          <button class="btn-minimize" aria-label="Minimize">−</button>
          <button class="btn-maximize" aria-label="Maximize">□</button>
        </div>
        <div class="terminal-title">terminal@jellemax:~</div>
      </div>

      <div class="terminal-body" ref="terminalRef" @click="focusInput">
        <div v-for="(item, index) in history" :key="index" class="terminal-entry">
          <div v-if="item.command" class="terminal-command">
            <span class="prompt">$</span> {{ item.command }}
          </div>
          <pre v-if="item.output" class="terminal-output">{{ item.output }}</pre>
        </div>

        <div class="terminal-input-line">
          <span class="prompt">$</span>
          <input
            ref="inputRef"
            v-model="input"
            type="text"
            class="terminal-input"
            @keydown.enter="processCommand(input)"
            @keydown="handleKeyDown"
            spellcheck="false"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;
}

.terminal-window {
  width: 100%;
  max-width: 800px;
  height: 600px;
  max-height: 80vh;
  background-color: var(--ctp-crust);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.terminal-header {
  background-color: var(--ctp-mantle);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--ctp-surface0);
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.terminal-buttons button {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ctp-crust);
  font-weight: bold;
}

.btn-close {
  background-color: var(--ctp-red);
}

.btn-minimize {
  background-color: var(--ctp-yellow);
}

.btn-maximize {
  background-color: var(--ctp-green);
}

.terminal-title {
  color: var(--ctp-subtext1);
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.terminal-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  cursor: text;
}

.terminal-entry {
  margin-bottom: 1rem;
}

.terminal-command {
  color: var(--ctp-green);
  margin-bottom: 0.5rem;
}

.terminal-output {
  color: var(--ctp-text);
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}

.terminal-input-line {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.prompt {
  color: var(--ctp-blue);
  font-weight: bold;
  user-select: none;
}

.terminal-input {
  flex: 1;
  background: none;
  border: none;
  color: var(--ctp-text);
  font-family: 'Courier New', monospace;
  font-size: 14px;
  outline: none;
}

.terminal-input::selection {
  background-color: var(--ctp-surface1);
}

/* Scrollbar */
.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: var(--ctp-crust);
}

.terminal-body::-webkit-scrollbar-thumb {
  background: var(--ctp-surface0);
  border-radius: 4px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background: var(--ctp-surface1);
}

@media (max-width: 768px) {
  .terminal-window {
    height: 100%;
    max-height: 90vh;
    border-radius: 8px;
  }

  .terminal-body {
    font-size: 12px;
    padding: 0.75rem;
  }
}
</style>
