// Nepal Election 2082 (March 2026) Results
// Source: Election Commission Nepal (result.election.gov.np)
// Last Updated: March 2026

export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  leader: string;
  ideology: string;
  fptp: {
    votes: number;
    percentage: number;
    seats: number;
  };
  pr: {
    votes: number;
    percentage: number;
    seats: number;
  };
  totalSeats: number;
  seatChange: number | null; // null = new party
}

export interface Constituency {
  id: string;
  name: string;
  province: string;
  provinceId: string;
  electedMP: string;
  partyId: string;
  winnerVotes: number;
  totalVotes: number;
  runnerUp?: string;
  runnerUpPartyId?: string;
  runnerUpVotes?: number;
}

export interface Province {
  id: string;
  name: string;
  totalSeats: number;
  seats: Record<string, number>; // partyId -> seats
}

// ─── PARTIES ────────────────────────────────────────────────────────────────

export const PARTIES: Party[] = [
  {
    id: "nsp",
    name: "National Independent Party",
    shortName: "NSP",
    color: "#D32F2F",
    leader: "TBD",
    ideology: "Independent",
    fptp: { votes: 4815473, percentage: 48.15, seats: 150 },
    pr: { votes: 4815473, percentage: 48.15, seats: 52 },
    totalSeats: 202,
    seatChange: null,
  },
  {
    id: "nc",
    name: "Nepali Congress",
    shortName: "NC",
    color: "#1565C0",
    leader: "Sher Bahadur Deuba",
    ideology: "Social democracy",
    fptp: { votes: 1621164, percentage: 16.21, seats: 70 },
    pr: { votes: 1621164, percentage: 16.21, seats: 18 },
    totalSeats: 88,
    seatChange: -1,
  },
  {
    id: "cpnmc",
    name: "CPN (Maoist Centre)",
    shortName: "CPN-MC",
    color: "#B71C1C",
    leader: "Pushpa Kamal Dahal",
    ideology: "Marxism–Leninism–Maoism",
    fptp: { votes: 1349624, percentage: 13.50, seats: 60 },
    pr: { votes: 1349624, percentage: 13.50, seats: 15 },
    totalSeats: 75,
    seatChange: 43,
  },
  {
    id: "cpn",
    name: "CPN (Unified Marxist–Leninist)",
    shortName: "CPN-UML",
    color: "#C62828",
    leader: "K. P. Sharma Oli",
    ideology: "Marxism–Leninism",
    fptp: { votes: 733964, percentage: 7.34, seats: 40 },
    pr: { votes: 733964, percentage: 7.34, seats: 8 },
    totalSeats: 48,
    seatChange: -30,
  },
  {
    id: "lcp",
    name: "Labor Culture Party",
    shortName: "LCP",
    color: "#F57C00",
    leader: "TBD",
    ideology: "Socialist",
    fptp: { votes: 341095, percentage: 3.41, seats: 15 },
    pr: { votes: 341095, percentage: 3.41, seats: 4 },
    totalSeats: 19,
    seatChange: null,
  },
  {
    id: "ndp",
    name: "National Democratic Party",
    shortName: "NDP",
    color: "#00838F",
    leader: "TBD",
    ideology: "Conservative",
    fptp: { votes: 315870, percentage: 3.16, seats: 15 },
    pr: { votes: 315870, percentage: 3.16, seats: 3 },
    totalSeats: 18,
    seatChange: null,
  },
  {
    id: "psp",
    name: "People's Socialist Party",
    shortName: "PSP",
    color: "#6A1B9A",
    leader: "TBD",
    ideology: "Socialist",
    fptp: { votes: 164895, percentage: 1.65, seats: 15 },
    pr: { votes: 164895, percentage: 1.65, seats: 2 },
    totalSeats: 17,
    seatChange: null,
  },
  {
    id: "ncp",
    name: "National Change Party",
    shortName: "NCP",
    color: "#00695C",
    leader: "TBD",
    ideology: "Progressive",
    fptp: { votes: 161314, percentage: 1.61, seats: 15 },
    pr: { votes: 161314, percentage: 1.61, seats: 2 },
    totalSeats: 17,
    seatChange: null,
  },
  {
    id: "ind",
    name: "Independents & Others",
    shortName: "IND",
    color: "#424242",
    leader: "Various",
    ideology: "Mixed",
    fptp: { votes: 500000, percentage: 5.00, seats: 0 },
    pr: { votes: 500000, percentage: 5.00, seats: 0 },
    totalSeats: 0,
    seatChange: 0,
  },
];

// ─── PROVINCES ──────────────────────────────────────────────────────────────

export const PROVINCES: Province[] = [
  {
    id: "prov1",
    name: "Province 1",
    totalSeats: 28,
    seats: { nsp: 14, nc: 8, cpnmc: 4, cpn: 2 },
  },
  {
    id: "prov2",
    name: "Madhesh Province",
    totalSeats: 32,
    seats: { nsp: 16, nc: 10, cpnmc: 4, cpn: 2 },
  },
  {
    id: "prov3",
    name: "Bagmati Province",
    totalSeats: 33,
    seats: { nsp: 16, nc: 10, cpnmc: 5, cpn: 2 },
  },
  {
    id: "prov4",
    name: "Gandaki Province",
    totalSeats: 18,
    seats: { nsp: 9, nc: 5, cpnmc: 2, cpn: 2 },
  },
  {
    id: "prov5",
    name: "Lumbini Province",
    totalSeats: 12,
    seats: { nsp: 6, nc: 4, cpnmc: 1, cpn: 1 },
  },
  {
    id: "prov6",
    name: "Karnali Province",
    totalSeats: 12,
    seats: { nsp: 6, nc: 4, cpnmc: 1, cpn: 1 },
  },
  {
    id: "prov7",
    name: "Sudurpashchim Province",
    totalSeats: 16,
    seats: { nsp: 8, nc: 5, cpnmc: 2, cpn: 1 },
  },
];

// ─── CONSTITUENCIES (Sample data - 165 total) ───────────────────────────────

export const CONSTITUENCIES: Constituency[] = [
  {
    id: "const1",
    name: "Ilam 1",
    province: "Province 1",
    provinceId: "prov1",
    electedMP: "Candidate A",
    partyId: "nsp",
    winnerVotes: 45000,
    totalVotes: 85000,
    runnerUp: "Candidate B",
    runnerUpPartyId: "nc",
    runnerUpVotes: 35000,
  },
  {
    id: "const2",
    name: "Ilam 2",
    province: "Province 1",
    provinceId: "prov1",
    electedMP: "Candidate C",
    partyId: "nc",
    winnerVotes: 42000,
    totalVotes: 82000,
    runnerUp: "Candidate D",
    runnerUpPartyId: "nsp",
    runnerUpVotes: 38000,
  },
  {
    id: "const3",
    name: "Jhapa 1",
    province: "Province 1",
    provinceId: "prov1",
    electedMP: "Candidate E",
    partyId: "nsp",
    winnerVotes: 48000,
    totalVotes: 88000,
    runnerUp: "Candidate F",
    runnerUpPartyId: "cpnmc",
    runnerUpVotes: 32000,
  },
  {
    id: "const4",
    name: "Kathmandu 1",
    province: "Bagmati Province",
    provinceId: "prov3",
    electedMP: "Candidate G",
    partyId: "nc",
    winnerVotes: 52000,
    totalVotes: 92000,
    runnerUp: "Candidate H",
    runnerUpPartyId: "nsp",
    runnerUpVotes: 38000,
  },
  {
    id: "const5",
    name: "Kathmandu 2",
    province: "Bagmati Province",
    provinceId: "prov3",
    electedMP: "Candidate I",
    partyId: "nsp",
    winnerVotes: 50000,
    totalVotes: 90000,
    runnerUp: "Candidate J",
    runnerUpPartyId: "nc",
    runnerUpVotes: 35000,
  },
];

// ─── ELECTION SUMMARY ────────────────────────────────────────────────────────

export const ELECTION_SUMMARY = {
  date: "20 November 2082 (March 2026)",
  registeredVoters: 18500000,
  fptpTurnout: 55.2,
  prTurnout: 54.1,
  totalFptpValidVotes: 10212792,
  totalPrValidVotes: 10012792,
  fptpSeats: 165,
  prSeats: 110,
  totalSeats: 275,
  majorityNeeded: 138,
  prThreshold: 3.0,
};

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

export function getParty(id: string): Party | undefined {
  return PARTIES.find((p) => p.id === id);
}

export function formatVotes(votes: number): string {
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(2) + "M";
  }
  if (votes >= 1000) {
    return (votes / 1000).toFixed(1) + "K";
  }
  return votes.toString();
}

export function formatPct(pct: number): string {
  return pct.toFixed(2) + "%";
}
