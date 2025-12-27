import React, { createContext, useContext } from "react";

import { Colors, ThemeColors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";
import { Typography } from "../constants/Typography";

interface ThemeContextType {
  theme: "light";
  colors: ThemeColors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  toggleTheme: () => void; // No-op now
  setTheme: (theme: "light") => void; // No-op now
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    theme: "light" as const,
    colors: Colors,
    typography: Typography,
    spacing: Spacing,
    toggleTheme: () => {},
    setTheme: () => {},
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
