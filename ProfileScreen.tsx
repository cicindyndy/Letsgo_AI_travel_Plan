import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, RADIUS } from "../constants/theme";
import Avatar from "../components/Avatar";
import StatBox from "../components/StatBox";
import SettingsRow from "../components/SettingsRow";
import SectionHeader from "../components/SectionHeader";
import Badge from "../components/Badge";

// ─── Data ────────────────────────────────────────────────────────────────────

const BADGES = [
  { icon: "🌏", label: "World Explorer" },
  { icon: "🏔", label: "Mountaineer" },
  { icon: "🍜", label: "Foodie" },
  { icon: "🤝", label: "Social Butterfly" },
  { icon: "📸", label: "Photographer" },
];

const PAST_TRIPS = [
  { uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200", name: "Bali" },
  { uri: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200", name: "Rome" },
  { uri: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=200", name: "Paris" },
  { uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200", name: "Kyoto" },
];

const SETTINGS = [
  { icon: "👤", label: "Edit Profile" },
  { icon: "🔔", label: "Notifications", value: "On" },
  { icon: "🌐", label: "Language", value: "English" },
  { icon: "💳", label: "Subscription", value: "Pro" },
  { icon: "🔒", label: "Privacy & Security" },
  { icon: "❓", label: "Help & Support" },
  { icon: "🚪", label: "Sign Out", danger: true },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cover + avatar */}
        <View style={styles.coverSection}>
          <View style={styles.cover} />
          <View style={styles.avatarRow}>
            <Avatar
              source={{ uri: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200" }}
              size={84}
            />
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnLabel}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Name + bio */}
        <View style={styles.bioSection}>
          <Text style={styles.name}>Alex Rivera</Text>
          <Text style={styles.handle}>@alexrivera · ✈️ 14 countries</Text>
          <Text style={styles.bio}>
            Perpetual traveler. Chasing sunrises, street food, and serendipity.
            Solo trip connoisseur 🌏
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatBox value={14} label="Countries" />
          <View style={styles.statGap} />
          <StatBox value={32} label="Trips" />
          <View style={styles.statGap} />
          <StatBox value="1.2k" label="Followers" />
        </View>

        <View style={styles.divider} />

        {/* Traveler badges */}
        <View style={styles.section}>
          <SectionHeader title="Traveler Badges" />
          <View style={styles.badgeWrap}>
            {BADGES.map((b, i) => (
              <View key={i} style={styles.badgeItem}>
                <View style={styles.badgeIconCircle}>
                  <Text style={styles.badgeEmoji}>{b.icon}</Text>
                </View>
                <Text style={styles.badgeLabel}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Past trips photo strip */}
        <View style={styles.section}>
          <SectionHeader title="Past Trips" actionLabel="View All" onAction={() => {}} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoStrip}>
            {PAST_TRIPS.map((t, i) => (
              <View key={i} style={styles.photoItem}>
                <Image
                  source={{ uri: t.uri }}
                  style={styles.photo}
                  resizeMode="cover"
                />
                <Text style={styles.photoLabel}>{t.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.divider} />

        {/* Settings */}
        <View style={styles.settingsSection}>
          {SETTINGS.map((s, i) => (
            <SettingsRow
              key={i}
              icon={s.icon}
              label={s.label}
              value={s.value}
              danger={s.danger}
              onPress={() => {}}
            />
          ))}
        </View>

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { paddingBottom: SPACING.xxxl },
  coverSection: {
    marginBottom: SPACING.sm,
  },
  cover: {
    height: 110,
    backgroundColor: COLORS.primary,
    opacity: 0.85,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    marginTop: -42,
  },
  editBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginBottom: 4,
  },
  editBtnLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  bioSection: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
    gap: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  handle: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  bio: {
    fontSize: 14,
    color: COLORS.gray600,
    lineHeight: 20,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  statGap: { width: SPACING.sm },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.xl,
    marginHorizontal: SPACING.xl,
  },
  section: { gap: SPACING.md },
  badgeWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.xl,
    gap: SPACING.lg,
  },
  badgeItem: {
    alignItems: "center",
    gap: 6,
    width: 64,
  },
  badgeIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeEmoji: { fontSize: 22 },
  badgeLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 13,
  },
  photoStrip: {
    paddingLeft: SPACING.xl,
  },
  photoItem: {
    marginRight: SPACING.md,
    gap: 6,
    alignItems: "center",
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.lg,
  },
  photoLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  settingsSection: {
    paddingHorizontal: SPACING.xl,
  },
});
