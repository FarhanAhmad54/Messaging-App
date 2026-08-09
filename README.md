# Messaging App

Production-oriented Expo + Supabase messaging foundation.

## Current foundation

- Expo Router + TypeScript
- Supabase Auth with SecureStore session persistence
- PostgreSQL conversation/message model
- RLS policies for conversation membership and message ownership
- Supabase Realtime subscriptions
- Optimistic message rendering
- Client idempotency key reconciliation
- Failed-send state
- Direct user search and conversation creation
- Dark, mobile-first UI

## Setup

1. Install dependencies: `npm install`
2. Create a Supabase project.
3. Copy `.env.example` to `.env` and fill in the publishable key and project URL.
4. Run `supabase/migrations/0001_messaging.sql` then `0002_auth_and_realtime.sql` in the Supabase SQL editor, or apply them with the Supabase CLI.
5. Start: `npm run start`

Never put a Supabase service-role/secret key in the Expo application.

## Roadmap

The uploaded product specification is the source of truth for the remaining production phases: offline queue/retry, delivery/read receipts, typing/presence, media pipeline, push notifications, invites, reactions/replies/edit/delete, moderation, observability, rate limiting, automated tests, and final security/performance verification.
