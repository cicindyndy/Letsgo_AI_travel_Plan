import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "@/constants/theme";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const TAB_CONFIG: Record<string, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
    index: { icon: "compass-outline", label: "Explore" },
    "my-trip": { icon: "calendar-outline", label: "My Trip" },
    "smart-plan": { icon: "sparkles", label: "" },
    meetup: { icon: "people-outline", label: "Meetup" },
    profile: { icon: "person-outline", label: "Profile" },
  };

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom || SPACING.md }]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const isCenter = route.name === "smart-plan";
        const config = TAB_CONFIG[route.name] ?? { icon: "ellipse-outline" as any, label: route.name };

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        if (isCenter) {
          return (
            <TouchableOpacity key={route.key} style={styles.centerTab} onPress={onPress} activeOpacity={0.85}>
              <View style={styles.centerCircle}>
                <Ionicons name="sparkles" size={24} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={route.key} style={styles.tab} onPress={onPress} activeOpacity={0.7}>
            <Ionicons name={config.icon} size={22} color={isFocused ? COLORS.primary : COLORS.gray400} />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{config.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="my-trip" />
      <Tabs.Screen name="smart-plan" />
      <Tabs.Screen name="meetup" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: SPACING.xs, gap: 3 },
  centerTab: { flex: 1, alignItems: "center", marginTop: -24 },
  centerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  tabLabel: { fontSize: 10, fontWeight: "500", color: COLORS.gray400 },
  tabLabelActive: { color: COLORS.primary, fontWeight: "700" },
});
