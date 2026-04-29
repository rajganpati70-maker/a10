// ============================================================================
// CreatorX Ultra Pro - Mock Data
// Comprehensive mock data for all screens with realistic content
// ============================================================================

import {
  UserProfile,
  Video,
  Comment,
  Notification,
  Hashtag,
  Challenge,
  MusicTrack,
  Conversation,
  DirectMessage,
  BrandDeal,
  EarningsSummary,
  PayoutRecord,
  VideoFilter,
  VideoEffect,
  AIMessage,
} from '../types';

// ============================================================================
// Helper Functions for generating mock data
// ============================================================================

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const randomDate = (daysAgo: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const formatCount = (count: number): string => {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
  return count.toString();
};

// ============================================================================
// Avatar URLs (placeholder images)
// ============================================================================

const avatarUrls = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16',
  'https://i.pravatar.cc/150?img=17',
  'https://i.pravatar.cc/150?img=18',
  'https://i.pravatar.cc/150?img=19',
  'https://i.pravatar.cc/150?img=20',
];

const thumbnailUrls = [
  'https://picsum.photos/seed/v1/400/700',
  'https://picsum.photos/seed/v2/400/700',
  'https://picsum.photos/seed/v3/400/700',
  'https://picsum.photos/seed/v4/400/700',
  'https://picsum.photos/seed/v5/400/700',
  'https://picsum.photos/seed/v6/400/700',
  'https://picsum.photos/seed/v7/400/700',
  'https://picsum.photos/seed/v8/400/700',
  'https://picsum.photos/seed/v9/400/700',
  'https://picsum.photos/seed/v10/400/700',
  'https://picsum.photos/seed/v11/400/700',
  'https://picsum.photos/seed/v12/400/700',
  'https://picsum.photos/seed/v13/400/700',
  'https://picsum.photos/seed/v14/400/700',
  'https://picsum.photos/seed/v15/400/700',
  'https://picsum.photos/seed/v16/400/700',
  'https://picsum.photos/seed/v17/400/700',
  'https://picsum.photos/seed/v18/400/700',
  'https://picsum.photos/seed/v19/400/700',
  'https://picsum.photos/seed/v20/400/700',
];

const bannerUrls = [
  'https://picsum.photos/seed/b1/800/400',
  'https://picsum.photos/seed/b2/800/400',
  'https://picsum.photos/seed/b3/800/400',
  'https://picsum.photos/seed/b4/800/400',
  'https://picsum.photos/seed/b5/800/400',
];

// ============================================================================
// Mock Users
// ============================================================================

const usernames = [
  'dance_queen_22', 'tech_wizard_pro', 'foodie_adventures', 'fitness_guru_x',
  'travel_nomad_life', 'comedy_central_99', 'music_vibes_daily', 'art_creator_hub',
  'fashion_icon_2024', 'gaming_master_x', 'nature_explorer_01', 'beauty_queen_hd',
  'diy_crafts_love', 'pet_lover_world', 'sports_fanatic_11', 'motivation_daily',
  'cooking_masterchef', 'photography_pro', 'yoga_zen_life', 'startup_hustle',
  'crypto_trader_x', 'book_worm_reads', 'car_enthusiast_88', 'singing_star_voice',
  'comedy_king_live', 'skate_board_life', 'makeup_artist_hd', 'drone_pilot_sky',
  'vlog_daily_life', 'science_nerd_101',
];

const displayNames = [
  'Dance Queen \u2728', 'Tech Wizard \ud83d\ude80', 'Foodie Adventures \ud83c\udf55', 'Fitness Guru \ud83d\udcaa',
  'Travel Nomad \u2708\ufe0f', 'Comedy Central \ud83d\ude02', 'Music Vibes \ud83c\udfb5', 'Art Creator \ud83c\udfa8',
  'Fashion Icon \ud83d\udc57', 'Gaming Master \ud83c\udfae', 'Nature Explorer \ud83c\udf3f', 'Beauty Queen \ud83d\udc84',
  'DIY Crafts \u2702\ufe0f', 'Pet Lover \ud83d\udc36', 'Sports Fan \u26bd', 'Daily Motivation \ud83d\udd25',
  'Master Chef \ud83d\udc68\u200d\ud83c\udf73', 'Photo Pro \ud83d\udcf7', 'Zen Yoga \ud83e\uddd8', 'Startup Life \ud83d\udca1',
  'Crypto Trader \ud83d\udcb0', 'Book Worm \ud83d\udcda', 'Car Fanatic \ud83c\udfce\ufe0f', 'Singing Star \ud83c\udfa4',
  'Comedy King \ud83d\udc51', 'Skate Life \ud83d\udef9', 'Makeup Artist \ud83c\udfa8', 'Drone Pilot \ud83d\ude81',
  'Daily Vlog \ud83d\udcf1', 'Science Nerd \ud83e\uddea',
];

const bios = [
  'Living life one dance at a time \u2728 | 500K family | DM for collabs',
  'Building the future with code \ud83d\udcbb | Tech reviews & tutorials',
  'Exploring world cuisines \ud83c\udf0d | Recipe videos daily | Food blogger',
  'Transform your body & mind \ud83d\udcaa | Certified trainer | DM for plans',
  'Wanderlust \u2708\ufe0f | 50+ countries | Travel tips & hidden gems',
  'Making you laugh since 2020 \ud83d\ude02 | Sketches & pranks | 1M+ laughs',
  'Your daily dose of music \ud83c\udfb5 | Covers & originals | Spotify link below',
  'Creating art that speaks \ud83c\udfa8 | Digital & traditional | Commission open',
  'Style is a way to say who you are \ud83d\udc57 | Fashion tips | Brand ambassador',
  'Pro gamer & streamer \ud83c\udfae | FPS specialist | Esports competitor',
  'Discovering nature\u2019s beauty \ud83c\udf3f | Wildlife photography | Conservation',
  'Beauty tips & tutorials \ud83d\udc84 | Skincare routine | Product reviews',
  'DIY everything \u2702\ufe0f | Home decor | Budget-friendly crafts',
  'Pet parent of 5 \ud83d\udc36\ud83d\udc31 | Cute animal content | Adoption advocate',
  'All sports, all day \u26bd | Analysis & highlights | Sports commentary',
  'Start each day with purpose \ud83d\udd25 | Motivational speaker | Life coach',
  'From kitchen to camera \ud83d\udc68\u200d\ud83c\udf73 | Restaurant reviews | Home cooking',
  'Capturing moments \ud83d\udcf7 | Portrait & landscape | Photo editing tips',
  'Find your inner peace \ud83e\uddd8 | Yoga & meditation | Wellness journey',
  'Building startups \ud83d\udca1 | Entrepreneur life | Business tips & failures',
  'Crypto insights \ud83d\udcb0 | Market analysis | Not financial advice',
  'Reading 100 books a year \ud83d\udcda | Book reviews | Reading challenges',
  'Cars are my passion \ud83c\udfce\ufe0f | Reviews & modifications | Track days',
  'Sing along with me \ud83c\udfa4 | Bollywood covers | Original music',
  'Laughter is the best medicine \ud83d\udc51 | Stand-up clips | Roast master',
  'Shredding pavements \ud83d\udef9 | Trick tutorials | Skatepark reviews',
  'Glam transformations \ud83c\udfa8 | Bridal makeup | Tutorial Tuesdays',
  'Aerial perspectives \ud83d\ude81 | Drone cinematography | FPV racing',
  'My life, unfiltered \ud83d\udcf1 | Daily vlogs | Behind the scenes',
  'Science made fun \ud83e\uddea | Experiments & facts | STEM education',
];

export const generateMockUser = (index: number = 0): UserProfile => {
  const i = index % usernames.length;
  return {
    id: `user_${i}_${generateId()}`,
    username: usernames[i],
    displayName: displayNames[i],
    avatarUrl: avatarUrls[i % avatarUrls.length],
    bio: bios[i],
    website: `https://${usernames[i]}.creator.com`,
    followersCount: randomNumber(1000, 5000000),
    followingCount: randomNumber(100, 5000),
    likesCount: randomNumber(10000, 50000000),
    videosCount: randomNumber(50, 2000),
    isVerified: Math.random() > 0.6,
    isFollowing: Math.random() > 0.5,
    isFollower: Math.random() > 0.7,
    joinDate: randomDate(365),
    location: ['Mumbai, India', 'New York, USA', 'London, UK', 'Tokyo, Japan', 'Dubai, UAE', 'Sydney, AU', 'Paris, France', 'Berlin, DE'][i % 8],
    category: ['entertainment', 'education', 'comedy', 'music', 'dance', 'food', 'fashion', 'beauty'][i % 8],
    socialLinks: [
      { id: generateId(), platform: 'instagram', url: 'https://instagram.com/' + usernames[i], username: usernames[i], isVerified: true },
      { id: generateId(), platform: 'youtube', url: 'https://youtube.com/' + usernames[i], username: usernames[i], isVerified: false },
    ],
    badges: [
      { id: generateId(), type: 'verified', name: 'Verified Creator', description: 'Verified account', iconUrl: '', earnedAt: randomDate(180), rarity: 'rare' },
      { id: generateId(), type: 'trending', name: 'Trending Creator', description: 'Trending this week', iconUrl: '', earnedAt: randomDate(30), rarity: 'uncommon' },
    ],
    pinnedVideoId: null,
    isPrivate: false,
    allowDuets: true,
    allowStitch: true,
    notificationPreferences: {
      likes: true, comments: true, follows: true, mentions: true,
      directMessages: true, brandDeals: true, earnings: true,
      trendingAlerts: true, challengeUpdates: true, systemNotifications: true,
      emailDigest: 'daily', pushEnabled: true, soundEnabled: true, vibrationEnabled: true,
    },
    monetizationStatus: 'active',
    creatorLevel: ['beginner', 'rising', 'established', 'popular', 'star', 'superstar', 'legend'][i % 7] as any,
    totalEarnings: randomNumber(5000, 500000),
    pendingEarnings: randomNumber(500, 50000),
    bankDetails: {
      id: generateId(), type: 'bank_transfer', accountName: displayNames[i],
      accountNumber: '****' + randomNumber(1000, 9999), bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234', upiId: usernames[i] + '@upi',
      isVerified: true, isPrimary: true, addedAt: randomDate(90),
    },
  };
};

// ============================================================================
// Mock Videos
// ============================================================================

const captions = [
  'This trend is absolutely insane! Had to try it \ud83d\udd25 #trending #viral #fyp',
  'POV: When the beat drops and you just gotta move \ud83d\udc83 #dance #music',
  'Cooked this masterpiece in 30 minutes! Recipe in comments \ud83c\udf55 #food #cooking',
  'Morning workout routine that changed my life \ud83d\udcaa #fitness #motivation',
  'Found the most beautiful hidden waterfall \ud83c\udf0a #travel #nature #explore',
  'This comedy sketch took 3 hours but worth it \ud83d\ude02 #comedy #funny #lol',
  'New original song! Let me know what you think \ud83c\udfb5 #music #singer #original',
  'Digital art timelapse - 10 hours in 60 seconds \ud83c\udfa8 #art #digital #creative',
  'Outfit of the day - summer vibes \u2600\ufe0f #fashion #ootd #style',
  'This game glitch is absolutely broken \ud83c\udfae #gaming #glitch #funny',
  'Sunset from 1000 feet up with my drone \ud83d\ude81 #drone #sunset #aerial',
  'Get ready with me for a night out \ud83d\udc84 #grwm #beauty #makeup',
  'DIY room makeover on a budget \u2702\ufe0f #diy #homedecor #budget',
  'My cat learned a new trick! So proud \ud83d\udc31 #pets #cats #cute',
  'Insane goal from last night\'s match \u26bd #sports #football #goals',
  'Monday motivation to crush your goals \ud83d\udd25 #motivation #mindset #success',
  'Street food tour in Bangkok - must try! \ud83c\udf5c #streetfood #thailand #foodie',
  'Golden hour portrait session BTS \ud83d\udcf7 #photography #portrait #bts',
  '5 minute morning yoga flow \ud83e\uddd8 #yoga #wellness #morning',
  'How I built my startup from scratch \ud83d\udca1 #startup #entrepreneur #hustle',
];

export const generateMockVideo = (index: number = 0): Video => {
  const i = index % captions.length;
  const user = generateMockUser(index);
  return {
    id: `video_${index}_${generateId()}`,
    userId: user.id,
    user: user,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: thumbnailUrls[i % thumbnailUrls.length],
    caption: captions[i],
    hashtags: ['trending', 'viral', 'fyp', 'creatorx', 'foryou'],
    mentions: index % 3 === 0 ? [usernames[(i + 1) % usernames.length]] : [],
    musicId: `music_${i}`,
    music: generateMockMusic(i),
    likesCount: randomNumber(100, 5000000),
    commentsCount: randomNumber(10, 100000),
    sharesCount: randomNumber(5, 50000),
    viewsCount: randomNumber(1000, 50000000),
    savesCount: randomNumber(10, 100000),
    duration: randomNumber(15, 180),
    width: 1080,
    height: 1920,
    isLiked: Math.random() > 0.5,
    isSaved: Math.random() > 0.7,
    isBookmarked: Math.random() > 0.8,
    allowComments: true,
    allowDuet: true,
    allowStitch: true,
    visibility: 'public',
    createdAt: randomDate(30),
    updatedAt: randomDate(7),
    filters: [],
    effects: [],
    stickers: [],
    textOverlays: [],
    locationTag: index % 4 === 0 ? {
      id: generateId(), name: 'Times Square', address: 'Manhattan, NY',
      latitude: 40.758, longitude: -73.9855, city: 'New York', country: 'USA', placeId: 'place_1',
    } : null,
    aspectRatio: '9:16',
    quality: '1080p',
    engagement: {
      likeRate: Math.random() * 15 + 2,
      commentRate: Math.random() * 5 + 0.5,
      shareRate: Math.random() * 3 + 0.2,
      saveRate: Math.random() * 4 + 0.3,
      completionRate: Math.random() * 40 + 40,
      averageWatchTime: randomNumber(10, 60),
      replayRate: Math.random() * 20 + 5,
    },
    analytics: {
      totalViews: randomNumber(1000, 5000000),
      uniqueViews: randomNumber(800, 4000000),
      averageWatchTime: randomNumber(10, 60),
      completionRate: Math.random() * 40 + 40,
      peakConcurrentViewers: randomNumber(10, 50000),
      viewsByRegion: [
        { region: 'India', count: randomNumber(5000, 200000), percentage: 35 },
        { region: 'USA', count: randomNumber(3000, 150000), percentage: 25 },
        { region: 'UK', count: randomNumber(1000, 80000), percentage: 15 },
        { region: 'Others', count: randomNumber(2000, 100000), percentage: 25 },
      ],
      viewsByAge: [
        { ageGroup: '13-17', count: randomNumber(500, 50000), percentage: 15 },
        { ageGroup: '18-24', count: randomNumber(2000, 200000), percentage: 40 },
        { ageGroup: '25-34', count: randomNumber(1000, 100000), percentage: 25 },
        { ageGroup: '35+', count: randomNumber(500, 50000), percentage: 20 },
      ],
      viewsByGender: [
        { gender: 'Male', count: randomNumber(3000, 250000), percentage: 48 },
        { gender: 'Female', count: randomNumber(3000, 250000), percentage: 45 },
        { gender: 'Other', count: randomNumber(100, 30000), percentage: 7 },
      ],
      viewsBySource: [
        { source: 'For You', count: randomNumber(5000, 300000), percentage: 55 },
        { source: 'Following', count: randomNumber(1000, 100000), percentage: 20 },
        { source: 'Search', count: randomNumber(500, 50000), percentage: 10 },
        { source: 'Profile', count: randomNumber(500, 50000), percentage: 10 },
        { source: 'Share', count: randomNumber(200, 30000), percentage: 5 },
      ],
      viewsByHour: Array.from({ length: 24 }, (_, h) => ({ hour: h, count: randomNumber(100, 20000) })),
      dailyViews: Array.from({ length: 30 }, (_, d) => {
        const date = new Date(); date.setDate(date.getDate() - (29 - d));
        return { date: date.toISOString().split('T')[0], count: randomNumber(500, 50000) };
      }),
      reachCount: randomNumber(10000, 1000000),
      impressionCount: randomNumber(20000, 2000000),
      profileVisitsFromVideo: randomNumber(100, 50000),
      followsFromVideo: randomNumber(10, 5000),
    },
  };
};

// ============================================================================
// Mock Comments
// ============================================================================

const commentTexts = [
  'This is absolutely amazing! Keep creating \ud83d\udd25',
  'OMG I need to try this right now!!!',
  'You\'re so talented, this blew my mind \ud83e\udd2f',
  'Best content I\'ve seen today, hands down!',
  'Tutorial please! I need to learn this \ud83d\ude4f',
  'Who else is watching this at 3am? Just me? Ok \ud83d\ude02',
  'This deserves way more views than it has',
  'I\'ve watched this 10 times already and I\'m not stopping',
  'Can we please normalize being this creative?',
  'Drop the skincare routine please \ud83d\ude4f\ud83d\ude4f\ud83d\ude4f',
  'The editing on this is next level \ud83c\udfac',
  'I literally cannot stop laughing at this \ud83d\ude02\ud83d\ude02',
  'You inspire me every single day \u2764\ufe0f',
  'Collab when?? This would be legendary!',
  'The way you make everything look so effortless \u2728',
  'Saving this for later, too good to scroll past',
  'POV: You found the best creator on the app',
  'My jaw literally dropped watching this',
  'Day 47 of asking you to post more often',
  'This is underrated content right here',
  'Bhai zabardast! Kya baat hai \ud83d\udd25\ud83d\udd25',
  'Maza aa gaya dekh ke! More please!',
  'India represent! \ud83c\uddee\ud83c\uddf3 Proud of you!',
  'This is going viral for sure \ud83d\ude80',
  'New follower here, can\'t believe I just found this!',
];

export const generateMockComment = (index: number = 0, videoId: string = 'video_1'): Comment => {
  const i = index % commentTexts.length;
  const user = generateMockUser(index + 5);
  return {
    id: `comment_${index}_${generateId()}`,
    videoId,
    userId: user.id,
    user,
    text: commentTexts[i],
    likesCount: randomNumber(0, 50000),
    repliesCount: randomNumber(0, 500),
    isLiked: Math.random() > 0.6,
    isPinned: index === 0 && Math.random() > 0.7,
    isCreatorReply: Math.random() > 0.9,
    createdAt: randomDate(14),
    updatedAt: randomDate(7),
    mentions: [],
    hashtags: [],
    parentCommentId: null,
    replies: index < 3 ? Array.from({ length: randomNumber(1, 4) }, (_, ri) => ({
      id: `reply_${index}_${ri}_${generateId()}`,
      videoId,
      userId: generateMockUser(ri + 10).id,
      user: generateMockUser(ri + 10),
      text: commentTexts[(i + ri + 1) % commentTexts.length],
      likesCount: randomNumber(0, 5000),
      repliesCount: 0,
      isLiked: Math.random() > 0.7,
      isPinned: false,
      isCreatorReply: ri === 0 && Math.random() > 0.7,
      createdAt: randomDate(7),
      updatedAt: randomDate(3),
      mentions: [],
      hashtags: [],
      parentCommentId: `comment_${index}`,
      replies: [],
      reactionType: null,
    })) : [],
    reactionType: null,
  };
};

// ============================================================================
// Mock Music
// ============================================================================

const musicTitles = [
  'Midnight Groove', 'Summer Vibes', 'Neon Dreams', 'Electric Soul', 'Crystal Clear',
  'Urban Beats', 'Starlight', 'Ocean Waves', 'Fire Dance', 'Cosmic Journey',
  'Golden Hour', 'Velvet Touch', 'Storm Chaser', 'Mystic Flow', 'Diamond Rain',
  'Purple Haze', 'Silver Lining', 'Thunder Clap', 'Moonrise', 'Solar Flare',
  'Deep Blue', 'Cherry Blossom', 'Wild Heart', 'Echo Chamber', 'Flash Point',
  'Gravity Pull', 'Ice Crystal', 'Jungle Beat', 'Karma Flow', 'Laser Light',
];

const musicArtists = [
  'DJ Shadow X', 'Luna Nova', 'The Midnight', 'Neon Tiger', 'Crystal Waves',
  'Urban Soul', 'Star Child', 'Ocean Deep', 'Fire Fox', 'Cosmic Ray',
  'Golden Boy', 'Velvet Room', 'Storm King', 'Mystic River', 'Diamond Dust',
  'Purple Rain', 'Silver Fox', 'Thunder God', 'Moon Child', 'Solar Wind',
  'Deep Sea', 'Cherry Pop', 'Wild One', 'Echo System', 'Flash Drive',
  'Gravity Zero', 'Ice Queen', 'Jungle King', 'Karma Police', 'Laser Beam',
];

export const generateMockMusic = (index: number = 0): MusicTrack => {
  const i = index % musicTitles.length;
  return {
    id: `music_${index}_${generateId()}`,
    title: musicTitles[i],
    artist: musicArtists[i],
    albumArt: thumbnailUrls[i % thumbnailUrls.length],
    duration: randomNumber(30, 300),
    previewUrl: '',
    genre: ['pop', 'hip_hop', 'electronic', 'rnb', 'indie', 'lofi', 'bollywood', 'kpop'][i % 8] as any,
    mood: ['happy', 'energetic', 'chill', 'romantic', 'dark', 'motivational', 'dreamy'][i % 7] as any,
    bpm: randomNumber(80, 180),
    isOriginal: Math.random() > 0.5,
    isTrending: Math.random() > 0.6,
    usageCount: randomNumber(100, 5000000),
    addedAt: randomDate(60),
    isFavorite: Math.random() > 0.7,
    isExplicit: Math.random() > 0.8,
    album: musicTitles[i] + ' Album',
    releaseYear: randomNumber(2020, 2024),
    tags: ['trending', 'popular', 'viral'],
  };
};

// ============================================================================
// Mock Notifications
// ============================================================================

export const generateMockNotification = (index: number = 0): Notification => {
  const types: Array<Notification['type']> = [
    'like', 'comment', 'follow', 'mention', 'reply', 'duet', 'share',
    'milestone', 'trending', 'brand_deal', 'earning', 'system', 'challenge',
  ];
  const type = types[index % types.length];
  const fromUser = generateMockUser(index + 3);

  const titles: Record<string, string> = {
    like: `${fromUser.displayName} liked your video`,
    comment: `${fromUser.displayName} commented on your video`,
    follow: `${fromUser.displayName} started following you`,
    mention: `${fromUser.displayName} mentioned you in a comment`,
    reply: `${fromUser.displayName} replied to your comment`,
    duet: `${fromUser.displayName} created a duet with your video`,
    share: `${fromUser.displayName} shared your video`,
    milestone: 'Congratulations! You reached 100K followers!',
    trending: 'Your video is trending! #1 in Music',
    brand_deal: 'New brand deal opportunity from Nike',
    earning: 'You earned \u20b915,000 this week!',
    system: 'CreatorX Ultra Pro has been updated',
    challenge: 'New challenge: #DanceOff2024 is live!',
  };

  const messages: Record<string, string> = {
    like: 'Your latest video got a new like',
    comment: '"This is amazing! Keep going \ud83d\udd25"',
    follow: 'You have a new follower',
    mention: 'You were mentioned in a comment',
    reply: '"Thanks for the tutorial!"',
    duet: 'Check out the duet',
    share: 'Your video was shared',
    milestone: 'Keep creating amazing content!',
    trending: 'Your video has 1M+ views',
    brand_deal: 'Budget: \u20b950,000 - \u20b91,00,000',
    earning: 'View your earnings dashboard',
    system: 'New features and improvements',
    challenge: 'Join now and win prizes!',
  };

  return {
    id: `notif_${index}_${generateId()}`,
    type,
    title: titles[type] || 'New notification',
    message: messages[type] || 'You have a new notification',
    thumbnailUrl: thumbnailUrls[index % thumbnailUrls.length],
    fromUser: ['milestone', 'system', 'earning'].includes(type) ? null : fromUser,
    videoId: ['like', 'comment', 'mention', 'reply', 'duet', 'share', 'trending'].includes(type) ? `video_${index}` : null,
    commentId: ['comment', 'reply', 'mention'].includes(type) ? `comment_${index}` : null,
    isRead: Math.random() > 0.5,
    createdAt: randomDate(14),
    actionUrl: '',
    metadata: {
      count: randomNumber(1, 100),
      additionalUsers: [],
      videoThumbnail: thumbnailUrls[index % thumbnailUrls.length],
      amount: type === 'earning' ? randomNumber(1000, 50000) : null,
      currency: type === 'earning' ? 'INR' : null,
      brandName: type === 'brand_deal' ? 'Nike' : null,
      challengeName: type === 'challenge' ? 'DanceOff2024' : null,
      milestoneType: type === 'milestone' ? 'followers' : null,
      milestoneValue: type === 'milestone' ? 100000 : null,
    },
  };
};

// ============================================================================
// Mock Hashtags
// ============================================================================

const hashtagNames = [
  'trending', 'viral', 'fyp', 'foryou', 'dance', 'comedy', 'food', 'fitness',
  'travel', 'music', 'art', 'fashion', 'beauty', 'gaming', 'pets', 'sports',
  'motivation', 'cooking', 'photography', 'yoga', 'startup', 'crypto', 'books',
  'cars', 'singing', 'skateboarding', 'makeup', 'drones', 'vlog', 'science',
  'creatorx', 'challenge', 'duet', 'stitch', 'tutorial', 'diy', 'lifehack',
  'storytime', 'pov', 'transition', 'outfit', 'recipe', 'workout', 'explore',
  'india', 'bollywood', 'desi', 'mumbai', 'delhi', 'bangalore',
];

export const generateMockHashtag = (index: number = 0): Hashtag => {
  const i = index % hashtagNames.length;
  return {
    id: `hashtag_${index}_${generateId()}`,
    name: hashtagNames[i],
    videosCount: randomNumber(10000, 50000000),
    viewsCount: randomNumber(1000000, 5000000000),
    description: `Discover the best #${hashtagNames[i]} content from top creators around the world`,
    thumbnailUrl: thumbnailUrls[i % thumbnailUrls.length],
    isTrending: Math.random() > 0.5,
    trendingRank: index + 1,
    category: ['entertainment', 'education', 'comedy', 'music', 'dance', 'food', 'fashion', 'beauty'][i % 8] as any,
    createdAt: randomDate(365),
    weeklyGrowth: Math.random() * 50 + 5,
    monthlyGrowth: Math.random() * 200 + 20,
    relatedHashtags: hashtagNames.slice(i, i + 5),
    topCreators: Array.from({ length: 5 }, (_, ci) => generateMockUser(ci)),
    isFollowing: Math.random() > 0.6,
  };
};

// ============================================================================
// Mock Challenges
// ============================================================================

const challengeNames = [
  'Dance Off 2024', 'Cooking Challenge', 'Fitness 30 Day', 'Travel Vlog Contest',
  'Comedy Skit Battle', 'Music Cover Week', 'Art Timelapse', 'Fashion Runway',
  'Beauty Transformation', 'Gaming Highlights', 'Pet Tricks Challenge', 'Sports Skills',
  'DIY Home Makeover', 'Photography Contest', 'Yoga Flow Challenge', 'Startup Pitch',
];

export const generateMockChallenge = (index: number = 0): Challenge => {
  const i = index % challengeNames.length;
  return {
    id: `challenge_${index}_${generateId()}`,
    name: challengeNames[i],
    description: `Join the ${challengeNames[i]} and showcase your talent! Win amazing prizes and get featured on the trending page.`,
    hashtag: challengeNames[i].toLowerCase().replace(/\s+/g, ''),
    bannerUrl: bannerUrls[i % bannerUrls.length],
    thumbnailUrl: thumbnailUrls[i % thumbnailUrls.length],
    videoCount: randomNumber(1000, 500000),
    participantCount: randomNumber(500, 100000),
    viewCount: randomNumber(1000000, 100000000),
    prizePool: randomNumber(10000, 1000000),
    currency: 'INR',
    startDate: randomDate(15),
    endDate: new Date(Date.now() + randomNumber(7, 30) * 86400000).toISOString(),
    status: ['upcoming', 'active', 'active', 'active', 'ended'][index % 5] as any,
    rules: [
      'Create an original video related to the challenge theme',
      'Use the official hashtag in your caption',
      'Video must be between 15-60 seconds',
      'No offensive or inappropriate content',
      'One entry per creator',
    ],
    sponsors: [
      { id: generateId(), name: 'Nike', logoUrl: '', website: 'https://nike.com', sponsorType: 'title' },
      { id: generateId(), name: 'Apple', logoUrl: '', website: 'https://apple.com', sponsorType: 'presenting' },
    ],
    winners: [],
    isParticipating: Math.random() > 0.7,
    isFeatured: Math.random() > 0.5,
    difficulty: ['easy', 'medium', 'hard', 'expert'][index % 4] as any,
    category: ['entertainment', 'dance', 'comedy', 'music'][index % 4] as any,
    topVideos: Array.from({ length: 6 }, (_, vi) => generateMockVideo(vi + index * 6)),
    officialVideo: null,
  };
};

// ============================================================================
// Mock Conversations
// ============================================================================

export const generateMockConversation = (index: number = 0): Conversation => {
  const otherUser = generateMockUser(index + 5);
  const lastMsg = generateMockDirectMessage(0, `conv_${index}`);
  return {
    id: `conv_${index}_${generateId()}`,
    participants: [generateMockUser(0), otherUser],
    lastMessage: lastMsg,
    unreadCount: randomNumber(0, 20),
    isPinned: index < 2,
    isMuted: Math.random() > 0.8,
    isBlocked: false,
    updatedAt: randomDate(7),
    createdAt: randomDate(90),
    conversationType: 'direct',
    groupName: null,
    groupAvatarUrl: null,
  };
};

const dmTexts = [
  'Hey! Love your latest video \ud83d\udd25',
  'Thanks so much! Really appreciate it \u2764\ufe0f',
  'Wanna collab on something?',
  'Sure! Let\'s plan it out',
  'Check out this trending sound',
  'OMG yes! That\'s perfect for our collab',
  'When are you free to shoot?',
  'This weekend works for me!',
  'Sent you the script, check it out',
  'Love it! Let\'s do this \ud83d\ude80',
  'Just posted our collab video!',
  'It\'s already getting so many views!',
  'We should do this more often',
  'Definitely! You\'re so creative',
  'Thanks for the shoutout btw!',
];

export const generateMockDirectMessage = (index: number = 0, conversationId: string = 'conv_1'): DirectMessage => {
  const i = index % dmTexts.length;
  const sender = generateMockUser(index % 2 === 0 ? 0 : index + 5);
  return {
    id: `dm_${index}_${generateId()}`,
    conversationId,
    senderId: sender.id,
    sender,
    content: dmTexts[i],
    type: 'text',
    mediaUrl: null,
    thumbnailUrl: null,
    videoId: null,
    isRead: index > 0 || Math.random() > 0.3,
    isDelivered: true,
    isSent: true,
    createdAt: randomDate(7),
    reactions: [],
    replyToMessageId: null,
    replyToMessage: null,
    isEdited: false,
    isDeleted: false,
  };
};

// ============================================================================
// Mock Brand Deals
// ============================================================================

const brandNames = [
  'Nike', 'Apple', 'Samsung', 'Adidas', 'Coca-Cola', 'Amazon', 'Google', 'Microsoft',
  'Puma', 'Netflix', 'Spotify', 'Zara', 'H&M', 'L\'Oreal', 'Maybelline', 'Boat',
  'OnePlus', 'Myntra', 'Flipkart', 'Swiggy', 'Zomato', 'PhonePe', 'Paytm', 'Nykaa',
];

export const generateMockBrandDeal = (index: number = 0): BrandDeal => {
  const i = index % brandNames.length;
  return {
    id: `deal_${index}_${generateId()}`,
    brandName: brandNames[i],
    brandLogoUrl: avatarUrls[i % avatarUrls.length],
    brandWebsite: `https://${brandNames[i].toLowerCase().replace(/[^a-z]/g, '')}.com`,
    title: `${brandNames[i]} Creator Campaign - ${['Summer', 'Winter', 'Spring', 'Festive'][index % 4]} Collection`,
    description: `${brandNames[i]} is looking for creative content creators to promote their latest ${['collection', 'product', 'campaign', 'launch'][index % 4]}. Create engaging content that resonates with your audience.`,
    requirements: [
      'Minimum 50K followers',
      'Engagement rate > 3%',
      'Active in the last 30 days',
      'Original content only',
      'Must use branded hashtag',
    ],
    deliverables: [
      { id: generateId(), type: 'video', description: '1 main video (60-90 seconds)', quantity: 1, deadline: randomDate(-30), status: 'pending', submittedUrl: null, feedback: null },
      { id: generateId(), type: 'story', description: '3 story posts', quantity: 3, deadline: randomDate(-25), status: 'pending', submittedUrl: null, feedback: null },
    ],
    budget: randomNumber(10000, 500000),
    currency: 'INR',
    paymentTerms: 'Net 30 after content approval',
    deadline: new Date(Date.now() + randomNumber(14, 60) * 86400000).toISOString(),
    applicationDeadline: new Date(Date.now() + randomNumber(3, 14) * 86400000).toISOString(),
    status: ['open', 'open', 'applied', 'shortlisted', 'accepted', 'in_progress', 'completed'][index % 7] as any,
    category: ['fashion', 'tech', 'food', 'fitness', 'beauty'][index % 5] as any,
    targetFollowers: randomNumber(10000, 1000000),
    targetEngagement: Math.random() * 5 + 2,
    applicantCount: randomNumber(50, 5000),
    isApplied: index % 3 === 2,
    isInvited: index % 5 === 0,
    contactPerson: 'Brand Manager',
    contactEmail: `partner@${brandNames[i].toLowerCase().replace(/[^a-z]/g, '')}.com`,
    campaignDuration: `${randomNumber(1, 4)} weeks`,
    exclusivity: Math.random() > 0.6,
    usageRights: '6 months usage rights for all platforms',
    revisionCount: 2,
    createdAt: randomDate(30),
    updatedAt: randomDate(7),
  };
};

// ============================================================================
// Mock Earnings
// ============================================================================

export const generateMockEarnings = (): EarningsSummary => {
  return {
    totalEarnings: randomNumber(100000, 5000000),
    pendingEarnings: randomNumber(10000, 200000),
    availableBalance: randomNumber(50000, 1000000),
    currency: 'INR',
    lastPayout: {
      id: generateId(),
      amount: randomNumber(10000, 100000),
      currency: 'INR',
      status: 'completed',
      method: 'bank_transfer',
      bankDetails: {
        id: generateId(), type: 'bank_transfer', accountName: 'Creator Pro',
        accountNumber: '****5678', bankName: 'HDFC Bank', ifscCode: 'HDFC0001234',
        upiId: 'creator@upi', isVerified: true, isPrimary: true, addedAt: randomDate(90),
      },
      requestedAt: randomDate(14),
      processedAt: randomDate(10),
      completedAt: randomDate(7),
      transactionId: 'TXN' + generateId().substring(0, 10).toUpperCase(),
      failureReason: null,
      fee: randomNumber(100, 1000),
      netAmount: randomNumber(9000, 99000),
    },
    monthlyEarnings: Array.from({ length: 12 }, (_, mi) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mi],
      year: 2024,
      amount: randomNumber(5000, 200000),
      currency: 'INR',
      breakdown: {
        videoRevenue: randomNumber(3000, 100000),
        brandDeals: randomNumber(5000, 150000),
        tips: randomNumber(500, 20000),
        subscriptions: randomNumber(1000, 30000),
        challenges: randomNumber(0, 50000),
        referrals: randomNumber(100, 5000),
        bonuses: randomNumber(0, 10000),
      },
    })),
    earningsBySource: [
      { source: 'video_revenue', amount: randomNumber(30000, 500000), percentage: 35, trend: 'up', changePercentage: 12 },
      { source: 'brand_deals', amount: randomNumber(50000, 800000), percentage: 40, trend: 'up', changePercentage: 25 },
      { source: 'tips', amount: randomNumber(5000, 100000), percentage: 10, trend: 'stable', changePercentage: 2 },
      { source: 'subscriptions', amount: randomNumber(10000, 200000), percentage: 10, trend: 'up', changePercentage: 18 },
      { source: 'challenge_prizes', amount: randomNumber(5000, 100000), percentage: 5, trend: 'down', changePercentage: -5 },
    ],
    lifetimeEarnings: randomNumber(500000, 10000000),
    thisMonthEarnings: randomNumber(20000, 300000),
    lastMonthEarnings: randomNumber(15000, 250000),
    growthPercentage: Math.random() * 30 + 5,
    estimatedNextPayout: randomNumber(10000, 100000),
    nextPayoutDate: new Date(Date.now() + randomNumber(7, 30) * 86400000).toISOString(),
    minimumPayoutThreshold: 1000,
  };
};

// ============================================================================
// Mock Payouts
// ============================================================================

export const generateMockPayout = (index: number = 0): PayoutRecord => {
  const statuses: Array<PayoutRecord['status']> = ['completed', 'completed', 'completed', 'processing', 'pending', 'failed'];
  return {
    id: `payout_${index}_${generateId()}`,
    amount: randomNumber(5000, 200000),
    currency: 'INR',
    status: statuses[index % statuses.length],
    method: ['bank_transfer', 'upi', 'bank_transfer', 'upi'][index % 4] as any,
    bankDetails: {
      id: generateId(), type: 'bank_transfer', accountName: 'Creator Pro',
      accountNumber: '****' + randomNumber(1000, 9999), bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234', upiId: 'creator@upi',
      isVerified: true, isPrimary: true, addedAt: randomDate(120),
    },
    requestedAt: randomDate(60),
    processedAt: index < 3 ? randomDate(55) : null,
    completedAt: index < 3 ? randomDate(50) : null,
    transactionId: index < 3 ? 'TXN' + generateId().substring(0, 10).toUpperCase() : null,
    failureReason: index === 5 ? 'Bank account verification failed' : null,
    fee: randomNumber(50, 500),
    netAmount: randomNumber(4500, 199500),
  };
};

// ============================================================================
// Mock Filters & Effects
// ============================================================================

const filterNames = [
  'Dreamy Glow', 'Vintage Film', 'Neon Nights', 'Soft Focus', 'High Contrast',
  'Warm Sunset', 'Cool Breeze', 'Film Noir', 'Pastel Pop', 'Golden Hour',
  'Cyberpunk', 'Retro Wave', 'Matte Finish', 'Bloom Light', 'Crystal Clear',
  'Rose Tint', 'Ocean Blue', 'Forest Green', 'Lavender Haze', 'Amber Glow',
  'Snow White', 'Autumn Gold', 'Cherry Blossom', 'Desert Sand', 'Twilight',
  'Aurora', 'Moonlight', 'Sunshine', 'Rainy Day', 'Starlight',
  'Sepia Tone', 'Cross Process', 'Infrared', 'Polaroid', 'Lomo',
  'HDR Pro', 'Tilt Shift', 'Vignette', 'Grain Film', 'Bleach Bypass',
  'Day for Night', 'Split Tone', 'Color Pop', 'Duotone', 'Gradient Map',
  'Glitch Art', 'Pixelate', 'Oil Paint', 'Watercolor', 'Sketch',
];

export const generateMockFilter = (index: number = 0): VideoFilter => {
  const i = index % filterNames.length;
  return {
    id: `filter_${index}_${generateId()}`,
    name: filterNames[i],
    category: ['beauty', 'vintage', 'mood', 'color', 'artistic', 'cinematic', 'portrait', 'landscape', 'food', 'night'][i % 10] as any,
    thumbnailUrl: thumbnailUrls[i % thumbnailUrls.length],
    intensity: Math.random() * 0.5 + 0.5,
    isPremium: Math.random() > 0.7,
    isNew: Math.random() > 0.8,
    usageCount: randomNumber(1000, 5000000),
  };
};

const effectNames = [
  'Face Morph', 'Background Blur', 'Smooth Transition', 'Time Warp', 'AR Glasses',
  'Green Screen', 'Split Screen', 'Slow Motion', 'Speed Ramp', 'Face Swap',
  'Beauty Mode', 'Age Filter', 'Gender Swap', 'Animal Face', 'Cartoon Effect',
  'Glitch Effect', 'Rainbow', 'Sparkle', 'Fire Frame', 'Ice Crystal',
  'Disco Ball', 'Matrix Rain', 'Heart Eyes', 'Star Burst', 'Lightning',
  'Smoke Effect', 'Particle Storm', 'Kaleidoscope', 'Mirror Image', 'Fisheye',
  'Pixelate', 'VHS Tape', 'Screen Shake', 'Color Shift', 'Ghost Trail',
  'Clone Effect', 'Size Warp', 'Face Track', 'Hand Track', 'Body Segment',
  'Sky Replace', 'Style Transfer', 'Super Zoom', 'Dolly Zoom', 'Whip Pan',
  'Flash Cut', 'Cross Dissolve', 'Wipe Left', 'Iris In', 'Fade Black',
];

export const generateMockEffect = (index: number = 0): VideoEffect => {
  const i = index % effectNames.length;
  return {
    id: `effect_${index}_${generateId()}`,
    name: effectNames[i],
    category: ['face', 'background', 'transition', 'time', 'ar', 'interactive', 'green_screen', 'split_screen', 'slow_motion', 'speed_up'][i % 10] as any,
    thumbnailUrl: thumbnailUrls[i % thumbnailUrls.length],
    duration: randomNumber(3, 30),
    isAnimated: Math.random() > 0.3,
    isPremium: Math.random() > 0.6,
    downloadCount: randomNumber(5000, 10000000),
  };
};

// ============================================================================
// Mock AI Messages
// ============================================================================

const aiResponses = [
  'Based on your recent content, I suggest trying the new trending audio "Midnight Groove" for your next video. It has 2.5M+ uses this week!',
  'Your engagement rate has increased by 15% this week! Your dance content performs best between 7-9 PM. Consider posting during those hours.',
  'I noticed your followers love your cooking content. Would you like me to suggest some trending food hashtags for better reach?',
  'Great news! Your latest video is performing 3x better than your average. The algorithm is pushing it to more users. Keep the momentum going!',
  'Tip: Videos between 30-45 seconds get 50% more completions on this platform. Try keeping your next video in that sweet spot!',
  'Your profile views increased by 200% after your viral video. Now is the perfect time to post a new video to convert viewers into followers!',
  'I found 5 brand deals matching your profile. Nike, Adidas, and Puma are looking for fitness creators. Want me to show you the details?',
  'Your revenue this month is up 25% compared to last month. Brand deals contributed the most. Keep engaging with brands for more opportunities!',
];

export const generateMockAIMessage = (index: number = 0, role: 'user' | 'assistant' = 'assistant'): AIMessage => {
  return {
    id: `ai_msg_${index}_${generateId()}`,
    role,
    content: role === 'assistant' ? aiResponses[index % aiResponses.length] : 'Tell me about my content performance',
    timestamp: randomDate(1),
    isTyping: false,
    suggestions: role === 'assistant' ? [
      'Show me trending sounds',
      'Analyze my best videos',
      'Suggest hashtags for my next post',
      'When should I post next?',
    ] : [],
    actions: role === 'assistant' ? [
      { id: generateId(), label: 'View Details', type: 'navigate', payload: {} },
      { id: generateId(), label: 'Try Now', type: 'create_video', payload: {} },
    ] : [],
    metadata: {
      processingTime: randomNumber(200, 2000),
      confidence: Math.random() * 0.3 + 0.7,
      model: 'CreatorX-AI-v2',
      tokensUsed: randomNumber(50, 500),
    },
  };
};

// ============================================================================
// Batch generators for lists
// ============================================================================

export const generateMockUsers = (count: number = 20): UserProfile[] =>
  Array.from({ length: count }, (_, i) => generateMockUser(i));

export const generateMockVideos = (count: number = 20): Video[] =>
  Array.from({ length: count }, (_, i) => generateMockVideo(i));

export const generateMockComments = (count: number = 25, videoId: string = 'video_1'): Comment[] =>
  Array.from({ length: count }, (_, i) => generateMockComment(i, videoId));

export const generateMockNotifications = (count: number = 30): Notification[] =>
  Array.from({ length: count }, (_, i) => generateMockNotification(i));

export const generateMockHashtags = (count: number = 30): Hashtag[] =>
  Array.from({ length: count }, (_, i) => generateMockHashtag(i));

export const generateMockChallenges = (count: number = 16): Challenge[] =>
  Array.from({ length: count }, (_, i) => generateMockChallenge(i));

export const generateMockConversations = (count: number = 15): Conversation[] =>
  Array.from({ length: count }, (_, i) => generateMockConversation(i));

export const generateMockDirectMessages = (count: number = 30, convId: string = 'conv_1'): DirectMessage[] =>
  Array.from({ length: count }, (_, i) => generateMockDirectMessage(i, convId));

export const generateMockBrandDeals = (count: number = 20): BrandDeal[] =>
  Array.from({ length: count }, (_, i) => generateMockBrandDeal(i));

export const generateMockPayouts = (count: number = 15): PayoutRecord[] =>
  Array.from({ length: count }, (_, i) => generateMockPayout(i));

export const generateMockFilters = (count: number = 50): VideoFilter[] =>
  Array.from({ length: count }, (_, i) => generateMockFilter(i));

export const generateMockEffects = (count: number = 50): VideoEffect[] =>
  Array.from({ length: count }, (_, i) => generateMockEffect(i));

export const generateMockMusicTracks = (count: number = 30): MusicTrack[] =>
  Array.from({ length: count }, (_, i) => generateMockMusic(i));

export const generateMockAIMessages = (count: number = 10): AIMessage[] =>
  Array.from({ length: count }, (_, i) => generateMockAIMessage(i, i % 2 === 0 ? 'user' : 'assistant'));

// ============================================================================
// Utility exports
// ============================================================================

export { formatCount, generateId, randomNumber, randomDate };
