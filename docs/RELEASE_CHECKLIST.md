# Aurora Messages — Release Checklist

## Automated gates
- [ ] `npm install`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npx expo config --type public`
- [ ] `npx expo export --platform web`
- [ ] Supabase security advisor: no errors
- [ ] Supabase performance advisor: review remaining notices

## Authentication
- [ ] Email signup/sign-in
- [ ] Email verification
- [ ] Invalid credentials UX
- [ ] Session restore
- [ ] Sign out

## Messaging
- [ ] Direct conversation creation
- [ ] Realtime delivery
- [ ] Optimistic sending
- [ ] Offline queue + retry
- [ ] Read receipts
- [ ] Typing indicator
- [ ] Presence
- [ ] Replies
- [ ] Reactions
- [ ] Edit/delete permissions
- [ ] Archive/mute

## Groups
- [ ] Create group
- [ ] Search/select members
- [ ] Membership permissions
- [ ] Group messaging
- [ ] Group management

## Media
- [ ] Image selection
- [ ] Upload to private storage
- [ ] Attachment metadata
- [ ] Upload failure recovery
- [ ] Document upload
- [ ] Audio/video implementation verification

## Notifications
- [ ] Device registration
- [ ] Push token persistence
- [ ] Notification preferences
- [ ] Android notification channel
- [ ] Cold-start deep link
- [ ] Background deep link
- [ ] Badge reset

## Security
- [ ] RLS enabled on every user-data table
- [ ] Storage policies verified
- [ ] Service-role key absent from client
- [ ] Block/report enforcement verified
- [ ] Input validation and payload limits

## Native QA
- [ ] Android physical device
- [ ] iOS physical device
- [ ] Poor network / airplane mode
- [ ] Background → foreground
- [ ] Killed app → notification tap
- [ ] Large image/document upload
- [ ] Keyboard + safe-area behavior
- [ ] Dark theme visual review

## Release
- [ ] EAS development build
- [ ] EAS preview build
- [ ] EAS production build
- [ ] App icon and splash assets
- [ ] Android package identifier
- [ ] iOS bundle identifier
- [ ] Store metadata
