// ============================================================================
// CreatorX Ultra Pro - Utility Functions
// Helper functions used across the entire application
// ============================================================================

import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// Number Formatting
// ============================================================================

export const formatCount = (count: number): string => {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
};

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  const symbols: Record<string, string> = {
    INR: '\u20b9',
    USD: '$',
    EUR: '\u20ac',
    GBP: '\u00a3',
    JPY: '\u00a5',
  };
  const symbol = symbols[currency] || currency + ' ';

  if (amount >= 10000000) {
    return symbol + (amount / 10000000).toFixed(2) + ' Cr';
  }
  if (amount >= 100000) {
    return symbol + (amount / 100000).toFixed(2) + ' L';
  }
  if (amount >= 1000) {
    return symbol + (amount / 1000).toFixed(1) + 'K';
  }
  return symbol + amount.toLocaleString();
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + ' GB';
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return value.toFixed(decimals) + '%';
};

// ============================================================================
// Date & Time Formatting
// ============================================================================

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

// ============================================================================
// String Utilities
// ============================================================================

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const extractHashtags = (text: string): string[] => {
  const matches = text.match(/#[\w]+/g);
  return matches ? matches.map((tag) => tag.substring(1)) : [];
};

export const extractMentions = (text: string): string[] => {
  const matches = text.match(/@[\w]+/g);
  return matches ? matches.map((mention) => mention.substring(1)) : [];
};

export const highlightHashtags = (text: string): { text: string; isHashtag: boolean; isMention: boolean }[] => {
  const parts: { text: string; isHashtag: boolean; isMention: boolean }[] = [];
  const regex = /(#[\w]+|@[\w]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, match.index), isHashtag: false, isMention: false });
    }
    parts.push({
      text: match[0],
      isHashtag: match[0].startsWith('#'),
      isMention: match[0].startsWith('@'),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), isHashtag: false, isMention: false });
  }

  return parts;
};

// ============================================================================
// Layout & Responsive Utilities
// ============================================================================

export const wp = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percentage) / 100);
};

export const hp = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percentage) / 100);
};

export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const getStatusBarHeight = (): number => {
  return isIOS ? 44 : 24;
};

export const getBottomSafeArea = (): number => {
  return isIOS ? 34 : 0;
};

// ============================================================================
// Validation Utilities
// ============================================================================

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (username.length < 3) return { valid: false, error: 'Username must be at least 3 characters' };
  if (username.length > 30) return { valid: false, error: 'Username must be less than 30 characters' };
  if (!/^[a-zA-Z0-9._]+$/.test(username)) return { valid: false, error: 'Username can only contain letters, numbers, dots, and underscores' };
  return { valid: true };
};

export const validatePassword = (password: string): { valid: boolean; strength: number; errors: string[] } => {
  const errors: string[] = [];
  let strength = 0;

  if (password.length >= 8) strength += 25;
  else errors.push('At least 8 characters');

  if (/[a-z]/.test(password)) strength += 25;
  else errors.push('At least one lowercase letter');

  if (/[A-Z]/.test(password)) strength += 25;
  else errors.push('At least one uppercase letter');

  if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
  else errors.push('At least one number or special character');

  return { valid: errors.length === 0, strength, errors };
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ============================================================================
// Color Utilities
// ============================================================================

export const hexToRGBA = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0, 0, 0, ${alpha})`;
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
};

export const getRandomColor = (): string => {
  const colors = [
    '#6C5CE7', '#A29BFE', '#00CEC9', '#55EFC4', '#FD79A8',
    '#FDCB6E', '#FF6B6B', '#74B9FF', '#0652DD', '#00B894',
    '#E84393', '#FFA502', '#1289A7', '#EE5A24', '#B53471',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getGradientForIndex = (index: number): string[] => {
  const gradients = [
    ['#6C5CE7', '#A29BFE'],
    ['#00CEC9', '#55EFC4'],
    ['#FD79A8', '#FF6B6B'],
    ['#FDCB6E', '#FFA502'],
    ['#74B9FF', '#0652DD'],
    ['#00B894', '#55EFC4'],
    ['#E84393', '#FD79A8'],
    ['#FF6B6B', '#FDCB6E'],
    ['#1289A7', '#74B9FF'],
    ['#B53471', '#6C5CE7'],
  ];
  return gradients[index % gradients.length];
};

// ============================================================================
// Array Utilities
// ============================================================================

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const removeDuplicates = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// ============================================================================
// Delay & Async Utilities
// ============================================================================

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const simulateApiCall = async <T>(data: T, delayMs: number = 1500): Promise<T> => {
  await delay(delayMs);
  return data;
};

export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (i < maxRetries - 1) {
        await delay(delayMs * (i + 1));
      }
    }
  }
  throw lastError;
};
