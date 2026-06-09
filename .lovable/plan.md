
# Z Desires — Neon Mini App Chat UI

Mobile-first (390×844) Telegram Mini App with neon blue / pink / purple maximalist aesthetic. UI-only with local state — no backend.

## Design system (locked from chosen direction)

- **Palette:** background `#05060a`, surface `#0f111a`, neon blue `#00d4ff`, neon pink `#ff2d92`, neon purple `#8b5cf6`
- **Fonts:** Cormorant Garamond italic (display), Outfit (body), JetBrains Mono (mono labels)
- **Surfaces:** heavy glassmorphism (`backdrop-blur(24px)` on translucent dark), gradient borders, glow shadows, rounded-[32px–54px]
- **Motion:** sheet slide-up, pulse-glow on premium CTA, hover scale on avatars

All tokens go into `src/styles.css` via `@theme` (Tailwind v4). Fonts loaded via `<link>` in `__root.tsx`.

## Screens & routes

| Route | File | Purpose |
|---|---|---|
| `/` | `index.tsx` | Onboarding splash — Z Desires logo, "Enter the Void" CTA → navigates to `/inbox` |
| `/inbox` | `inbox.tsx` | Chat list with avatars, last message, unread badges, "14 NEW" pill, bottom nav |
| `/chat/$id` | `chat.$id.tsx` | 1:1 messaging, gradient bubbles, pay-to-unlock blurred media, composer |
| `/profile/$handle` | `profile.$handle.tsx` | Chat profile — cover, avatar, bio, media grid (some locked), Message/Gift buttons |
| `/me` | `me.tsx` | Own profile with wallet balance, gallery, settings |

Coin purchase sheet (`<CoinSheet />`) is a Radix Drawer/Sheet triggered from inbox header coin pill, chat composer coin icon, profile "Gift" button, and unlock buttons.

## Components

- `PhoneFrame` — wraps each route on desktop preview only; transparent on mobile
- `BottomNav` — 3 tabs (inbox / discover / profile) with active glow
- `MessageBubble` — variants: incoming (zinc), outgoing (neon blue→purple gradient)
- `LockedMedia` — blurred image + glass overlay + glowing "UNLOCK FOR N COINS" pill
- `CoinSheet` — bottom sheet with 4 tier cards (Light/Pro/Elite/Whale), "Best" highlight, "Pay with Stars" CTA
- `Avatar` — circular with neon ring (color per user)
- `ChatListItem`, `ProfileHeader`, `MediaGrid`

## Local state (Zustand, single store)

- `coins: number` (start 1,250)
- `unlockedMedia: Set<string>` — media IDs the user has paid to view
- `messages: Record<chatId, Message[]>` — seeded with mock conversations; composer appends
- Actions: `unlock(mediaId, cost)` deducts coins + adds to set; `purchase(pkg)` adds coins; `sendMessage`

Seed 3–4 mock users (Vesper, Dorian, Sora L., Kai V.) with avatars generated via imagegen.

## Image generation

Generate ~6 reusable assets in `src/assets/`: splash hero glow, 4 user portraits (neon-lit), 1 cover background, 2 gallery shots, 1 locked-media teaser. Use generated images for all `data-lov-image-placeholder` blocks from the prototype.

## Build order

1. Tokens + fonts in `styles.css` and `__root.tsx`; install `zustand`
2. Generate images in parallel
3. Zustand store + mock seed data
4. Shared components (`PhoneFrame`, `BottomNav`, `Avatar`, `MessageBubble`, `LockedMedia`, `CoinSheet`)
5. Routes: `/` → `/inbox` → `/chat/$id` → `/profile/$handle` → `/me`
6. Wire CoinSheet open state via Zustand; verify unlock + purchase flows in preview at 390×844

## Out of scope

No auth, no real Telegram WebApp SDK integration, no real payments, no database. Pure UI + local state.
