"use client"
import { Box, Container, Typography, Card, CardContent, Fade, useTheme, alpha, Button } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { School, Person } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
`

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: theme.spacing(2),
}))

const StyledCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.6),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: "20px",
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: `0 8px 30px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}))

const FloatingOrb = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(50px)",
  pointerEvents: "none",
  animation: `${pulse} 8s ease-in-out infinite alternate`,
}))

const About = () => {
  const theme = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [expanded, setExpanded] = useState(false);

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
      id="about"
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
              right: "5%",
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
              animationDelay: "0s",
            }}
          />
          <FloatingOrb
            sx={{
              bottom: "20%",
              left: "10%",
              width: { xs: 80, md: 120 },
              height: { xs: 80, md: 120 },
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
              animationDelay: "3s",
            }}
          />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={isVisible} timeout={800}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <SectionTitle variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
              About Me
            </SectionTitle>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
                mx: "auto",
                mt: 2,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              Get to know more about my background, experience, and education
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 6 }}>
        <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.2s both` }}>
      <StyledCard>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconWrapper>
              <Person />
            </IconWrapper>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "text.primary", fontSize: { xs: "1.125rem", md: "1.25rem" } }}
            >
              Professional Journey
            </Typography>
          </Box>

          <Box sx={{ space: 2 }}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7, fontSize: { xs: "0.95rem", md: "1rem" } }}
            >
              I'm a frontend developer and MCA graduate from SGSITS, Indore, with hands-on experience in building
              scalable, enterprise-grade applications. At Fincoopers Capital, I led the frontend architecture of
              dynamic HR and Career Portals using Next.js, MUI, and REST APIs.
            </Typography>

            {expanded && (
              <>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7, fontSize: { xs: "0.95rem", md: "1rem" } }}
                >
                  Previously at Dice Enterprises, I developed responsive utility-based UIs for clients like IDFC and
                  Yes Bank, and collaborated with MakeMyTrip to integrate their B2B travel system. I focused on
                  intuitive frontend design and workflow automation.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.7, fontSize: { xs: "0.95rem", md: "1rem" } }}
                >
                  I bring proficiency in React, Next.js, Redux, MUI, Tailwind, and RESTful APIs, thriving in agile
                  environments to build impactful digital solutions.
                </Typography>
              </>
            )}

            <Button
              variant="text"
              sx={{ mt: 1, textTransform: "none", fontSize: "0.95rem" }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View Less" : "View More"}
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>

          <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.4s both` }}>
            <StyledCard>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconWrapper>
                    <School />
                  </IconWrapper>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "text.primary", fontSize: { xs: "1.125rem", md: "1.25rem" } }}
                  >
                    Education
                  </Typography>
                </Box>
                <Box sx={{ space: 3 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "text.primary", mb: 1, fontSize: { xs: "1rem", md: "1.125rem" } }}
                    >
                      Master of Computer Applications
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.main", mb: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      SGSITS, Indore
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      CGPA: 8.31 (2022–2024)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "text.primary", mb: 1, fontSize: { xs: "1rem", md: "1.125rem" } }}
                    >
                      Bachelor of Computer Applications
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.main", mb: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      Dr. C.V. Raman University, Khandwa
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: { xs: "0.9rem", md: "1rem" } }}
                    >
                      CGPA: 8.9 (2019–2022)
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default About
