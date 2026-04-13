import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Switch,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";

const { width } = Dimensions.get("window");
const CELL = (width - SPACING.xl * 2 - SPACING.md) / 2;

const PAST_MEMORIES = [
  { name: "Paris", date: "JAN 2023", image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400" },
  { name: "Iceland", date: "DEC 2023", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400" },
  { name: "Venice", date: "JUNE 2023", image: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=400" },
  { name: null, date: null, image: null },
];

const DAYS = ["Day 1", "Day 2", "Day 3", "Day 4"];

const TIMELINE_ITEMS = [
  {
    id: "1",
    time: "09:00 AM",
    icon: "restaurant-outline" as const,
    iconBg: COLORS.primary,
    title: "Breakfast at Butler Bakeshop",
    desc: "Start your Brooklyn adventure with artisan pastries in the heart of Williamsburg.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    tags: ["MUST-TRY PASTRY", "CAFÉ"],
  },
  {
    id: "2",
    time: "11:30 AM",
    icon: "walk-outline" as const,
    iconBg: "#E85D2B",
    title: "Walk across Brooklyn Bridge",
    desc: "Iconic views of the Lower Manhattan skyline. Best photo ops are at the first suspension pylon.",
    image: null,
    tags: [],
    mapLink: true,
  },
  {
    id: "3",
    time: "14:00 PM",
    icon: "fast-food-outline" as const,
    iconBg: "#1A73E8",
    title: "Lunch at DUMBO",
    desc: "Authentic wood-fired pizza with a view of the Manhattan Bridge cables. Truly a local favorite.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    tags: [],
  },
  {
    id: "4",
    time: "16:00 PM",
    icon: "compass-outline" as const,
    iconBg: "#0F9D58",
    title: "Explore Williamsburg",
    desc: "Wander through vintage shops, vinyl stores, and street art galleries along Bedford Avenue.",
    image: null,
    tags: [],
    meetup: true,
  },
];

const EDIT_ITEMS = [
  {
    id: "1",
    time: "09:00 AM",
    title: "Breakfast at Butler Bakeshop",
    desc: "Gourmet pastries & espresso",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200",
  },
  {
    id: "2",
    time: "11:30 AM",
    title: "Walk across Brooklyn Bridge",
    desc: "Panoramic skyline views",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200",
  },
  {
    id: "3",
    time: "01:45 PM",
    title: "Juliana's Pizza Lunch",
    desc: "Coal-fired classic pies",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200",
  },
];

// ─── Main My Trips Screen ────────────────────────────────────────────────────
function MainScreen({ onViewFull }: { onViewFull: () => void }) {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
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

        {/* Tokyo Trip */}
        <View style={styles.tripCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700" }}
            style={styles.tripImage}
            resizeMode="cover"
          />
          <View style={styles.tripOverlay} />
          <View style={styles.upcomingBadge}>
            <Text style={styles.upcomingText}>UPCOMING</Text>
          </View>
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
            <TouchableOpacity onPress={onViewFull}>
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

// ─── Full Itinerary Screen ────────────────────────────────────────────────────
function ItineraryScreen({ onBack, onEdit }: { onBack: () => void; onEdit: () => void }) {
  const [activeDay, setActiveDay] = useState(0);
  const [aiActive, setAiActive] = useState(true);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Itinerary</Text>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=700" }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>FEATURED TRIP</Text>
            </View>
            <Text style={styles.heroTitle}>The Big Apple{"\n"}Expedition</Text>
            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.9)" />
                <Text style={styles.heroMetaText}>Oct 12 - 19</Text>
              </View>
              <View style={styles.heroMetaItem}>
                <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.9)" />
                <Text style={styles.heroMetaText}>7 days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Route Card */}
        <View style={styles.aiRouteCard}>
          <View style={styles.aiRouteLeft}>
            <View style={styles.aiIconWrap}>
              <Ionicons name="sparkles" size={20} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.aiRouteTitle}>Route Optimized by AI</Text>
              <Text style={styles.aiRouteSub}>Save 45 mins of travel today</Text>
            </View>
          </View>
          <View style={styles.aiToggleWrap}>
            <Text style={styles.aiActiveText}>Active</Text>
            <Switch
              value={aiActive}
              onValueChange={setAiActive}
              trackColor={{ false: "rgba(255,255,255,0.3)", true: COLORS.white }}
              thumbColor={aiActive ? COLORS.primary : "rgba(255,255,255,0.8)"}
              ios_backgroundColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>

        {/* Day Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayTabsContent}
          style={styles.dayTabs}
        >
          {DAYS.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dayTab, activeDay === i && styles.dayTabActive]}
              onPress={() => setActiveDay(i)}
            >
              <Text style={[styles.dayTabText, activeDay === i && styles.dayTabTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Timeline */}
        <View style={styles.timeline}>
          {TIMELINE_ITEMS.map((item, index) => (
            <View key={item.id} style={styles.timelineRow}>
              {/* Left: time + icon + line */}
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineTime}>{item.time}</Text>
                <View style={[styles.timelineIcon, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon} size={14} color={COLORS.white} />
                </View>
                {index < TIMELINE_ITEMS.length - 1 && <View style={styles.timelineLine} />}
              </View>

              {/* Right: card */}
              <View style={styles.timelineCard}>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                {item.desc ? <Text style={styles.timelineDesc}>{item.desc}</Text> : null}
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.timelineImage} resizeMode="cover" />
                ) : null}
                {item.tags.length > 0 && (
                  <View style={styles.tagsRow}>
                    {item.tags.map((tag) => (
                      <View key={tag} style={styles.tagChip}>
                        <Text style={styles.tagChipText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {item.mapLink && (
                  <TouchableOpacity style={styles.mapLink}>
                    <Ionicons name="map-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.mapLinkText}>View on Map</Text>
                  </TouchableOpacity>
                )}
                {item.meetup && (
                  <View style={styles.meetupRow}>
                    <View style={styles.avatarStack}>
                      {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60",
                        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60",
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60",
                      ].map((u, i) => (
                        <Image key={i} source={{ uri: u }} style={[styles.stackAvatar, { left: i * 18 }]} />
                      ))}
                      <View style={[styles.stackAvatar, styles.stackMore, { left: 3 * 18 }]}>
                        <Text style={styles.stackMoreText}>+12</Text>
                      </View>
                    </View>
                    <Text style={styles.meetupText}>Joined by others from your meetup group</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Edit Itinerary Screen ────────────────────────────────────────────────────
function EditScreen({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState(EDIT_ITEMS);

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.editScroll}>
        {/* Day header */}
        <View style={styles.editDayHeader}>
          <Text style={styles.editDayLabel}>DAY 01</Text>
          <Text style={styles.editDayTitle}>Brooklyn Odyssey</Text>
          <View style={styles.editDateRow}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.editDateText}>October 14, 2024</Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.editTimeline}>
          {items.map((item, index) => (
            <View key={item.id} style={styles.editTimelineRow}>
              <View style={styles.editDotWrap}>
                <View style={styles.editDot} />
                {index < items.length - 1 && <View style={styles.editDotLine} />}
              </View>
              <View style={styles.editItemCard}>
                <Image source={{ uri: item.image }} style={styles.editItemImage} resizeMode="cover" />
                <View style={styles.editItemInfo}>
                  <Text style={styles.editItemTime}>{item.time}</Text>
                  <Text style={styles.editItemTitle}>{item.title}</Text>
                  <Text style={styles.editItemDesc}>{item.desc}</Text>
                </View>
                <TouchableOpacity style={styles.editRemoveBtn} onPress={() => removeItem(item.id)}>
                  <Ionicons name="close" size={16} color={COLORS.gray400} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add place dot */}
          <View style={styles.editTimelineRow}>
            <View style={styles.editDotWrap}>
              <View style={[styles.editDot, { backgroundColor: COLORS.gray300 }]} />
            </View>
            <TouchableOpacity style={styles.addPlaceCard}>
              <View style={styles.addPlaceIcon}>
                <Ionicons name="add" size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.addPlaceTitle}>Add a Place</Text>
              <Text style={styles.addPlaceSub}>Insert activity at this time</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reorder */}
        <TouchableOpacity style={styles.reorderBtn}>
          <Ionicons name="reorder-two-outline" size={16} color={COLORS.text} />
          <Text style={styles.reorderText}>Reorder Day Sequence</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function MyTripScreen() {
  const [screen, setScreen] = useState<"main" | "itinerary" | "edit">("main");

  if (screen === "edit") return <EditScreen onClose={() => setScreen("itinerary")} />;
  if (screen === "itinerary") return <ItineraryScreen onBack={() => setScreen("main")} onEdit={() => setScreen("edit")} />;
  return <MainScreen onViewFull={() => setScreen("itinerary")} />;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },

  // Shared header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  scrollContent: { paddingBottom: SPACING.xxxl },

  // Main screen
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
  tripOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.15)" },
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
  tripTitleOverlay: { position: "absolute", bottom: SPACING.lg, left: SPACING.lg },
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
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center", justifyContent: "center", marginTop: 2,
  },
  dayNumberText: { fontSize: 12, fontWeight: "700", color: COLORS.white },
  dayInfo: { flex: 1, gap: 2 },
  dayTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  dayItem: { fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },
  refineBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    borderTopWidth: 1, borderTopColor: COLORS.gray200,
    paddingTop: SPACING.md, marginTop: SPACING.xs,
  },
  refineBtnText: { fontSize: 12, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text, paddingHorizontal: SPACING.xl, marginBottom: SPACING.md },
  memoriesGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: SPACING.xl, gap: SPACING.md },
  memoryCell: { width: CELL, height: CELL, borderRadius: RADIUS.lg, overflow: "hidden", backgroundColor: COLORS.gray100 },
  memoryImage: { width: "100%", height: "100%" },
  memoryOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  memoryName: { position: "absolute", bottom: SPACING.md, left: SPACING.md, fontSize: 16, fontWeight: "800", color: COLORS.white },
  memoryDate: { position: "absolute", bottom: SPACING.md + 20, left: SPACING.md, fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: "600" },
  archiveCell: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACING.xs, backgroundColor: COLORS.gray100 },
  archiveText: { fontSize: 11, fontWeight: "700", color: COLORS.gray400, letterSpacing: 0.5 },

  // Itinerary screen
  heroCard: { marginHorizontal: SPACING.xl, borderRadius: RADIUS.xl, overflow: "hidden", height: 220, marginBottom: SPACING.md },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  heroContent: { position: "absolute", bottom: SPACING.lg, left: SPACING.lg, right: SPACING.lg },
  featuredBadge: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  featuredText: { fontSize: 10, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  heroTitle: { fontSize: 24, fontWeight: "800", color: COLORS.white, lineHeight: 30, marginBottom: SPACING.sm },
  heroMeta: { flexDirection: "row", gap: SPACING.lg },
  heroMetaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  heroMetaText: { fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: "600" },
  aiRouteCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  aiRouteLeft: { flexDirection: "row", alignItems: "center", gap: SPACING.md, flex: 1 },
  aiIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  aiRouteTitle: { fontSize: 15, fontWeight: "700", color: COLORS.white },
  aiRouteSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  aiToggleWrap: { alignItems: "center", gap: 2 },
  aiActiveText: { fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.9)" },
  dayTabs: { marginBottom: SPACING.md },
  dayTabsContent: { paddingHorizontal: SPACING.xl, gap: SPACING.sm },
  dayTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray100,
  },
  dayTabActive: { backgroundColor: COLORS.primary },
  dayTabText: { fontSize: 13, fontWeight: "600", color: COLORS.gray600 },
  dayTabTextActive: { color: COLORS.white, fontWeight: "700" },
  timeline: { paddingHorizontal: SPACING.xl },
  timelineRow: { flexDirection: "row", gap: SPACING.md, marginBottom: SPACING.lg },
  timelineLeft: { alignItems: "center", width: 60 },
  timelineTime: { fontSize: 11, fontWeight: "600", color: COLORS.primary, marginBottom: 6, textAlign: "center" },
  timelineIcon: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: "center", justifyContent: "center",
  },
  timelineLine: { width: 2, flex: 1, backgroundColor: COLORS.gray200, marginTop: 4, minHeight: 30 },
  timelineCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    gap: SPACING.sm,
    marginBottom: 4,
  },
  timelineTitle: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  timelineDesc: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },
  timelineImage: { width: "100%", height: 140, borderRadius: RADIUS.lg },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.xs },
  tagChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.full,
  },
  tagChipText: { fontSize: 11, fontWeight: "600", color: COLORS.gray600 },
  mapLink: { flexDirection: "row", alignItems: "center", gap: 4 },
  mapLinkText: { fontSize: 13, fontWeight: "600", color: COLORS.primary },
  meetupRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, flexWrap: "wrap" },
  avatarStack: { flexDirection: "row", height: 28, width: 3 * 18 + 28 + 4 },
  stackAvatar: {
    position: "absolute",
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: COLORS.white,
    backgroundColor: COLORS.gray200,
  },
  stackMore: {
    backgroundColor: COLORS.primary,
    alignItems: "center", justifyContent: "center",
  },
  stackMoreText: { fontSize: 9, fontWeight: "700", color: COLORS.white },
  meetupText: { fontSize: 11, color: COLORS.textMuted, flex: 1 },

  // Edit screen
  editHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  doneText: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  editScroll: { paddingBottom: SPACING.xxxl },
  editDayHeader: {
    backgroundColor: COLORS.gray100,
    marginHorizontal: SPACING.xl,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    gap: SPACING.xs,
  },
  editDayLabel: { fontSize: 11, fontWeight: "700", color: COLORS.orange, letterSpacing: 1 },
  editDayTitle: { fontSize: 28, fontWeight: "800", color: COLORS.text },
  editDateRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: SPACING.xs },
  editDateText: { fontSize: 13, color: COLORS.textMuted },
  editTimeline: { paddingHorizontal: SPACING.xl },
  editTimelineRow: { flexDirection: "row", gap: SPACING.md, marginBottom: SPACING.md },
  editDotWrap: { alignItems: "center", width: 16 },
  editDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary, marginTop: 14 },
  editDotLine: { width: 2, flex: 1, backgroundColor: COLORS.gray200, marginTop: 4 },
  editItemCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.gray200,
    minHeight: 90,
  },
  editItemImage: { width: 80, height: "100%" },
  editItemInfo: { flex: 1, padding: SPACING.md, gap: 2 },
  editItemTime: { fontSize: 11, fontWeight: "700", color: COLORS.primary },
  editItemTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text, lineHeight: 20 },
  editItemDesc: { fontSize: 12, color: COLORS.textMuted },
  editRemoveBtn: {
    padding: SPACING.sm,
    alignSelf: "flex-start",
    marginTop: SPACING.xs,
  },
  addPlaceCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderStyle: "dashed",
    borderRadius: RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl,
    gap: SPACING.xs,
  },
  addPlaceIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "rgba(108,71,255,0.1)",
    alignItems: "center", justifyContent: "center",
    marginBottom: SPACING.xs,
  },
  addPlaceTitle: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
  addPlaceSub: { fontSize: 12, color: COLORS.textMuted },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.xl,
    marginTop: SPACING.md,
  },
  reorderText: { fontSize: 14, fontWeight: "600", color: COLORS.text },
});
