import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1", // Indigo
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f472b6", // Pink
      light: "#f9a8d4",
      dark: "#ec4899",
    },
    background: {
      default: "#0a0a0f", // Deep dark
      paper: "rgba(15, 15, 25, 0.85)",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
    },
    info: {
      main: "#06b6d4", // Cyan
      light: "#22d3ee",
      dark: "#0891b2",
    },
    success: {
      main: "#10b981", // Emerald
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b", // Amber
      light: "#fbbf24",
      dark: "#d97706",
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
      fontSize: "3.5rem", // Base size, will be overridden by responsive props
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
      fontSize: "2.5rem", // Base size, will be overridden by responsive props
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      fontSize: "2rem", // Base size, will be overridden by responsive props
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.4,
      fontSize: "1.5rem", // Base size, will be overridden by responsive props
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: "1.25rem", // Base size, will be overridden by responsive props
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: "1rem", // Base size, will be overridden by responsive props
    },
    body1: {
      lineHeight: 1.7,
      fontWeight: 400,
      fontSize: "1rem", // Base size, will be overridden by responsive props
    },
    body2: {
      lineHeight: 1.6,
      fontWeight: 400,
      fontSize: "0.9rem", // Base size, will be overridden by responsive props
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@import":
          "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap')",
        body: {
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
          minHeight: "100vh",
          scrollBehavior: "smooth",
        },
        "::-webkit-scrollbar": {
          width: "6px",
        },
        "::-webkit-scrollbar-track": {
          background: "#1a1a2e",
        },
        "::-webkit-scrollbar-thumb": {
          background: "linear-gradient(45deg, #6366f1, #f472b6)",
          borderRadius: "3px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "linear-gradient(45deg, #4f46e5, #ec4899)",
        },
      },
    },
  },
})
