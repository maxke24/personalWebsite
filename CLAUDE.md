# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern personal portfolio website for Jelle Max built with Vue.js 3 and TypeScript. Features an interactive neural network visualization for showcasing education, experiences, and projects. Styled with the beautiful Catppuccin Macchiato color scheme and fully responsive across all devices.

## Architecture

### Vue.js 3 + TypeScript + Vite

This is a modern single-page application built with:
- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** for type safety
- **Vite** for fast development and optimized builds
- **Vue Router** for navigation
- **Pinia** for state management (if needed in future)

### Component Structure

**Main Components:**

1. **App.vue** - Root component that manages global state and terminal visibility
2. **Navigation.vue** - Sticky navigation header with mobile menu
3. **HomeView.vue** - Main portfolio page with hero section and neural network
4. **NeuralNetwork.vue** - Canvas-based interactive neural network visualization
5. **NodeModal.vue** - Modal for displaying node details when clicked
6. **Terminal.vue** - Interactive terminal easter egg (press `~` key)
7. **TypingTestView.vue** - Typing speed test game with difficulty levels

### Neural Network Visualization

The neural network is built with HTML Canvas API (no p5.js dependency):

**How it works:**
1. Fetches data from `/public/data.json` containing portfolio categories
2. Creates nodes arranged in vertical layers (one layer per category)
3. Draws connection lines between all nodes in adjacent layers
4. Implements physics-based animations:
   - Spring forces pull nodes back to original positions
   - Mouse repulsion pushes nodes away from cursor
   - Smooth velocity damping for realistic motion
5. Nodes glow and scale on hover, fully responsive to screen size
6. Click any node to open a modal with detailed information

**Physics details:**
- Spring constant (k): 0.05
- Damping: 0.85
- Mouse repulsion radius: 100px (desktop), 60px (mobile)
- Each node stores position, velocity, and target coordinates

### Color Scheme: Catppuccin Macchiato

Beautiful, pastel color palette defined in `src/assets/colors.css`:
- **Base colors**: `#24273a` (base), `#1e2030` (mantle), `#181926` (crust)
- **Surface colors**: Progressive shades for layered UI elements
- **Text colors**: `#cad3f5` (primary), `#b8c0e0` (secondary)
- **Accent colors**: Blue, Lavender, Mauve, Pink, Green, Yellow, Peach, etc.

All colors are CSS custom properties (`--ctp-*`) for easy theming.

### Responsive Design

Fully responsive across all screen sizes:
- Mobile-first CSS with clamp() for fluid typography
- Flexible grid layouts with `repeat(auto-fit, minmax())`
- Mobile navigation menu with smooth animations
- Touch-optimized neural network interactions
- Responsive canvas sizing based on container

## File Structure

```
/
├── src/
│   ├── App.vue                      # Root component
│   ├── main.ts                      # Application entry point
│   ├── assets/
│   │   ├── colors.css               # Catppuccin Macchiato colors
│   │   └── main.css                 # Global styles & utilities
│   ├── components/
│   │   ├── Navigation.vue           # Top navigation bar
│   │   ├── NeuralNetwork.vue        # Canvas neural network
│   │   ├── NodeModal.vue            # Node details modal
│   │   └── Terminal.vue             # Terminal easter egg
│   ├── views/
│   │   ├── HomeView.vue             # Main portfolio page
│   │   └── TypingTestView.vue       # Typing speed test
│   ├── router/
│   │   └── index.ts                 # Vue Router configuration
│   └── stores/
│       └── (future state management)
├── public/
│   ├── data.json                    # Portfolio content data
│   ├── images/                      # Image assets
│   └── favicon.ico                  # Site favicon
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
└── index.html                       # HTML entry point
```

## Development Workflow

### Running Locally

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

Development server runs on `http://localhost:5173/`

### Making Content Changes

Edit `/public/data.json` to update portfolio content:

```json
{
  "About": {
    "1": {
      "Title": "About me",
      "Description": "Your bio text here...",
      "Image": "/images/me.jpg"
    }
  },
  "Education": {
    "1": {
      "Title": "Degree Name",
      "Date": "September 2020 - June 2024",
      "Description": "Details about your education..."
    }
  },
  "Experiences": { ... },
  "Projects": { ... },
  "Extras": { ... }
}
```

### Common Modifications

**Adding a new route:**
1. Create a new view in `src/views/`
2. Register route in `src/router/index.ts`
3. Add link in `Navigation.vue`

**Customizing colors:**
- Modify CSS custom properties in `src/assets/colors.css`
- Reference colors with `var(--ctp-colorname)`

**Adjusting neural network:**
- Node spacing: Calculated automatically based on container size
- Node colors: Defined in `NeuralNetwork.vue` colors object
- Physics parameters: Adjust spring constant `k`, damping, and repulsion radius

**Adding terminal commands:**
- Edit the `commands` object in `Terminal.vue`
- Add command name as key and function returning output string

## Important Notes

- Uses Composition API with `<script setup>` for cleaner component code
- TypeScript strict mode enabled for better type safety
- All external links include `rel="noopener"` for security
- Canvas animations use `requestAnimationFrame` for 60 FPS
- Terminal easter egg accessible with backtick/tilde key (`~`)
- Fully responsive - test on mobile, tablet, and desktop viewports

## Dependencies

- **Vue 3.5+** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Pinia 3** - State management (available but not currently used)
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7** - Next-generation frontend tooling

## Google Analytics

Google Analytics is commented out in the old HTML files. To re-enable:
1. Add GA script to `index.html` in root
2. Or use a Vue plugin like `vue-gtag-next`

## Deployment

The site builds to the `dist/` directory:

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

For custom domain (jellemax.be), ensure CNAME record is configured.
