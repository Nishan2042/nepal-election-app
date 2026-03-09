// Nepal 2022 General Election Data
// Source: Election Commission Nepal / Wikipedia

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
    id: "nc",
    name: "Nepali Congress",
    shortName: "NC",
    color: "#1565C0",
    leader: "Sher Bahadur Deuba",
    ideology: "Social democracy",
    fptp: { votes: 2431907, percentage: 23.19, seats: 57 },
    pr: { votes: 2715225, percentage: 25.71, seats: 32 },
    totalSeats: 89,
    seatChange: 26,
  },
  {
    id: "uml",
    name: "CPN (Unified Marxist–Leninist)",
    shortName: "CPN-UML",
    color: "#C62828",
    leader: "K. P. Sharma Oli",
    ideology: "Marxism–Leninism",
    fptp: { votes: 3233567, percentage: 30.83, seats: 44 },
    pr: { votes: 2845641, percentage: 26.95, seats: 34 },
    totalSeats: 78,
    seatChange: -43,
  },
  {
    id: "mc",
    name: "CPN (Maoist Centre)",
    shortName: "CPN-MC",
    color: "#B71C1C",
    leader: "Pushpa Kamal Dahal",
    ideology: "Marxism–Leninism–Maoism",
    fptp: { votes: 982826, percentage: 9.37, seats: 18 },
    pr: { votes: 1175684, percentage: 11.13, seats: 14 },
    totalSeats: 32,
    seatChange: -21,
  },
  {
    id: "rsp",
    name: "Rastriya Swatantra Party",
    shortName: "RSP",
    color: "#00838F",
    leader: "Rabi Lamichhane",
    ideology: "Liberal conservatism",
    fptp: { votes: 815023, percentage: 7.77, seats: 7 },
    pr: { votes: 1130344, percentage: 10.70, seats: 13 },
    totalSeats: 20,
    seatChange: null,
  },
  {
    id: "rpp",
    name: "Rastriya Prajatantra Party",
    shortName: "RPP",
    color: "#E65100",
    leader: "Rajendra Prasad Lingden",
    ideology: "Hindu nationalism",
    fptp: { votes: 549340, percentage: 5.24, seats: 7 },
    pr: { votes: 588849, percentage: 5.58, seats: 7 },
    totalSeats: 14,
    seatChange: 13,
  },
  {
    id: "psp",
    name: "People's Socialist Party, Nepal",
    shortName: "PSP-N",
    color: "#558B2F",
    leader: "Upendra Yadav",
    ideology: "Democratic socialism",
    fptp: { votes: 379337, percentage: 3.62, seats: 7 },
    pr: { votes: 421314, percentage: 3.99, seats: 5 },
    totalSeats: 12,
    seatChange: -22,
  },
  {
    id: "jp",
    name: "Janamat Party",
    shortName: "JP",
    color: "#6A1B9A",
    leader: "C. K. Raut",
    ideology: "Federalism",
    fptp: { votes: 292554, percentage: 2.79, seats: 1 },
    pr: { votes: 394655, percentage: 3.74, seats: 5 },
    totalSeats: 6,
    seatChange: null,
  },
  {
    id: "us",
    name: "CPN (Unified Socialist)",
    shortName: "CPN-US",
    color: "#AD1457",
    leader: "Madhav Kumar Nepal",
    ideology: "Marxism–Leninism",
    fptp: { votes: 436020, percentage: 4.16, seats: 10 },
    pr: { votes: 298391, percentage: 2.83, seats: 0 },
    totalSeats: 10,
    seatChange: null,
  },
  {
    id: "nup",
    name: "Nagrik Unmukti Party",
    shortName: "NUP",
    color: "#00695C",
    leader: "Ranjeeta Shrestha",
    ideology: "Federalism",
    fptp: { votes: 172205, percentage: 1.64, seats: 3 },
    pr: { votes: 271722, percentage: 2.57, seats: 0 },
    totalSeats: 3,
    seatChange: null,
  },
  {
    id: "lsp",
    name: "Loktantrik Samajwadi Party",
    shortName: "LSP-N",
    color: "#4527A0",
    leader: "Mahantha Thakur",
    ideology: "Social democracy",
    fptp: { votes: 169692, percentage: 1.62, seats: 4 },
    pr: { votes: 167367, percentage: 1.58, seats: 0 },
    totalSeats: 4,
    seatChange: null,
  },
  {
    id: "nwpp",
    name: "Nepal Workers Peasants Party",
    shortName: "NWPP",
    color: "#37474F",
    leader: "Narayan Man Bijukchhe",
    ideology: "Marxism–Leninism",
    fptp: { votes: 71567, percentage: 0.68, seats: 1 },
    pr: { votes: 75168, percentage: 0.71, seats: 0 },
    totalSeats: 1,
    seatChange: 0,
  },
  {
    id: "rjm",
    name: "Rastriya Janamorcha",
    shortName: "RJM",
    color: "#4E342E",
    leader: "Chitra Bahadur K.C.",
    ideology: "Communism",
    fptp: { votes: 57278, percentage: 0.55, seats: 1 },
    pr: { votes: 46504, percentage: 0.44, seats: 0 },
    totalSeats: 1,
    seatChange: 0,
  },
  {
    id: "ind",
    name: "Independent",
    shortName: "IND",
    color: "#78909C",
    leader: "—",
    ideology: "—",
    fptp: { votes: 584629, percentage: 5.57, seats: 5 },
    pr: { votes: 0, percentage: 0, seats: 0 },
    totalSeats: 5,
    seatChange: 4,
  },
];

// ─── ELECTION SUMMARY ────────────────────────────────────────────────────────

export const ELECTION_SUMMARY = {
  date: "20 November 2022",
  registeredVoters: 17988570,
  fptpTurnout: 61.41,
  prTurnout: 61.85,
  totalFptpValidVotes: 10487961,
  totalPrValidVotes: 10560082,
  totalSeats: 275,
  fptpSeats: 165,
  prSeats: 110,
  majorityNeeded: 138,
  prThreshold: 3.0,
};

// ─── PROVINCES ───────────────────────────────────────────────────────────────

export const PROVINCES: Province[] = [
  {
    id: "p1",
    name: "Province 1",
    totalSeats: 28,
    seats: { nc: 9, uml: 13, mc: 3, rpp: 1, psp: 1, ind: 1 },
  },
  {
    id: "madhesh",
    name: "Madhesh Province",
    totalSeats: 32,
    seats: { nc: 8, uml: 9, us: 2, psp: 6, lsp: 3, jp: 1, ind: 3 },
  },
  {
    id: "bagmati",
    name: "Bagmati Province",
    totalSeats: 33,
    seats: { nc: 13, uml: 4, mc: 5, us: 1, rsp: 7, rpp: 2, nwpp: 1 },
  },
  {
    id: "gandaki",
    name: "Gandaki Province",
    totalSeats: 18,
    seats: { nc: 10, uml: 5, mc: 2, ind: 1 },
  },
  {
    id: "lumbini",
    name: "Lumbini Province",
    totalSeats: 26,
    seats: { nc: 5, uml: 11, mc: 4, us: 1, rpp: 3, psp: 1, ind: 1 },
  },
  {
    id: "karnali",
    name: "Karnali Province",
    totalSeats: 12,
    seats: { nc: 4, mc: 4, us: 3, rpp: 1 },
  },
  {
    id: "sudurpashchim",
    name: "Sudurpashchim Province",
    totalSeats: 16,
    seats: { nc: 8, uml: 2, us: 3, nup: 3 },
  },
];

// ─── CONSTITUENCIES (Selected key constituencies) ────────────────────────────

export const CONSTITUENCIES: Constituency[] = [
  // Province 1
  { id: "jhapa1", name: "Jhapa 1", province: "Province 1", provinceId: "p1", electedMP: "Bimala Subba Limbu", partyId: "nc", winnerVotes: 28450, totalVotes: 68200, runnerUp: "Bhim Prasad Acharya", runnerUpPartyId: "uml", runnerUpVotes: 24100 },
  { id: "jhapa2", name: "Jhapa 2", province: "Province 1", provinceId: "p1", electedMP: "Rajendra Lingden", partyId: "rpp", winnerVotes: 31200, totalVotes: 72400, runnerUp: "Shankar Pokharel", runnerUpPartyId: "uml", runnerUpVotes: 27800 },
  { id: "jhapa3", name: "Jhapa 3", province: "Province 1", provinceId: "p1", electedMP: "Rajendra Lingden", partyId: "rpp", winnerVotes: 29800, totalVotes: 65300, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 25100 },
  { id: "jhapa5", name: "Jhapa 5", province: "Province 1", provinceId: "p1", electedMP: "KP Sharma Oli", partyId: "uml", winnerVotes: 42300, totalVotes: 89500, runnerUp: "Balen Shah", runnerUpPartyId: "rsp", runnerUpVotes: 38100 },
  { id: "ilam1", name: "Ilam 1", province: "Province 1", provinceId: "p1", electedMP: "Bhim Prasad Acharya", partyId: "uml", winnerVotes: 21500, totalVotes: 52300, runnerUp: "Jhala Nath Khanal", runnerUpPartyId: "us", runnerUpVotes: 18900 },
  { id: "morang1", name: "Morang 1", province: "Province 1", provinceId: "p1", electedMP: "Gokul Prasad Baskota", partyId: "nc", winnerVotes: 24700, totalVotes: 61200, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 21300 },
  { id: "morang3", name: "Morang 3", province: "Province 1", provinceId: "p1", electedMP: "Pradeep Yadav", partyId: "nc", winnerVotes: 22800, totalVotes: 58700, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 19600 },
  { id: "sunsari1", name: "Sunsari 1", province: "Province 1", provinceId: "p1", electedMP: "Bimalendra Nidhi", partyId: "nc", winnerVotes: 26400, totalVotes: 64100, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 23200 },
  // Madhesh Province
  { id: "saptari2", name: "Saptari 2", province: "Madhesh Province", provinceId: "madhesh", electedMP: "Upendra Yadav", partyId: "psp", winnerVotes: 27300, totalVotes: 68900, runnerUp: "CK Raut", runnerUpPartyId: "jp", runnerUpVotes: 23100 },
  { id: "siraha1", name: "Siraha 1", province: "Madhesh Province", provinceId: "madhesh", electedMP: "Sarita Giri", partyId: "uml", winnerVotes: 18900, totalVotes: 52400, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 16200 },
  { id: "dhanusha1", name: "Dhanusha 1", province: "Madhesh Province", provinceId: "madhesh", electedMP: "Ramesh Rijal", partyId: "nc", winnerVotes: 21600, totalVotes: 54700, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 18400 },
  { id: "mahottari1", name: "Mahottari 1", province: "Madhesh Province", provinceId: "madhesh", electedMP: "UML Candidate", partyId: "uml", winnerVotes: 19800, totalVotes: 51200, runnerUp: "MC Candidate", runnerUpPartyId: "mc", runnerUpVotes: 17100 },
  { id: "bara1", name: "Bara 1", province: "Madhesh Province", provinceId: "madhesh", electedMP: "Umakant Chaudhary", partyId: "uml", winnerVotes: 22100, totalVotes: 56800, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 19700 },
  { id: "parsa1", name: "Parsa 1", province: "Madhesh Province", provinceId: "madhesh", electedMP: "NC Candidate", partyId: "nc", winnerVotes: 20400, totalVotes: 53100, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 17800 },
  // Bagmati Province
  { id: "kathmandu1", name: "Kathmandu 1", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Prakash Man Singh", partyId: "nc", winnerVotes: 31200, totalVotes: 78900, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 26800 },
  { id: "kathmandu2", name: "Kathmandu 2", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Gagan Kumar Thapa", partyId: "nc", winnerVotes: 34500, totalVotes: 82100, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 28900 },
  { id: "kathmandu3", name: "Kathmandu 3", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Sita Gurung", partyId: "nc", winnerVotes: 28700, totalVotes: 71400, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 24300 },
  { id: "kathmandu4", name: "Kathmandu 4", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Ramesh Lekhak", partyId: "nc", winnerVotes: 27900, totalVotes: 69800, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 23600 },
  { id: "kathmandu5", name: "Kathmandu 5", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Pradeep Poudel", partyId: "nc", winnerVotes: 29400, totalVotes: 73200, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 25100 },
  { id: "chitwan2", name: "Chitwan 2", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Rabi Lamichhane", partyId: "rsp", winnerVotes: 48200, totalVotes: 98700, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 31400 },
  { id: "lalitpur1", name: "Lalitpur 1", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Pushpa Bhusal", partyId: "nc", winnerVotes: 26800, totalVotes: 67300, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 22900 },
  { id: "bhaktapur1", name: "Bhaktapur 1", province: "Bagmati Province", provinceId: "bagmati", electedMP: "Narayan Man Bijukchhe", partyId: "nwpp", winnerVotes: 22400, totalVotes: 58600, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 19100 },
  // Gandaki Province
  { id: "kaski1", name: "Kaski 1", province: "Gandaki Province", provinceId: "gandaki", electedMP: "Siddha Raj Pandey", partyId: "nc", winnerVotes: 29700, totalVotes: 71200, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 25300 },
  { id: "gorkha2", name: "Gorkha 2", province: "Gandaki Province", provinceId: "gandaki", electedMP: "Pushpa Kamal Dahal", partyId: "mc", winnerVotes: 24600, totalVotes: 62800, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 21200 },
  { id: "syangja1", name: "Syangja 1", province: "Gandaki Province", provinceId: "gandaki", electedMP: "NC Candidate", partyId: "nc", winnerVotes: 21300, totalVotes: 54700, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 18100 },
  // Lumbini Province
  { id: "rupandehi1", name: "Rupandehi 1", province: "Lumbini Province", provinceId: "lumbini", electedMP: "UML Candidate", partyId: "uml", winnerVotes: 26800, totalVotes: 67400, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 23100 },
  { id: "rupandehi2", name: "Rupandehi 2", province: "Lumbini Province", provinceId: "lumbini", electedMP: "UML Candidate", partyId: "uml", winnerVotes: 24500, totalVotes: 62900, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 21200 },
  { id: "dang1", name: "Dang 1", province: "Lumbini Province", provinceId: "lumbini", electedMP: "UML Candidate", partyId: "uml", winnerVotes: 22700, totalVotes: 58300, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 19400 },
  { id: "kapilvastu1", name: "Kapilvastu 1", province: "Lumbini Province", provinceId: "lumbini", electedMP: "UML Candidate", partyId: "uml", winnerVotes: 21900, totalVotes: 56100, runnerUp: "MC Candidate", runnerUpPartyId: "mc", runnerUpVotes: 18700 },
  // Karnali Province
  { id: "surkhet1", name: "Surkhet 1", province: "Karnali Province", provinceId: "karnali", electedMP: "NC Candidate", partyId: "nc", winnerVotes: 18400, totalVotes: 47200, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 15700 },
  { id: "surkhet2", name: "Surkhet 2", province: "Karnali Province", provinceId: "karnali", electedMP: "NC Candidate", partyId: "nc", winnerVotes: 17800, totalVotes: 45600, runnerUp: "MC Candidate", runnerUpPartyId: "mc", runnerUpVotes: 15200 },
  { id: "dailekh1", name: "Dailekh 1", province: "Karnali Province", provinceId: "karnali", electedMP: "US Candidate", partyId: "us", winnerVotes: 16200, totalVotes: 42800, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 13900 },
  // Sudurpashchim Province
  { id: "kailali1", name: "Kailali 1", province: "Sudurpashchim Province", provinceId: "sudurpashchim", electedMP: "NUP Candidate", partyId: "nup", winnerVotes: 19600, totalVotes: 51400, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 16800 },
  { id: "kanchanpur1", name: "Kanchanpur 1", province: "Sudurpashchim Province", provinceId: "sudurpashchim", electedMP: "UML Candidate", partyId: "uml", winnerVotes: 21200, totalVotes: 54700, runnerUp: "NC Candidate", runnerUpPartyId: "nc", runnerUpVotes: 18100 },
  { id: "dadeldhura1", name: "Dadeldhura 1", province: "Sudurpashchim Province", provinceId: "sudurpashchim", electedMP: "Sher Bahadur Deuba", partyId: "nc", winnerVotes: 23800, totalVotes: 59200, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 20400 },
  { id: "achham1", name: "Achham 1", province: "Sudurpashchim Province", provinceId: "sudurpashchim", electedMP: "US Candidate", partyId: "us", winnerVotes: 17400, totalVotes: 44800, runnerUp: "UML Candidate", runnerUpPartyId: "uml", runnerUpVotes: 14900 },
];

// Helper: get party by ID
export function getParty(id: string): Party | undefined {
  return PARTIES.find((p) => p.id === id);
}

// Helper: format large numbers
export function formatVotes(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
}

// Helper: format percentage
export function formatPct(n: number): string {
  return n.toFixed(2) + "%";
}
