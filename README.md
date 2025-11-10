# Jelle Max - Portfolio Website

Modern, responsive portfolio website built with Vue.js 3, TypeScript, and the beautiful Catppuccin Macchiato color scheme.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)

## ✨ Features

- 🧠 **Interactive Neural Network Visualization** - Canvas-based physics simulation with spring forces and mouse repulsion
- 🎨 **Catppuccin Macchiato Theme** - Beautiful, cohesive pastel color palette throughout
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⌨️ **Typing Speed Test** - Interactive game with multiple difficulty levels
- 💻 **Terminal Easter Egg** - Press `~` for a surprise terminal interface
- ⚡ **Lightning Fast** - Built with Vite for instant dev server and optimized production builds
- 🔒 **Type Safe** - Written in TypeScript for reliability and developer experience

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will be available at `http://localhost:5173/`

## 🏗️ Project Structure

```
src/
├── components/         # Reusable Vue components
│   ├── Navigation.vue
│   ├── NeuralNetwork.vue
│   ├── NodeModal.vue
│   └── Terminal.vue
├── views/             # Page components
│   ├── HomeView.vue
│   └── TypingTestView.vue
├── assets/            # Global styles
│   ├── colors.css     # Catppuccin Macchiato colors
│   └── main.css       # Global styles & utilities
└── router/            # Vue Router configuration
```

## 🎨 Color Scheme

This project uses the [Catppuccin Macchiato](https://github.com/catppuccin/catppuccin) color palette, a soothing pastel theme perfect for long coding sessions.

## 📝 Content Management

Portfolio content is stored in `/public/data.json`. Edit this file to update:
- About section
- Education history
- Work experiences
- Projects
- Extras

Example structure:
```json
{
  "Education": {
    "1": {
      "Title": "Your Degree",
      "Date": "2020-2024",
      "Description": "Details about your education..."
    }
  }
}
```

## 🧠 Neural Network

The interactive neural network visualization:
- Physics-based animation with spring forces
- Mouse repulsion for dynamic interactions
- Responsive canvas that adapts to screen size
- Click nodes to view detailed information
- Smooth 60 FPS animations using `requestAnimationFrame`

## 🎮 Easter Eggs

- Press `~` (tilde) anywhere on the site to open the terminal
- Try commands like `help`, `about`, `skills`, `easter-egg`
- Navigate to `/typing-test` for the typing speed test game

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Vue Router** - Official routing
- **Pinia** - State management (available for future use)
- **Canvas API** - Hardware-accelerated graphics

## 📱 Responsive Design

- Mobile-first approach
- Fluid typography with `clamp()`
- Flexible grid layouts
- Touch-optimized interactions
- Mobile navigation menu

## 🚢 Deployment

```bash
# Build for production
npm run build

# The dist/ folder is ready to deploy
```

Deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting provider

## 📄 License

Personal portfolio - All rights reserved

## 🔗 Links

- [LinkedIn](https://www.linkedin.com/in/jellemax/)
- [GitHub](https://github.com/maxke24)
- [Instagram](https://www.instagram.com/red_riding_elmo/)

---

Built with ❤️ using Vue.js and Catppuccin Macchiato
