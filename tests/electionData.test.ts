import { describe, it, expect } from "vitest";
import {
  PARTIES,
  CONSTITUENCIES,
  PROVINCES,
  ELECTION_SUMMARY,
  getParty,
  formatVotes,
  formatPct,
} from "../constants/electionData";

describe("Election Data", () => {
  it("should have correct total seats (275)", () => {
    const totalFPTP = PARTIES.reduce((s, p) => s + p.fptp.seats, 0);
    const totalPR = PARTIES.reduce((s, p) => s + p.pr.seats, 0);
    expect(totalFPTP).toBe(ELECTION_SUMMARY.fptpSeats);
    expect(totalPR).toBe(ELECTION_SUMMARY.prSeats);
    expect(totalFPTP + totalPR).toBe(ELECTION_SUMMARY.totalSeats);
  });

  it("should have correct FPTP seat breakdown (165 seats)", () => {
    const total = PARTIES.reduce((s, p) => s + p.fptp.seats, 0);
    expect(total).toBe(165);
  });

  it("should have correct PR seat breakdown (110 seats)", () => {
    const total = PARTIES.reduce((s, p) => s + p.pr.seats, 0);
    expect(total).toBe(110);
  });

  it("should have NC as largest party with 89 total seats", () => {
    const nc = getParty("nc");
    expect(nc).toBeDefined();
    expect(nc?.totalSeats).toBe(89);
    expect(nc?.fptp.seats).toBe(57);
    expect(nc?.pr.seats).toBe(32);
  });

  it("should have UML as second party with 78 total seats", () => {
    const uml = getParty("uml");
    expect(uml).toBeDefined();
    expect(uml?.totalSeats).toBe(78);
    expect(uml?.fptp.seats).toBe(44);
    expect(uml?.pr.seats).toBe(34);
  });

  it("should have RSP as new party with 20 total seats", () => {
    const rsp = getParty("rsp");
    expect(rsp).toBeDefined();
    expect(rsp?.totalSeats).toBe(20);
    expect(rsp?.seatChange).toBeNull();
  });

  it("should have 7 qualified PR parties (>= 3% threshold)", () => {
    const qualified = PARTIES.filter(
      (p) => p.id !== "ind" && p.pr.percentage >= ELECTION_SUMMARY.prThreshold
    );
    expect(qualified.length).toBe(7);
  });

  it("should have correct PR vote totals for top parties", () => {
    const uml = getParty("uml");
    const nc = getParty("nc");
    expect(uml?.pr.votes).toBe(2845641);
    expect(nc?.pr.votes).toBe(2715225);
  });

  it("should have correct FPTP vote totals for top parties", () => {
    const uml = getParty("uml");
    const nc = getParty("nc");
    expect(uml?.fptp.votes).toBe(3233567);
    expect(nc?.fptp.votes).toBe(2431907);
  });

  it("should have 7 provinces", () => {
    expect(PROVINCES.length).toBe(7);
  });

  it("should have constituencies with valid vote data", () => {
    CONSTITUENCIES.forEach((c) => {
      expect(c.winnerVotes).toBeGreaterThan(0);
      expect(c.totalVotes).toBeGreaterThan(0);
      expect(c.winnerVotes).toBeLessThanOrEqual(c.totalVotes);
    });
  });

  it("formatVotes should format millions correctly", () => {
    expect(formatVotes(2845641)).toBe("2.85M");
    expect(formatVotes(1000)).toBe("1.0K");
    expect(formatVotes(500)).toBe("500");
  });

  it("formatPct should format percentages correctly", () => {
    expect(formatPct(26.95)).toBe("26.95%");
    expect(formatPct(3.0)).toBe("3.00%");
  });

  it("getParty should return undefined for unknown id", () => {
    expect(getParty("unknown")).toBeUndefined();
  });

  it("election summary should have correct registered voters", () => {
    expect(ELECTION_SUMMARY.registeredVoters).toBe(17988570);
    expect(ELECTION_SUMMARY.majorityNeeded).toBe(138);
    expect(ELECTION_SUMMARY.prThreshold).toBe(3.0);
  });
});
