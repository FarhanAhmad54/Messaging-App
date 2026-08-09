import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SessionProvider, useSession } from '../lib/session';
import { clearAppBadge, registerForPushNotifications, startNotificationRouting } from '../lib/notifications';
import { flushQueue } from '../lib/offlineQueue';
import { colors } from '../lib/theme';

function AppRuntime() {
  const { user } = useSession();
  useEffect(() => {
    if (!user) return;
    registerForPushNotifications(user.id).catch(() => {});
    void flushQueue();
    void clearAppBadge();
    const subscription = startNotificationRouting();
    return () => subscription.remove();
  }, [user]);
  return null;
}

export default function RootLayout() {
  return <SessionProvider><AppRuntime/><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.ink},animation:'fade'}}/></SessionProvider>;
}
