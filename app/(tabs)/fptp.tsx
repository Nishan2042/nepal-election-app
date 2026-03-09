import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { PartyBadge } from "@/components/PartyBadge";
import { VoteBar } from "@/components/VoteBar";
import {
  PARTIES,
  CONSTITUENCIES,
  PROVINCES,
  getParty,
  formatVotes,
  formatPct,
  ELECTION_SUMMARY,
} from "@/constants/electionData";
import { useColors } from "@/hooks/use-colors";

type TabType = "party" | "province" | "constituency";

export default function FPTPScreen() {
  const colors = useColors();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("party");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedParties = useMemo(
    () =>
      [...PARTIES]
        .filter((p) => p.id !== "ind")
        .sort((a, b) => b.fptp.seats - a.fptp.seats),
    []
  );

  const filteredConstituencies = useMemo(() => {
    let list = CONSTITUENCIES;
    if (selectedProvince !== "all") {
      list = list.filter((c) => c.provinceId === selectedProvince);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.electedMP.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedProvince, searchQuery]);

  const renderPartyItem = ({ item: party }: { item: (typeof PARTIES)[0] }) => (
    <Pressable
      style={({ pressed }) => [
        styles.partyCard,
        { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() => router.push({ pathname: "/party/[id]", params: { id: party.id } })}
    >
      <View style={styles.partyCardHeader}>
        <PartyBadge color={party.color} shortName={party.shortName} size="md" />
        <View style={styles.partyCardInfo}>
          <Text style={[styles.partyCardName, { color: colors.foreground }]} numberOfLines={1}>
            {party.name}
          </Text>
          <Text style={[styles.partyCardLeader, { color: colors.muted }]}>{party.leader}</Text>
        </View>
        <View style={styles.partyCardSeats}>
          <Text style={[styles.seatsBig, { color: party.color }]}>{party.fptp.seats}</Text>
          <Text style={[styles.seatsLabel, { color: colors.muted }]}>seats</Text>
        </View>
      </View>
      <View style={styles.partyCardStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Votes</Text>
          <Text style={[styles.statValue, { color: colors.foreground }]}>
            {formatVotes(party.fptp.votes)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Vote Share</Text>
          <Text style={[styles.statValue, { color: colors.foreground }]}>
            {formatPct(party.fptp.percentage)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Total Seats</Text>
          <Text style={[styles.statValue, { color: party.color }]}>{party.totalSeats}</Text>
        </View>
      </View>
      <VoteBar
        percentage={party.fptp.percentage}
        color={party.color}
        showPercent={false}
        height={6}
      />
    </Pressable>
  );

  const renderProvinceItem = ({ item: prov }: { item: (typeof PROVINCES)[0] }) => {
    const seatEntries = Object.entries(prov.seats).sort((a, b) => b[1] - a[1]);
    return (
      <View style={[styles.provinceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.provinceTitle, { color: colors.foreground }]}>{prov.name}</Text>
        <Text style={[styles.provinceSubtitle, { color: colors.muted }]}>
          {prov.totalSeats} total seats
        </Text>
        <View style={styles.provinceSeatsList}>
          {seatEntries.map(([partyId, seats]) => {
            const party = getParty(partyId);
            if (!party) return null;
            return (
              <View key={partyId} style={styles.provinceSeatRow}>
                <PartyBadge color={party.color} shortName={party.shortName} size="sm" />
                <Text style={[styles.provinceSeatName, { color: colors.foreground }]} numberOfLines={1}>
                  {party.shortName}
                </Text>
                <View style={styles.provinceSeatBarWrap}>
                  <VoteBar
                    percentage={(seats / prov.totalSeats) * 100}
                    color={party.color}
                    showPercent={false}
                    height={6}
                  />
                </View>
                <Text style={[styles.provinceSeatCount, { color: party.color }]}>{seats}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderConstituencyItem = ({ item: c }: { item: (typeof CONSTITUENCIES)[0] }) => {
    const party = getParty(c.partyId);
    const runnerUpParty = c.runnerUpPartyId ? getParty(c.runnerUpPartyId) : undefined;
    const winPct = c.totalVotes > 0 ? (c.winnerVotes / c.totalVotes) * 100 : 0;

    return (
      <View style={[styles.constituencyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.constituencyHeader}>
          <View style={styles.constituencyLeft}>
            <Text style={[styles.constituencyName, { color: colors.foreground }]}>{c.name}</Text>
            <Text style={[styles.constituencyProvince, { color: colors.muted }]}>{c.province}</Text>
          </View>
          {party && <PartyBadge color={party.color} shortName={party.shortName} size="sm" />}
        </View>

        {/* Winner */}
        <View style={[styles.winnerRow, { backgroundColor: party ? party.color + "18" : "#f0f0f0", borderColor: party ? party.color + "40" : "#ddd" }]}>
          <Text style={styles.winnerLabel}>✓ Winner</Text>
          <Text style={[styles.winnerName, { color: colors.foreground }]} numberOfLines={1}>
            {c.electedMP}
          </Text>
          <View style={styles.winnerVotes}>
            <Text style={[styles.winnerVoteCount, { color: party?.color ?? colors.primary }]}>
              {c.winnerVotes.toLocaleString()}
            </Text>
            <Text style={[styles.winnerVotePct, { color: colors.muted }]}>
              {winPct.toFixed(1)}%
            </Text>
          </View>
        </View>

        {/* Vote bar */}
        <View style={styles.voteBarWrap}>
          <VoteBar
            percentage={winPct}
            color={party?.color ?? "#B22222"}
            height={7}
            showPercent={false}
          />
        </View>

        {/* Runner up */}
        {c.runnerUp && runnerUpParty && (
          <View style={styles.runnerUpRow}>
            <PartyBadge color={runnerUpParty.color} shortName={runnerUpParty.shortName} size="sm" />
            <Text style={[styles.runnerUpName, { color: colors.muted }]} numberOfLines={1}>
              {c.runnerUp}
            </Text>
            <Text style={[styles.runnerUpVotes, { color: colors.muted }]}>
              {c.runnerUpVotes?.toLocaleString()}
            </Text>
          </View>
        )}

        {/* Total votes */}
        <View style={[styles.totalVotesRow, { borderTopColor: colors.border }]}>
          <Text style={[styles.totalVotesLabel, { color: colors.muted }]}>Total votes cast:</Text>
          <Text style={[styles.totalVotesValue, { color: colors.foreground }]}>
            {c.totalVotes.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#1E3A8A" }]}>
        <Text style={styles.headerTitle}>Directly Elected (FPTP)</Text>
        <Text style={styles.headerSubtitle}>
          165 constituency seats · {ELECTION_SUMMARY.fptpTurnout}% turnout
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        {(["party", "province", "constituency"] as TabType[]).map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { borderBottomColor: "#1E3A8A", borderBottomWidth: 2 },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? "#1E3A8A" : colors.muted },
              ]}
            >
              {tab === "party" ? "By Party" : tab === "province" ? "By Province" : "Constituencies"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      {activeTab === "party" && (
        <FlatList
          data={sortedParties}
          keyExtractor={(item) => item.id}
          renderItem={renderPartyItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={[styles.totalRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.totalText, { color: colors.muted }]}>
                Total valid FPTP votes:{" "}
                <Text style={{ fontWeight: "700", color: colors.foreground }}>
                  {ELECTION_SUMMARY.totalFptpValidVotes.toLocaleString()}
                </Text>
              </Text>
            </View>
          }
        />
      )}

      {activeTab === "province" && (
        <FlatList
          data={PROVINCES}
          keyExtractor={(item) => item.id}
          renderItem={renderProvinceItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === "constituency" && (
        <>
          {/* Province filter */}
          <View style={[styles.filterRow, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
            <FlatList
              horizontal
              data={[{ id: "all", name: "All" }, ...PROVINCES]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor:
                        selectedProvince === item.id ? "#1E3A8A" : colors.surface,
                      borderColor:
                        selectedProvince === item.id ? "#1E3A8A" : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedProvince(item.id)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      {
                        color:
                          selectedProvince === item.id ? "#FFFFFF" : colors.foreground,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
            />
          </View>

          {/* Search */}
          <View style={[styles.searchRow, { backgroundColor: colors.background }]}>
            <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ color: colors.muted, marginRight: 6 }}>🔍</Text>
              <TextInput
                style={[styles.searchInput, { color: colors.foreground }]}
                placeholder="Search constituency or MP..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
            </View>
          </View>

          <FlatList
            data={filteredConstituencies}
            keyExtractor={(item) => item.id}
            renderItem={renderConstituencyItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={[styles.emptyText, { color: colors.muted }]}>No constituencies found</Text>
              </View>
            }
          />
        </>
      )}
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
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  listContent: {
    padding: 12,
    gap: 10,
    paddingBottom: 24,
  },
  totalRow: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    marginBottom: 4,
  },
  totalText: {
    fontSize: 13,
    textAlign: "center",
  },
  // Party card
  partyCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  partyCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  partyCardInfo: {
    flex: 1,
  },
  partyCardName: {
    fontSize: 14,
    fontWeight: "700",
  },
  partyCardLeader: {
    fontSize: 11,
    marginTop: 1,
  },
  partyCardSeats: {
    alignItems: "flex-end",
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
  partyCardStats: {
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
  // Province card
  provinceCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  provinceTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  provinceSubtitle: {
    fontSize: 12,
    marginTop: -6,
  },
  provinceSeatsList: {
    gap: 8,
  },
  provinceSeatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  provinceSeatName: {
    fontSize: 12,
    fontWeight: "600",
    width: 60,
  },
  provinceSeatBarWrap: {
    flex: 1,
  },
  provinceSeatCount: {
    fontSize: 14,
    fontWeight: "700",
    width: 24,
    textAlign: "right",
  },
  // Constituency card
  constituencyCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 8,
  },
  constituencyHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  constituencyLeft: {
    flex: 1,
    marginRight: 8,
  },
  constituencyName: {
    fontSize: 15,
    fontWeight: "700",
  },
  constituencyProvince: {
    fontSize: 11,
    marginTop: 2,
  },
  winnerRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    gap: 8,
  },
  winnerLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16A34A",
    width: 44,
  },
  winnerName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },
  winnerVotes: {
    alignItems: "flex-end",
  },
  winnerVoteCount: {
    fontSize: 14,
    fontWeight: "800",
  },
  winnerVotePct: {
    fontSize: 10,
    fontWeight: "600",
  },
  voteBarWrap: {
    marginVertical: 2,
  },
  runnerUpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  runnerUpName: {
    flex: 1,
    fontSize: 12,
  },
  runnerUpVotes: {
    fontSize: 12,
    fontWeight: "600",
  },
  totalVotesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
  },
  totalVotesLabel: {
    fontSize: 12,
  },
  totalVotesValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  // Filter
  filterRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  // Search
  searchRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
});
