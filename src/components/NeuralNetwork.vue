<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

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

interface Node {
  id: string
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  radius: number
  color: string
  data: NodeData
  category: string
}

const props = defineProps<{
  data: NetworkData
}>()

const emit = defineEmits<{
  nodeClick: [node: { data: NodeData; category: string }]
}>()

const canvas = ref<HTMLCanvasElement>()
const nodes = ref<Node[]>([])
const hoveredNode = ref<Node | null>(null)
const animationFrame = ref<number>()
const mouseX = ref(0)
const mouseY = ref(0)

const colors = {
  blue: '#8aadf4',
  lavender: '#b7bdf8',
  mauve: '#c6a0f6',
  pink: '#f5bde6',
  green: '#a6da95',
  yellow: '#eed49f',
  peach: '#f5a97f',
}

const isMobile = computed(() => window.innerWidth < 768)

// Helper function to create shorthand titles
const getShortTitle = (title: string, maxLength: number = 20): string => {
  if (title.length <= maxLength) return title

  // Try to truncate at a word boundary
  const truncated = title.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace) + '...'
  }

  return truncated + '...'
}

const createNodes = () => {
  const categories = Object.keys(props.data)
  const width = canvas.value!.width
  const height = canvas.value!.height
  const newNodes: Node[] = []

  const colorKeys = Object.keys(colors)

  // Calculate spacing - use more width with padding on sides
  const padding = isMobile.value ? 80 : 120
  const usableWidth = width - (padding * 2)
  const spacing = usableWidth / categories.length

  categories.forEach((category, categoryIndex) => {
    const layer = props.data[category]
    if (!layer) return

    const itemCount = Object.keys(layer).length
    const x = padding + (spacing * categoryIndex) + (spacing / 2)

    Object.entries(layer).forEach(([key, data], index) => {
      const y = (height / (itemCount + 1)) * (index + 1)
      const colorKey = colorKeys[categoryIndex % colorKeys.length] as keyof typeof colors

      newNodes.push({
        id: `${category}-${key}`,
        x,
        y,
        targetX: x,
        targetY: y,
        vx: 0,
        vy: 0,
        radius: isMobile.value ? 22 : 28,
        color: colors[colorKey],
        data,
        category,
      })
    })
  })

  nodes.value = newNodes
}

const drawConnections = (ctx: CanvasRenderingContext2D) => {
  const categories = Object.keys(props.data)

  ctx.strokeStyle = 'rgba(138, 173, 244, 0.1)'
  ctx.lineWidth = 1

  categories.forEach((category, idx) => {
    if (idx < categories.length - 1) {
      const currentNodes = nodes.value.filter(n => n.category === category)
      const nextNodes = nodes.value.filter(n => n.category === categories[idx + 1])

      currentNodes.forEach(node1 => {
        nextNodes.forEach(node2 => {
          ctx.beginPath()
          ctx.moveTo(node1.x, node1.y)
          ctx.lineTo(node2.x, node2.y)
          ctx.stroke()
        })
      })
    }
  })
}

const drawNodes = (ctx: CanvasRenderingContext2D) => {
  nodes.value.forEach(node => {
    const isHovered = hoveredNode.value?.id === node.id
    const radius = isHovered ? node.radius * 1.2 : node.radius

    // Draw glow effect for hovered node
    if (isHovered) {
      ctx.shadowBlur = 20
      ctx.shadowColor = node.color
    } else {
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    }

    // Draw node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(36, 39, 58, 0.9)'
    ctx.fill()
    ctx.strokeStyle = node.color
    ctx.lineWidth = isHovered ? 3 : 2
    ctx.stroke()

    // Draw inner circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius * 0.3, 0, Math.PI * 2)
    ctx.fillStyle = node.color
    ctx.fill()

    ctx.shadowBlur = 0
  })
}

const drawLabels = (ctx: CanvasRenderingContext2D) => {
  ctx.shadowBlur = 0
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Draw category labels at the top
  const categories = Object.keys(props.data)
  const colorKeys = Object.keys(colors)
  const width = canvas.value!.width

  const padding = isMobile.value ? 80 : 120
  const usableWidth = width - (padding * 2)
  const spacing = usableWidth / categories.length

  categories.forEach((category, categoryIndex) => {
    const x = padding + (spacing * categoryIndex) + (spacing / 2)
    const colorKey = colorKeys[categoryIndex % colorKeys.length] as keyof typeof colors
    const categoryColor = colors[colorKey]

    // Category label at top
    ctx.font = `bold ${isMobile.value ? 14 : 18}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    ctx.fillStyle = categoryColor
    ctx.fillText(category, x, 30)
  })

  // Draw node labels
  nodes.value.forEach(node => {
    const isHovered = hoveredNode.value?.id === node.id

    // Set font size based on hover state and screen size
    const fontSize = isHovered ? (isMobile.value ? 14 : 16) : (isMobile.value ? 11 : 13)
    ctx.font = `${isHovered ? 'bold' : '600'} ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

    // Draw label below the node
    const labelY = node.y + node.radius + (isMobile.value ? 18 : 22)

    // Draw text background for better readability
    const maxTitleLength = isMobile.value ? 15 : 20
    const title = getShortTitle(node.data.Title, maxTitleLength)
    const textWidth = ctx.measureText(title).width
    const padding = 6

    ctx.fillStyle = 'rgba(36, 39, 58, 0.8)'
    ctx.fillRect(
      node.x - textWidth / 2 - padding,
      labelY - fontSize / 2 - 4,
      textWidth + padding * 2,
      fontSize + 8
    )

    // Draw the text
    if (isHovered) {
      ctx.fillStyle = node.color
    } else {
      ctx.fillStyle = '#b8c0e0' // ctp-subtext1
    }
    ctx.fillText(title, node.x, labelY)
  })
}

const updatePhysics = () => {
  nodes.value.forEach(node => {
    // Spring back to original position
    const dx = node.targetX - node.x
    const dy = node.targetY - node.y
    node.vx += dx * 0.05
    node.vy += dy * 0.05

    // Mouse repulsion (disabled when hovering over a node for easier clicking)
    if (mouseX.value && mouseY.value && !hoveredNode.value) {
      const mdx = mouseX.value - node.x
      const mdy = mouseY.value - node.y
      const dist = Math.sqrt(mdx * mdx + mdy * mdy)
      const repulsionRadius = isMobile.value ? 50 : 80

      if (dist < repulsionRadius && dist > 0) {
        const force = (repulsionRadius - dist) / repulsionRadius
        node.vx -= (mdx / dist) * force * 1.5
        node.vy -= (mdy / dist) * force * 1.5
      }
    }

    // Damping
    node.vx *= 0.85
    node.vy *= 0.85

    // Update position
    node.x += node.vx
    node.y += node.vy
  })
}

const animate = () => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

  updatePhysics()
  drawConnections(ctx)
  drawNodes(ctx)
  drawLabels(ctx)

  animationFrame.value = requestAnimationFrame(animate)
}

const handleMouseMove = (event: MouseEvent) => {
  const rect = canvas.value!.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top

  // Check for hovered node (larger hit area for easier interaction)
  hoveredNode.value = nodes.value.find(node => {
    const dx = mouseX.value - node.x
    const dy = mouseY.value - node.y
    return Math.sqrt(dx * dx + dy * dy) < node.radius * 1.5
  }) || null

  if (hoveredNode.value) {
    canvas.value!.style.cursor = 'pointer'
  } else {
    canvas.value!.style.cursor = 'default'
  }
}

const handleClick = (event: MouseEvent) => {
  const rect = canvas.value!.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const clickedNode = nodes.value.find(node => {
    const dx = x - node.x
    const dy = y - node.y
    // Larger click area for easier interaction
    return Math.sqrt(dx * dx + dy * dy) < node.radius * 1.5
  })

  if (clickedNode) {
    emit('nodeClick', {
      data: clickedNode.data,
      category: clickedNode.category,
    })
  }
}

const handleResize = () => {
  if (!canvas.value) return

  const container = canvas.value.parentElement!
  canvas.value.width = container.clientWidth
  canvas.value.height = container.clientHeight

  createNodes()
}

onMounted(() => {
  if (!canvas.value) return

  handleResize()
  animate()

  window.addEventListener('resize', handleResize)
  canvas.value.addEventListener('mousemove', handleMouseMove)
  canvas.value.addEventListener('click', handleClick)
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
  window.removeEventListener('resize', handleResize)
  canvas.value?.removeEventListener('mousemove', handleMouseMove)
  canvas.value?.removeEventListener('click', handleClick)
})
</script>

<template>
  <div class="neural-network">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.neural-network {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
