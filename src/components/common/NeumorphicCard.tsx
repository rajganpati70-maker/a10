// ============================================================================
// CreatorX Ultra Pro - Neumorphic Card Component
// Soft UI card with light/dark shadow depth effects
// ============================================================================

import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import AnimatedTouchable from './AnimatedTouchable';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing, Shadows } from '../../theme';

// ============================================================================
// Types
// ============================================================================

interface NeumorphicCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  depth?: number;
  shape?: 'flat' | 'concave' | 'convex' | 'pressed';
  borderRadius?: number;
  padding?: number;
  animated?: boolean;
  backgroundColor?: string;
}

// ============================================================================
// NeumorphicCard Component
// ============================================================================

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  style,
  onPress,
  depth = 6,
  shape = 'flat',
  borderRadius = BorderRadius.lg,
  padding = Spacing.lg,
  animated = true,
  backgroundColor,
}) => {
  const { isDark, colors, shadows } = useTheme();

  const bgColor = backgroundColor || colors.neumorphBg;
  const lightColor = colors.neumorphLight;
  const darkColor = colors.neumorphDark;

  const getShadowStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [];

    switch (shape) {
      case 'flat':
        baseStyles.push({
          shadowColor: lightColor,
          shadowOffset: { width: -depth, height: -depth },
          shadowOpacity: isDark ? 0.2 : 0.7,
          shadowRadius: depth * 1.5,
          elevation: depth,
        });
        break;
      case 'concave':
        baseStyles.push({
          shadowColor: darkColor,
          shadowOffset: { width: depth / 2, height: depth / 2 },
          shadowOpacity: isDark ? 0.5 : 0.3,
          shadowRadius: depth,
          elevation: depth / 2,
        });
        break;
      case 'convex':
        baseStyles.push({
          shadowColor: lightColor,
          shadowOffset: { width: -depth, height: -depth },
          shadowOpacity: isDark ? 0.3 : 0.8,
          shadowRadius: depth * 2,
          elevation: depth,
        });
        break;
      case 'pressed':
        baseStyles.push({
          shadowColor: darkColor,
          shadowOffset: { width: depth / 3, height: depth / 3 },
          shadowOpacity: isDark ? 0.4 : 0.25,
          shadowRadius: depth / 2,
          elevation: 1,
        });
        break;
    }

    return baseStyles;
  };

  const cardContent = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderRadius,
          padding,
        },
        ...getShadowStyles(),
        style,
      ]}
    >
      {shape === 'concave' && (
        <View
          style={[
            styles.innerShadow,
            {
              borderRadius: borderRadius - 2,
              backgroundColor: isDark
                ? 'rgba(0, 0, 0, 0.15)'
                : 'rgba(0, 0, 0, 0.03)',
            },
          ]}
        />
      )}
      {shape === 'convex' && (
        <View
          style={[
            styles.convexHighlight,
            {
              borderRadius: borderRadius - 2,
            },
          ]}
        />
      )}
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
      <Animated.View entering={FadeIn.duration(400)}>
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
    overflow: 'visible',
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  innerShadow: {
    ...StyleSheet.absoluteFillObject,
    margin: 2,
  },
  convexHighlight: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
  },
});

export default NeumorphicCard;
