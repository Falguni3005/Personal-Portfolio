"use client"
import { Box, Container, Typography, Button, useTheme, alpha } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { ArrowForward, KeyboardArrowDown } from "@mui/icons-material"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`
const fadeSlideScale = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  60% {
    opacity: 0.8;
    transform: translateY(0px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const HeroSection = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingTop: "80px",
  overflow: "hidden",
})

const BackgroundOrb = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(80px)",
  pointerEvents: "none",
  animation: `${pulse} 6s ease-in-out infinite alternate`,
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: "linear-gradient(135deg, #f8fafc 0%, #6366f1 50%, #f472b6 100%)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: `${shimmer} 4s ease-in-out infinite`,
  marginBottom: theme.spacing(2),
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  fontWeight: 600,
}))

const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "14px 28px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
    transition: "left 0.5s",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
    "&::before": {
      left: "100%",
    },
  },
}))

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "14px 28px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  border: `2px solid transparent`,
  background: `linear-gradient(135deg, rgba(10, 10, 15, 1), rgba(10, 10, 15, 1)) padding-box,
              linear-gradient(135deg, #6366f1, #f472b6) border-box`,
  color: theme.palette.text.primary,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #6366f1, #f472b6)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },
  "&:hover": {
    transform: "translateY(-2px)",
    color: "white",
    "&::before": {
      opacity: 1,
    },
  },
}))

const ScrollIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
  animation: `${float} 3s ease-in-out infinite`,
  transition: "all 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    transform: "translateX(-50%) scale(1.05)",
  },
}))

const Hero = () => {
  const theme = useTheme()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <HeroSection id="hero">
      {/* Animated Background Orbs (part of the overall background pattern) */}
      <BackgroundOrb
        sx={{
          top: "20%",
          left: "15%",
          width: { xs: 200, md: 350 },
          height: { xs: 200, md: 350 },
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
        }}
      />
      <BackgroundOrb
        sx={{
          bottom: "20%",
          right: "15%",
          width: { xs: 150, md: 280 },
          height: { xs: 150, md: 280 },
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 70%)`,
          animationDelay: "2s",
        }}
      />

      <Container maxWidth="lg" sx={{ textAlign: "center", zIndex: 1, position: "relative", mt:-5 }}>
        <Box
        sx={{
            animation: `${fadeSlideScale} 1.2s cubic-bezier(0.23, 1, 0.32, 1) both`,
        }}
        >
        <MainTitle
            variant="h4"
            sx={{
            fontSize: { xs: "2.5rem", sm: "3.8rem"},
            lineHeight: 1.1,
            }}
        >
            Falguni Rana
        </MainTitle>
        </Box>


        <Box
          sx={{
            animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
          }}
        >
          <SubTitle
            variant="h3"
            sx={{
              mb: 3,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
              fontWeight: 600,
            }}
          >
            Software Developer & UI Engineer
          </SubTitle>
        </Box>

        <Box
          sx={{
            animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              mb: 6,
              maxWidth: "650px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.125rem" },
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
Crafting exceptional digital experiences through modern technologies and clean, scalable code. I specialize in React, Next.js, and advanced frontend development to build high-performance, enterprise-grade web applications. With a strong focus on intuitive UI, performance optimization, and maintainable architecture, I aim to deliver solutions that not only look great but also solve real business problems.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 3 },
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
            maxWidth: { xs: "300px", sm: "none" },
            mx: "auto",
          }}
        >
          <PrimaryButton variant="contained" endIcon={<ArrowForward />} onClick={scrollToContact}>
            Let's Collaborate
          </PrimaryButton>

          <SecondaryButton variant="outlined" onClick={() => window.open("/Falguni_Resume.pdf", "_blank")}>
            View Resume
          </SecondaryButton>
        </Box>
      </Container>

      <Box
        sx={{
          animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
        }}
      >
        <ScrollIndicator onClick={scrollToAbout}>
          <Typography variant="caption" sx={{ mb: 1, fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            EXPLORE
          </Typography>
          <KeyboardArrowDown />
        </ScrollIndicator>
      </Box>
    </HeroSection>
  )
}

export default Hero
