import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { PartyBadge } from "@/components/PartyBadge";
import { VoteBar } from "@/components/VoteBar";
import {
  PARTIES,
  PROVINCES,
  ELECTION_SUMMARY,
  formatVotes,
  formatPct,
} from "@/constants/electionData";
import { useColors } from "@/hooks/use-colors";

export default function PartyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();

  const party = PARTIES.find((p) => p.id === id);

  if (!party) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: colors.muted }]}>Party not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  const seatChange = party.seatChange;
  const seatChangeStr =
    seatChange === null ? "New party" : seatChange > 0 ? `+${seatChange}` : String(seatChange);
  const seatChangeColor =
    seatChange === null ? "#1E3A8A" : seatChange > 0 ? "#16A34A" : seatChange < 0 ? "#DC2626" : "#6B7280";

  const prQualified = party.pr.percentage >= ELECTION_SUMMARY.prThreshold;

  // Province seats for this party
  const provinceSeats = PROVINCES.map((prov) => ({
    province: prov,
    seats: prov.seats[party.id] ?? 0,
  })).filter((p) => p.seats > 0);

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: party.color }]}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <View style={styles.headerContent}>
          <PartyBadge color="#FFFFFF20" shortName={party.shortName} size="lg" />
          <View style={styles.headerText}>
            <Text style={styles.partyName}>{party.name}</Text>
            <Text style={styles.partyLeader}>Leader: {party.leader}</Text>
            <Text style={styles.partyIdeology}>{party.ideology}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Seats Hero */}
        <View style={[styles.heroCard, { backgroundColor: party.color }]}>
          <View style={styles.heroItem}>
            <Text style={styles.heroValue}>{party.totalSeats}</Text>
            <Text style={styles.heroLabel}>Total Seats</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroItem}>
            <Text style={styles.heroValue}>{party.fptp.seats}</Text>
            <Text style={styles.heroLabel}>FPTP Seats</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroItem}>
            <Text style={styles.heroValue}>{party.pr.seats}</Text>
            <Text style={styles.heroLabel}>PR Seats</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroItem}>
            <Text style={[styles.heroValue, { color: "#FFFFFF" }]}>
              {seatChangeStr}
            </Text>
            <Text style={styles.heroLabel}>Seat Change</Text>
          </View>
        </View>

        {/* FPTP Results */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>FPTP (Constituency) Results</Text>
        <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: "#1E3A8A40" }]}>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>Constituency Votes</Text>
            <Text style={[styles.resultValue, { color: "#1E3A8A" }]}>
              {party.fptp.votes.toLocaleString()}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>Vote Share</Text>
            <Text style={[styles.resultValue, { color: "#1E3A8A" }]}>
              {formatPct(party.fptp.percentage)}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>Seats Won</Text>
            <Text style={[styles.resultValue, { color: "#1E3A8A" }]}>{party.fptp.seats}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>Total FPTP Votes Cast</Text>
            <Text style={[styles.resultValue, { color: colors.muted }]}>
              {ELECTION_SUMMARY.totalFptpValidVotes.toLocaleString()}
            </Text>
          </View>
          <View style={styles.barWrap}>
            <VoteBar
              percentage={party.fptp.percentage}
              color="#1E3A8A"
              height={10}
              label="Vote share of total FPTP votes"
            />
          </View>
        </View>

        {/* PR Results */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>PR (Proportional) Results</Text>
        <View
          style={[
            styles.resultCard,
            {
              backgroundColor: colors.surface,
              borderColor: prQualified ? "#B2222240" : colors.border,
            },
          ]}
        >
          {!prQualified && (
            <View style={[styles.belowThresholdBanner, { backgroundColor: "#FEF3C7" }]}>
              <Text style={styles.belowThresholdText}>
                ⚠️ Did not meet the 3% threshold — no PR seats allocated
              </Text>
            </View>
          )}
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>PR Votes</Text>
            <Text style={[styles.resultValue, { color: "#B22222" }]}>
              {party.pr.votes.toLocaleString()}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>PR Vote Share</Text>
            <Text style={[styles.resultValue, { color: "#B22222" }]}>
              {formatPct(party.pr.percentage)}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>PR Seats Allocated</Text>
            <Text style={[styles.resultValue, { color: "#B22222" }]}>{party.pr.seats}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={[styles.resultLabel, { color: colors.muted }]}>Total PR Votes Cast</Text>
            <Text style={[styles.resultValue, { color: colors.muted }]}>
              {ELECTION_SUMMARY.totalPrValidVotes.toLocaleString()}
            </Text>
          </View>
          <View style={styles.barWrap}>
            <VoteBar
              percentage={party.pr.percentage}
              color={prQualified ? "#B22222" : "#9CA3AF"}
              height={10}
              threshold={ELECTION_SUMMARY.prThreshold}
              label={`PR vote share (3% threshold = ${ELECTION_SUMMARY.prThreshold}%)`}
            />
          </View>
        </View>

        {/* Province Breakdown */}
        {provinceSeats.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Province-wise FPTP Seats</Text>
            <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {provinceSeats.map(({ province, seats }) => (
                <View key={province.id} style={styles.provinceRow}>
                  <Text style={[styles.provinceName, { color: colors.foreground }]} numberOfLines={1}>
                    {province.name}
                  </Text>
                  <View style={styles.provinceBarWrap}>
                    <VoteBar
                      percentage={(seats / province.totalSeats) * 100}
                      color={party.color}
                      height={6}
                      showPercent={false}
                    />
                  </View>
                  <Text style={[styles.provinceSeats, { color: party.color }]}>
                    {seats}/{province.totalSeats}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Combined vote comparison */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Vote Comparison</Text>
        <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <VoteBar
            percentage={party.fptp.percentage}
            color="#1E3A8A"
            height={10}
            label={`FPTP: ${party.fptp.votes.toLocaleString()} votes (${formatPct(party.fptp.percentage)})`}
          />
          <View style={{ height: 12 }} />
          <VoteBar
            percentage={party.pr.percentage}
            color="#B22222"
            height={10}
            threshold={ELECTION_SUMMARY.prThreshold}
            label={`PR: ${party.pr.votes.toLocaleString()} votes (${formatPct(party.pr.percentage)})`}
          />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backBtn: {
    marginBottom: 10,
  },
  backText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerText: {
    flex: 1,
  },
  partyName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 24,
  },
  partyLeader: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginTop: 3,
  },
  partyIdeology: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
  },
  heroCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    marginBottom: 20,
  },
  heroItem: {
    flex: 1,
    alignItems: "center",
  },
  heroValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  heroLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
    marginTop: 3,
    textAlign: "center",
  },
  heroDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 4,
  },
  resultCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 10,
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  resultValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  barWrap: {
    marginTop: 4,
  },
  belowThresholdBanner: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  belowThresholdText: {
    fontSize: 12,
    color: "#92400E",
    fontWeight: "500",
  },
  provinceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  provinceName: {
    fontSize: 12,
    fontWeight: "600",
    width: 100,
  },
  provinceBarWrap: {
    flex: 1,
  },
  provinceSeats: {
    fontSize: 13,
    fontWeight: "700",
    width: 36,
    textAlign: "right",
  },
});
