// ============================================================================
// CreatorX Ultra Pro - Glassmorphic Card Component
// Premium glass-effect card with blur, border, and animations
// ============================================================================

import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  Layout,
} from 'react-native-reanimated';
import AnimatedTouchable from './AnimatedTouchable';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../theme';

// ============================================================================
// Types
// ============================================================================

interface GlassmorphicCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  onPress?: () => void;
  animated?: boolean;
  animationDelay?: number;
  animationDirection?: 'up' | 'down' | 'fade';
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  gradientColors?: string[];
  showGradientBorder?: boolean;
  elevation?: number;
}

// ============================================================================
// GlassmorphicCard Component
// ============================================================================

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  style,
  intensity = 30,
  tint,
  onPress,
  animated = true,
  animationDelay = 0,
  animationDirection = 'up',
  borderWidth = 1,
  borderRadius = BorderRadius.lg,
  padding = Spacing.lg,
  gradientColors,
  showGradientBorder = false,
  elevation = 0,
}) => {
  const { isDark, colors } = useTheme();

  const resolvedTint = tint || (isDark ? 'dark' : 'light');

  const getAnimationEntering = () => {
    const baseDelay = animationDelay;
    switch (animationDirection) {
      case 'up':
        return FadeInDown.delay(baseDelay).duration(400).springify();
      case 'down':
        return FadeInUp.delay(baseDelay).duration(400).springify();
      case 'fade':
      default:
        return FadeIn.delay(baseDelay).duration(400);
    }
  };

  const cardContent = (
    <View
      style={[
        styles.innerContainer,
        {
          borderRadius,
          padding,
          borderWidth: showGradientBorder ? 0 : borderWidth,
          borderColor: colors.glassBorder,
        },
        style,
      ]}
    >
      {Platform.OS === 'web' ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.glassBg,
              borderRadius,
            },
          ]}
        />
      ) : (
        <BlurView
          intensity={intensity}
          tint={resolvedTint}
          style={[StyleSheet.absoluteFill, { borderRadius, overflow: 'hidden' }]}
        />
      )}
      {gradientColors && (
        <LinearGradient
          colors={gradientColors as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius, opacity: 0.15 }]}
        />
      )}
      <View style={[styles.glassHighlight, { borderRadius }]} />
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );

  const wrappedContent = onPress ? (
    <AnimatedTouchable onPress={onPress} style={styles.touchable}>
      {cardContent}
    </AnimatedTouchable>
  ) : (
    cardContent
  );

  if (animated) {
    return (
      <Animated.View
        entering={getAnimationEntering()}
        layout={Layout.springify()}
        style={[
          elevation > 0 && {
            shadowColor: isDark ? colors.primary : '#000',
            shadowOffset: { width: 0, height: elevation * 2 },
            shadowOpacity: isDark ? 0.3 : 0.1,
            shadowRadius: elevation * 4,
            elevation: elevation * 2,
          },
        ]}
      >
        {wrappedContent}
      </Animated.View>
    );
  }

  return wrappedContent;
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  touchable: {
    overflow: 'hidden',
  },
  innerContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  glassHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
  },
});

export default GlassmorphicCard;
