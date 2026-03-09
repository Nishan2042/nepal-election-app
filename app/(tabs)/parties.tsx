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

type SortType = "total" | "fptp" | "pr";

export default function PartiesScreen() {
  const colors = useColors();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortType>("total");

  const sortedParties = [...PARTIES]
    .filter((p) => p.id !== "ind")
    .sort((a, b) => {
      if (sortBy === "total") return b.totalSeats - a.totalSeats;
      if (sortBy === "fptp") return b.fptp.seats - a.fptp.seats;
      return b.pr.seats - a.pr.seats;
    });

  const renderItem = ({ item: party, index }: { item: (typeof PARTIES)[0]; index: number }) => {
    const seatChange = party.seatChange;
    const seatChangeStr =
      seatChange === null
        ? "New"
        : seatChange > 0
        ? `+${seatChange}`
        : String(seatChange);
    const seatChangeColor =
      seatChange === null
        ? "#1E3A8A"
        : seatChange > 0
        ? "#16A34A"
        : seatChange < 0
        ? "#DC2626"
        : "#6B7280";

    return (
      <Pressable
        style={({ pressed }) => [
          styles.partyCard,
          { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => router.push({ pathname: "/party/[id]", params: { id: party.id } })}
      >
        {/* Header row */}
        <View style={styles.cardHeader}>
          <Text style={[styles.rank, { color: colors.muted }]}>{index + 1}</Text>
          <PartyBadge color={party.color} shortName={party.shortName} size="md" />
          <View style={styles.nameBlock}>
            <Text style={[styles.partyName, { color: colors.foreground }]} numberOfLines={2}>
              {party.name}
            </Text>
            <Text style={[styles.partyLeader, { color: colors.muted }]}>{party.leader}</Text>
          </View>
          <View style={styles.seatsBlock}>
            <Text style={[styles.totalSeats, { color: party.color }]}>{party.totalSeats}</Text>
            <Text style={[styles.seatsLabel, { color: colors.muted }]}>total</Text>
            <View style={[styles.changeChip, { backgroundColor: seatChangeColor + "20" }]}>
              <Text style={[styles.changeText, { color: seatChangeColor }]}>{seatChangeStr}</Text>
            </View>
          </View>
        </View>

        {/* FPTP + PR breakdown */}
        <View style={[styles.breakdownRow, { borderColor: colors.border }]}>
          <View style={styles.breakdownItem}>
            <Text style={[styles.breakdownLabel, { color: colors.muted }]}>FPTP Seats</Text>
            <Text style={[styles.breakdownSeats, { color: "#1E3A8A" }]}>{party.fptp.seats}</Text>
            <Text style={[styles.breakdownVotes, { color: colors.muted }]}>
              {formatVotes(party.fptp.votes)} · {formatPct(party.fptp.percentage)}
            </Text>
          </View>
          <View style={[styles.breakdownDivider, { backgroundColor: colors.border }]} />
          <View style={styles.breakdownItem}>
            <Text style={[styles.breakdownLabel, { color: colors.muted }]}>PR Seats</Text>
            <Text style={[styles.breakdownSeats, { color: "#B22222" }]}>{party.pr.seats}</Text>
            <Text style={[styles.breakdownVotes, { color: colors.muted }]}>
              {formatVotes(party.pr.votes)} · {formatPct(party.pr.percentage)}
            </Text>
          </View>
        </View>

        {/* Seat composition bar */}
        <View style={styles.compositionBar}>
          <View
            style={[
              styles.fptpBar,
              {
                flex: party.fptp.seats,
                backgroundColor: "#1E3A8A",
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                borderTopRightRadius: party.pr.seats === 0 ? 4 : 0,
                borderBottomRightRadius: party.pr.seats === 0 ? 4 : 0,
              },
            ]}
          />
          {party.pr.seats > 0 && (
            <View
              style={[
                styles.prBar,
                {
                  flex: party.pr.seats,
                  backgroundColor: "#B22222",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            />
          )}
        </View>
        <View style={styles.barLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#1E3A8A" }]} />
            <Text style={[styles.legendText, { color: colors.muted }]}>FPTP</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#B22222" }]} />
            <Text style={[styles.legendText, { color: colors.muted }]}>PR</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#16A34A" }]}>
        <Text style={styles.headerTitle}>All Parties</Text>
        <Text style={styles.headerSubtitle}>
          Combined FPTP + PR results · 2022 General Election
        </Text>
      </View>

      <FlatList
        data={sortedParties}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Sort chips */}
            <View style={styles.sortRow}>
              <Text style={[styles.sortLabel, { color: colors.muted }]}>Sort by:</Text>
              {(["total", "fptp", "pr"] as SortType[]).map((s) => (
                <Pressable
                  key={s}
                  style={[
                    styles.sortChip,
                    {
                      backgroundColor: sortBy === s ? "#16A34A" : colors.surface,
                      borderColor: sortBy === s ? "#16A34A" : colors.border,
                    },
                  ]}
                  onPress={() => setSortBy(s)}
                >
                  <Text
                    style={[
                      styles.sortChipText,
                      { color: sortBy === s ? "#FFFFFF" : colors.foreground },
                    ]}
                  >
                    {s === "total" ? "Total Seats" : s === "fptp" ? "FPTP Seats" : "PR Seats"}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Legend */}
            <View style={[styles.legendBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.legendBoxTitle, { color: colors.foreground }]}>
                Seat Composition Legend
              </Text>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#1E3A8A", width: 16, height: 16, borderRadius: 3 }]} />
                  <Text style={[styles.legendText, { color: colors.muted }]}>
                    FPTP — Directly elected from 165 constituencies
                  </Text>
                </View>
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#B22222", width: 16, height: 16, borderRadius: 3 }]} />
                  <Text style={[styles.legendText, { color: colors.muted }]}>
                    PR — Proportional representation (110 seats, 3% threshold)
                  </Text>
                </View>
              </View>
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
    fontSize: 18,
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
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  legendBox: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginBottom: 4,
    gap: 6,
  },
  legendBoxTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  legendRow: {
    flexDirection: "row",
  },
  // Party card
  partyCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 10,
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
    gap: 2,
  },
  totalSeats: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  seatsLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
  changeChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  breakdownRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  breakdownItem: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    gap: 2,
  },
  breakdownDivider: {
    width: 1,
  },
  breakdownLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  breakdownSeats: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  breakdownVotes: {
    fontSize: 10,
    textAlign: "center",
  },
  compositionBar: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  fptpBar: {
    height: 10,
  },
  prBar: {
    height: 10,
  },
  barLegend: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginTop: -4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
});
