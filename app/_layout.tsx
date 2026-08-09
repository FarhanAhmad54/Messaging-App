import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SessionProvider, useSession } from '../lib/session';
import { registerForPushNotifications, startNotificationRouting } from '../lib/notifications';
import { colors } from '../lib/theme';

function AppRuntime() {
  const { user } = useSession();
  useEffect(() => {
    if (!user) return;
    registerForPushNotifications(user.id).catch(() => {});
    const subscription = startNotificationRouting();
    return () => subscription.remove();
  }, [user]);
  return null;
}

export default function RootLayout() {
  return <SessionProvider><AppRuntime/><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.ink},animation:'fade'}}/></SessionProvider>;
}
