"use client"
import { Box, alpha, useTheme } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { motion } from "framer-motion"

// Enhanced animations
const nodePulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.6; }
`

const circuitFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`

const particleFloat = (x, y) => keyframes`
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translate(${x}px, ${y}px); opacity: 0; }
`

const BackgroundPatternContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: -1,
  overflow: "hidden",
  background: `
    // Proper hexagonal grid pattern
    linear-gradient(150deg, ${alpha(theme.palette.divider, 0.03)} 1.5px, transparent 1.5px),
    linear-gradient(-150deg, ${alpha(theme.palette.divider, 0.03)} 1.5px, transparent 1.5px),
    linear-gradient(30deg, ${alpha(theme.palette.divider, 0.03)} 1.5px, transparent 1.5px),
    linear-gradient(-30deg, ${alpha(theme.palette.divider, 0.03)} 1.5px, transparent 1.5px),
    // Main gradient
    linear-gradient(145deg, 
      ${alpha(theme.palette.primary.main, 0.03)} 0%, 
      ${alpha(theme.palette.background.default, 0.9)} 60%,
      ${alpha(theme.palette.secondary.main, 0.03)} 100%)
  `,
  backgroundSize: "86px 50px", // Proper hexagonal ratio
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

const TechNode = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: `radial-gradient(circle, 
    ${alpha(theme.palette.primary.main, 0.2)} 0%, 
    transparent 70%)`,
  filter: "blur(15px)",
  pointerEvents: "none",
  animation: `${nodePulse} 8s ease-in-out infinite`,
}))

const CircuitPath = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  '&::before': {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "1px",
    background: `linear-gradient(90deg, 
      transparent, 
      ${alpha(theme.palette.primary.light, 0.4)}, 
      transparent)`,
    animation: `${circuitFlow} 20s linear infinite`,
  }
}))

const DataParticle = styled(motion.div)(({ theme, size, x, y }) => ({
  position: "absolute",
  borderRadius: "50%",
  background: `radial-gradient(circle, 
    ${alpha(theme.palette.primary.light, 0.8)}, 
    ${alpha(theme.palette.secondary.light, 0.5)})`,
  width: size,
  height: size,
  filter: "drop-shadow(0 0 5px rgba(100, 200, 255, 0.7))",
  animation: `${particleFloat(x, y)} ${Math.random() * 10 + 10}s linear infinite`,
  animationDelay: `${Math.random() * 5}s`,
}))

const BinaryStream = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  fontFamily: "monospace",
  color: alpha(theme.palette.primary.light, 0.3),
  fontSize: "0.8rem",
  whiteSpace: "nowrap",
  pointerEvents: "none",
}))

export default function TechBackground() {
  const theme = useTheme()

  // Generate tech nodes (network hubs)
  const techNodes = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 120 + 80,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    pulseSpeed: Math.random() * 4 + 4,
  }))

  // Generate circuit paths (connections)
  const circuitPaths = Array.from({ length: 8 }).map((_, i) => {
    const length = Math.random() * 20 + 15
    const rotation = Math.random() * 180 - 90
    return {
      id: i,
      width: `${length}%`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotation,
      speed: Math.random() * 10 + 15,
    }
  })

  // Generate data particles
  const dataParticles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    startX: `${Math.random() * 100}%`,
    startY: `${Math.random() * 100}%`,
    moveX: Math.random() * 200 - 100,
    moveY: -(Math.random() * 300 + 200),
  }))

  // Generate binary streams
  const binaryStreams = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    content: Array.from({ length: 50 })
      .map(() => Math.random() > 0.5 ? '1' : '0')
      .join(' '),
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotation: Math.random() * 30 - 15,
    speed: Math.random() * 50 + 100,
  }))

  return (
    <BackgroundPatternContainer>
      {/* Floating binary code streams */}
      {binaryStreams.map((stream) => (
        <BinaryStream
          key={`stream-${stream.id}`}
          style={{
            top: stream.top,
            left: stream.left,
            transform: `rotate(${stream.rotation}deg)`,
            animation: `moveLeft ${stream.speed}s linear infinite`,
          }}
        >
          {stream.content}
        </BinaryStream>
      ))}

      {/* Tech nodes */}
      {techNodes.map((node) => (
        <TechNode
          key={`node-${node.id}`}
          style={{
            width: node.size,
            height: node.size,
            top: node.top,
            left: node.left,
            animationDuration: `${node.pulseSpeed}s`,
          }}
        />
      ))}

      {/* Circuit paths */}
      {circuitPaths.map((path) => (
        <CircuitPath
          key={`path-${path.id}`}
          style={{
            width: path.width,
            top: path.top,
            left: path.left,
            transform: `rotate(${path.rotation}deg)`,
            '&::before': {
              animationDuration: `${path.speed}s`,
            }
          }}
        />
      ))}

      {/* Data particles */}
      {dataParticles.map((particle) => (
        <DataParticle
          key={`particle-${particle.id}`}
          size={particle.size}
          x={particle.moveX}
          y={particle.moveY}
          style={{
            left: particle.startX,
            top: particle.startY,
          }}
        />
      ))}
    </BackgroundPatternContainer>
  )
}