"use client"
import React, { useState, useEffect, useRef } from "react"
import { Box, Container, Typography, Card, CardContent, useTheme, alpha } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Work, CalendarToday, Business } from "@mui/icons-material"
import { motion, useAnimation, useInView } from "framer-motion"

const experience = [
  {
    role: "Sr. Frontend Developer",
    company: "Fincoopers Capital Pvt Ltd – Indore, India",
    period: "Mar 2025 – Present",
    tech: ["Next.js", "Material UI", "REST APIs", "AI Integration"],
    details: [
      "Led the frontend architecture for HR and Career portals using Next.js, MUI, and REST APIs.",
      "Implemented RBAC-based authentication, dynamic job post creation, and organization configuration.",
      "Developed an Interview Monitor with scheduling (walk-in, call, online), candidate profiles, and calendar views.",
      "Integrated AI-powered resume analysis and candidate selection processes.",
      "Delivered a fully dynamic Career Portal with configurable job listings and multi-step applications.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Dice Enterprise – Pune, India",
    period: "Jan 2024 – Feb 2025",
    tech: ["React", "Redux", "Tailwind", "B2B Systems"],
    details: [
      "Designed and developed scalable, utility-based UI systems using React, Redux, and Tailwind.",
      "Built interfaces for IDFC's expense platform and Yes Bank's utility management tools.",
      "Integrated MakeMyTrip's B2B travel system into the platform for seamless booking workflows.",
      "Created intuitive approval automation systems and optimized booking UX for enterprise clients.",
    ],
  },
  {
    role: "Frontend Engineer (Part-time)",
    company: "Geniehub Solutions Pvt Ltd – Remote",
    period: "Jun 2023 – Dec 2023",
    tech: ["React", "Tailwind CSS", "Figma"],
    details: [
      "Built responsive UIs using React, Tailwind CSS, JavaScript, HTML, and CSS based on Figma designs.",
      "Contributed to visually polished and accessible web applications during academic tenure.",
    ],
  },
]

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -12,
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: "4px",
  },
}))

const ExperienceCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.9)})`,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: "12px",
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    "&::before": {
      transform: "translateX(0)",
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: "translateY(-100%)",
    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
}))

const TimelineConnector = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "36px",
  top: "48px",
  bottom: "-48px",
  width: "2px",
  background: `linear-gradient(to bottom, 
    ${alpha(theme.palette.primary.main, 0.8)}, 
    ${alpha(theme.palette.secondary.main, 0.8)})`,
  display: { xs: "none", md: "block" },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-1px",
    width: "4px",
    height: "100%",
    background: `linear-gradient(to bottom, 
      ${alpha(theme.palette.primary.main, 0.2)}, 
      ${alpha(theme.palette.secondary.main, 0.2)})`,
    filter: "blur(2px)",
  },
}))

const TimelineDot = styled(Box)(({ theme }) => ({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  background: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.2)}`,
  position: "absolute",
  left: "28px",
  top: "40px",
  display: { xs: "none", md: "block" },
  zIndex: 2,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 0 0 8px ${alpha(theme.palette.secondary.main, 0.3)}`,
  },
}))

const RoleBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  background: alpha(theme.palette.primary.main, 0.1),
  padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
  borderRadius: "24px",
  marginBottom: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  backdropFilter: "blur(4px)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.2),
    transform: "translateY(-2px)",
  },
}))

const TechPill = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  borderRadius: "16px",
  background: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  fontSize: "0.75rem",
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.2),
    transform: "scale(1.05)",
  },
}))

const DetailItem = styled(motion.li)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(4),
  marginBottom: theme.spacing(2),
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "0.6em",
    width: "12px",
    height: "12px",
    borderRadius: "4px",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: "rotate(45deg)",
  },
}))

const FloatingOrb = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(40px)",
  opacity: 0.6,
  zIndex: 0,
}))

const Experience = () => {
  const theme = useTheme()
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  }

  return (
    <Box
      id="experience"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, lg: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingOrb
        sx={{
          top: "10%",
          right: "10%",
          width: { xs: 150, md: 200 },
          height: { xs: 150, md: 200 },
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)} 0%, transparent 70%)`,
        }}
      />
      <FloatingOrb
        sx={{
          bottom: "15%",
          left: "15%",
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)} 0%, transparent 70%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: -20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
          }}
        >
          <SectionTitle variant="h2" component="h2">
            Professional Experience
          </SectionTitle>
        </motion.div>

        <Box sx={{ position: "relative" }}>
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            style={{ position: "relative" }}
          >
            {experience.map((exp, index) => (
              <Box key={index} sx={{ position: "relative", mb: 8 }}>
                {index < experience.length - 1 && <TimelineConnector />}
                <TimelineDot />

                <motion.div variants={itemVariants}>
                  <ExperienceCard sx={{ ml: { xs: 0, md: 10 } }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 3, mb: 3 }}>
                        <Box sx={{ flex: 1, minWidth: "200px" }}>
                          <RoleBadge>
                            <Work sx={{ color: theme.palette.primary.main }} />
                            <Typography variant="subtitle1" fontWeight="700" color="text.primary">
                              {exp.role}
                            </Typography>
                          </RoleBadge>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                            <Business sx={{ color: theme.palette.primary.main }} />
                            <Typography variant="body1" fontWeight="600" color="text.primary">
                              {exp.company}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                            {exp.tech.map((tech, i) => (
                              <TechPill key={i}>{tech}</TechPill>
                            ))}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            background: alpha(theme.palette.primary.main, 0.1),
                            px: 3,
                            py: 1.5,
                            borderRadius: "24px",
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            height: "fit-content",
                          }}
                        >
                          <CalendarToday sx={{ color: theme.palette.primary.main, fontSize: "1rem" }} />
                          <Typography variant="body2" fontWeight="600" color="text.primary">
                            {exp.period}
                          </Typography>
                        </Box>
                      </Box>

                      <Box component="ul" sx={{ pl: 0, m: 0,listStyle: 'none'  }}>
                        {exp.details.map((detail, idx) => (
                          <DetailItem
                            key={idx}
                            variants={itemVariants}
                            initial="hidden"
                            animate={controls}
                            transition={{ delay: index * 0.15 + idx * 0.05 }}
                          >
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                              {detail}
                            </Typography>
                          </DetailItem>
                        ))}
                      </Box>
                    </CardContent>
                  </ExperienceCard>
                </motion.div>
              </Box>
            ))}
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default Experience