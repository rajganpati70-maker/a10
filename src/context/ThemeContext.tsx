// ============================================================================
// CreatorX Ultra Pro - Theme Context
// Provides dark/light mode with smooth transitions and persistence
// ============================================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Shadows } from '../theme';
import { ThemeMode, STORAGE_KEYS, ThemeColors } from '../types';

// ============================================================================
// Theme Context Types
// ============================================================================

interface ThemeContextValue {
  isDark: boolean;
  themeMode: ThemeMode;
  colors: ThemeColors;
  shadows: typeof Shadows.light;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// ============================================================================
// Theme Context
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// Theme Provider Component
// ============================================================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');

  // Determine if dark mode is active based on theme mode and system preference
  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  // Get the appropriate color palette based on current theme
  const colors = useMemo(() => {
    return isDark ? Colors.dark : Colors.light;
  }, [isDark]);

  // Get the appropriate shadow styles based on current theme
  const shadows = useMemo(() => {
    return isDark ? Shadows.dark : Shadows.light;
  }, [isDark]);

  // Load saved theme preference from AsyncStorage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      }
    };
    loadThemePreference();
  }, []);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (themeMode === 'system') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        // Theme will automatically update through the useMemo dependency
        console.log('System theme changed to:', colorScheme);
      });
      return () => subscription.remove();
    }
    return undefined;
  }, [themeMode]);

  // Set theme mode and persist to AsyncStorage
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  // Toggle between light and dark modes
  const toggleTheme = useCallback(() => {
    const newMode: ThemeMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  }, [isDark, setThemeMode]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      themeMode,
      colors,
      shadows,
      setThemeMode,
      toggleTheme,
    }),
    [isDark, themeMode, colors, shadows, setThemeMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// Custom Hook for accessing theme
// ============================================================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
