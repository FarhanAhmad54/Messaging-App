import type { Tables } from './database.types';

export type Profile = Tables<'profiles'>;
export type Conversation = Tables<'conversations'> & { last_message?: Message | null; unread_count?: number };
export type Message = Tables<'messages'> & { sender?: Profile };
export type Attachment = Tables<'attachments'>;
export type MessageReaction = Tables<'message_reactions'>;
export type MessageReceipt = Tables<'message_receipts'>;
