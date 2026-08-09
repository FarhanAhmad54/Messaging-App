import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { supabase } from './supabase';

export async function touchDevice(userId: string) {
  if (!Device.isDevice) return;
  const key = `${Platform.OS}:${Device.modelName ?? 'unknown'}:${Device.osVersion ?? 'unknown'}`;
  await supabase.from('devices').upsert({ user_id: userId, platform: Platform.OS, device_key: key, device_name: Device.deviceName ?? Device.modelName ?? 'Mobile device', os_version: Device.osVersion ?? null, enabled: true, last_seen_at: new Date().toISOString() }, { onConflict: 'user_id,device_key' });
}
