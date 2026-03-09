import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, subValue, accentColor = "#B22222", icon }: StatCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
        {subValue && <Text style={styles.subValue}>{subValue}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
  },
  iconWrap: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 2,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subValue: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 1,
  },
});
