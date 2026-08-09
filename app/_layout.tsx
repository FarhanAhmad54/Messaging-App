import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SessionProvider, useSession } from '../lib/session';
import { registerForPushNotifications } from '../lib/notifications';
import { colors } from '../lib/theme';

function PushRegistration() {
  const { user } = useSession();
  useEffect(() => { if (user) registerForPushNotifications(user.id).catch(() => {}); }, [user]);
  return null;
}

export default function RootLayout() {
  return <SessionProvider><PushRegistration/><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.ink},animation:'fade'}}/></SessionProvider>;
}
