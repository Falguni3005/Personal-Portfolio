"use client"
import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Box,
  useTheme,
  alpha,
  Avatar,
  Divider,
  Badge
} from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { Menu, Close, Mail, GitHub, LinkedIn } from "@mui/icons-material"

const floatingAnimation = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-5px) }
  100% { transform: translateY(0px) }
`

const neonGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(244, 114, 182, 0.3) }
  50% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.8), 0 0 25px rgba(244, 114, 182, 0.5) }
  100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(244, 114, 182, 0.3) }
`

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled
    ? `linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)`
    : `linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(20, 20, 35, 0.9) 100%)`,
  backdropFilter: "blur(12px)",
  borderBottom: scrolled 
    ? `1px solid ${alpha(theme.palette.primary.main, 0.5)}` 
    : 'none',
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: `${neonGlow} 4s infinite alternate`,
  zIndex: theme.zIndex.drawer + 1,
}))

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "1.5rem",
  background: "linear-gradient(135deg, #6366f1 0%, #f472b6 50%, #f59e0b 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    transform: "scale(1.05)",
    animation: `${floatingAnimation} 2s ease-in-out infinite`,
  },
  "& span": {
    fontSize: "0.8rem",
    fontWeight: 400,
    background: theme.palette.text.secondary,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  }
}))

const NavButton = styled(Button)(({ theme, active }) => ({
  borderRadius: "12px",
  padding: "10px 20px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: active ? 0 : "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(244, 114, 182, 0.8) 100%)",
    transition: "left 0.4s ease",
    zIndex: -1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: active ? "90%" : "0%",
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #f472b6)",
    borderRadius: "3px",
    transition: "width 0.3s ease",
  },
  ...(active
    ? {
        color: "white",
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
        "&::before": {
          left: 0,
        },
      }
    : {
        color: theme.palette.text.secondary,
        "&:hover": {
          color: "white",
          transform: "translateY(-2px)",
          boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
          "&::before": {
            left: 0,
          },
          "&::after": {
            width: "90%",
          },
        },
      }),
}))

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: "all 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    transform: "translateY(-3px) scale(1.1)",
    background: alpha(theme.palette.primary.main, 0.1),
  },
}))

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <StyledAppBar position="fixed" scrolled={scrolled}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1, px: { xs: 2, md: 4 } }}>
          <Logo onClick={() => scrollToSection("hero")}>

            Falguni Rana

          </Logo>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {navItems.map((item) => (
              <NavButton 
                key={item.id} 
                active={activeSection === item.id} 
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </NavButton>
            ))}
            
            <Box sx={{ display: "flex", gap: 0.5, ml: 2 }}>
              <SocialIcon href="mailto:your@email.com" target="_blank">
                <Mail />
              </SocialIcon>
              <SocialIcon href="https://github.com/yourusername" target="_blank">
                <GitHub />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/in/yourprofile" target="_blank">
                <LinkedIn />
              </SocialIcon>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1, alignItems: "center" }}>
            <Badge 
              badgeContent={3} 
              color="primary" 
              overlap="circular"
              sx={{ 
                '& .MuiBadge-badge': {
                  animation: `${floatingAnimation} 2s infinite`,
                  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
                }
              }}
            >
              <IconButton
                sx={{
                  color: "primary.main",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "secondary.main",
                    animation: `${floatingAnimation} 2s infinite`,
                  },
                }}
                onClick={() => setIsOpen(true)}
              >
                <Menu />
              </IconButton>
            </Badge>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            background: `linear-gradient(135deg, rgba(10, 10, 15, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)`,
            backdropFilter: "blur(16px)",
            borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            width: { xs: 280, sm: 320 },
            boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Logo onClick={() => {
            scrollToSection("hero")
            setIsOpen(false)
          }}>
            <Avatar 
              src="/path-to-your-avatar.jpg" 
              alt="Falguni Rana"
              sx={{ 
                width: 28, 
                height: 28,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`
              }}
            />
            Falguni Rana
          </Logo>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              color: "primary.main",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "rotate(90deg) scale(1.1)",
                color: "secondary.main",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        
        <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.2), mx: 2 }} />
        
        <List sx={{ px: 2, py: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(item.id)}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  py: 1.5,
                  px: 2,
                  transition: "all 0.3s ease",
                  ...(activeSection === item.id
                    ? {
                        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(244, 114, 182, 0.8) 100%)",
                        color: "white",
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }
                    : {
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.15),
                          transform: "translateX(5px)",
                          color: "white",
                        },
                      }),
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.label}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.2), mx: 2 }} />
        
        <Box sx={{ p: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <SocialIcon href="mailto:your@email.com" target="_blank" size="large">
            <Mail fontSize="medium" />
          </SocialIcon>
          <SocialIcon href="https://github.com/yourusername" target="_blank" size="large">
            <GitHub fontSize="medium" />
          </SocialIcon>
          <SocialIcon href="https://linkedin.com/in/yourprofile" target="_blank" size="large">
            <LinkedIn fontSize="medium" />
          </SocialIcon>
        </Box>
      </Drawer>
    </>
  )
}