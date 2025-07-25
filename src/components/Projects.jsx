"use client"
import React, { useState, useEffect, useRef } from "react"
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Fade, 
  useTheme, 
  alpha, 
  Tooltip,
  Chip,
  Stack,
  Divider,
  CardMedia
} from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"

const projects = [
  {
    id: 1,
    title: "HR & Career Portals – Fincoopers Capital Pvt Ltd",
    description: "Led the architecture and development of AI-driven HR and Career platforms using Next.js, MUI, and REST APIs. Built foundational modules including authentication, organization setup, and RBAC integration. Implemented dynamic job creation with skill analysis, resume parsing, AI-based candidate scoring, interview workflows, and automated offer letter generation — streamlining the entire recruitment lifecycle.",
    image: "/Fin.jpeg",
    skills: ["Next.js","Javascript","Context Api", "Redux", "Material UI", "REST APIs", "AI Integration", "Authentication", "RBAC"]
  },
  {
    id: 2,
    title: "Enterprise Platforms – Dice Enterprise",
    description: "Delivered responsive, scalable user interfaces for enterprise clients like IDFC, Yes Bank, MakeMyTrip, and ClearTrip. Designed dashboards and modules for expense tracking, ticketing, and BBPS workflows. Contributed to a B2B travel booking UI, integrated approval systems, and resolved critical issues across production-grade applications.",
    image: "/Dice.jpeg",
    skills: ["React", "Redux","Javascript", "Analytical Reports UI", "Dashboard UI","Tailwind CSS","Retro", "B2B Systems"]
  },
  {
    id: 3,
    title: "Web Interfaces – Geniehub Solutions",
    description: "Developed clean, responsive UI components using React and Tailwind CSS, translating Figma designs into functional web layouts. Focused on implementing reusable components and maintaining consistency across the frontend to enhance usability and performance.",
    image: "/Geniehub.jpeg",
    skills: ["React","Javascript", "Tailwind CSS", "Figma Integration", "Component Library"]
  },
]

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

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
  }
}))

const ProjectImage = styled(CardMedia)(({ theme }) => ({
  height: 190,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
  }
}))

const SkillChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.2),
  }
}))

const FloatingOrb = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(50px)",
  pointerEvents: "none",
  animation: `${pulse} 12s ease-in-out infinite alternate`,
}))

const Projects = () => {
  const theme = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        backgroundImage: 'radial-gradient(circle at 25% 25%, ' + 
          alpha(theme.palette.primary.main, 0.1) + ' 0%, transparent 55%)',
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
          <Box textAlign="center" mb={8}>
            <SectionTitle variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
              Featured Projects
            </SectionTitle>
            <Typography variant="subtitle1" color="text.secondary" maxWidth="700px" mx="auto">
              Here are some of my recent projects with detailed descriptions and technologies used
            </Typography>
            <GradientDivider />
          </Box>
        </Fade>

        <Box 
          sx={{ 
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {projects.map((project, index) => (
            <Fade in={isVisible} timeout={700 + index * 200} key={project.id}>
              <ProjectCard>
                <Box sx={{p:2}}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {project.title}
                  </Typography>
                </Box>

                <ProjectImage
                  component="img"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                      Technologies Used:
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" useFlexGap>
                      {project.skills.map((skill, i) => (
                        <SkillChip 
                          key={i} 
                          label={skill} 
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title={project?.description}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {project.description}
                  </Typography>
                  </Tooltip>
                </CardContent>
              </ProjectCard>
            </Fade>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Projects