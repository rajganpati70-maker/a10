// ============================================================================
// CreatorX Ultra Pro - Gradient Button Component
// Premium button with gradient background, animations, and haptics
// ============================================================================

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AnimatedTouchable from './AnimatedTouchable';
import { useTheme } from '../../context/ThemeContext';
import { Typography, BorderRadius, Spacing, Layout } from '../../theme';

// ============================================================================
// Types
// ============================================================================

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  colors?: string[];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'ghost';
  fullWidth?: boolean;
  borderRadius?: number;
  hapticType?: 'light' | 'medium' | 'heavy' | 'selection' | 'none';
}

// ============================================================================
// GradientButton Component
// ============================================================================

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  colors,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  size = 'medium',
  variant = 'filled',
  fullWidth = false,
  borderRadius = BorderRadius.xl,
  hapticType = 'light',
}) => {
  const { isDark, colors: themeColors } = useTheme();

  const gradientColors = colors || [themeColors.primary, themeColors.primaryLight];

  const getHeight = (): number => {
    switch (size) {
      case 'small':
        return Layout.buttonHeightSmall;
      case 'large':
        return Layout.buttonHeightLarge;
      default:
        return Layout.buttonHeight;
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return Typography.buttonSmall;
      case 'large':
        return Typography.buttonLarge;
      default:
        return Typography.button;
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 22;
      default:
        return 18;
    }
  };

  const getPadding = (): number => {
    switch (size) {
      case 'small':
        return Spacing.md;
      case 'large':
        return Spacing.xxl;
      default:
        return Spacing.xl;
    }
  };

  const renderContent = () => {
    const textColor =
      variant === 'filled' ? '#FFFFFF' : themeColors.primary;
    const iconColor = textColor;
    const iconSize = getIconSize();

    if (loading) {
      return (
        <ActivityIndicator
          color={textColor}
          size={size === 'small' ? 'small' : 'small'}
        />
      );
    }

    return (
      <View style={styles.contentRow}>
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={iconColor}
            style={styles.iconLeft}
          />
        )}
        <Text
          style={[
            getTextStyle(),
            { color: textColor },
            textStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {icon && iconPosition === 'right' && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={iconColor}
            style={styles.iconRight}
          />
        )}
      </View>
    );
  };

  if (variant === 'outlined') {
    return (
      <Animated.View entering={FadeIn.duration(300)}>
        <AnimatedTouchable
          onPress={onPress}
          disabled={disabled || loading}
          hapticType={hapticType}
        >
          <View
            style={[
              styles.button,
              {
                height: getHeight(),
                borderRadius,
                paddingHorizontal: getPadding(),
                borderWidth: 2,
                borderColor: themeColors.primary,
                backgroundColor: 'transparent',
              },
              fullWidth && styles.fullWidth,
              disabled && styles.disabled,
              style,
            ]}
          >
            {renderContent()}
          </View>
        </AnimatedTouchable>
      </Animated.View>
    );
  }

  if (variant === 'ghost') {
    return (
      <Animated.View entering={FadeIn.duration(300)}>
        <AnimatedTouchable
          onPress={onPress}
          disabled={disabled || loading}
          hapticType={hapticType}
        >
          <View
            style={[
              styles.button,
              {
                height: getHeight(),
                borderRadius,
                paddingHorizontal: getPadding(),
                backgroundColor: 'transparent',
              },
              fullWidth && styles.fullWidth,
              disabled && styles.disabled,
              style,
            ]}
          >
            {renderContent()}
          </View>
        </AnimatedTouchable>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <AnimatedTouchable
        onPress={onPress}
        disabled={disabled || loading}
        hapticType={hapticType}
      >
        <LinearGradient
          colors={gradientColors as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            {
              height: getHeight(),
              borderRadius,
              paddingHorizontal: getPadding(),
            },
            fullWidth && styles.fullWidth,
            disabled && styles.disabled,
            style,
          ]}
        >
          {renderContent()}
        </LinearGradient>
      </AnimatedTouchable>
    </Animated.View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

export default GradientButton;
