// ============================================================================
// CreatorX Ultra Pro - Type Definitions
// Complete TypeScript interfaces for the entire application
// ============================================================================

// ============================================================================
// User & Profile Types
// ============================================================================

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  website: string;
  followersCount: number;
  followingCount: number;
  likesCount: number;
  videosCount: number;
  isVerified: boolean;
  isFollowing: boolean;
  isFollower: boolean;
  joinDate: string;
  location: string;
  category: string;
  socialLinks: SocialLink[];
  badges: UserBadge[];
  pinnedVideoId: string | null;
  isPrivate: boolean;
  allowDuets: boolean;
  allowStitch: boolean;
  notificationPreferences: NotificationPreferences;
  monetizationStatus: MonetizationStatus;
  creatorLevel: CreatorLevel;
  totalEarnings: number;
  pendingEarnings: number;
  bankDetails: BankDetails | null;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  username: string;
  isVerified: boolean;
}

export type SocialPlatform =
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'tiktok'
  | 'facebook'
  | 'snapchat'
  | 'linkedin'
  | 'website';

export interface UserBadge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt: string;
  rarity: BadgeRarity;
}

export type BadgeType =
  | 'verified'
  | 'trending'
  | 'top_creator'
  | 'early_adopter'
  | 'milestone_1k'
  | 'milestone_10k'
  | 'milestone_100k'
  | 'milestone_1m'
  | 'challenge_winner'
  | 'brand_partner'
  | 'moderator'
  | 'premium';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type CreatorLevel = 'beginner' | 'rising' | 'established' | 'popular' | 'star' | 'superstar' | 'legend';

export interface NotificationPreferences {
  likes: boolean;
  comments: boolean;
  follows: boolean;
  mentions: boolean;
  directMessages: boolean;
  brandDeals: boolean;
  earnings: boolean;
  trendingAlerts: boolean;
  challengeUpdates: boolean;
  systemNotifications: boolean;
  emailDigest: 'daily' | 'weekly' | 'never';
  pushEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export type MonetizationStatus = 'not_eligible' | 'eligible' | 'pending' | 'active' | 'suspended';

export interface BankDetails {
  id: string;
  type: PaymentMethod;
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  upiId: string;
  isVerified: boolean;
  isPrimary: boolean;
  addedAt: string;
}

export type PaymentMethod = 'bank_transfer' | 'upi' | 'paypal' | 'stripe';

// ============================================================================
// Video & Content Types
// ============================================================================

export interface Video {
  id: string;
  userId: string;
  user: UserProfile;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  hashtags: string[];
  mentions: string[];
  musicId: string | null;
  music: MusicTrack | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  savesCount: number;
  duration: number;
  width: number;
  height: number;
  isLiked: boolean;
  isSaved: boolean;
  isBookmarked: boolean;
  allowComments: boolean;
  allowDuet: boolean;
  allowStitch: boolean;
  visibility: VideoVisibility;
  createdAt: string;
  updatedAt: string;
  filters: VideoFilter[];
  effects: VideoEffect[];
  stickers: VideoSticker[];
  textOverlays: TextOverlay[];
  locationTag: LocationTag | null;
  aspectRatio: AspectRatio;
  quality: VideoQuality;
  engagement: VideoEngagement;
  analytics: VideoAnalytics;
}

export type VideoVisibility = 'public' | 'followers_only' | 'private' | 'draft';

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5';

export type VideoQuality = '360p' | '480p' | '720p' | '1080p' | '4k';

export interface VideoFilter {
  id: string;
  name: string;
  category: FilterCategory;
  thumbnailUrl: string;
  intensity: number;
  isPremium: boolean;
  isNew: boolean;
  usageCount: number;
}

export type FilterCategory =
  | 'beauty'
  | 'vintage'
  | 'mood'
  | 'color'
  | 'artistic'
  | 'seasonal'
  | 'trending'
  | 'portrait'
  | 'landscape'
  | 'food'
  | 'night'
  | 'cinematic';

export interface VideoEffect {
  id: string;
  name: string;
  category: EffectCategory;
  thumbnailUrl: string;
  duration: number;
  isAnimated: boolean;
  isPremium: boolean;
  downloadCount: number;
}

export type EffectCategory =
  | 'face'
  | 'background'
  | 'transition'
  | 'time'
  | 'ar'
  | 'interactive'
  | 'green_screen'
  | 'split_screen'
  | 'slow_motion'
  | 'speed_up';

export interface VideoSticker {
  id: string;
  type: StickerType;
  imageUrl: string;
  position: Position;
  scale: number;
  rotation: number;
  startTime: number;
  endTime: number;
  isAnimated: boolean;
  animationType: AnimationType;
}

export type StickerType = 'emoji' | 'gif' | 'text' | 'poll' | 'countdown' | 'question' | 'quiz' | 'location' | 'mention' | 'hashtag' | 'custom';

export type AnimationType = 'none' | 'bounce' | 'fade' | 'slide' | 'rotate' | 'scale' | 'shake' | 'pulse';

export interface TextOverlay {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight;
  color: string;
  backgroundColor: string;
  position: Position;
  alignment: TextAlignment;
  startTime: number;
  endTime: number;
  animation: AnimationType;
  shadowEnabled: boolean;
  outlineEnabled: boolean;
  outlineColor: string;
}

export type FontWeight = 'normal' | 'bold' | 'light' | 'medium' | 'semibold' | 'extrabold';

export type TextAlignment = 'left' | 'center' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface LocationTag {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  placeId: string;
}

export interface VideoEngagement {
  likeRate: number;
  commentRate: number;
  shareRate: number;
  saveRate: number;
  completionRate: number;
  averageWatchTime: number;
  replayRate: number;
}

export interface VideoAnalytics {
  totalViews: number;
  uniqueViews: number;
  averageWatchTime: number;
  completionRate: number;
  peakConcurrentViewers: number;
  viewsByRegion: RegionData[];
  viewsByAge: AgeData[];
  viewsByGender: GenderData[];
  viewsBySource: SourceData[];
  viewsByHour: HourlyData[];
  dailyViews: DailyData[];
  reachCount: number;
  impressionCount: number;
  profileVisitsFromVideo: number;
  followsFromVideo: number;
}

export interface RegionData {
  region: string;
  count: number;
  percentage: number;
}

export interface AgeData {
  ageGroup: string;
  count: number;
  percentage: number;
}

export interface GenderData {
  gender: string;
  count: number;
  percentage: number;
}

export interface SourceData {
  source: string;
  count: number;
  percentage: number;
}

export interface HourlyData {
  hour: number;
  count: number;
}

export interface DailyData {
  date: string;
  count: number;
}

// ============================================================================
// Music & Audio Types
// ============================================================================

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  duration: number;
  previewUrl: string;
  genre: MusicGenre;
  mood: MusicMood;
  bpm: number;
  isOriginal: boolean;
  isTrending: boolean;
  usageCount: number;
  addedAt: string;
  isFavorite: boolean;
  isExplicit: boolean;
  album: string;
  releaseYear: number;
  tags: string[];
}

export type MusicGenre =
  | 'pop'
  | 'hip_hop'
  | 'rnb'
  | 'electronic'
  | 'rock'
  | 'indie'
  | 'classical'
  | 'jazz'
  | 'country'
  | 'latin'
  | 'bollywood'
  | 'kpop'
  | 'lofi'
  | 'ambient'
  | 'funk'
  | 'soul'
  | 'reggaeton';

export type MusicMood =
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'chill'
  | 'romantic'
  | 'dark'
  | 'motivational'
  | 'nostalgic'
  | 'dreamy'
  | 'aggressive'
  | 'peaceful'
  | 'mysterious';

// ============================================================================
// Comment & Interaction Types
// ============================================================================

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  user: UserProfile;
  text: string;
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
  isPinned: boolean;
  isCreatorReply: boolean;
  createdAt: string;
  updatedAt: string;
  mentions: string[];
  hashtags: string[];
  parentCommentId: string | null;
  replies: Comment[];
  reactionType: ReactionType | null;
}

export type ReactionType = 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry' | 'fire' | 'clap' | 'mind_blown';

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  thumbnailUrl: string;
  fromUser: UserProfile | null;
  videoId: string | null;
  commentId: string | null;
  isRead: boolean;
  createdAt: string;
  actionUrl: string;
  metadata: NotificationMetadata;
}

export type NotificationType =
  | 'like'
  | 'comment'
  | 'follow'
  | 'mention'
  | 'reply'
  | 'duet'
  | 'stitch'
  | 'share'
  | 'milestone'
  | 'trending'
  | 'brand_deal'
  | 'earning'
  | 'system'
  | 'challenge'
  | 'live'
  | 'story_reaction';

export interface NotificationMetadata {
  count: number;
  additionalUsers: string[];
  videoThumbnail: string | null;
  amount: number | null;
  currency: string | null;
  brandName: string | null;
  challengeName: string | null;
  milestoneType: string | null;
  milestoneValue: number | null;
}

// ============================================================================
// Direct Message Types
// ============================================================================

export interface Conversation {
  id: string;
  participants: UserProfile[];
  lastMessage: DirectMessage | null;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  updatedAt: string;
  createdAt: string;
  conversationType: ConversationType;
  groupName: string | null;
  groupAvatarUrl: string | null;
}

export type ConversationType = 'direct' | 'group';

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  sender: UserProfile;
  content: string;
  type: MessageType;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  videoId: string | null;
  isRead: boolean;
  isDelivered: boolean;
  isSent: boolean;
  createdAt: string;
  reactions: MessageReaction[];
  replyToMessageId: string | null;
  replyToMessage: DirectMessage | null;
  isEdited: boolean;
  isDeleted: boolean;
}

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'gif' | 'sticker' | 'video_share' | 'profile_share' | 'location';

export interface MessageReaction {
  userId: string;
  emoji: string;
  createdAt: string;
}

// ============================================================================
// Trending & Discovery Types
// ============================================================================

export interface Hashtag {
  id: string;
  name: string;
  videosCount: number;
  viewsCount: number;
  description: string;
  thumbnailUrl: string;
  isTrending: boolean;
  trendingRank: number;
  category: HashtagCategory;
  createdAt: string;
  weeklyGrowth: number;
  monthlyGrowth: number;
  relatedHashtags: string[];
  topCreators: UserProfile[];
  isFollowing: boolean;
}

export type HashtagCategory =
  | 'entertainment'
  | 'education'
  | 'comedy'
  | 'music'
  | 'dance'
  | 'food'
  | 'fashion'
  | 'beauty'
  | 'fitness'
  | 'tech'
  | 'travel'
  | 'gaming'
  | 'art'
  | 'pets'
  | 'sports'
  | 'news'
  | 'business'
  | 'lifestyle'
  | 'diy'
  | 'motivation';

export interface Challenge {
  id: string;
  name: string;
  description: string;
  hashtag: string;
  bannerUrl: string;
  thumbnailUrl: string;
  videoCount: number;
  participantCount: number;
  viewCount: number;
  prizePool: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: ChallengeStatus;
  rules: string[];
  sponsors: ChallengeSponsor[];
  winners: ChallengeWinner[];
  isParticipating: boolean;
  isFeatured: boolean;
  difficulty: ChallengeDifficulty;
  category: HashtagCategory;
  topVideos: Video[];
  officialVideo: Video | null;
}

export type ChallengeStatus = 'upcoming' | 'active' | 'ended' | 'judging' | 'results_announced';

export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface ChallengeSponsor {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  sponsorType: 'title' | 'presenting' | 'supporting';
}

export interface ChallengeWinner {
  userId: string;
  user: UserProfile;
  videoId: string;
  video: Video;
  rank: number;
  prize: number;
  currency: string;
}

// ============================================================================
// Monetization Types
// ============================================================================

export interface EarningsSummary {
  totalEarnings: number;
  pendingEarnings: number;
  availableBalance: number;
  currency: string;
  lastPayout: PayoutRecord | null;
  monthlyEarnings: MonthlyEarning[];
  earningsBySource: EarningBySource[];
  lifetimeEarnings: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  growthPercentage: number;
  estimatedNextPayout: number;
  nextPayoutDate: string;
  minimumPayoutThreshold: number;
}

export interface MonthlyEarning {
  month: string;
  year: number;
  amount: number;
  currency: string;
  breakdown: EarningBreakdown;
}

export interface EarningBreakdown {
  videoRevenue: number;
  brandDeals: number;
  tips: number;
  subscriptions: number;
  challenges: number;
  referrals: number;
  bonuses: number;
}

export interface EarningBySource {
  source: EarningSource;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export type EarningSource =
  | 'video_revenue'
  | 'brand_deals'
  | 'tips'
  | 'subscriptions'
  | 'challenge_prizes'
  | 'referral_bonus'
  | 'creator_fund'
  | 'live_gifts';

export interface PayoutRecord {
  id: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  method: PaymentMethod;
  bankDetails: BankDetails;
  requestedAt: string;
  processedAt: string | null;
  completedAt: string | null;
  transactionId: string | null;
  failureReason: string | null;
  fee: number;
  netAmount: number;
}

export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface BrandDeal {
  id: string;
  brandName: string;
  brandLogoUrl: string;
  brandWebsite: string;
  title: string;
  description: string;
  requirements: string[];
  deliverables: BrandDeliverable[];
  budget: number;
  currency: string;
  paymentTerms: string;
  deadline: string;
  applicationDeadline: string;
  status: BrandDealStatus;
  category: HashtagCategory;
  targetFollowers: number;
  targetEngagement: number;
  applicantCount: number;
  isApplied: boolean;
  isInvited: boolean;
  contactPerson: string;
  contactEmail: string;
  campaignDuration: string;
  exclusivity: boolean;
  usageRights: string;
  revisionCount: number;
  createdAt: string;
  updatedAt: string;
}

export type BrandDealStatus =
  | 'open'
  | 'applied'
  | 'shortlisted'
  | 'accepted'
  | 'in_progress'
  | 'content_submitted'
  | 'revision_requested'
  | 'approved'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface BrandDeliverable {
  id: string;
  type: DeliverableType;
  description: string;
  quantity: number;
  deadline: string;
  status: DeliverableStatus;
  submittedUrl: string | null;
  feedback: string | null;
}

export type DeliverableType = 'video' | 'story' | 'post' | 'live' | 'review' | 'tutorial' | 'unboxing';

export type DeliverableStatus = 'pending' | 'submitted' | 'approved' | 'revision_needed' | 'completed';

// ============================================================================
// Settings & Preferences Types
// ============================================================================

export interface AppSettings {
  theme: ThemeMode;
  language: string;
  autoPlayVideos: boolean;
  dataSaver: boolean;
  downloadQuality: VideoQuality;
  uploadQuality: VideoQuality;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
  contentPreferences: ContentPreferences;
  cacheSize: number;
  appVersion: string;
  lastSyncAt: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface PrivacySettings {
  privateAccount: boolean;
  allowDuets: boolean;
  allowStitch: boolean;
  allowComments: CommentPermission;
  allowDirectMessages: DirectMessagePermission;
  showLikedVideos: boolean;
  showOnlineStatus: boolean;
  allowDownloads: boolean;
  suggestAccountToOthers: boolean;
  allowDataCollection: boolean;
  blockedUsers: string[];
  restrictedUsers: string[];
  hiddenWords: string[];
}

export type CommentPermission = 'everyone' | 'followers' | 'friends' | 'no_one';
export type DirectMessagePermission = 'everyone' | 'followers' | 'friends' | 'no_one';

export interface AccessibilitySettings {
  fontSize: FontSize;
  reduceMotion: boolean;
  highContrast: boolean;
  screenReader: boolean;
  captionsEnabled: boolean;
  captionsFontSize: FontSize;
  captionsColor: string;
  hapticFeedback: boolean;
  autoScrollSpeed: number;
}

export type FontSize = 'small' | 'medium' | 'large' | 'extra_large';

export interface ContentPreferences {
  preferredCategories: HashtagCategory[];
  hiddenCategories: HashtagCategory[];
  preferredLanguages: string[];
  sensitiveContentFilter: boolean;
  restrictedMode: boolean;
  autoTranslate: boolean;
}

// ============================================================================
// AI Assistant Types
// ============================================================================

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isTyping: boolean;
  suggestions: string[];
  actions: AIAction[];
  metadata: AIMessageMetadata;
}

export interface AIAction {
  id: string;
  label: string;
  type: AIActionType;
  payload: Record<string, unknown>;
}

export type AIActionType =
  | 'navigate'
  | 'search'
  | 'create_video'
  | 'edit_profile'
  | 'view_analytics'
  | 'manage_settings'
  | 'apply_effect'
  | 'suggest_hashtag'
  | 'suggest_music'
  | 'schedule_post';

export interface AIMessageMetadata {
  processingTime: number;
  confidence: number;
  model: string;
  tokensUsed: number;
}

// ============================================================================
// Navigation Types
// ============================================================================

export type RootTabParamList = {
  FeedTab: undefined;
  CreateTab: undefined;
  TrendingTab: undefined;
  InboxTab: undefined;
  ProfileTab: undefined;
  MonetizationTab: undefined;
};

export type FeedStackParamList = {
  FeedHome: undefined;
  VideoDetail: { videoId: string };
  CommentThread: { videoId: string; commentId: string };
  CreatorProfile: { userId: string };
  VideoLikes: { videoId: string };
  VideoShares: { videoId: string };
  HashtagFeed: { hashtag: string };
  MusicFeed: { musicId: string };
  LocationFeed: { locationId: string };
};

export type CreateStackParamList = {
  CreateHome: undefined;
  RecordingScreen: { mode: RecordingMode };
  EditingScreen: { videoUri: string };
  EffectsPanel: { videoUri: string };
  AudioSelection: { videoUri: string };
  PostPreview: { videoUri: string; caption: string; hashtags: string[] };
  GalleryPicker: undefined;
  FilterBrowser: { category: FilterCategory };
  StickerBrowser: undefined;
  TextEditor: { videoUri: string };
  SpeedControl: { videoUri: string };
  VolumeControl: { videoUri: string };
  TrimEditor: { videoUri: string };
};

export type RecordingMode = 'video' | 'photo' | 'story' | 'live' | 'duet' | 'stitch';

export type TrendingStackParamList = {
  TrendingHome: undefined;
  HashtagDetail: { hashtagId: string };
  HashtagVideos: { hashtag: string };
  ChallengeDetail: { challengeId: string };
  TrendingVideo: { videoId: string };
  DuetRecording: { videoId: string };
  StitchRecording: { videoId: string };
  TopCreators: { category: string };
  CreatorDetail: { userId: string };
  TrendingSounds: undefined;
  SoundDetail: { musicId: string };
};

export type InboxStackParamList = {
  InboxHome: undefined;
  NotificationDetail: { notificationId: string };
  UserProfile: { userId: string };
  ChatScreen: { conversationId: string };
  ChatList: undefined;
  NewMessage: undefined;
  GroupChat: { conversationId: string };
  MessageRequests: undefined;
  ActivityDetail: { type: NotificationType };
  FollowersList: { userId: string };
  FollowingList: { userId: string };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  VideoPlayer: { videoId: string };
  AnalyticsDashboard: undefined;
  EditProfile: undefined;
  Settings: undefined;
  PrivacySettings: undefined;
  NotificationSettings: undefined;
  AccountSettings: undefined;
  BlockedUsers: undefined;
  SavedVideos: undefined;
  LikedVideos: undefined;
  WatchHistory: undefined;
  DraftVideos: undefined;
  QRCode: undefined;
  ShareProfile: undefined;
  FollowerAnalytics: undefined;
  ContentAnalytics: { videoId: string };
};

export type MonetizationStackParamList = {
  MonetizationHome: undefined;
  WithdrawalScreen: undefined;
  PaymentHistory: undefined;
  BrandDeals: undefined;
  BrandDealDetail: { dealId: string };
  BankSettings: undefined;
  AddBankAccount: undefined;
  EarningsBreakdown: { month: string; year: number };
  TaxInformation: undefined;
  ReferralProgram: undefined;
  CreatorFund: undefined;
  TipsSettings: undefined;
  SubscriptionSettings: undefined;
  InvoiceDetail: { payoutId: string };
};

// ============================================================================
// Component Props Types
// ============================================================================

export interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}

export interface GlassmorphicCardProps {
  children: React.ReactNode;
  style?: object;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  onPress?: () => void;
  animated?: boolean;
}

export interface NeumorphicCardProps {
  children: React.ReactNode;
  style?: object;
  lightShadowColor?: string;
  darkShadowColor?: string;
  onPress?: () => void;
  depth?: number;
  shape?: 'flat' | 'concave' | 'convex' | 'pressed';
}

export interface GradientButtonProps {
  title: string;
  onPress: () => void;
  colors?: string[];
  startPoint?: Position;
  endPoint?: Position;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
  animationType?: 'scale' | 'spring' | 'fade' | 'none';
}

export interface AnimatedTouchableProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  scaleValue?: number;
  springConfig?: SpringConfig;
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  overshootClamping: boolean;
  restDisplacementThreshold: number;
  restSpeedThreshold: number;
}

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  refreshing: boolean;
  progressBackgroundColor?: string;
  colors?: string[];
  tintColor?: string;
}

export interface InfiniteScrollProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
  threshold?: number;
  loadingComponent?: React.ReactNode;
}

export interface FloatingAIButtonProps {
  onPress: () => void;
  visible: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: number;
  colors?: string[];
}

export interface VideoCardProps {
  video: Video;
  onPress: () => void;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
  onUserPress: () => void;
  style?: object;
  layout?: 'full' | 'compact' | 'grid';
}

export interface UserAvatarProps {
  user: UserProfile;
  size: number;
  onPress?: () => void;
  showBadge?: boolean;
  showOnlineStatus?: boolean;
  borderWidth?: number;
  borderColor?: string;
}

export interface CommentCardProps {
  comment: Comment;
  onPress: () => void;
  onLike: () => void;
  onReply: () => void;
  onUserPress: () => void;
  isReply?: boolean;
  depth?: number;
}

export interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
  onUserPress: () => void;
  onDismiss: () => void;
}

export interface HashtagChipProps {
  hashtag: string;
  onPress: () => void;
  selected?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'ghost';
}

export interface MusicTileProps {
  track: MusicTrack;
  onPress: () => void;
  onPlay: () => void;
  onFavorite: () => void;
  isPlaying?: boolean;
  layout?: 'horizontal' | 'vertical' | 'compact';
}

export interface BrandDealCardProps {
  deal: BrandDeal;
  onPress: () => void;
  onApply: () => void;
  layout?: 'full' | 'compact';
}

export interface EarningsCardProps {
  earnings: EarningsSummary;
  onPress: () => void;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
  onPress: () => void;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface AnalyticsChartProps {
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'pie' | 'area';
  height?: number;
  width?: number;
  animated?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  gradientColors?: string[];
}

// ============================================================================
// Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  USER_PROFILE: '@creatorx_user_profile',
  AUTH_TOKEN: '@creatorx_auth_token',
  THEME_MODE: '@creatorx_theme_mode',
  APP_SETTINGS: '@creatorx_app_settings',
  FAVORITES: '@creatorx_favorites',
  WATCH_HISTORY: '@creatorx_watch_history',
  SEARCH_HISTORY: '@creatorx_search_history',
  DRAFT_VIDEOS: '@creatorx_draft_videos',
  NOTIFICATION_PREFERENCES: '@creatorx_notification_prefs',
  PRIVACY_SETTINGS: '@creatorx_privacy_settings',
  CONTENT_PREFERENCES: '@creatorx_content_prefs',
  CACHED_FEED: '@creatorx_cached_feed',
  CACHED_TRENDING: '@creatorx_cached_trending',
  ONBOARDING_COMPLETE: '@creatorx_onboarding_complete',
  LAST_SYNC: '@creatorx_last_sync',
  AI_CHAT_HISTORY: '@creatorx_ai_chat_history',
  SAVED_FILTERS: '@creatorx_saved_filters',
  SAVED_EFFECTS: '@creatorx_saved_effects',
  BLOCKED_USERS: '@creatorx_blocked_users',
  MUTED_USERS: '@creatorx_muted_users',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
