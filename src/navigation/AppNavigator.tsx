// ============================================================================
// CreatorX Ultra Pro - Navigation Configuration
// 6 Bottom Tabs with Stack Navigators, deep navigation support
// ============================================================================

import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { Typography, Spacing } from '../theme';

// Feed Screens
import FeedHomeScreen from '../screens/feed/FeedHomeScreen';
import VideoDetailScreen from '../screens/feed/VideoDetailScreen';
import CommentThreadScreen from '../screens/feed/CommentThreadScreen';
import CreatorProfileScreen from '../screens/feed/CreatorProfileScreen';
import VideoLikesScreen from '../screens/feed/VideoLikesScreen';
import VideoSharesScreen from '../screens/feed/VideoSharesScreen';
import HashtagFeedScreen from '../screens/feed/HashtagFeedScreen';
import MusicFeedScreen from '../screens/feed/MusicFeedScreen';
import LocationFeedScreen from '../screens/feed/LocationFeedScreen';

// Create Screens
import CreateHomeScreen from '../screens/create/CreateHomeScreen';
import RecordingScreenScreen from '../screens/create/RecordingScreenScreen';
import EditingScreenScreen from '../screens/create/EditingScreenScreen';
import EffectsPanelScreen from '../screens/create/EffectsPanelScreen';
import AudioSelectionScreen from '../screens/create/AudioSelectionScreen';
import PostPreviewScreen from '../screens/create/PostPreviewScreen';
import GalleryPickerScreen from '../screens/create/GalleryPickerScreen';
import FilterBrowserScreen from '../screens/create/FilterBrowserScreen';
import StickerBrowserScreen from '../screens/create/StickerBrowserScreen';
import TextEditorScreen from '../screens/create/TextEditorScreen';
import SpeedControlScreen from '../screens/create/SpeedControlScreen';
import VolumeControlScreen from '../screens/create/VolumeControlScreen';
import TrimEditorScreen from '../screens/create/TrimEditorScreen';

// Trending Screens
import TrendingHomeScreen from '../screens/trending/TrendingHomeScreen';
import HashtagDetailScreen from '../screens/trending/HashtagDetailScreen';
import HashtagVideosScreen from '../screens/trending/HashtagVideosScreen';
import ChallengeDetailScreen from '../screens/trending/ChallengeDetailScreen';
import TrendingVideoScreen from '../screens/trending/TrendingVideoScreen';
import DuetRecordingScreen from '../screens/trending/DuetRecordingScreen';
import StitchRecordingScreen from '../screens/trending/StitchRecordingScreen';
import TopCreatorsScreen from '../screens/trending/TopCreatorsScreen';
import CreatorDetailScreen from '../screens/trending/CreatorDetailScreen';
import TrendingSoundsScreen from '../screens/trending/TrendingSoundsScreen';
import SoundDetailScreen from '../screens/trending/SoundDetailScreen';

// Inbox Screens
import InboxHomeScreen from '../screens/inbox/InboxHomeScreen';
import NotificationDetailScreen from '../screens/inbox/NotificationDetailScreen';
import UserProfileInboxScreen from '../screens/inbox/UserProfileInboxScreen';
import ChatScreenScreen from '../screens/inbox/ChatScreenScreen';
import ChatListScreen from '../screens/inbox/ChatListScreen';
import NewMessageScreen from '../screens/inbox/NewMessageScreen';
import GroupChatScreen from '../screens/inbox/GroupChatScreen';
import MessageRequestsScreen from '../screens/inbox/MessageRequestsScreen';
import ActivityDetailScreen from '../screens/inbox/ActivityDetailScreen';
import FollowersListScreen from '../screens/inbox/FollowersListScreen';
import FollowingListScreen from '../screens/inbox/FollowingListScreen';

// Profile Screens
import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import VideoPlayerScreen from '../screens/profile/VideoPlayerScreen';
import AnalyticsDashboardScreen from '../screens/profile/AnalyticsDashboardScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import PrivacySettingsScreen from '../screens/profile/PrivacySettingsScreen';
import NotificationSettingsScreen from '../screens/profile/NotificationSettingsScreen';
import AccountSettingsScreen from '../screens/profile/AccountSettingsScreen';
import BlockedUsersScreen from '../screens/profile/BlockedUsersScreen';
import SavedVideosScreen from '../screens/profile/SavedVideosScreen';
import LikedVideosScreen from '../screens/profile/LikedVideosScreen';
import WatchHistoryScreen from '../screens/profile/WatchHistoryScreen';
import DraftVideosScreen from '../screens/profile/DraftVideosScreen';
import QRCodeScreen from '../screens/profile/QRCodeScreen';
import ShareProfileScreen from '../screens/profile/ShareProfileScreen';
import FollowerAnalyticsScreen from '../screens/profile/FollowerAnalyticsScreen';
import ContentAnalyticsScreen from '../screens/profile/ContentAnalyticsScreen';

// Monetization Screens
import MonetizationHomeScreen from '../screens/monetization/MonetizationHomeScreen';
import WithdrawalScreenScreen from '../screens/monetization/WithdrawalScreenScreen';
import PaymentHistoryScreen from '../screens/monetization/PaymentHistoryScreen';
import BrandDealsScreen from '../screens/monetization/BrandDealsScreen';
import BrandDealDetailScreen from '../screens/monetization/BrandDealDetailScreen';
import BankSettingsScreen from '../screens/monetization/BankSettingsScreen';
import AddBankAccountScreen from '../screens/monetization/AddBankAccountScreen';
import EarningsBreakdownScreen from '../screens/monetization/EarningsBreakdownScreen';
import TaxInformationScreen from '../screens/monetization/TaxInformationScreen';
import ReferralProgramScreen from '../screens/monetization/ReferralProgramScreen';
import CreatorFundScreen from '../screens/monetization/CreatorFundScreen';
import TipsSettingsScreen from '../screens/monetization/TipsSettingsScreen';
import SubscriptionSettingsScreen from '../screens/monetization/SubscriptionSettingsScreen';
import InvoiceDetailScreen from '../screens/monetization/InvoiceDetailScreen';

// ============================================================================
// Stack Navigators
// ============================================================================

const FeedStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const TrendingStack = createNativeStackNavigator();
const InboxStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const MonetizationStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ============================================================================
// Feed Navigator
// ============================================================================

const FeedNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <FeedStack.Screen name="FeedHome" component={FeedHomeScreen} />
      <FeedStack.Screen name="VideoDetail" component={VideoDetailScreen} />
      <FeedStack.Screen name="CommentThread" component={CommentThreadScreen} />
      <FeedStack.Screen name="CreatorProfile" component={CreatorProfileScreen} />
      <FeedStack.Screen name="VideoLikes" component={VideoLikesScreen} />
      <FeedStack.Screen name="VideoShares" component={VideoSharesScreen} />
      <FeedStack.Screen name="HashtagFeed" component={HashtagFeedScreen} />
      <FeedStack.Screen name="MusicFeed" component={MusicFeedScreen} />
      <FeedStack.Screen name="LocationFeed" component={LocationFeedScreen} />
    </FeedStack.Navigator>
  );
};

// ============================================================================
// Create Navigator
// ============================================================================

const CreateNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <CreateStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <CreateStack.Screen name="CreateHome" component={CreateHomeScreen} />
      <CreateStack.Screen name="RecordingScreen" component={RecordingScreenScreen} />
      <CreateStack.Screen name="EditingScreen" component={EditingScreenScreen} />
      <CreateStack.Screen name="EffectsPanel" component={EffectsPanelScreen} />
      <CreateStack.Screen name="AudioSelection" component={AudioSelectionScreen} />
      <CreateStack.Screen name="PostPreview" component={PostPreviewScreen} />
      <CreateStack.Screen name="GalleryPicker" component={GalleryPickerScreen} />
      <CreateStack.Screen name="FilterBrowser" component={FilterBrowserScreen} />
      <CreateStack.Screen name="StickerBrowser" component={StickerBrowserScreen} />
      <CreateStack.Screen name="TextEditor" component={TextEditorScreen} />
      <CreateStack.Screen name="SpeedControl" component={SpeedControlScreen} />
      <CreateStack.Screen name="VolumeControl" component={VolumeControlScreen} />
      <CreateStack.Screen name="TrimEditor" component={TrimEditorScreen} />
    </CreateStack.Navigator>
  );
};

// ============================================================================
// Trending Navigator
// ============================================================================

const TrendingNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <TrendingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <TrendingStack.Screen name="TrendingHome" component={TrendingHomeScreen} />
      <TrendingStack.Screen name="HashtagDetail" component={HashtagDetailScreen} />
      <TrendingStack.Screen name="HashtagVideos" component={HashtagVideosScreen} />
      <TrendingStack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
      <TrendingStack.Screen name="TrendingVideo" component={TrendingVideoScreen} />
      <TrendingStack.Screen name="DuetRecording" component={DuetRecordingScreen} />
      <TrendingStack.Screen name="StitchRecording" component={StitchRecordingScreen} />
      <TrendingStack.Screen name="TopCreators" component={TopCreatorsScreen} />
      <TrendingStack.Screen name="CreatorDetail" component={CreatorDetailScreen} />
      <TrendingStack.Screen name="TrendingSounds" component={TrendingSoundsScreen} />
      <TrendingStack.Screen name="SoundDetail" component={SoundDetailScreen} />
    </TrendingStack.Navigator>
  );
};

// ============================================================================
// Inbox Navigator
// ============================================================================

const InboxNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <InboxStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <InboxStack.Screen name="InboxHome" component={InboxHomeScreen} />
      <InboxStack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <InboxStack.Screen name="UserProfileInbox" component={UserProfileInboxScreen} />
      <InboxStack.Screen name="ChatScreen" component={ChatScreenScreen} />
      <InboxStack.Screen name="ChatList" component={ChatListScreen} />
      <InboxStack.Screen name="NewMessage" component={NewMessageScreen} />
      <InboxStack.Screen name="GroupChat" component={GroupChatScreen} />
      <InboxStack.Screen name="MessageRequests" component={MessageRequestsScreen} />
      <InboxStack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
      <InboxStack.Screen name="FollowersList" component={FollowersListScreen} />
      <InboxStack.Screen name="FollowingList" component={FollowingListScreen} />
    </InboxStack.Navigator>
  );
};

// ============================================================================
// Profile Navigator
// ============================================================================

const ProfileNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <ProfileStack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <ProfileStack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <ProfileStack.Screen name="AnalyticsDashboard" component={AnalyticsDashboardScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <ProfileStack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <ProfileStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <ProfileStack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
      <ProfileStack.Screen name="SavedVideos" component={SavedVideosScreen} />
      <ProfileStack.Screen name="LikedVideos" component={LikedVideosScreen} />
      <ProfileStack.Screen name="WatchHistory" component={WatchHistoryScreen} />
      <ProfileStack.Screen name="DraftVideos" component={DraftVideosScreen} />
      <ProfileStack.Screen name="QRCode" component={QRCodeScreen} />
      <ProfileStack.Screen name="ShareProfile" component={ShareProfileScreen} />
      <ProfileStack.Screen name="FollowerAnalytics" component={FollowerAnalyticsScreen} />
      <ProfileStack.Screen name="ContentAnalytics" component={ContentAnalyticsScreen} />
    </ProfileStack.Navigator>
  );
};

// ============================================================================
// Monetization Navigator
// ============================================================================

const MonetizationNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <MonetizationStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <MonetizationStack.Screen name="MonetizationHome" component={MonetizationHomeScreen} />
      <MonetizationStack.Screen name="WithdrawalScreen" component={WithdrawalScreenScreen} />
      <MonetizationStack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <MonetizationStack.Screen name="BrandDeals" component={BrandDealsScreen} />
      <MonetizationStack.Screen name="BrandDealDetail" component={BrandDealDetailScreen} />
      <MonetizationStack.Screen name="BankSettings" component={BankSettingsScreen} />
      <MonetizationStack.Screen name="AddBankAccount" component={AddBankAccountScreen} />
      <MonetizationStack.Screen name="EarningsBreakdown" component={EarningsBreakdownScreen} />
      <MonetizationStack.Screen name="TaxInformation" component={TaxInformationScreen} />
      <MonetizationStack.Screen name="ReferralProgram" component={ReferralProgramScreen} />
      <MonetizationStack.Screen name="CreatorFund" component={CreatorFundScreen} />
      <MonetizationStack.Screen name="TipsSettings" component={TipsSettingsScreen} />
      <MonetizationStack.Screen name="SubscriptionSettings" component={SubscriptionSettingsScreen} />
      <MonetizationStack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
    </MonetizationStack.Navigator>
  );
};

// ============================================================================
// Tab Navigator (Root)
// ============================================================================

const TabNavigator: React.FC = () => {
  const { isDark, colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          borderTopColor: colors.tabBar.border,
          borderTopWidth: 0.5,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inactive,
        tabBarLabelStyle: {
          ...Typography.tabLabel,
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'FeedTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'CreateTab':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'TrendingTab':
              iconName = focused ? 'flame' : 'flame-outline';
              break;
            case 'InboxTab':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'MonetizationTab':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
          }

          return (
            <View style={focused ? styles.activeTabIcon : undefined}>
              <Ionicons name={iconName} size={focused ? 26 : 24} color={color} />
              {focused && (
                <View style={[styles.activeTabDot, { backgroundColor: color }]} />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="FeedTab" component={FeedNavigator} options={{ tabBarLabel: 'Feed' }} />
      <Tab.Screen name="TrendingTab" component={TrendingNavigator} options={{ tabBarLabel: 'Trending' }} />
      <Tab.Screen name="CreateTab" component={CreateNavigator} options={{ tabBarLabel: 'Create' }} />
      <Tab.Screen name="InboxTab" component={InboxNavigator} options={{ tabBarLabel: 'Inbox' }} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ tabBarLabel: 'Profile' }} />
      <Tab.Screen name="MonetizationTab" component={MonetizationNavigator} options={{ tabBarLabel: 'Earn' }} />
    </Tab.Navigator>
  );
};

// ============================================================================
// Root Navigator
// ============================================================================

const AppNavigator: React.FC = () => {
  const { isDark, colors } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.error,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' as const },
          medium: { fontFamily: 'System', fontWeight: '500' as const },
          bold: { fontFamily: 'System', fontWeight: '700' as const },
          heavy: { fontFamily: 'System', fontWeight: '800' as const },
        },
      }}
    >
      <TabNavigator />
    </NavigationContainer>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  activeTabIcon: {
    alignItems: 'center',
  },
  activeTabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
});

export default AppNavigator;
