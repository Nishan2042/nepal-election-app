import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  // Navigation
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  // Election-specific
  "list.bullet": "list",
  "chart.bar.fill": "bar-chart",
  "person.2.fill": "people",
  "mappin.and.ellipse": "place",
  "flag.fill": "flag",
  "checkmark.seal.fill": "verified",
  "arrow.up.right": "trending-up",
  "arrow.down.right": "trending-down",
  "minus": "remove",
  "info.circle": "info",
  "magnifyingglass": "search",
  "xmark": "close",
  "star.fill": "star",
  "percent": "percent",
  "number": "tag",
  "chart.pie.fill": "pie-chart",
  "building.columns.fill": "account-balance",
  "person.fill": "person",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
