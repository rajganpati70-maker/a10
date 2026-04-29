// ============================================================================
// CreatorX Ultra Pro - Skeleton Loader Component
// Animated skeleton placeholders for loading states
// ============================================================================

import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// Types
// ============================================================================

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

interface SkeletonGroupProps {
  type: 'card' | 'list-item' | 'video-card' | 'profile' | 'comment' | 'notification' | 'music' | 'stats';
  count?: number;
}

// ============================================================================
// Skeleton Bone Component
// ============================================================================

const SkeletonBone: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = BorderRadius.sm,
  style,
}) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800, easing: Easing.ease }),
        withTiming(0.3, { duration: 800, easing: Easing.ease })
      ),
      -1,
      false
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: typeof width === 'number' ? width : undefined,
          height,
          borderRadius,
          backgroundColor: colors.skeleton.background,
          overflow: 'hidden',
        },
        typeof width === 'string' && { width: width as any },
        animatedStyle,
        style,
      ]}
    >
      <LinearGradient
        colors={[
          colors.skeleton.background,
          colors.skeleton.highlight,
          colors.skeleton.background,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

// ============================================================================
// Skeleton Card
// ============================================================================

const SkeletonCard: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <SkeletonBone height={180} borderRadius={BorderRadius.md} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <SkeletonBone width={40} height={40} borderRadius={20} />
          <View style={styles.cardHeaderText}>
            <SkeletonBone width={120} height={14} />
            <SkeletonBone width={80} height={12} style={styles.mt4} />
          </View>
        </View>
        <SkeletonBone width="100%" height={14} style={styles.mt8} />
        <SkeletonBone width="70%" height={14} style={styles.mt4} />
        <View style={styles.cardActions}>
          <SkeletonBone width={60} height={24} borderRadius={12} />
          <SkeletonBone width={60} height={24} borderRadius={12} />
          <SkeletonBone width={60} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// Skeleton List Item
// ============================================================================

const SkeletonListItem: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.listItem, { backgroundColor: colors.surface }]}>
      <SkeletonBone width={48} height={48} borderRadius={24} />
      <View style={styles.listItemContent}>
        <SkeletonBone width={150} height={14} />
        <SkeletonBone width={200} height={12} style={styles.mt4} />
        <SkeletonBone width={100} height={10} style={styles.mt4} />
      </View>
      <SkeletonBone width={60} height={60} borderRadius={BorderRadius.sm} />
    </View>
  );
};

// ============================================================================
// Skeleton Video Card
// ============================================================================

const SkeletonVideoCard: React.FC = () => {
  return (
    <View style={styles.videoCard}>
      <SkeletonBone
        width={SCREEN_WIDTH / 3 - 4}
        height={(SCREEN_WIDTH / 3 - 4) * 1.4}
        borderRadius={BorderRadius.xs}
      />
    </View>
  );
};

// ============================================================================
// Skeleton Profile
// ============================================================================

const SkeletonProfile: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.profile, { backgroundColor: colors.surface }]}>
      <SkeletonBone width={96} height={96} borderRadius={48} />
      <SkeletonBone width={160} height={20} style={styles.mt12} />
      <SkeletonBone width={120} height={14} style={styles.mt4} />
      <View style={styles.profileStats}>
        <View style={styles.profileStat}>
          <SkeletonBone width={50} height={20} />
          <SkeletonBone width={60} height={12} style={styles.mt4} />
        </View>
        <View style={styles.profileStat}>
          <SkeletonBone width={50} height={20} />
          <SkeletonBone width={60} height={12} style={styles.mt4} />
        </View>
        <View style={styles.profileStat}>
          <SkeletonBone width={50} height={20} />
          <SkeletonBone width={60} height={12} style={styles.mt4} />
        </View>
      </View>
      <SkeletonBone width="80%" height={14} style={styles.mt12} />
      <SkeletonBone width="60%" height={14} style={styles.mt4} />
      <View style={styles.profileButtons}>
        <SkeletonBone width="45%" height={40} borderRadius={BorderRadius.xl} />
        <SkeletonBone width="45%" height={40} borderRadius={BorderRadius.xl} />
      </View>
    </View>
  );
};

// ============================================================================
// Skeleton Comment
// ============================================================================

const SkeletonComment: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.comment, { backgroundColor: colors.surface }]}>
      <SkeletonBone width={36} height={36} borderRadius={18} />
      <View style={styles.commentContent}>
        <SkeletonBone width={100} height={12} />
        <SkeletonBone width="90%" height={12} style={styles.mt4} />
        <SkeletonBone width="60%" height={12} style={styles.mt4} />
        <View style={styles.commentActions}>
          <SkeletonBone width={40} height={10} />
          <SkeletonBone width={40} height={10} />
          <SkeletonBone width={40} height={10} />
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// Skeleton Notification
// ============================================================================

const SkeletonNotification: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.notification, { backgroundColor: colors.surface }]}>
      <SkeletonBone width={44} height={44} borderRadius={22} />
      <View style={styles.notifContent}>
        <SkeletonBone width="80%" height={14} />
        <SkeletonBone width="60%" height={12} style={styles.mt4} />
      </View>
      <SkeletonBone width={44} height={44} borderRadius={BorderRadius.sm} />
    </View>
  );
};

// ============================================================================
// Skeleton Music Tile
// ============================================================================

const SkeletonMusicTile: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.musicTile, { backgroundColor: colors.surface }]}>
      <SkeletonBone width={56} height={56} borderRadius={BorderRadius.sm} />
      <View style={styles.musicContent}>
        <SkeletonBone width={140} height={14} />
        <SkeletonBone width={100} height={12} style={styles.mt4} />
      </View>
      <SkeletonBone width={32} height={32} borderRadius={16} />
    </View>
  );
};

// ============================================================================
// Skeleton Stats Card
// ============================================================================

const SkeletonStatsCard: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
      <SkeletonBone width={40} height={40} borderRadius={20} />
      <SkeletonBone width={80} height={24} style={styles.mt8} />
      <SkeletonBone width={100} height={12} style={styles.mt4} />
      <SkeletonBone width={60} height={10} style={styles.mt4} />
    </View>
  );
};

// ============================================================================
// Skeleton Group Component
// ============================================================================

const SkeletonGroup: React.FC<SkeletonGroupProps> = ({ type, count = 3 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <SkeletonCard />;
      case 'list-item':
        return <SkeletonListItem />;
      case 'video-card':
        return <SkeletonVideoCard />;
      case 'profile':
        return <SkeletonProfile />;
      case 'comment':
        return <SkeletonComment />;
      case 'notification':
        return <SkeletonNotification />;
      case 'music':
        return <SkeletonMusicTile />;
      case 'stats':
        return <SkeletonStatsCard />;
      default:
        return <SkeletonListItem />;
    }
  };

  return (
    <View>
      {Array.from({ length: count }, (_, i) => (
        <View key={i}>{renderSkeleton()}</View>
      ))}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  mt4: { marginTop: 4 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  card: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  cardContent: {
    padding: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  listItemContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  videoCard: {
    marginRight: 2,
    marginBottom: 2,
  },
  profile: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Spacing.lg,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  comment: {
    flexDirection: 'row',
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  commentContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  commentActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.sm,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  notifContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  musicTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  musicContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  statsCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    width: SCREEN_WIDTH / 2 - 24,
    marginBottom: Spacing.md,
  },
});

export { SkeletonBone, SkeletonGroup, SkeletonCard, SkeletonListItem, SkeletonVideoCard, SkeletonProfile, SkeletonComment, SkeletonNotification, SkeletonMusicTile, SkeletonStatsCard };
export default SkeletonGroup;
