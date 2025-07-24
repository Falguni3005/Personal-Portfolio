"use client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "./theme"
import Navigation from "./components/Navigation"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import BackgroundPattern from "./components/BackgroundPattern" // New import

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundPattern /> {/* Render the global background pattern */}
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </ThemeProvider>
  )
}
