import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

export type QueuedMessage = { id: string; conversationId: string; senderId: string; body: string; clientId: string; createdAt: string; attempts: number; nextAttemptAt: number };
const KEY = 'messaging.offline.queue.v1';
let flushing = false;

async function read(): Promise<QueuedMessage[]> { try { return JSON.parse((await AsyncStorage.getItem(KEY)) ?? '[]'); } catch { return []; } }
async function write(items: QueuedMessage[]) { await AsyncStorage.setItem(KEY, JSON.stringify(items)); }
export async function enqueueMessage(item: Omit<QueuedMessage, 'attempts'|'nextAttemptAt'>) { const q = await read(); q.push({ ...item, attempts: 0, nextAttemptAt: Date.now() }); await write(q); }
export async function flushQueue() { if (flushing) return; flushing = true; try { let q = await read(); const remaining: QueuedMessage[] = []; for (const item of q) { if (item.nextAttemptAt > Date.now()) { remaining.push(item); continue; } const { error } = await supabase.from('messages').insert({ client_id:item.clientId, conversation_id:item.conversationId, sender_id:item.senderId, body:item.body, message_type:'text' }); if (!error) continue; const attempts=item.attempts+1; if (attempts >= 8) continue; remaining.push({ ...item, attempts, nextAttemptAt:Date.now()+Math.min(60000,1000*2**attempts) }); } await write(remaining); } finally { flushing=false; } }
AppState.addEventListener('change', state => { if (state === 'active') void flushQueue(); });
