# Nepal Election App — TODO

## Setup & Branding
- [x] Generate app logo (Nepal flag-inspired crimson design)
- [x] Update theme colors (Nepal crimson primary)
- [x] Update app.config.ts with app name and logo
- [x] Update icon-symbol.tsx with required icons

## Data Layer
- [x] Create election data file (parties, FPTP results, PR results)
- [x] Create constituency data with elected MPs and vote counts
- [x] Create province data with seat breakdowns

## Screens
- [x] Home / Dashboard screen with summary stats
- [x] FPTP Results screen (party summary tab)
- [x] FPTP Results screen (by province tab)
- [x] FPTP Results screen (by constituency tab)
- [x] PR Results screen with party vote counts and percentages
- [x] Party Detail screen
- [ ] Province Detail screen

## Components
- [x] PartyBadge component
- [x] VoteBar component (horizontal progress bar)
- [x] StatCard component
- [x] ConstituencyCard component (inline in FPTP screen)
- [x] PartyResultRow component (inline in Parties screen)

## Navigation
- [x] Tab bar with 4 tabs (Home, FPTP, PR, Parties)
- [x] Stack navigation for detail screens (Party Detail)

## Polish
- [x] Dark mode support (via useColors hook)
- [x] Haptic feedback on interactions (HapticTab)
- [x] Loading states and empty states (empty state in constituency list)
- [x] Search/filter functionality on constituency list


## March 2026 (2082) Election Update
- [x] Update election date to March 2026 (2082)
- [x] Update PR vote data with official 2082 results
- [x] Update FPTP seat distribution with 2082 results
- [x] Update party list with new parties from 2082 election
- [x] Update election summary stats (turnout, total votes, etc.)
- [x] Create automated sync service (electionDataSync.ts)
- [x] Create useElectionDataSync hook
- [x] Update home screen with sync status and last update time
- [x] Test all screens with new data
- [x] Save updated checkpoint
