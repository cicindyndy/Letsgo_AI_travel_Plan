import React from "react";
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

const PAST_MEMORIES = [
  { name: "Paris", date: "JAN 2023", image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400" },
  { name: "Iceland", date: "DEC 2023", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400" },
  { name: "Venice", date: "JUNE 2023", image: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=400" },
  { name: null, date: null, image: null },
];

export default function MyTripScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* AI Banner */}
        <View style={styles.aiBanner}>
          <Text style={styles.aiBannerTitle}>Feeling{"\n"}Adventurous?</Text>
          <Text style={styles.aiBannerSub}>
            Let our AI curate your next personalized escape based on your favorite memories.
          </Text>
          <TouchableOpacity style={styles.generateBtn}>
            <Ionicons name="sparkles" size={14} color={COLORS.primary} />
            <Text style={styles.generateBtnText}>GENERATE NEW ITINERARY</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Trip — Tokyo */}
        <View style={styles.tripCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700" }}
            style={styles.tripImage}
            resizeMode="cover"
          />
          <View style={styles.tripOverlay}>
            <View style={styles.upcomingBadge}>
              <Text style={styles.upcomingText}>UPCOMING</Text>
            </View>
          </View>
          {/* Tab bar overlay shown in screenshot — just bottom info */}
          <View style={styles.tripMeta}>
            <View style={styles.tripMetaItem}>
              <Ionicons name="calendar-outline" size={13} color={COLORS.white} />
              <Text style={styles.tripMetaText}>3 Days</Text>
            </View>
            <View style={styles.tripMetaItem}>
              <Ionicons name="location-outline" size={13} color={COLORS.white} />
              <Text style={styles.tripMetaText}>17 Places</Text>
            </View>
          </View>
        </View>

        {/* New York Trip */}
        <View style={styles.tripCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=700" }}
            style={styles.tripImage}
            resizeMode="cover"
          />
          <View style={[styles.tripOverlay, styles.tripOverlayDark]} />
          <View style={styles.tripTitleOverlay}>
            <Text style={styles.tripName}>New York</Text>
            <Text style={styles.tripDates}>May 12 – May 18, 2025</Text>
          </View>
        </View>

        {/* Itinerary Preview */}
        <View style={styles.itineraryCard}>
          <View style={styles.itineraryHeader}>
            <Text style={styles.itineraryTitle}>Itinerary Preview</Text>
            <TouchableOpacity>
              <Text style={styles.viewFull}>VIEW FULL</Text>
            </TouchableOpacity>
          </View>

          {[
            { n: 1, title: "Brooklyn Heights & DUMBO", items: ["Breakfast at Butler Bakeshop", "Walk across Brooklyn Bridge"] },
            { n: 2, title: "Manhattan Central", items: ["The Met Museum Tour", "Dinner at Hell's Kitchen"] },
          ].map((day) => (
            <View key={day.n} style={styles.dayRow}>
              <View style={styles.dayNumber}>
                <Text style={styles.dayNumberText}>{day.n}</Text>
              </View>
              <View style={styles.dayInfo}>
                <Text style={styles.dayTitle}>{day.title}</Text>
                {day.items.map((item, i) => (
                  <Text key={i} style={styles.dayItem}>• {item}</Text>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.refineBtn}>
            <Ionicons name="sparkles" size={13} color={COLORS.primary} />
            <Text style={styles.refineBtnText}>REFINE WITH AI</Text>
          </TouchableOpacity>
        </View>

        {/* Past Memories */}
        <Text style={styles.sectionTitle}>Past Memories</Text>
        <View style={styles.memoriesGrid}>
          {PAST_MEMORIES.map((m, i) => (
            <View key={i} style={styles.memoryCell}>
              {m.image ? (
                <>
                  <Image source={{ uri: m.image }} style={styles.memoryImage} resizeMode="cover" />
                  <View style={styles.memoryOverlay} />
                  <Text style={styles.memoryName}>{m.name}</Text>
                  {m.date && <Text style={styles.memoryDate}>{m.date}</Text>}
                </>
              ) : (
                <View style={styles.archiveCell}>
                  <Ionicons name="archive-outline" size={28} color={COLORS.gray400} />
                  <Text style={styles.archiveText}>ARCHIVE</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CELL = (width - SPACING.xl * 2 - SPACING.md) / 2;

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
  aiBanner: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  aiBannerTitle: { fontSize: 26, fontWeight: "800", color: COLORS.white, lineHeight: 32 },
  aiBannerSub: { fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 18 },
  generateBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginTop: SPACING.sm,
  },
  generateBtnText: { fontSize: 12, fontWeight: "800", color: COLORS.primary, letterSpacing: 0.5 },
  tripCard: {
    marginHorizontal: SPACING.xl,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    height: 200,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.gray200,
  },
  tripImage: { width: "100%", height: "100%" },
  tripOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  tripOverlayDark: { backgroundColor: "rgba(0,0,0,0.35)" },
  upcomingBadge: {
    position: "absolute",
    bottom: SPACING.md,
    left: SPACING.md,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  upcomingText: { fontSize: 11, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  tripMeta: {
    position: "absolute",
    bottom: SPACING.md,
    right: SPACING.md,
    flexDirection: "row",
    gap: SPACING.md,
  },
  tripMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  tripMetaText: { fontSize: 12, color: COLORS.white, fontWeight: "600" },
  tripTitleOverlay: {
    position: "absolute",
    bottom: SPACING.lg,
    left: SPACING.lg,
  },
  tripName: { fontSize: 24, fontWeight: "800", color: COLORS.white },
  tripDates: { fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 2 },
  itineraryCard: {
    marginHorizontal: SPACING.xl,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  itineraryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
  },
  itineraryTitle: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  viewFull: { fontSize: 12, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  dayRow: { flexDirection: "row", gap: SPACING.md },
  dayNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  dayNumberText: { fontSize: 12, fontWeight: "700", color: COLORS.white },
  dayInfo: { flex: 1, gap: 2 },
  dayTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  dayItem: { fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },
  refineBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: SPACING.md,
    marginTop: SPACING.xs,
  },
  refineBtnText: { fontSize: 12, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  memoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  memoryCell: {
    width: CELL,
    height: CELL,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    backgroundColor: COLORS.gray100,
  },
  memoryImage: { width: "100%", height: "100%" },
  memoryOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  memoryName: {
    position: "absolute",
    bottom: SPACING.md,
    left: SPACING.md,
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.white,
  },
  memoryDate: {
    position: "absolute",
    bottom: SPACING.md + 20,
    left: SPACING.md,
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  archiveCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.gray100,
  },
  archiveText: { fontSize: 11, fontWeight: "700", color: COLORS.gray400, letterSpacing: 0.5 },
});
