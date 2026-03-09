# Nepal Election App — Interface Design

## Overview
A mobile app displaying Nepal's 2022 General Election results, covering:
- **Directly Elected (FPTP)** candidates with individual vote counts and constituency totals
- **Proportional Representation (PR)** party vote counts and percentages
- Province-level breakdown and national summary

---

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `primary` | `#B22222` | `#E53935` | Nepal crimson (national flag) |
| `background` | `#FFFFFF` | `#0F1117` | Screen background |
| `surface` | `#F8F9FA` | `#1A1D26` | Cards and panels |
| `foreground` | `#111827` | `#F1F5F9` | Primary text |
| `muted` | `#6B7280` | `#94A3B8` | Secondary text |
| `border` | `#E5E7EB` | `#2D3748` | Dividers |
| `success` | `#16A34A` | `#22C55E` | Winner highlight |
| `warning` | `#D97706` | `#FBBF24` | Runner-up |
| `error` | `#DC2626` | `#F87171` | Losses / negative |
| `accent` | `#1E3A8A` | `#3B82F6` | Blue accent (secondary) |

---

## Screen List

### 1. Home / Dashboard (`/`)
**Content:**
- App header with Nepal flag icon and title "Nepal Election 2022"
- Summary cards: Total registered voters, Turnout %, Total valid votes
- Two section buttons: "Directly Elected (FPTP)" and "Proportional (PR)"
- Quick stats: Largest party (NC - 89 seats), Total parties with seats

**Layout:** Vertical scroll, hero stats row, two large navigation cards, recent highlights list

---

### 2. FPTP Results — Party Summary (`/fptp`)
**Content:**
- Tab bar: "By Party" | "By Province" | "By Constituency"
- Party list with: party color badge, party name, FPTP seats won, FPTP votes, vote percentage
- Sorted by seats won (descending)
- Search/filter bar

**Layout:** FlatList with party cards, each showing a horizontal bar chart indicator

---

### 3. FPTP Constituency Results (`/fptp/constituency`)
**Content:**
- Province filter chips (Province 1, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, Sudurpashchim)
- FlatList of constituencies with: constituency name, elected MP name, party, votes received, total votes cast, vote percentage
- Each item expandable to show top 3 candidates

**Layout:** Sticky province filter row, FlatList of constituency cards

---

### 4. PR Results — Party Summary (`/pr`)
**Content:**
- National PR totals: total valid PR votes (10,560,082), turnout
- Party list with: party color badge, party name, PR votes, PR percentage, PR seats allocated
- Threshold indicator (3% line shown on bar)
- Parties below threshold shown in muted style

**Layout:** Header with total votes, FlatList with horizontal progress bars per party

---

### 5. Party Detail (`/party/[id]`)
**Content:**
- Party name, logo color, leader name
- Combined results: FPTP seats + PR seats = Total seats
- FPTP votes + percentage
- PR votes + percentage
- Province-wise FPTP breakdown (mini table)
- Seat change from 2017

**Layout:** Hero card with totals, then tabbed detail sections

---

### 6. Province Results (`/province/[id]`)
**Content:**
- Province name and map region indicator
- FPTP seats by party (bar chart)
- PR vote share by party (pie/donut or bar)
- List of constituencies in province with elected MPs

**Layout:** Province header, stats cards, constituency list

---

## Key User Flows

### Flow 1: Check FPTP winner in a constituency
Home → "Directly Elected" → Constituency tab → Filter by province → Tap constituency → See winner + all candidates with votes

### Flow 2: Check PR party standings
Home → "Proportional (PR)" → See ranked list with vote % and seats → Tap party → See full party detail

### Flow 3: Compare party performance
Home → "Directly Elected" → By Party tab → See all parties ranked by FPTP seats → Tap party → Party detail with FPTP + PR combined

---

## Navigation Structure

```
Tab 1: Home (Dashboard)
Tab 2: FPTP Results
Tab 3: PR Results
Tab 4: Parties
```

---

## Typography
- Headings: Bold, 20–28pt
- Party names: Semibold, 16pt
- Vote counts: Monospace-style, 14pt
- Percentages: Bold colored, 14pt
- Labels: Regular, 12pt muted

---

## Component Library
- `PartyBadge`: Colored circle + party abbreviation
- `VoteBar`: Horizontal progress bar with percentage label
- `StatCard`: White card with icon, label, large number
- `ConstituencyCard`: Constituency name, winner name, party badge, vote count
- `PartyResultRow`: Full-width row with party info + FPTP + PR columns
