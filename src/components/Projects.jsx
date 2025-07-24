"use client"
import React, { useState, useEffect, useRef } from "react" // Import React
import { Box, Container, Typography, Card, CardContent, Fade, Slide, useTheme, alpha, Zoom, Grow, CardMedia, Tooltip} from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import genieImage from '../assets/GenieHub.jpeg';
import Fin from '../assets/Fin.jpeg';
import Dice from '../assets/Dice.jpeg';

const projects = [
  {
    id:1,
    title: "HR & Career Portals – Fincoopers Capital Pvt Ltd",
    description:
      "Led the architecture and development of AI-driven HR and Career platforms using Next.js, MUI, and REST APIs. Built foundational modules including authentication, organization setup, and RBAC integration. Implemented dynamic job creation with skill analysis, resume parsing, AI-based candidate scoring, interview workflows, and automated offer letter generation — streamlining the entire recruitment lifecycle.",
    image: Fin,
    },
  {
    id:2,
    title: "Enterprise Platforms – Dice Enterprise",
    description:
      "Delivered responsive, scalable user interfaces for enterprise clients like IDFC, Yes Bank, MakeMyTrip, and ClearTrip. Designed dashboards and modules for expense tracking, ticketing, and BBPS workflows. Contributed to a B2B travel booking UI, integrated approval systems, and resolved critical issues across production-grade applications.",
    image: Dice, 
    },
  {
    id:3,
    title: "Web Interfaces – Geniehub Solutions",
    description:
      "Developed clean, responsive UI components using React and Tailwind CSS, translating Figma designs into functional web layouts. Focused on implementing reusable components and maintaining consistency across the frontend to enhance usability and performance.",
    image: genieImage,
    },
]

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.6), 0 0 40px rgba(244, 114, 182, 0.4);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #f472b6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Removed shimmer animation for a more static title
    // background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)",
    // backgroundSize: "200% 100%",
    // animation: `${shimmer} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}))

const GradientDivider = styled(Box)(({ theme }) => ({
  width: "120px",
  height: "4px",
  background: "linear-gradient(45deg, #6366f1, #f472b6, #ec4899)",
  borderRadius: "2px",
  margin: "0 auto",
  marginBottom: theme.spacing(8),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    background: "linear-gradient(45deg, #6366f1, #f472b6, #ec4899)",
    borderRadius: "4px",
    filter: "blur(4px)",
    opacity: 0.7,
    zIndex: -1,
  },
}))

const StyledProjectCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.primary.main, 0.1)})`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  borderRadius: "24px",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)",
    transition: "left 0.6s",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "4px",
    height: "100%",
    background: "linear-gradient(to bottom, #6366f1, #f472b6, #ec4899)",
    transform: "scaleY(0)",
    transformOrigin: "bottom",
    transition: "transform 0.4s ease",
  },
  "&:hover": {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 25px 50px ${alpha(theme.palette.primary.main, 0.25)}`,
    animation: `${glow} 2s ease-in-out infinite`,
    "&::before": {
      left: "100%",
    },
    "&::after": {
      transform: "scaleY(1)",
    },
  },
}))

// Forward ref so Slide always gets a concrete DOM node
const ProjectCard = React.forwardRef(function ProjectCard(props, ref) {
  return <StyledProjectCard ref={ref} {...props} />
})

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px", // Reduced size
  height: "48px", // Reduced size
  borderRadius: "16px",
  background: "linear-gradient(45deg, #6366f1, #f472b6)",
  color: "white",
  // Removed float animation
  // animation: `${float} 4s ease-in-out infinite`,
  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1) rotate(10deg)",
    // Removed pulse animation on hover, keeping only transform
    // animation: `${pulse} 1s ease-in-out infinite`,
  },
}))

const FloatingOrb = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(50px)",
  pointerEvents: "none",
  animation: `${pulse} 12s ease-in-out infinite alternate`, // Slower pulse
}))

// Helper hook to create an array of refs
function useArrayRefs(length) {
  const refs = useRef([])
  if (refs.current.length !== length) {
    refs.current = Array.from({ length }, () => React.createRef())
  }
  return refs.current
}

const Projects = () => {
  const theme = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const cardRefs = useArrayRefs(projects.length) // Create refs for each project card

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <Box
      id="projects"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, lg: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Orbs */}
      {isVisible && (
        <>
          <FloatingOrb
            sx={{
              top: "10%",
              left: "5%",
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
              animationDelay: "0s",
            }}
          />
          <FloatingOrb
            sx={{
              bottom: "20%",
              right: "10%",
              width: { xs: 80, md: 120 },
              height: { xs: 80, md: 120 },
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
              animationDelay: "3s",
            }}
          />
        </>
      )}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={isVisible} timeout={1000}>
          <Box>
            <SectionTitle variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
              Projects
            </SectionTitle>
            <GradientDivider />
          </Box>
        </Fade>
        <Box 
        sx={{ 
            display: "flex", 
            flexDirection: "row", 
            gap: 2, 
            flexWrap: "wrap",  
            width:"100%"
        }}
        >
{projects.map((project, index) => (
  <Fade in={isVisible} timeout={700 + index * 200} key={project.id}>
    <Card
      sx={{
        width: "100%",
        maxWidth: 420,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 6,
        overflow: "hidden",
        m: 1,
      }}
    >
      <img
        src={project?.image}
        alt={project.title || "Project image"} 
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 220,
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {project.title}
        </Typography>
        <Tooltip title={project?.description}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {project.description}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  </Fade>
))}

</Box>
      </Container>
    </Box>
  )
}

export default Projects
