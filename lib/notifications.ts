import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { supabase } from './supabase';

Notifications.setNotificationHandler({
  handle: async () => ({ shouldPlaySound: true, shouldSetBadge: true, shouldShowBanner: true, shouldShowList: true }),
});

export async function registerForPushNotifications(userId: string) {
  if (!Device.isDevice) return null;
  const current = await Notifications.getPermissionsAsync();
  let status = current.status;
  if (status !== 'granted') status = (await Notifications.requestPermissionsAsync()).status;
  if (status !== 'granted') return null;
  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  const token = (await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined)).data;
  await supabase.from('devices').upsert({ user_id: userId, expo_push_token: token, platform: Platform.OS, enabled: true, last_seen_at: new Date().toISOString() }, { onConflict: 'expo_push_token' });
  if (Platform.OS === 'android') await Notifications.setNotificationChannelAsync('messages', { name: 'Messages', importance: Notifications.AndroidImportance.HIGH, sound: 'default' });
  return token;
}

export function startNotificationRouting() {
  const open = (response: Notifications.NotificationResponse) => {
    const data = response.notification.request.content.data as Record<string, unknown> | undefined;
    const conversationId = typeof data?.conversation_id === 'string' ? data.conversation_id : null;
    const notificationType = typeof data?.type === 'string' ? data.type : 'message';
    if (conversationId) router.push({ pathname: '/chat/[id]', params: { id: conversationId, notificationType } });
  };
  Notifications.getLastNotificationResponseAsync().then(response => { if (response) open(response); }).catch(() => {});
  return Notifications.addNotificationResponseReceivedListener(open);
}

export async function clearAppBadge() {
  try { await Notifications.setBadgeCountAsync(0); } catch {}
}
