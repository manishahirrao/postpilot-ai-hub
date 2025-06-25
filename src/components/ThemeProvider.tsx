import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [isDark, setIsDark] = useState(false);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove("light", "dark");

    let themeToApply = theme;
    
    // Determine the actual theme to apply
    if (theme === "system") {
      themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
    }

    // Add the theme class to the root element
    root.classList.add(themeToApply);
    
    // Set data-theme attribute for better compatibility
    root.setAttribute("data-theme", themeToApply);
    
    // Update the isDark state
    const isDarkMode = themeToApply === "dark";
    setIsDark(isDarkMode);
    
    // Update the class on the html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Apply the initial theme
    applyTheme(theme);

    // Listen for system theme changes if using system theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    // Save the theme preference
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
    
    // Apply the new theme immediately
    applyTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
