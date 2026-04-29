// ============================================================================
// CreatorX Ultra Pro - Custom Hooks
// Comprehensive hooks for animations, storage, loading states, and more
// ============================================================================

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { AnimationConfig } from '../theme';

// ============================================================================
// useAnimatedPress - Micro animation on every touch
// ============================================================================

export const useAnimatedPress = (scaleValue: number = 0.95) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(scaleValue, AnimationConfig.spring.snappy);
    opacity.value = withTiming(0.8, { duration: 100 });
  }, [scale, opacity, scaleValue]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, AnimationConfig.spring.bouncy);
    opacity.value = withTiming(1, { duration: 150 });
  }, [scale, opacity]);

  return { animatedStyle, onPressIn, onPressOut };
};

// ============================================================================
// useHaptic - Haptic feedback on actions
// ============================================================================

export const useHaptic = () => {
  const lightHaptic = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Haptics not available on this device
    }
  }, []);

  const mediumHaptic = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Haptics not available
    }
  }, []);

  const heavyHaptic = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      // Haptics not available
    }
  }, []);

  const successHaptic = useCallback(async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Haptics not available
    }
  }, []);

  const warningHaptic = useCallback(async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      // Haptics not available
    }
  }, []);

  const errorHaptic = useCallback(async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      // Haptics not available
    }
  }, []);

  const selectionHaptic = useCallback(async () => {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      // Haptics not available
    }
  }, []);

  return {
    light: lightHaptic,
    medium: mediumHaptic,
    heavy: heavyHaptic,
    success: successHaptic,
    warning: warningHaptic,
    error: errorHaptic,
    selection: selectionHaptic,
  };
};

// ============================================================================
// useAsyncStorage - Persistent storage hook
// ============================================================================

export function useAsyncStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadValue = async () => {
      try {
        setIsLoading(true);
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setValue(JSON.parse(stored));
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load from storage'));
        console.warn(`Failed to load ${key} from AsyncStorage:`, e);
      } finally {
        setIsLoading(false);
      }
    };
    loadValue();
  }, [key]);

  const setStoredValue = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      try {
        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to save to storage'));
        console.warn(`Failed to save ${key} to AsyncStorage:`, e);
      }
    },
    [key, value]
  );

  const removeValue = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(defaultValue);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to remove from storage'));
    }
  }, [key, defaultValue]);

  return { value, setValue: setStoredValue, removeValue, isLoading, error };
}

// ============================================================================
// useDebounce - Debounced value
// ============================================================================

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// useMockLoading - Simulated loading states with setTimeout
// ============================================================================

export function useMockLoading<T>(
  fetchFn: () => T,
  delay: number = 1500
): {
  data: T | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loadCountRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const result = fetchFn();
        setData(result);
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load data'));
        setIsLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          const result = fetchFn();
          setData(result);
          loadCountRef.current = 0;
          setHasMore(true);
        } catch (e) {
          setError(e instanceof Error ? e : new Error('Failed to refresh'));
        }
        setIsRefreshing(false);
        resolve();
      }, delay);
    });
  }, [fetchFn, delay]);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    loadCountRef.current += 1;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (loadCountRef.current >= 5) {
          setHasMore(false);
        }
        resolve();
      }, delay / 2);
    });
  }, [hasMore, delay]);

  return { data, isLoading, isRefreshing, error, refresh, loadMore, hasMore };
}

// ============================================================================
// usePulseAnimation - Skeleton loading pulse
// ============================================================================

export const usePulseAnimation = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.ease }),
        withTiming(0.3, { duration: 800, easing: Easing.ease })
      ),
      -1,
      false
    );
  }, [opacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return pulseStyle;
};

// ============================================================================
// useFloatingAnimation - Floating button animation
// ============================================================================

export const useFloatingAnimation = () => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [translateY, scale]);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return floatingStyle;
};

// ============================================================================
// useScreenDimensions - Responsive dimensions
// ============================================================================

export const useScreenDimensions = () => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width,
      height,
      isLandscape: width > height,
      isTablet: width >= 768,
      isSmallScreen: width < 375,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
        isLandscape: window.width > window.height,
        isTablet: window.width >= 768,
        isSmallScreen: window.width < 375,
      });
    });

    return () => subscription.remove();
  }, []);

  return dimensions;
};

// ============================================================================
// useCountAnimation - Animated counting number
// ============================================================================

export const useCountAnimation = (targetValue: number, duration: number = 1000) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(targetValue, {
      duration,
      easing: Easing.out(Easing.cubic),
    });

    const interval = setInterval(() => {
      const progress = animatedValue.value / targetValue;
      const currentValue = Math.round(progress * targetValue);
      runOnJS(setDisplayValue)(currentValue);
      if (currentValue >= targetValue) {
        clearInterval(interval);
        runOnJS(setDisplayValue)(targetValue);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetValue, duration, animatedValue]);

  return displayValue;
};

// ============================================================================
// useFavorites - Manage favorites with AsyncStorage
// ============================================================================

export const useFavorites = (storageKey: string) => {
  const { value: favorites, setValue: setFavorites } = useAsyncStorage<string[]>(storageKey, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (favorites.includes(id)) {
        await setFavorites(favorites.filter((fId) => fId !== id));
      } else {
        await setFavorites([...favorites, id]);
      }
    },
    [favorites, setFavorites]
  );

  return { favorites, isFavorite, toggleFavorite };
};

// ============================================================================
// useInfiniteScroll - Infinite scroll logic
// ============================================================================

export const useInfiniteScroll = <T>(
  initialData: T[],
  fetchMore: () => T[],
  pageSize: number = 10
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newItems = fetchMore();
        if (newItems.length < pageSize) {
          setHasMore(false);
        }
        setData((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
        setIsLoadingMore(false);
        resolve();
      }, 1000);
    });
  }, [isLoadingMore, hasMore, fetchMore, pageSize]);

  const refresh = useCallback(async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const freshData = fetchMore();
        setData(freshData);
        setPage(1);
        setHasMore(true);
        resolve();
      }, 1000);
    });
  }, [fetchMore]);

  return { data, isLoadingMore, hasMore, loadMore, refresh, page };
};

// ============================================================================
// useSlideInAnimation - Staggered slide-in for lists
// ============================================================================

export const useSlideInAnimation = (index: number, delay: number = 50) => {
  const translateX = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const staggerDelay = index * delay;
    translateX.value = withDelay(
      staggerDelay,
      withSpring(0, AnimationConfig.spring.gentle)
    );
    opacity.value = withDelay(
      staggerDelay,
      withTiming(1, { duration: 300 })
    );
  }, [index, delay, translateX, opacity]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return slideStyle;
};

// ============================================================================
// useScaleAnimation - Scale bounce on mount
// ============================================================================

export const useScaleAnimation = (delay: number = 0) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, AnimationConfig.spring.bouncy)
    );
  }, [delay, scale]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return scaleStyle;
};

// ============================================================================
// useRotateAnimation - Continuous rotation (for loading spinners)
// ============================================================================

export const useRotateAnimation = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return rotateStyle;
};

// ============================================================================
// useShakeAnimation - Error shake animation
// ============================================================================

export const useShakeAnimation = () => {
  const translateX = useSharedValue(0);

  const shake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  }, [translateX]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { shake, shakeStyle };
};

// ============================================================================
// useTimer - Countdown/countup timer
// ============================================================================

export const useTimer = (initialSeconds: number = 0, autoStart: boolean = false) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const formatted = useMemo(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [seconds]);

  return { seconds, formatted, isRunning, start, pause, reset };
};
