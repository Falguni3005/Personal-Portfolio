"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
  alpha
} from "@mui/material"
import {
  Email,
  LinkedIn,
  WhatsApp,
  LocationOn,
  OpenInNew,
  ContentCopy,
  Check
} from "@mui/icons-material"

const Contact = () => {
  const theme = useTheme()
  const [copiedItem, setCopiedItem] = useState(null)

  const contactItems = [
    {
      id: "email",
      label: "Email",
      value: "falgunirana3005@gmail.com",
      Icon: Email,
      action: "mailto:falgunirana3005@gmail.com",
      type: "link",
      copyable: true,
      color: theme.palette.primary.main
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/falguni-rana-61a2a8241",
      Icon: LinkedIn,
      action: "https://www.linkedin.com/in/falguni-rana-61a2a8241",
      type: "external",
      color: "#0A66C2"
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: "+91 8269190530",
      Icon: WhatsApp,
      action: "https://wa.me/918269190530",
      type: "external",
      copyable: true,
      color: "#25D366"
    },
    {
      id: "location",
      label: "Location",
      value: "Khandwa, Madhya Pradesh",
      Icon: LocationOn,
      type: "info",
      color: theme.palette.secondary.main
    },
  ]

  const handleAction = (item) => {
    if (item.type === "link") {
      window.location.href = item.action
    } else if (item.type === "external") {
      window.open(item.action, "_blank", "noopener,noreferrer")
    }
  }

  const handleCopy = async (text, itemId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <Box 
      id="contact"
      component="section"
      sx={{
        py: 8,
        position: 'relative'
      }}
    >
      <Container maxWidth="md">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: theme.spacing(6) }}
        >
          <Typography 
            variant="h3" 
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Get In Touch
          </Typography>
          <Divider 
            sx={{ 
              width: 80, 
              height: 4, 
              mx: 'auto', 
              mb: 3,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              border: 'none'
            }} 
          />
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Let's connect and discuss opportunities. I'm always open to interesting conversations and collaborations.
          </Typography>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}
        >
          {contactItems.map((item) => {
            const isCopied = copiedItem === item.id
            const Icon = item.Icon

            return (
              <motion.div key={item.id} variants={itemVariants}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[6],
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack 
                      direction="row" 
                      alignItems="center" 
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Stack direction="row" alignItems="center" spacing={2} flex={1}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: alpha(item.color, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: item.color
                          }}
                        >
                          <Icon fontSize="medium" />
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {item.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.value}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        {item.copyable && (
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(item.value, item.id)}
                            sx={{
                              color: isCopied ? 'success.main' : 'text.secondary',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                              }
                            }}
                          >
                            {isCopied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                          </IconButton>
                        )}

                        {item.action && (
                          <Button
                            variant="outlined"
                            size="small"
                            endIcon={<OpenInNew fontSize="small" />}
                            onClick={() => handleAction(item)}
                            sx={{
                              textTransform: 'none',
                              borderRadius: 4,
                              px: 2,
                              '&:hover': {
                                backgroundColor: alpha(item.color, 0.1),
                                borderColor: item.color,
                                color: item.color
                              }
                            }}
                          >
                            {item.type === "external" ? 'Connect' : 'Send'}
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: theme.spacing(4) }}
        >
          <Typography variant="body2" color="text.secondary">
            Available for freelance opportunities and full-time positions
          </Typography>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Contact