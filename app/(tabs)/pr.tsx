import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { PartyBadge } from "@/components/PartyBadge";
import { VoteBar } from "@/components/VoteBar";
import { PARTIES, ELECTION_SUMMARY, formatVotes, formatPct } from "@/constants/electionData";
import { useColors } from "@/hooks/use-colors";

type FilterType = "all" | "qualified" | "below";

export default function PRScreen() {
  const colors = useColors();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");

  const sortedParties = [...PARTIES]
    .filter((p) => p.id !== "ind" && p.pr.votes > 0)
    .sort((a, b) => b.pr.votes - a.pr.votes);

  const filteredParties = sortedParties.filter((p) => {
    if (filter === "qualified") return p.pr.percentage >= ELECTION_SUMMARY.prThreshold;
    if (filter === "below") return p.pr.percentage < ELECTION_SUMMARY.prThreshold;
    return true;
  });

  const qualifiedParties = sortedParties.filter(
    (p) => p.pr.percentage >= ELECTION_SUMMARY.prThreshold
  );
  const totalPRSeats = qualifiedParties.reduce((s, p) => s + p.pr.seats, 0);

  const renderItem = ({ item: party, index }: { item: (typeof PARTIES)[0]; index: number }) => {
    const isQualified = party.pr.percentage >= ELECTION_SUMMARY.prThreshold;
    return (
      <Pressable
        style={({ pressed }) => [
          styles.partyCard,
          {
            backgroundColor: colors.surface,
            borderColor: isQualified ? party.color + "40" : colors.border,
            opacity: pressed ? 0.8 : 1,
          },
          !isQualified && styles.belowThresholdCard,
        ]}
        onPress={() => router.push({ pathname: "/party/[id]", params: { id: party.id } })}
      >
        {/* Rank + badge + name */}
        <View style={styles.cardHeader}>
          <Text style={[styles.rank, { color: colors.muted }]}>{index + 1}</Text>
          <PartyBadge color={party.color} shortName={party.shortName} size="md" />
          <View style={styles.nameBlock}>
            <Text style={[styles.partyName, { color: isQualified ? colors.foreground : colors.muted }]} numberOfLines={2}>
              {party.name}
            </Text>
            <Text style={[styles.partyLeader, { color: colors.muted }]}>{party.leader}</Text>
          </View>
          <View style={styles.seatsBlock}>
            {isQualified ? (
              <>
                <Text style={[styles.seatsBig, { color: party.color }]}>{party.pr.seats}</Text>
                <Text style={[styles.seatsLabel, { color: colors.muted }]}>PR seats</Text>
              </>
            ) : (
              <View style={[styles.belowBadge, { backgroundColor: "#FEF3C7" }]}>
                <Text style={styles.belowBadgeText}>Below 3%</Text>
              </View>
            )}
          </View>
        </View>

        {/* Vote bar */}
        <View style={styles.barRow}>
          <VoteBar
            percentage={party.pr.percentage}
            color={isQualified ? party.color : "#9CA3AF"}
            height={8}
            threshold={ELECTION_SUMMARY.prThreshold}
            showPercent={false}
          />
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>PR Votes</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {formatVotes(party.pr.votes)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Exact Votes</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {party.pr.votes.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>PR Share</Text>
            <Text style={[styles.statValue, { color: isQualified ? party.color : colors.muted }]}>
              {formatPct(party.pr.percentage)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#B22222" }]}>
        <Text style={styles.headerTitle}>Proportional Representation (PR)</Text>
        <Text style={styles.headerSubtitle}>
          110 seats · {ELECTION_SUMMARY.prTurnout}% turnout · 3% threshold
        </Text>
      </View>

      <FlatList
        data={filteredParties}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Summary Cards */}
            <View style={styles.summaryRow}>
              <View style={[styles.summaryCard, { backgroundColor: "#B22222" }]}>
                <Text style={styles.summaryValue}>
                  {ELECTION_SUMMARY.totalPrValidVotes.toLocaleString()}
                </Text>
                <Text style={styles.summaryLabel}>Total Valid PR Votes</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: "#1E3A8A" }]}>
                <Text style={styles.summaryValue}>{ELECTION_SUMMARY.prSeats}</Text>
                <Text style={styles.summaryLabel}>Total PR Seats</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryCard, { backgroundColor: "#16A34A" }]}>
                <Text style={styles.summaryValue}>{qualifiedParties.length}</Text>
                <Text style={styles.summaryLabel}>Parties Qualified</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: "#D97706" }]}>
                <Text style={styles.summaryValue}>{ELECTION_SUMMARY.prThreshold}%</Text>
                <Text style={styles.summaryLabel}>Threshold</Text>
              </View>
            </View>

            {/* Threshold note */}
            <View style={[styles.thresholdNote, { backgroundColor: "#FEF3C7", borderColor: "#FCD34D" }]}>
              <Text style={styles.thresholdNoteText}>
                ⚠️ Parties must receive at least{" "}
                <Text style={{ fontWeight: "700" }}>3%</Text> of total PR votes to be allocated seats.
                The dashed line on each bar marks the 3% threshold.
              </Text>
            </View>

            {/* Filter chips */}
            <View style={styles.filterRow}>
              {(["all", "qualified", "below"] as FilterType[]).map((f) => (
                <Pressable
                  key={f}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: filter === f ? "#B22222" : colors.surface,
                      borderColor: filter === f ? "#B22222" : colors.border,
                    },
                  ]}
                  onPress={() => setFilter(f)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      { color: filter === f ? "#FFFFFF" : colors.foreground },
                    ]}
                  >
                    {f === "all" ? "All Parties" : f === "qualified" ? "✓ Qualified" : "✗ Below 3%"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  listContent: {
    padding: 12,
    gap: 10,
    paddingBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    marginTop: 3,
    textAlign: "center",
  },
  thresholdNote: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  thresholdNoteText: {
    fontSize: 12,
    color: "#92400E",
    lineHeight: 18,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  // Party card
  partyCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  belowThresholdCard: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rank: {
    fontSize: 14,
    fontWeight: "700",
    width: 20,
    textAlign: "center",
  },
  nameBlock: {
    flex: 1,
  },
  partyName: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  partyLeader: {
    fontSize: 11,
    marginTop: 1,
  },
  seatsBlock: {
    alignItems: "flex-end",
    minWidth: 60,
  },
  seatsBig: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  seatsLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
  belowBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  belowBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#92400E",
  },
  barRow: {
    marginVertical: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
  },
});
