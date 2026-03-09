import React from "react";
import { ScrollView, Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { StatCard } from "@/components/StatCard";
import { PartyBadge } from "@/components/PartyBadge";
import { ELECTION_SUMMARY, PARTIES, formatVotes } from "@/constants/electionData";
import { useColors } from "@/hooks/use-colors";
import { useElectionDataSync } from "@/hooks/useElectionDataSync";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { lastSyncTime } = useElectionDataSync();

  const formatSyncTime = (date: Date | null) => {
    if (!date) return "Syncing...";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const topParties = [...PARTIES]
    .filter((p) => p.id !== "ind")
    .sort((a, b) => b.totalSeats - a.totalSeats)
    .slice(0, 5);

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#B22222" }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerFlag}>🇳🇵</Text>
            <View>
              <Text style={styles.headerTitle}>Nepal Votes</Text>
              <Text style={styles.headerSubtitle}>2082 General Election Results</Text>
              <Text style={styles.headerUpdate}>Updated: {formatSyncTime(lastSyncTime)}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Election Date Banner */}
        <View style={[styles.dateBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.dateBannerText, { color: colors.muted }]}>
            📅 Election held on{" "}
            <Text style={{ fontWeight: "700", color: colors.foreground }}>
              {ELECTION_SUMMARY.date}
            </Text>
          </Text>
        </View>

        {/* Auto-Sync Status */}
        <View style={[styles.syncBanner, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "40" }]}>
          <Text style={[styles.syncText, { color: colors.primary }]}>🔄 Auto-syncing every hour from Election Commission</Text>
        </View>

        {/* Summary Stats */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Election Overview</Text>
        <View style={styles.statsRow}>
          <StatCard
            label="Registered Voters"
            value={formatVotes(ELECTION_SUMMARY.registeredVoters)}
            subValue="Total eligible"
            accentColor="#1E3A8A"
          />
          <StatCard
            label="FPTP Turnout"
            value={`${ELECTION_SUMMARY.fptpTurnout}%`}
            subValue="Constituency vote"
            accentColor="#B22222"
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard
            label="Total FPTP Votes"
            value={formatVotes(ELECTION_SUMMARY.totalFptpValidVotes)}
            subValue="Valid votes cast"
            accentColor="#16A34A"
          />
          <StatCard
            label="Total PR Votes"
            value={formatVotes(ELECTION_SUMMARY.totalPrValidVotes)}
            subValue="Proportional votes"
            accentColor="#D97706"
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard
            label="Total Seats"
            value={String(ELECTION_SUMMARY.totalSeats)}
            subValue={`${ELECTION_SUMMARY.fptpSeats} FPTP + ${ELECTION_SUMMARY.prSeats} PR`}
            accentColor="#6A1B9A"
          />
          <StatCard
            label="Majority Needed"
            value={String(ELECTION_SUMMARY.majorityNeeded)}
            subValue="Out of 275 seats"
            accentColor="#37474F"
          />
        </View>

        {/* Navigation Cards */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Browse Results</Text>
        <Pressable
          style={({ pressed }) => [
            styles.navCard,
            { backgroundColor: "#1E3A8A", opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push("/fptp")}
        >
          <View style={styles.navCardContent}>
            <Text style={styles.navCardIcon}>🗳️</Text>
            <View style={styles.navCardText}>
              <Text style={styles.navCardTitle}>Directly Elected (FPTP)</Text>
              <Text style={styles.navCardDesc}>
                165 constituency seats · Candidate votes · Total votes per constituency
              </Text>
            </View>
            <Text style={styles.navCardArrow}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.navCard,
            { backgroundColor: "#B22222", opacity: pressed ? 0.85 : 1, marginTop: 10 },
          ]}
          onPress={() => router.push("/pr")}
        >
          <View style={styles.navCardContent}>
            <Text style={styles.navCardIcon}>📊</Text>
            <View style={styles.navCardText}>
              <Text style={styles.navCardTitle}>Proportional Representation (PR)</Text>
              <Text style={styles.navCardDesc}>
                110 PR seats · Party vote counts · Percentages · 3% threshold
              </Text>
            </View>
            <Text style={styles.navCardArrow}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.navCard,
            { backgroundColor: "#16A34A", opacity: pressed ? 0.85 : 1, marginTop: 10 },
          ]}
          onPress={() => router.push("/parties")}
        >
          <View style={styles.navCardContent}>
            <Text style={styles.navCardIcon}>🏛️</Text>
            <View style={styles.navCardText}>
              <Text style={styles.navCardTitle}>All Parties</Text>
              <Text style={styles.navCardDesc}>
                Combined FPTP + PR results · Seat totals · Vote shares
              </Text>
            </View>
            <Text style={styles.navCardArrow}>›</Text>
          </View>
        </Pressable>

        {/* Top Parties Quick View */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Top Parties by Seats (2082)</Text>
        <View style={[styles.topPartiesCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {topParties.map((party, idx) => (
            <Pressable
              key={party.id}
              style={({ pressed }) => [
                styles.partyRow,
                idx < topParties.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => router.push({ pathname: "/party/[id]", params: { id: party.id } })}
            >
              <Text style={[styles.partyRank, { color: colors.muted }]}>{idx + 1}</Text>
              <PartyBadge color={party.color} shortName={party.shortName} size="sm" />
              <View style={styles.partyInfo}>
                <Text style={[styles.partyName, { color: colors.foreground }]} numberOfLines={1}>
                  {party.shortName}
                </Text>
                <Text style={[styles.partyLeader, { color: colors.muted }]} numberOfLines={1}>
                  {party.leader}
                </Text>
              </View>
              <View style={styles.partySeats}>
                <Text style={[styles.seatCount, { color: party.color }]}>{party.totalSeats}</Text>
                <Text style={[styles.seatLabel, { color: colors.muted }]}>seats</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* System Info */}
        <View style={[styles.infoBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.foreground }]}>Electoral System</Text>
          <Text style={[styles.infoText, { color: colors.muted }]}>
            Nepal uses a mixed electoral system. <Text style={{ fontWeight: "600", color: colors.foreground }}>165 seats</Text> are elected via First-Past-The-Post (FPTP) from single-member constituencies. The remaining <Text style={{ fontWeight: "600", color: colors.foreground }}>110 seats</Text> are allocated through closed-list Proportional Representation (PR) using the Sainte-Laguë method. Parties must cross a <Text style={{ fontWeight: "600", color: "#D97706" }}>3% threshold</Text> to receive PR seats. This app automatically syncs the latest results every hour.
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerFlag: {
    fontSize: 32,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  headerUpdate: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "400",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
  },
  dateBanner: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  dateBannerText: {
    fontSize: 13,
    textAlign: "center",
  },
  syncBanner: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  syncText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 4,
    letterSpacing: -0.3,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  navCard: {
    borderRadius: 14,
    padding: 16,
  },
  navCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navCardIcon: {
    fontSize: 28,
  },
  navCardText: {
    flex: 1,
  },
  navCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 3,
  },
  navCardDesc: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 17,
  },
  navCardArrow: {
    fontSize: 24,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "300",
  },
  topPartiesCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  partyRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  partyRank: {
    fontSize: 13,
    fontWeight: "700",
    width: 18,
    textAlign: "center",
  },
  partyInfo: {
    flex: 1,
  },
  partyName: {
    fontSize: 14,
    fontWeight: "600",
  },
  partyLeader: {
    fontSize: 11,
    marginTop: 1,
  },
  partySeats: {
    alignItems: "flex-end",
  },
  seatCount: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  seatLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
  infoBox: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
