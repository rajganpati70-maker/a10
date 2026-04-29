// ============================================================================
// CreatorX Ultra Pro - ChallengeDetail Screen
// Challenge details and entries
// Tab: Trending | Level: 2
// ============================================================================

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  RefreshControl,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInRight,
  FadeInLeft,
  SlideInRight,
  Layout as ReanimatedLayout,
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
} from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../context/ThemeContext';
import {
  AnimatedTouchable,
  GlassmorphicCard,
  NeumorphicCard,
  GradientButton,
  SkeletonGroup,
  SkeletonBone,
} from '../../components/common';
import { useAnimatedPress, useHaptic, useMockLoading, useDebounce, usePulseAnimation, useFloatingAnimation, useFavorites, useSlideInAnimation } from '../../hooks';
import { formatCount, formatTimeAgo, formatCurrency, formatDuration, getGradientForIndex, hexToRGBA, truncateText } from '../../utils';
import {
  generateMockVideos,
  generateMockUsers,
  generateMockComments,
  generateMockNotifications,
  generateMockHashtags,
  generateMockChallenges,
  generateMockMusicTracks,
  generateMockBrandDeals,
  generateMockConversations,
  generateMockEarnings,
  generateMockPayouts,
  generateMockFilters,
  generateMockEffects,
  generateMockUser,
  generateMockVideo,
} from '../../data/mockData';
import { Typography, Spacing, BorderRadius, Layout } from '../../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// ChallengeDetail Screen Component
// ============================================================================

const ChallengeDetailScreen: React.FC = () => {
  const { isDark, colors, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const haptic = useHaptic();
  const floatingStyle = useFloatingAnimation();

  // ============================================================================
  // State Management
  // ============================================================================

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const scrollY = useSharedValue(0);

  // ============================================================================
  // Search State
  // ============================================================================

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // ============================================================================
  // Mock Data Loading
  // ============================================================================

  const mockVideos = useMemo(() => generateMockVideos(30), []);
  const mockUsers = useMemo(() => generateMockUsers(20), []);
  const mockComments = useMemo(() => generateMockComments(25), []);
  const mockNotifications = useMemo(() => generateMockNotifications(30), []);
  const mockHashtags = useMemo(() => generateMockHashtags(30), []);
  const mockChallenges = useMemo(() => generateMockChallenges(16), []);
  const mockMusic = useMemo(() => generateMockMusicTracks(30), []);
  const mockBrandDeals = useMemo(() => generateMockBrandDeals(20), []);
  const mockConversations = useMemo(() => generateMockConversations(15), []);
  const mockEarnings = useMemo(() => generateMockEarnings(), []);
  const mockPayouts = useMemo(() => generateMockPayouts(15), []);
  const mockFilters = useMemo(() => generateMockFilters(50), []);
  const mockEffects = useMemo(() => generateMockEffects(50), []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // ============================================================================
  // Callbacks
  // ============================================================================

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    haptic.medium();
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    haptic.success();
  }, [haptic]);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setIsLoadingMore(false);
  }, [isLoadingMore]);

  const handleItemPress = useCallback(
    (item: any) => {
      haptic.light();
      navigation.navigate('TrendingVideo' as never, { id: item.id } as never);
    },
    [haptic, navigation]
  );

  const handleUserPress = useCallback(
    (userId: string) => {
      haptic.light();
      navigation.navigate('CreatorProfile' as never, { userId } as never);
    },
    [haptic, navigation]
  );

  const handleAIPress = useCallback(() => {
    haptic.medium();
    setShowAIAssistant(!showAIAssistant);
  }, [haptic, showAIAssistant]);



  // ============================================================================
  // Header Animation
  // ============================================================================

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [1, 0.9]);
    return { opacity };
  });

  // ============================================================================
  // Tab Items
  // ============================================================================

  const tabItems = useMemo(
    () => ['All', 'Popular', 'Recent', 'Following', 'Favorites'],
    []
  );

  // ============================================================================
  // Render Category Chips
  // ============================================================================

  const renderCategoryChips = useCallback(() => {
    return (
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.chipContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScrollContent}
        >
          {tabItems.map((tab, index) => (
            <AnimatedTouchable
              key={tab}
              onPress={() => {
                setActiveTab(index);
                haptic.selection();
              }}
              hapticType="selection"
            >
              <LinearGradient
                colors={
                  activeTab === index
                    ? [colors.primary, colors.primaryLight]
                    : [colors.surface, colors.surface]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.chip,
                  {
                    borderColor: activeTab === index ? 'transparent' : colors.border,
                    borderWidth: activeTab === index ? 0 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: activeTab === index ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: activeTab === index ? '700' : '500',
                    },
                  ]}
                >
                  {tab}
                </Text>
              </LinearGradient>
            </AnimatedTouchable>
          ))}
        </ScrollView>
      </Animated.View>
    );
  }, [activeTab, colors, haptic, tabItems]);

  // ============================================================================
  // Render Featured Section
  // ============================================================================

  const renderFeaturedSection = useCallback(() => {
    return (
      <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Featured Entries
          </Text>
          <AnimatedTouchable
            onPress={() => {
              haptic.light();
              navigation.navigate('TrendingVideo' as never);
            }}
            hapticType="light"
          >
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </AnimatedTouchable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScrollContent}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH * 0.75 + Spacing.md}
        >
          {mockVideos.slice(0, 8).map((video, index) => (
            <Animated.View
              key={video.id}
              entering={FadeInRight.delay(index * 80).springify()}
            >
              <AnimatedTouchable
                onPress={() => handleItemPress(video)}
                hapticType="light"
              >
                <GlassmorphicCard
                  style={[styles.featuredCard, { width: SCREEN_WIDTH * 0.75 }]}
                  intensity={20}
                  animated={false}
                  gradientColors={getGradientForIndex(index)}
                  onPress={undefined}
                >
                  <LinearGradient
                    colors={getGradientForIndex(index) as [string, string, ...string[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.featuredGradient}
                  >
                    <View style={styles.featuredOverlay}>
                      <View style={styles.featuredBadge}>
                        <Ionicons name="flame" size={14} color="#FFD700" />
                        <Text style={styles.featuredBadgeText}>Trending</Text>
                      </View>
                      <View style={styles.featuredInfo}>
                        <Text style={styles.featuredTitle} numberOfLines={2}>
                          {video.caption}
                        </Text>
                        <View style={styles.featuredMeta}>
                          <View style={styles.featuredMetaItem}>
                            <Ionicons name="eye" size={14} color="rgba(255,255,255,0.8)" />
                            <Text style={styles.featuredMetaText}>
                              {formatCount(video.viewsCount)}
                            </Text>
                          </View>
                          <View style={styles.featuredMetaItem}>
                            <Ionicons name="heart" size={14} color="rgba(255,255,255,0.8)" />
                            <Text style={styles.featuredMetaText}>
                              {formatCount(video.likesCount)}
                            </Text>
                          </View>
                          <View style={styles.featuredMetaItem}>
                            <Ionicons name="chatbubble" size={14} color="rgba(255,255,255,0.8)" />
                            <Text style={styles.featuredMetaText}>
                              {formatCount(video.commentsCount)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                  <View style={styles.featuredUserRow}>
                    <View style={styles.featuredUserAvatar}>
                      <Image
                        source={{ uri: video.user.avatarUrl }}
                        style={styles.avatarSmall}
                      />
                      {video.user.isVerified && (
                        <View style={styles.verifiedBadgeSmall}>
                          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                        </View>
                      )}
                    </View>
                    <View style={styles.featuredUserInfo}>
                      <Text style={[styles.featuredUsername, { color: colors.text }]} numberOfLines={1}>
                        {video.user.displayName}
                      </Text>
                      <Text style={[styles.featuredHandle, { color: colors.textSecondary }]}>
                        @{video.user.username}
                      </Text>
                    </View>
                    <GradientButton
                      title="View"
                      onPress={() => handleItemPress(video)}
                      size="small"
                      style={styles.featuredButton}
                    />
                  </View>
                </GlassmorphicCard>
              </AnimatedTouchable>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>
    );
  }, [mockVideos, colors, haptic, navigation, handleItemPress]);

  // ============================================================================
  // Render List Items
  // ============================================================================

  const renderListItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <Animated.View
          entering={FadeInDown.delay(index * 50).springify()}
          layout={ReanimatedLayout.springify()}
        >
          <AnimatedTouchable
            onPress={() => handleItemPress(item)}
            hapticType="light"
          >
            <GlassmorphicCard
              style={styles.listCard}
              intensity={15}
              animated={false}
              onPress={undefined}
            >
              <View style={styles.listCardRow}>
                <View style={styles.listCardLeft}>
                  <LinearGradient
                    colors={getGradientForIndex(index) as [string, string, ...string[]]}
                    style={styles.listCardThumbnail}
                  >
                    <Ionicons name="play-circle" size={28} color="rgba(255,255,255,0.9)" />
                  </LinearGradient>
                </View>
                <View style={styles.listCardContent}>
                  <Text style={[styles.listCardTitle, { color: colors.text }]} numberOfLines={2}>
                    {item.caption || item.title || item.name || item.displayName || 'Item ' + (index + 1)}
                  </Text>
                  <Text style={[styles.listCardSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.user?.displayName || item.artist || item.brandName || '@user_' + (index + 1)}
                  </Text>
                  <View style={styles.listCardStats}>
                    <View style={styles.statBadge}>
                      <Ionicons name="eye" size={12} color={colors.primary} />
                      <Text style={[styles.statBadgeText, { color: colors.primary }]}>
                        {formatCount(item.viewsCount || item.videosCount || item.viewCount || Math.floor(Math.random() * 1000000))}
                      </Text>
                    </View>
                    <View style={styles.statBadge}>
                      <Ionicons name="heart" size={12} color={colors.accent} />
                      <Text style={[styles.statBadgeText, { color: colors.accent }]}>
                        {formatCount(item.likesCount || item.participantCount || Math.floor(Math.random() * 100000))}
                      </Text>
                    </View>
                    <Text style={[styles.listCardTime, { color: colors.textTertiary }]}>
                      {formatTimeAgo(item.createdAt || new Date().toISOString())}
                    </Text>
                  </View>
                </View>
                <AnimatedTouchable
                  onPress={() => {
                    haptic.light();
                    handleItemPress(item);
                  }}
                  hapticType="light"
                >
                  <View style={[styles.listCardAction, { backgroundColor: hexToRGBA(colors.primary, 0.1) }]}>
                    <Ionicons name="chevron-forward" size={20} color={colors.primary} />
                  </View>
                </AnimatedTouchable>
              </View>
            </GlassmorphicCard>
          </AnimatedTouchable>
        </Animated.View>
      );
    },
    [colors, haptic, handleItemPress]
  );

  // ============================================================================
  // Render Stats Overview
  // ============================================================================

  const renderStatsOverview = useCallback(() => {
    const stats = [
      { title: 'Total Views', value: formatCount(2500000), change: 12.5, icon: 'eye', color: colors.primary },
      { title: 'Followers', value: formatCount(125000), change: 8.3, icon: 'people', color: colors.secondary },
      { title: 'Likes', value: formatCount(890000), change: 15.2, icon: 'heart', color: colors.accent },
      { title: 'Shares', value: formatCount(45000), change: -3.1, icon: 'share-social', color: colors.tertiary },
    ];

    return (
      <Animated.View entering={FadeInDown.delay(150).springify()} style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Animated.View
            key={stat.title}
            entering={FadeIn.delay(index * 100 + 200).springify()}
            style={styles.statCardWrapper}
          >
            <AnimatedTouchable
              onPress={() => {
                haptic.light();
                navigation.navigate('TrendingVideo' as never);
              }}
              hapticType="light"
            >
              <NeumorphicCard
                style={styles.statCard}
                depth={4}
                shape="convex"
                animated={false}
                backgroundColor={colors.neumorphBg}
              >
                <LinearGradient
                  colors={[hexToRGBA(stat.color, 0.15), hexToRGBA(stat.color, 0.05)]}
                  style={styles.statCardGradient}
                >
                  <View style={[styles.statIconContainer, { backgroundColor: hexToRGBA(stat.color, 0.15) }]}>
                    <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                  </View>
                  <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.title}</Text>
                  <View style={styles.statChangeRow}>
                    <Ionicons
                      name={stat.change >= 0 ? 'trending-up' : 'trending-down'}
                      size={12}
                      color={stat.change >= 0 ? colors.success : colors.error}
                    />
                    <Text
                      style={[
                        styles.statChangeText,
                        { color: stat.change >= 0 ? colors.success : colors.error },
                      ]}
                    >
                      {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(1)}%
                    </Text>
                  </View>
                </LinearGradient>
              </NeumorphicCard>
            </AnimatedTouchable>
          </Animated.View>
        ))}
      </Animated.View>
    );
  }, [colors, haptic, navigation]);

  // ============================================================================
  // Render Creator Spotlight
  // ============================================================================

  const renderCreatorSpotlight = useCallback(() => {
    return (
      <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.spotlightSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Top Creators
          </Text>
          <AnimatedTouchable onPress={() => haptic.light()} hapticType="light">
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </AnimatedTouchable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.creatorScrollContent}
        >
          {mockUsers.slice(0, 10).map((user, index) => (
            <Animated.View
              key={user.id}
              entering={FadeInRight.delay(index * 60).springify()}
            >
              <AnimatedTouchable
                onPress={() => handleUserPress(user.id)}
                hapticType="light"
              >
                <View style={styles.creatorCard}>
                  <LinearGradient
                    colors={getGradientForIndex(index) as [string, string, ...string[]]}
                    style={styles.creatorAvatarBorder}
                  >
                    <View style={[styles.creatorAvatarInner, { backgroundColor: colors.background }]}>
                      <Image source={{ uri: user.avatarUrl }} style={styles.creatorAvatar} />
                    </View>
                  </LinearGradient>
                  {user.isVerified && (
                    <View style={[styles.creatorVerified, { backgroundColor: colors.background }]}>
                      <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                    </View>
                  )}
                  <Text style={[styles.creatorName, { color: colors.text }]} numberOfLines={1}>
                    {user.displayName.split(' ')[0]}
                  </Text>
                  <Text style={[styles.creatorFollowers, { color: colors.textSecondary }]}>
                    {formatCount(user.followersCount)}
                  </Text>
                </View>
              </AnimatedTouchable>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>
    );
  }, [mockUsers, colors, haptic, handleUserPress]);

  // ============================================================================
  // Render Quick Actions
  // ============================================================================

  const renderQuickActions = useCallback(() => {
    const actions = [
      { icon: 'videocam', label: 'Record', color: colors.primary, gradient: [colors.primary, colors.primaryLight] },
      { icon: 'images', label: 'Gallery', color: colors.secondary, gradient: [colors.secondary, colors.secondaryLight] },
      { icon: 'musical-notes', label: 'Sounds', color: colors.accent, gradient: [colors.accent, colors.accentLight] },
      { icon: 'sparkles', label: 'Effects', color: colors.tertiary, gradient: [colors.tertiary, colors.tertiaryLight] },
      { icon: 'analytics', label: 'Analytics', color: '#74B9FF', gradient: ['#74B9FF', '#0652DD'] },
      { icon: 'gift', label: 'Rewards', color: '#FFD700', gradient: ['#FFD700', '#FFA500'] },
    ];

    return (
      <Animated.View entering={FadeInDown.delay(250).springify()} style={styles.quickActionsGrid}>
        {actions.map((action, index) => (
          <Animated.View
            key={action.label}
            entering={FadeIn.delay(index * 80 + 300).springify()}
            style={styles.quickActionWrapper}
          >
            <AnimatedTouchable
              onPress={() => {
                haptic.medium();
                navigation.navigate('TrendingVideo' as never);
              }}
              hapticType="medium"
            >
              <GlassmorphicCard
                style={styles.quickActionCard}
                intensity={15}
                animated={false}
                onPress={undefined}
              >
                <LinearGradient
                  colors={action.gradient as [string, string, ...string[]]}
                  style={styles.quickActionIcon}
                >
                  <Ionicons name={action.icon as any} size={22} color="#FFFFFF" />
                </LinearGradient>
                <Text style={[styles.quickActionLabel, { color: colors.text }]}>
                  {action.label}
                </Text>
              </GlassmorphicCard>
            </AnimatedTouchable>
          </Animated.View>
        ))}
      </Animated.View>
    );
  }, [colors, haptic, navigation]);



  // ============================================================================
  // Loading State
  // ============================================================================

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.loadingContainer}>
          <SkeletonGroup type="card" count={2} />
          <SkeletonGroup type="list-item" count={5} />
        </View>
      </View>
    );
  }

  // ============================================================================
  // Main Render
  // ============================================================================

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Background Gradient */}
      <LinearGradient
        colors={isDark
          ? ['rgba(108,92,231,0.1)', 'rgba(0,0,0,0)', 'rgba(253,121,168,0.05)']
          : ['rgba(108,92,231,0.05)', 'rgba(255,255,255,0)', 'rgba(253,121,168,0.03)']
        }
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + Spacing.md, paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, colors.secondary]}
            progressBackgroundColor={colors.surface}
          />
        }
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Animated.View entering={FadeInDown.delay(50).springify()}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              ChallengeDetail
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              Challenge details and entries
            </Text>
          </Animated.View>
          <View style={styles.headerActions}>
            <AnimatedTouchable
              onPress={() => {
                haptic.light();
                toggleTheme();
              }}
              hapticType="light"
            >
              <View style={[styles.headerButton, { backgroundColor: colors.surface }]}>
                <Ionicons
                  name={isDark ? 'sunny' : 'moon'}
                  size={20}
                  color={colors.text}
                />
              </View>
            </AnimatedTouchable>
            <AnimatedTouchable
              onPress={() => {
                haptic.light();
                navigation.navigate('TrendingVideo' as never);
              }}
              hapticType="light"
            >
              <View style={[styles.headerButton, { backgroundColor: colors.surface }]}>
                <Ionicons name="notifications-outline" size={20} color={colors.text} />
                <View style={[styles.notifDot, { backgroundColor: colors.error }]} />
              </View>
            </AnimatedTouchable>
          </View>
        </Animated.View>


          {/* Search Bar */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.input.background,
                borderColor: isSearchFocused ? colors.input.focusBorder : colors.input.border,
              },
            ]}
          >
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <TextInput
              style={[styles.searchInput, { color: colors.input.text }]}
              placeholder="Search entries..."
              placeholderTextColor={colors.input.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery.length > 0 && (
              <AnimatedTouchable
                onPress={() => setSearchQuery('')}
                hapticType="light"
              >
                <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
              </AnimatedTouchable>
            )}
          </Animated.View>


        {/* Category Chips */}
        {renderCategoryChips()}

        {/* Stats Overview */}
        {renderStatsOverview()}

        {/* Featured Section */}
        {renderFeaturedSection()}

        {/* Quick Actions */}
        {renderQuickActions()}

        {/* Creator Spotlight */}
        {renderCreatorSpotlight()}

        {/* Main Content List */}
        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Entries
            </Text>
            <AnimatedTouchable onPress={() => haptic.light()} hapticType="light">
              <Text style={[styles.seeAllText, { color: colors.primary }]}>View All</Text>
            </AnimatedTouchable>
          </View>
          {mockVideos.slice(0, 15).map((video, index) => (
            <View key={video.id}>
              {renderListItem({ item: video, index })}
            </View>
          ))}
        </Animated.View>

        {/* Load More Button */}
        <Animated.View entering={FadeIn.delay(600)} style={styles.loadMoreContainer}>
          <GradientButton
            title={isLoadingMore ? 'Loading...' : 'Load More'}
            onPress={handleLoadMore}
            loading={isLoadingMore}
            variant="outlined"
            fullWidth
            icon="arrow-down"
          />
        </Animated.View>
      </ScrollView>

      {/* Floating AI Assistant Button */}
      <Animated.View style={[styles.floatingAI, floatingStyle, { bottom: insets.bottom + 90 }]}>
        <AnimatedTouchable onPress={handleAIPress} hapticType="medium">
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.floatingAIButton}
          >
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
          </LinearGradient>
        </AnimatedTouchable>
      </Animated.View>

      {/* AI Assistant Bottom Sheet Overlay */}
      {showAIAssistant && (
        <Animated.View
          entering={FadeIn.duration(200)}
          style={styles.aiOverlay}
        >
          <TouchableOpacity
            style={styles.aiOverlayBg}
            activeOpacity={1}
            onPress={() => setShowAIAssistant(false)}
          />
          <Animated.View
            entering={FadeInDown.springify()}
            style={[styles.aiSheet, { backgroundColor: colors.surface, paddingBottom: insets.bottom + 16 }]}
          >
            <View style={styles.aiSheetHandle}>
              <View style={[styles.aiHandle, { backgroundColor: colors.border }]} />
            </View>
            <View style={styles.aiHeader}>
              <LinearGradient
                colors={[colors.primary, colors.accent]}
                style={styles.aiHeaderIcon}
              >
                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.aiHeaderText}>
                <Text style={[styles.aiTitle, { color: colors.text }]}>AI Assistant</Text>
                <Text style={[styles.aiSubtitle, { color: colors.textSecondary }]}>Ask me anything about your content</Text>
              </View>
              <AnimatedTouchable onPress={() => setShowAIAssistant(false)} hapticType="light">
                <Ionicons name="close-circle" size={28} color={colors.textTertiary} />
              </AnimatedTouchable>
            </View>
            <ScrollView style={styles.aiMessages} showsVerticalScrollIndicator={false}>
              <View style={[styles.aiMessage, { backgroundColor: hexToRGBA(colors.primary, 0.1) }]}>
                <Text style={[styles.aiMessageText, { color: colors.text }]}>
                  Hi! I'm your AI content assistant. I can help you with content ideas, analytics insights, trending topics, and more. What would you like to know?
                </Text>
              </View>
              <View style={styles.aiSuggestions}>
                {['Trending topics', 'Best posting time', 'Content ideas', 'Analytics summary'].map((suggestion, idx) => (
                  <AnimatedTouchable
                    key={suggestion}
                    onPress={() => {
                      haptic.light();
                    }}
                    hapticType="light"
                  >
                    <View style={[styles.aiSuggestionChip, { borderColor: colors.primary }]}>
                      <Text style={[styles.aiSuggestionText, { color: colors.primary }]}>{suggestion}</Text>
                    </View>
                  </AnimatedTouchable>
                ))}
              </View>
            </ScrollView>
            <View style={[styles.aiInputContainer, { borderTopColor: colors.border }]}>
              <TextInput
                style={[styles.aiInput, { backgroundColor: colors.input.background, color: colors.input.text }]}
                placeholder="Type a message..."
                placeholderTextColor={colors.input.placeholder}
              />
              <AnimatedTouchable onPress={() => haptic.medium()} hapticType="medium">
                <LinearGradient
                  colors={[colors.primary, colors.accent]}
                  style={styles.aiSendButton}
                >
                  <Ionicons name="send" size={18} color="#FFFFFF" />
                </LinearGradient>
              </AnimatedTouchable>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  loadingContainer: {
    padding: Spacing.lg,
    paddingTop: 100,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.h2,
    marginBottom: Spacing.xxs,
  },
  headerSubtitle: {
    ...Typography.body,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 44,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    paddingVertical: 0,
  },

  // Chips
  chipContainer: {
    marginBottom: Spacing.lg,
  },
  chipScrollContent: {
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  chipText: {
    ...Typography.buttonSmall,
  },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCardWrapper: {
    width: (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md) / 2,
  },
  statCard: {
    padding: 0,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    ...Typography.stat,
    marginBottom: Spacing.xxs,
  },
  statLabel: {
    ...Typography.statLabel,
    marginBottom: Spacing.xs,
  },
  statChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  statChangeText: {
    ...Typography.caption,
    fontWeight: '600',
  },

  // Featured Section
  featuredSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
  },
  seeAllText: {
    ...Typography.button,
  },
  featuredScrollContent: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  featuredCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    padding: 0,
  },
  featuredGradient: {
    height: 180,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  featuredOverlay: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.round,
    gap: Spacing.xxs,
  },
  featuredBadgeText: {
    color: '#FFD700',
    ...Typography.caption,
    fontWeight: '700',
  },
  featuredInfo: {
    gap: Spacing.xs,
  },
  featuredTitle: {
    color: '#FFFFFF',
    ...Typography.h5,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  featuredMetaText: {
    color: 'rgba(255,255,255,0.8)',
    ...Typography.caption,
  },
  featuredUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  featuredUserAvatar: {
    position: 'relative',
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  verifiedBadgeSmall: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  featuredUserInfo: {
    flex: 1,
  },
  featuredUsername: {
    ...Typography.label,
    fontWeight: '600',
  },
  featuredHandle: {
    ...Typography.caption,
  },
  featuredButton: {
    minWidth: 70,
  },

  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  quickActionWrapper: {
    width: (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2) / 3,
  },
  quickActionCard: {
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    ...Typography.caption,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Creator Spotlight
  spotlightSection: {
    marginBottom: Spacing.xl,
  },
  creatorScrollContent: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  creatorCard: {
    alignItems: 'center',
    width: 80,
  },
  creatorAvatarBorder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  creatorAvatarInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  creatorAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  creatorVerified: {
    position: 'absolute',
    top: 46,
    right: 6,
    borderRadius: 8,
  },
  creatorName: {
    ...Typography.caption,
    fontWeight: '600',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  creatorFollowers: {
    ...Typography.overline,
    fontSize: 9,
    marginTop: 2,
  },

  // List Section
  listSection: {
    marginBottom: Spacing.lg,
  },
  listCard: {
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  listCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  listCardLeft: {
    position: 'relative',
  },
  listCardThumbnail: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCardContent: {
    flex: 1,
  },
  listCardTitle: {
    ...Typography.label,
    fontWeight: '600',
    marginBottom: Spacing.xxs,
  },
  listCardSubtitle: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  listCardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statBadgeText: {
    ...Typography.overline,
    fontSize: 10,
  },
  listCardTime: {
    ...Typography.overline,
    fontSize: 10,
  },
  listCardAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Grid
  gridItem: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  gridItemGradient: {
    flex: 1,
  },
  gridItemOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  gridItemCount: {
    color: '#FFFFFF',
    ...Typography.caption,
    fontWeight: '700',
    marginTop: 4,
  },

  // Load More
  loadMoreContainer: {
    marginBottom: Spacing.xxxl,
  },

  // Floating AI
  floatingAI: {
    position: 'absolute',
    right: Spacing.lg,
    zIndex: 100,
  },
  floatingAIButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  // AI Assistant
  aiOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  aiOverlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  aiSheet: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    maxHeight: SCREEN_HEIGHT * 0.65,
    minHeight: 400,
  },
  aiSheetHandle: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  aiHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  aiHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiHeaderText: {
    flex: 1,
  },
  aiTitle: {
    ...Typography.h5,
  },
  aiSubtitle: {
    ...Typography.caption,
  },
  aiMessages: {
    paddingHorizontal: Spacing.lg,
    maxHeight: 250,
  },
  aiMessage: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  aiMessageText: {
    ...Typography.body,
    lineHeight: 22,
  },
  aiSuggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  aiSuggestionChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  aiSuggestionText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  aiInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    gap: Spacing.sm,
  },
  aiInput: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    ...Typography.body,
  },
  aiSendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChallengeDetailScreen;
