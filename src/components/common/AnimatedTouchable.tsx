// ============================================================================
// CreatorX Ultra Pro - AnimatedTouchable Component
// Micro-animation on every touch with haptic feedback
// ============================================================================

import React, { useCallback } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { AnimationConfig } from '../../theme';

// ============================================================================
// Types
// ============================================================================

interface AnimatedTouchableProps {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
  scaleValue?: number;
  hapticType?: 'light' | 'medium' | 'heavy' | 'selection' | 'none';
  disabled?: boolean;
  activeOpacity?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

// ============================================================================
// AnimatedTouchable Component
// ============================================================================

const AnimatedTouchable: React.FC<AnimatedTouchableProps> = ({
  children,
  onPress,
  onLongPress,
  style,
  scaleValue = 0.96,
  hapticType = 'light',
  disabled = false,
  activeOpacity = 0.85,
  springConfig = AnimationConfig.spring.snappy,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const triggerHaptic = useCallback(async () => {
    if (hapticType === 'none') return;
    try {
      switch (hapticType) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'selection':
          await Haptics.selectionAsync();
          break;
      }
    } catch {
      // Haptics not available on this device or platform
    }
  }, [hapticType]);

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      scale.value = withSpring(scaleValue, springConfig);
      opacity.value = withTiming(activeOpacity, { duration: 100 });
    })
    .onEnd(() => {
      if (onPress) {
        triggerHaptic();
        onPress();
      }
    })
    .onFinalize(() => {
      scale.value = withSpring(1, AnimationConfig.spring.bouncy);
      opacity.value = withTiming(1, { duration: 150 });
    });

  const longPressGesture = Gesture.LongPress()
    .enabled(!disabled && !!onLongPress)
    .minDuration(500)
    .onStart(() => {
      if (onLongPress) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        onLongPress();
      }
    });

  const composedGesture = Gesture.Race(tapGesture, longPressGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : opacity.value,
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, style, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default AnimatedTouchable;
