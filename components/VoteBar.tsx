import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface VoteBarProps {
  percentage: number;
  color: string;
  label?: string;
  showPercent?: boolean;
  height?: number;
  threshold?: number; // draw a threshold line at this %
}

export function VoteBar({
  percentage,
  color,
  label,
  showPercent = true,
  height = 8,
  threshold,
}: VoteBarProps) {
  const clampedPct = Math.min(100, Math.max(0, percentage));

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.row}>
        <View style={[styles.track, { height }]}>
          <View
            style={[
              styles.fill,
              {
                width: `${clampedPct}%`,
                backgroundColor: color,
                height,
                borderRadius: height / 2,
              },
            ]}
          />
          {threshold !== undefined && (
            <View
              style={[
                styles.thresholdLine,
                { left: `${threshold}%`, height: height + 4, top: -2 },
              ]}
            />
          )}
        </View>
        {showPercent && (
          <Text style={styles.pctText}>{clampedPct.toFixed(2)}%</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  track: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "visible",
    position: "relative",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  thresholdLine: {
    position: "absolute",
    width: 2,
    backgroundColor: "#F59E0B",
    borderRadius: 1,
  },
  pctText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    minWidth: 48,
    textAlign: "right",
  },
});
