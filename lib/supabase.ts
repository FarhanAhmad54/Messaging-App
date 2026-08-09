import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import type { Database } from './database.types';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.');

const storage = {
  getItem: (storageKey: string) => SecureStore.getItemAsync(storageKey),
  setItem: (storageKey: string, value: string) => SecureStore.setItemAsync(storageKey, value),
  removeItem: (storageKey: string) => SecureStore.deleteItemAsync(storageKey),
};

export const supabase = createClient<Database>(url, key, {
  auth: { storage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
  realtime: { params: { eventsPerSecond: 20 } },
});
