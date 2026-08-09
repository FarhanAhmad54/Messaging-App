import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SessionProvider, useSession } from '../lib/session';
import { registerForPushNotifications, startNotificationRouting, clearAppBadge } from '../lib/notifications';
import { flushQueue } from '../lib/offlineQueue';
import { touchDevice } from '../lib/device';
import { colors } from '../lib/theme';
import { ConnectionBanner } from '../components/ConnectionBanner';

function AppRuntime() {
  const { user } = useSession();
  useEffect(() => {
    if (!user) return;
    void touchDevice(user.id);
    void registerForPushNotifications(user.id);
    void clearAppBadge();
    void flushQueue();
    const subscription = startNotificationRouting();
    return () => subscription.remove();
  }, [user]);
  return null;
}

export default function RootLayout() {
  return <SessionProvider><AppRuntime/><ConnectionBanner/><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.ink},animation:'fade'}}/></SessionProvider>;
}
