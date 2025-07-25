"use client"
import { Box, Container, Typography, Card, CardContent, useTheme, alpha, Chip, Tooltip, Tabs, Tab } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { useState } from "react"
import {
  Code, RocketLaunch, Javascript, DataObject, Palette, Extension, Style, Brush, Sync,
  Search, GitHub, Computer, Link, BarChart, Storage, Coffee, HighQuality,
  Assignment,
  Schedule,
} from "@mui/icons-material"
import { Gitlab } from "lucide-react"
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

const skills = [
    { name: "React.js", level: "Expert", category: "Frontend", icon: Code },
    { name: "Next.js", level: "Expert", category: "Frontend", icon: RocketLaunch },
    { name: "JavaScript", level: "Expert", category: "Frontend", icon: Javascript },
    // { name: "TypeScript", level: "Advanced", category: "Frontend", icon: DataObject },
    { name: "Vue.js", level: "Intermediate", category: "Frontend", icon: Code },
    { name: "Tailwind CSS", level: "Expert", category: "Styling", icon: Palette },
    { name: "Material-UI", level: "Expert", category: "Styling", icon: Extension },
    { name: "Styled Components", level: "Advanced", category: "Styling", icon: Style },
    { name: "Figma", level: "Advanced", category: "Styling", icon: Brush },
    { name: "Context API", level: "Advanced", category: "State Management", icon: Sync },
    { name: "Redux", level: "Advanced", category: "State Management", icon: Sync },
    { name: "React Query", level: "Intermediate", category: "State Management", icon: Search },
    { name: "Git & GitHub", level: "Expert", category: "Tools", icon: GitHub },
    { name: "GitLab", level: "Expert", category: "Tools", icon: Gitlab },
    { name: "VS Code", level: "Expert", category: "Tools", icon: Computer },
    { name: "Jira", level: "Advanced", category: "Tools", icon: Assignment },
    { name: "Monday.com", level: "Intermediate", category: "Tools", icon: Schedule }, 
    { name: "REST APIs", level: "Advanced", category: "Backend", icon: Link },
    // { name: "GraphQL", level: "Intermediate", category: "Backend", icon: BarChart },
    { name: "Java", level: "Intermediate", category: "Languages", icon: Coffee },
    { name: "Python", level: "Intermediate", category: "Languages", icon: HighQuality },
    { name: "SQL", level: "Advanced", category: "Languages", icon: Storage },
  ];
  

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`

const SkillCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.primary.main, 0.05)})`,
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  '&:hover': {
    transform: "scale(1.05)",
    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  animation: `${fadeIn} 0.6s ease-out both`,
  width: "100%",
  textAlign: "center"
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
  color: theme.palette.primary.main,
  margin: "0 auto 12px",
}))

const Skills = () => {
  const theme = useTheme()
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const categories = Object.keys(groupedSkills)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue)
  }

  return (
    <Box sx={{ py: 10, px: 2 }}>
      <Container>
        <SectionTitle variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
        Skills & Expertise
            </SectionTitle>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          A creative and categorized showcase of technologies I'm confident working with.
        </Typography>
        <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="skill categories"
            sx={{
              mb: 4,
              display: 'flex',
              justifyContent: 'center',
              '& .MuiTabs-flexContainer': {
                width: '100%',
              },
              '& .MuiTab-root': {
                flex: 1,
                maxWidth: 'none',
                borderRadius: 2,
                mx: 0.5,
                textTransform: 'none',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)', // glass effect
                backgroundColor: 'rgba(188, 184, 184, 0.2)', // translucent gray
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
              '& .Mui-selected': {
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.6)}, ${alpha(theme.palette.primary.main, 0.4)})`,
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }
            }}
            
            >
            {categories.map((category) => (
                <Tab
                label={category}
                value={category}
                key={category}
                />
            ))}
            </Tabs>



        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" },
            gap: 3,
          }}
        >
          {groupedSkills[selectedCategory]?.map(({ name, icon: Icon, level }) => (
            <SkillCard key={name}>
              <CardContent>
                <IconWrapper>
                  <Icon fontSize="medium" />
                </IconWrapper>
                <Typography variant="h6" fontWeight={600}>{name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {level}
                </Typography>
              </CardContent>
            </SkillCard>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Skills
