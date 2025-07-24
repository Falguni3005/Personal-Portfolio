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
} from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { Menu, Close } from "@mui/icons-material"

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled
    ? `linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)`
    : `linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)`,
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, scrolled ? 0.3 : 0.1)}`,
  boxShadow: scrolled ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}` : "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: `${slideDown} 0.6s ease-out`,
}))

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.375rem",
  background: "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}))

const NavButton = styled(Button)(({ theme, active }) => ({
  borderRadius: "8px",
  padding: "8px 16px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: active ? 0 : "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)",
    transition: "left 0.3s ease",
    zIndex: -1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: active ? "80%" : "0%",
    height: "2px",
    background: "linear-gradient(90deg, #6366f1, #f472b6)",
    transition: "width 0.2s ease",
  },
  ...(active
    ? {
        color: "white",
        background: "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)",
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
      }
    : {
        color: theme.palette.text.secondary,
        "&:hover": {
          color: "white",
          transform: "translateY(-1px)",
          "&::before": {
            left: 0,
          },
          "&::after": {
            width: "80%",
          },
        },
      }),
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
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Logo onClick={() => scrollToSection("hero")}>Falguni Rana</Logo>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {navItems.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  animation: `${fadeIn} 0.4s ease-out ${index * 0.05}s both`,
                }}
              >
                <NavButton active={activeSection === item.id} onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </NavButton>
              </Box>
            ))}
          </Box>

          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
              color: "primary.main",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.1)",
                color: "secondary.main",
              },
            }}
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            background: `linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)`,
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            width: { xs: 280, sm: 320 },
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              color: "primary.main",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "rotate(90deg) scale(1.1)",
                color: "secondary.main",
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navItems.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(item.id)}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  py: 1.5,
                  transition: "all 0.2s ease",
                  animation: `${slideDown} 0.3s ease-out ${index * 0.05}s both`,
                  ...(activeSection === item.id
                    ? {
                        background: "linear-gradient(135deg, #6366f1 0%, #f472b6 100%)",
                        color: "white",
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }
                    : {
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.1),
                          transform: "translateX(4px)",
                        },
                      }),
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: "0.9rem" }}>{item.label}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
