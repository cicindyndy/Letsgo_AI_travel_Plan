import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExploreScreen from "../screens/ExploreScreen";
import MyTripScreen from "../screens/MyTripScreen";
import MeetupScreen from "../screens/MeetupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS, SPACING, RADIUS } from "../constants/theme";

const Tab = createBottomTabNavigator();

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const TAB_ICONS: Record<string, string> = {
    Explore: "🧭",
    MyTrip: "🗓",
    AI: "✨",
    Meetup: "👥",
    Profile: "👤",
  };

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom || SPACING.md }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isCenter = route.name === "AI";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isCenter) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.centerTab}
              onPress={onPress}
              activeOpacity={0.85}
            >
              <View style={styles.centerCircle}>
                <Text style={styles.centerIcon}>{TAB_ICONS[route.name]}</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
              {TAB_ICONS[route.name]}
            </Text>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {route.name === "MyTrip" ? "My Trip" : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── AI Placeholder Screen ────────────────────────────────────────────────────

function AIScreen() {
  return (
    <View style={styles.aiPlaceholder}>
      <Text style={{ fontSize: 48 }}>✨</Text>
      <Text style={styles.aiTitle}>AI Planner</Text>
      <Text style={styles.aiSub}>Coming soon — build your dream trip with AI.</Text>
    </View>
  );
}

// ─── Navigator ────────────────────────────────────────────────────────────────

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="MyTrip" component={MyTripScreen} />
        <Tab.Screen name="AI" component={AIScreen} />
        <Tab.Screen name="Meetup" component={MeetupScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SPACING.xs,
    gap: 3,
  },
  centerTab: {
    flex: 1,
    alignItems: "center",
    marginTop: -24,
  },
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
  centerIcon: { fontSize: 22 },
  tabIcon: { fontSize: 20, opacity: 0.4 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 10, fontWeight: "500", color: COLORS.gray400 },
  tabLabelActive: { color: COLORS.primary, fontWeight: "700" },
  aiPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },
  aiTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },
  aiSub: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    paddingHorizontal: SPACING.xxxl,
  },
});
