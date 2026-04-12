import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";

const { width } = Dimensions.get("window");
const PHOTO_SIZE = (width - SPACING.xl * 2 - SPACING.sm) / 2;

const TABS = ["GROUP TRIPS", "SHARED ITINERARIES", "POSTS", "SAVED"];

const POSTS = [
  "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
  "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=400",
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400",
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="pencil" size={12} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name & Bio */}
        <View style={styles.bioSection}>
          <Text style={styles.name}>Winnie Hathaway</Text>
          <Text style={styles.handle}>@alex_explorer</Text>
          <Text style={styles.bio}>
            Digital nomad documenting the path less traveled. Currently wandering through the Atlas Mountains. 🏔 Coffee enthusiast & Leica photographer.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[{ val: "148", label: "POSTS" }, { val: "11.5k", label: "FOLLOWERS" }, { val: "620", label: "FOLLOWING" }].map((s, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileBtnText}>EDIT PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>SHARE</Text>
          </TouchableOpacity>
        </View>

        {/* Private Metric */}
        <View style={styles.metricCard}>
          <View style={styles.metricIconWrap}>
            <Ionicons name="swap-vertical" size={22} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.metricPrivate}>PRIVATE METRIC</Text>
            <Text style={styles.metricVal}>42,856</Text>
            <Text style={styles.metricLabel}>Steps today</Text>
          </View>
        </View>

        {/* Drafts */}
        <View style={styles.draftsCard}>
          <View style={styles.draftsIconWrap}>
            <Ionicons name="document-text-outline" size={22} color={COLORS.orange} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.draftsLabel}>DRAFTS</Text>
            <Text style={styles.draftsVal}>07</Text>
            <Text style={styles.draftsSub}>Pending adventures</Text>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
          {TABS.map((tab, i) => (
            <TouchableOpacity key={i} style={styles.tabItem} onPress={() => setActiveTab(i)}>
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
              {activeTab === i && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Photo Grid */}
        <View style={styles.photoGrid}>
          {/* New Post Button */}
          <TouchableOpacity style={styles.newPostCell}>
            <Ionicons name="add" size={28} color={COLORS.gray400} />
            <Text style={styles.newPostText}>NEW POST</Text>
          </TouchableOpacity>
          {POSTS.map((uri, i) => (
            <Image key={i} source={{ uri }} style={styles.photoCell} resizeMode="cover" />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  scrollContent: { paddingBottom: SPACING.xxxl },
  avatarSection: { alignItems: "center", paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  avatarWrap: { position: "relative" },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.gray200 },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  bioSection: { paddingHorizontal: SPACING.xl, alignItems: "center", gap: 4 },
  name: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  handle: { fontSize: 13, color: COLORS.textMuted },
  bio: {
    fontSize: 13,
    color: COLORS.gray600,
    textAlign: "center",
    lineHeight: 18,
    marginTop: SPACING.xs,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.xxxl,
    paddingVertical: SPACING.xl,
  },
  statItem: { alignItems: "center", gap: 2 },
  statVal: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  statLabel: { fontSize: 10, fontWeight: "600", color: COLORS.textMuted, letterSpacing: 0.5 },
  btnRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  editProfileBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
  },
  editProfileBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  shareBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
  },
  shareBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.text, letterSpacing: 0.5 },
  metricCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  metricIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  metricPrivate: { fontSize: 10, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  metricVal: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  metricLabel: { fontSize: 12, color: COLORS.textMuted },
  draftsCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  draftsIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  draftsLabel: { fontSize: 10, fontWeight: "700", color: COLORS.orange, letterSpacing: 0.5 },
  draftsVal: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  draftsSub: { fontSize: 12, color: COLORS.textMuted },
  tabsScroll: { borderBottomWidth: 1, borderBottomColor: COLORS.gray200 },
  tabsContent: { paddingHorizontal: SPACING.xl, gap: SPACING.xxl },
  tabItem: { paddingVertical: SPACING.md, alignItems: "center" },
  tabText: { fontSize: 12, fontWeight: "600", color: COLORS.textMuted, letterSpacing: 0.3 },
  tabTextActive: { color: COLORS.primary, fontWeight: "700" },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  newPostCell: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },
  newPostText: { fontSize: 11, fontWeight: "700", color: COLORS.gray400, letterSpacing: 0.5 },
  photoCell: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.gray200,
  },
});
