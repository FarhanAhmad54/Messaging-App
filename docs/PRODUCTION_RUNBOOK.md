# Aurora Messages — Production Runbook

## Local verification

```bash
npm install
npm run typecheck
npx expo config --type public
npx expo start --clear
```

## Environment

Set only the public client variables in `.env`:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Never ship a Supabase service-role key in the Expo bundle.

## EAS

Development build:

```bash
eas build --profile development --platform android
```

Preview build:

```bash
eas build --profile preview --platform android
```

Production build:

```bash
eas build --profile production --platform all
```

## Release gates

1. TypeScript passes.
2. Expo public configuration resolves.
3. Supabase migrations are applied.
4. RLS/security advisor is clean.
5. Authentication works on a physical device.
6. Two accounts can exchange realtime messages.
7. Offline send/reconnect behavior is verified.
8. Media upload and private Storage access are verified.
9. Push permission, token registration, and notification deep links are verified.
10. Android and iOS production builds install and launch.

## Required device QA

- Login/signup/logout
- Direct chat
- Group chat
- Realtime delivery
- Typing/presence
- Read receipts
- Reactions/replies/deletion
- Image/document uploads
- Offline queue and retry
- Archive/mute
- Notification tap from foreground/background/cold start
- Account/profile/settings changes

A production release is not considered device-verified until these flows have been exercised on physical hardware.
