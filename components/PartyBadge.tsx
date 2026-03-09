import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PartyBadgeProps {
  color: string;
  shortName: string;
  size?: "sm" | "md" | "lg";
}

export function PartyBadge({ color, shortName, size = "md" }: PartyBadgeProps) {
  const dim = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  const fontSize = size === "sm" ? 8 : size === "lg" ? 13 : 10;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color, width: dim, height: dim, borderRadius: dim / 2 },
      ]}
    >
      <Text style={[styles.text, { fontSize }]} numberOfLines={1} adjustsFontSizeToFit>
        {shortName.length > 6 ? shortName.substring(0, 5) : shortName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
});
