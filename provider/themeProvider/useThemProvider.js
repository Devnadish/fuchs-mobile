import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeValues = {
    theme,
    toggleTheme,
    colors: theme === "light" ? lightTheme : darkTheme,
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightTheme = {
  background: "hsl(0, 0%, 100%)", // White
  foreground: "hsl(222.2, 84%, 4.9%)", // Dark text
  card: "hsl(0, 0%, 100%)", // White card background
  cardForeground: "hsl(222.2, 84%, 4.9%)", // Dark card text
  popover: "hsl(0, 0%, 100%)", // White popover background
  popoverForeground: "hsl(222.2, 84%, 4.9%)", // Dark popover text
  primary: "hsl(221.2, 83.2%, 53.3%)", // Primary color
  primaryForeground: "hsl(210, 40%, 98%)", // Light primary text
  secondary: "hsl(210, 40%, 96.1%)", // Secondary color
  secondaryForeground: "hsl(222.2, 47.4%, 11.2%)", // Dark secondary text
  muted: "hsl(210, 40%, 96.1%)", // Muted color
  mutedForeground: "hsl(215.4, 16.3%, 46.9%)", // Muted text
  accent: "hsl(210, 40%, 96.1%)", // Accent color
  accentForeground: "hsl(222.2, 47.4%, 11.2%)", // Dark accent text
  destructive: "hsl(0, 84.2%, 60.2%)", // Destructive action color
  destructiveForeground: "hsl(210, 40%, 98%)", // Light destructive text
  border: "hsl(214.3, 31.8%, 91.4%)", // Border color
  input: "hsl(214.3, 31.8%, 91.4%)", // Input background
  ring: "hsl(221.2, 83.2%, 53.3%)", // Ring color
  radius: "0.5rem", // Border radius
  chart: {
    1: "hsl(12, 76%, 61%)",
    2: "hsl(173, 58%, 39%)",
    3: "hsl(197, 37%, 24%)",
    4: "hsl(43, 74%, 66%)",
    5: "hsl(27, 87%, 67%)",
  },
};

const darkTheme = {
  background: "hsl(222.2, 84%, 4.9%)", // Dark background
  foreground: "hsl(210, 40%, 98%)", // Light text
  card: "hsl(222.2, 84%, 4.9%)", // Dark card background
  cardForeground: "hsl(210, 40%, 98%)", // Light card text
  popover: "hsl(222.2, 84%, 4.9%)", // Dark popover background
  popoverForeground: "hsl(210, 40%, 98%)", // Light popover text
  primary: "hsl(217.2, 91.2%, 59.8%)", // Light primary color
  primaryForeground: "hsl(222.2, 47.4%, 11.2%)", // Dark primary text
  secondary: "hsl(217.2, 32.6%, 17.5%)", // Dark secondary color
  secondaryForeground: "hsl(210, 40%, 98%)", // Light secondary text
  muted: "hsl(217.2, 32.6%, 17.5%)", // Dark muted color
  mutedForeground: "hsl(215, 20.2%, 65.1%)", // Light muted text
  accent: "hsl(217.2, 32.6%, 17.5%)", // Dark accent color
  accentForeground: "hsl(210, 40%, 98%)", // Light accent text
  destructive: "hsl(0, 62.8%, 30.6%)", // Dark destructive action color
  destructiveForeground: "hsl(210, 40%, 98%)", // Light destructive text
  border: "hsl(217.2, 32.6%, 17.5%)", // Dark border color
  input: "hsl(217.2, 32.6%, 17.5%)", // Dark input background
  ring: "hsl(224.3, 76.3%, 48%)", // Dark ring color
  chart: {
    1: "hsl(220, 70%, 50%)",
    2: "hsl(160, 60%, 45%)",
    3: "hsl(30, 80%, 55%)",
    4: "hsl(280, 65%, 60%)",
    5: "hsl(340, 75%, 55%)",
  },
};
