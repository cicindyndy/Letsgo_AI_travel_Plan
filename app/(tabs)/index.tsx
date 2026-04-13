import React, { useState, useRef } from "react";
import {
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";

// Renders a real OSM map on web via iframe, fallback solid color on native
function MapBackground() {
  if (Platform.OS === "web") {
    return React.createElement("iframe", {
      src: "https://www.openstreetmap.org/export/embed.html?bbox=-122.44%2C47.57%2C-122.24%2C47.66&layer=mapnik&marker=47.6062%2C-122.3321",
      style: { width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0 },
    });
  }
  return React.createElement(View, { style: { flex: 1, backgroundColor: "#e8e0d8" } });
}

const { width } = Dimensions.get("window");

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["TOP ATTRACTIONS", "NATURE", "URBAN", "BEACHES", "FOOD"];

const ATTRACTIONS = [
  { name: "Statue of Liberty", location: "New York, USA", rating: 4.7, reviews: "110K", image: "https://picsum.photos/seed/liberty/700/400" },
  { name: "Eiffel Tower", location: "Paris, France", rating: 4.8, reviews: "250K", image: "https://picsum.photos/seed/paris/700/400" },
];

const FEED = [
  { title: "Long Weekend in Brooklyn (3-Days)", author: "By Sarah Jenkins", image: "https://picsum.photos/seed/brooklyn/300/200" },
  { title: "4 Days in Bali — Temple & Beach", author: "By David Chen", image: "https://picsum.photos/seed/bali/300/200" },
];

const RECENT_SEARCHES = ["New York", "Seattle", "Tokyo", "Paris"];

const CITY_LANDMARKS = [
  {
    name: "Space Needle",
    category: "ICONIC LANDMARK",
    categoryColor: "#4A9EFF",
    description: "Ultra-modern observation deck offering 360-degree views of the Emerald City and Mt. Rainier.",
    rating: 4.8,
    reviews: "2.4k",
    price: "$35.00",
    action: "DETAILS",
    badge: "TRENDING",
    saved: true,
    image: "https://picsum.photos/seed/spaceneedle/700/300",
    mapTop: "38%",
    mapLeft: "34%",
  },
  {
    name: "Pike Place Market",
    category: "PUBLIC MARKET",
    categoryColor: "#FF9F4A",
    description: "Historic waterfront market famous for its fish toss, fresh local produce, and the original Starbucks.",
    rating: 4.9,
    reviews: "1.8k",
    price: "Free Admission",
    priceColor: COLORS.green,
    action: "EXPLORE",
    actionColor: COLORS.primary,
    saved: false,
    image: "https://picsum.photos/seed/pikeplace/700/300",
    mapTop: "62%",
    mapLeft: "28%",
  },
  {
    name: "Chihuly Garden and Glass",
    category: "ART MUSEUM",
    categoryColor: "#A855F7",
    description: "An immersive showcase of Dale Chihuly's breathtaking large-scale glass artwork in the heart of Seattle Center.",
    rating: 4.7,
    reviews: "950",
    price: "$32.00",
    action: "DETAILS",
    saved: false,
    image: "https://picsum.photos/seed/chihuly/700/300",
    mapTop: "30%",
    mapLeft: "42%",
  },
];

// ─── City Results Screen ───────────────────────────────────────────────────────

function CityResultsScreen({ city, onBack, onSearch }: { city: string; onBack: () => void; onSearch: () => void }) {
  const [view, setView] = useState<"list" | "map">("list");
  const [savedMap, setSavedMap] = useState<Record<number, boolean>>({});

  const toggleSave = (i: number) => setSavedMap(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.resultsHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.resultsCity}>{city}, WA</Text>
        <TouchableOpacity onPress={onSearch}>
          <Ionicons name="search" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Toggle */}
      <View style={styles.toggleWrap}>
        <TouchableOpacity style={[styles.toggleBtn, view === "list" && styles.toggleBtnActive]} onPress={() => setView("list")}>
          <Text style={[styles.toggleText, view === "list" && styles.toggleTextActive]}>LIST VIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn, view === "map" && styles.toggleBtnActive]} onPress={() => setView("map")}>
          <Text style={[styles.toggleText, view === "map" && styles.toggleTextActive]}>MAP VIEW</Text>
        </TouchableOpacity>
      </View>

      {view === "list" ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {CITY_LANDMARKS.map((lm, i) => (
            <View key={i} style={styles.landmarkCard}>
              <Image source={{ uri: lm.image }} style={styles.landmarkCardImage} resizeMode="cover" />
              <View style={styles.landmarkCardBody}>
                <View style={styles.landmarkCardTop}>
                  <View style={[styles.categoryPill, { backgroundColor: lm.categoryColor + "22" }]}>
                    <Text style={[styles.categoryPillText, { color: lm.categoryColor }]}>{lm.category}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleSave(i)}>
                    <Ionicons
                      name={savedMap[i] ?? lm.saved ? "star" : "star-outline"}
                      size={20}
                      color={savedMap[i] ?? lm.saved ? COLORS.orange : COLORS.gray400}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.landmarkCardName}>{lm.name}</Text>
                <Text style={styles.landmarkCardDesc}>{lm.description}</Text>
                <View style={styles.landmarkCardFooter}>
                  <Text style={[styles.landmarkCardPrice, lm.priceColor ? { color: lm.priceColor } : {}]}>
                    {lm.price}
                  </Text>
                  <TouchableOpacity style={[styles.viewMoreBtn, lm.actionColor ? { backgroundColor: lm.actionColor } : {}]}>
                    <Text style={styles.viewMoreBtnText}>{lm.action}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.mapContainer}>
          {/* Real map */}
          <View style={styles.mapBg}>
            <MapBackground />
            {/* Location pins */}
            {CITY_LANDMARKS.map((lm, i) => (
              <View key={i} style={[styles.mapPin, { top: lm.mapTop as any, left: lm.mapLeft as any }]}>
                <View style={styles.mapPinBubble}>
                  <Text style={styles.mapPinText}>{lm.name}</Text>
                </View>
                <View style={styles.mapPinDot} />
              </View>
            ))}
          </View>

          {/* Bottom cards */}
          <View style={styles.mapCardsWrap}>
            <FlatList
              horizontal
              data={CITY_LANDMARKS}
              keyExtractor={(_, i) => String(i)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mapCardsContent}
              renderItem={({ item: lm, index: i }) => (
                <View style={styles.mapCard}>
                  {lm.badge && (
                    <View style={styles.mapCardBadge}>
                      <Text style={styles.mapCardBadgeText}>{lm.badge}</Text>
                    </View>
                  )}
                  <Image source={{ uri: lm.image }} style={styles.mapCardImage} resizeMode="cover" />
                  <View style={styles.mapCardBody}>
                    <Text style={styles.mapCardName}>{lm.name}</Text>
                    <View style={styles.mapCardRating}>
                      <Ionicons name="star" size={12} color="#F59E0B" />
                      <Text style={styles.mapCardRatingText}>{lm.rating} ({lm.reviews} reviews)</Text>
                    </View>
                    <View style={styles.mapCardFooter}>
                      <Text style={[styles.mapCardPrice, lm.priceColor ? { color: lm.priceColor } : {}]}>{lm.price}</Text>
                      <TouchableOpacity style={styles.mapCardBtn}>
                        <Text style={styles.mapCardBtnText}>{lm.action}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── Search Screen ─────────────────────────────────────────────────────────────

function SearchScreen({ onClose, onResults }: { onClose: () => void; onResults: (city: string) => void }) {
  const [query, setQuery] = useState("Seattle");
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);

  const cityLabel = query.trim() || "Seattle";
  const clearAll = () => setRecentSearches([]);
  const handleSubmit = () => { if (query.trim()) onResults(query.trim()); };

  const SEARCH_LANDMARKS = [
    { name: "Space Needle", address: "400 Broad St, Seattle, WA 98109", badge: { label: "TOP RATED", color: COLORS.primary }, image: "https://picsum.photos/seed/needle/120/120" },
    { name: "Pike Place Market", address: "85 Pike St, Seattle, WA 98101", badge: { label: "TRENDING", color: COLORS.orange }, image: "https://picsum.photos/seed/pike/120/120" },
    { name: "Chihuly Garden and Glass", address: "305 Harrison St, WA 98109", image: "https://picsum.photos/seed/glass/120/120" },
    { name: "MoPOP", address: "325 5th Ave N, Seattle, WA 98109", image: "https://picsum.photos/seed/mopop/120/120" },
  ];

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search city or place..."
            placeholderTextColor={COLORS.textMuted}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={handleSubmit}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.searchScrollContent}>
        {recentSearches.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearAll}>
                <Text style={styles.clearAll}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentChips}>
              {recentSearches.map((s, i) => (
                <TouchableOpacity key={i} style={styles.recentChip} onPress={() => setQuery(s)}>
                  <Ionicons name="time-outline" size={14} color={COLORS.orange} />
                  <Text style={styles.recentChipText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <Text style={styles.landmarksTitle}>Top Landmarks in {cityLabel}</Text>
        {SEARCH_LANDMARKS.map((lm, i) => (
          <TouchableOpacity key={i} style={styles.landmarkRow} activeOpacity={0.75} onPress={handleSubmit}>
            <Image source={{ uri: lm.image }} style={styles.landmarkImage} resizeMode="cover" />
            <View style={styles.landmarkInfo}>
              <Text style={styles.landmarkName}>{lm.name}</Text>
              <View style={styles.landmarkAddressRow}>
                <Ionicons name="location-outline" size={12} color={COLORS.textMuted} />
                <Text style={styles.landmarkAddress}>{lm.address}</Text>
              </View>
              {lm.badge && (
                <View style={[styles.badge, { backgroundColor: lm.badge.color + "20" }]}>
                  <Text style={[styles.badgeText, { color: lm.badge.color }]}>{lm.badge.label}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.mapCard} onPress={handleSubmit}>
          <View style={styles.mapOverlay} />
          <View style={styles.mapContent}>
            <View>
              <Text style={styles.mapTitle}>Explore the{"\n"}Grid</Text>
              <Text style={styles.mapSub}>Discover 42 more places{"\n"}around you</Text>
            </View>
            <TouchableOpacity style={styles.openMapBtn} onPress={handleSubmit}>
              <Text style={styles.openMapText}>OPEN{"\n"}MAP</Text>
              <Ionicons name="map" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Explore Screen ────────────────────────────────────────────────────────────

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [resultsCity, setResultsCity] = useState<string | null>(null);

  if (resultsCity) {
    return (
      <CityResultsScreen
        city={resultsCity}
        onBack={() => setResultsCity(null)}
        onSearch={() => { setResultsCity(null); setShowSearch(true); }}
      />
    );
  }

  if (showSearch) {
    return (
      <SearchScreen
        onClose={() => setShowSearch(false)}
        onResults={(city) => { setShowSearch(false); setResultsCity(city); }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require("@/logo.png")} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.logoText}>Letsgo</Text>
        </View>
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <Ionicons name="search" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
        {CATEGORIES.map((cat, i) =>
          activeCategory === i ? (
            <TouchableOpacity key={i} onPress={() => setActiveCategory(i)} style={styles.pillWrapper}>
              <LinearGradient
                colors={["#8B5CF6", "#3B82F6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.pillGradient}
              >
                <Text style={styles.pillTextActive}>{cat}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={i} style={styles.pill} onPress={() => setActiveCategory(i)}>
              <Text style={styles.pillText}>{cat}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.attractionCard}>
          <Image source={{ uri: ATTRACTIONS[activeSlide].image }} style={styles.attractionImage} resizeMode="cover" />
          <View style={styles.dots}>
            {ATTRACTIONS.map((_, i) => (
              <View key={i} style={[styles.dot, activeSlide === i && styles.dotActive]} />
            ))}
          </View>
        </View>
        <View style={styles.attractionInfo}>
          <Text style={styles.attractionName}>{ATTRACTIONS[activeSlide].name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{ATTRACTIONS[activeSlide].rating} Rating ({ATTRACTIONS[activeSlide].reviews})</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.ctaBanner} activeOpacity={0.85}>
          <View>
            <Text style={styles.ctaTitle}>Still No idea where to go?</Text>
            <Text style={styles.ctaSubtitle}>Let us create a plan to you.</Text>
          </View>
          <View style={styles.ctaArrow}>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>

        {FEED.map((item, i) => (
          <View key={i} style={styles.feedCard}>
            <Image source={{ uri: item.image }} style={styles.feedImage} resizeMode="cover" />
            <View style={styles.feedInfo}>
              <Text style={styles.feedTitle}>{item.title}</Text>
              <Text style={styles.feedAuthor}>{item.author}</Text>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add to Itinerary</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>Plan with AI.</Text>
          <Text style={styles.aiSubtitle}>Let our AI build a bespoke itinerary based on your solo rhythm.</Text>
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>START AI PLANNER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },

  // Results
  resultsHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md },
  resultsCity: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  toggleWrap: { flexDirection: "row", marginHorizontal: SPACING.xl, marginBottom: SPACING.lg, backgroundColor: COLORS.gray100, borderRadius: RADIUS.full, padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: SPACING.sm, alignItems: "center", borderRadius: RADIUS.full },
  toggleBtnActive: { backgroundColor: COLORS.white, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  toggleText: { fontSize: 13, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 0.3 },
  toggleTextActive: { color: COLORS.primary },
  listContent: { paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xxxl, gap: SPACING.xl },
  landmarkCard: { borderRadius: RADIUS.xl, overflow: "hidden", backgroundColor: COLORS.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3 },
  landmarkCardImage: { width: "100%", height: 180 },
  landmarkCardBody: { padding: SPACING.lg, gap: SPACING.sm },
  landmarkCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  categoryPill: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full },
  categoryPillText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  landmarkCardName: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  landmarkCardDesc: { fontSize: 14, color: COLORS.gray600, lineHeight: 20 },
  landmarkCardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: SPACING.xs },
  landmarkCardPrice: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  viewMoreBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  viewMoreBtnText: { fontSize: 12, fontWeight: "800", color: COLORS.white, letterSpacing: 0.5 },

  // Map view
  mapContainer: { flex: 1, flexDirection: "column" },
  mapBg: { flex: 1, backgroundColor: "#e8e0d8", position: "relative", overflow: "hidden", minHeight: 300 },
  mapPin: { position: "absolute" },
  mapPinBubble: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.full, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  mapPinText: { fontSize: 11, fontWeight: "700", color: COLORS.text },
  mapPinDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary, marginTop: 2, alignSelf: "center", borderWidth: 2, borderColor: COLORS.white },
  mapCardsWrap: { backgroundColor: COLORS.white, paddingTop: SPACING.md, paddingBottom: SPACING.sm, height: 210 },
  mapCardsContent: { paddingHorizontal: SPACING.xl, gap: SPACING.md, alignItems: "flex-start" },
  mapCard: { width: width * 0.55, borderRadius: RADIUS.xl, overflow: "hidden", backgroundColor: COLORS.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, flexShrink: 0 },
  mapCardBadge: { position: "absolute", top: SPACING.sm, left: SPACING.sm, zIndex: 2, backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full },
  mapCardBadgeText: { fontSize: 9, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  mapCardImage: { width: "100%", height: 100 },
  mapCardBody: { padding: SPACING.md, gap: 4 },
  mapCardName: { fontSize: 13, fontWeight: "700", color: COLORS.text },
  mapCardRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  mapCardRatingText: { fontSize: 11, color: COLORS.textMuted },
  mapCardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 2 },
  mapCardPrice: { fontSize: 13, fontWeight: "700", color: COLORS.text },
  mapCardBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.full },
  mapCardBtnText: { fontSize: 10, fontWeight: "700", color: COLORS.white, letterSpacing: 0.3 },

  // Search
  searchHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, gap: SPACING.md },
  backBtn: { padding: 4 },
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.gray100, borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, gap: SPACING.sm },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.text, fontWeight: "500" },
  searchScrollContent: { paddingBottom: SPACING.xxxl },
  recentSection: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  recentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.md },
  recentTitle: { fontSize: 17, fontWeight: "700", color: COLORS.text },
  clearAll: { fontSize: 12, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  recentChips: { gap: SPACING.sm },
  recentChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.gray200, backgroundColor: COLORS.white },
  recentChipText: { fontSize: 14, color: COLORS.text, fontWeight: "500" },
  landmarksTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text, paddingHorizontal: SPACING.xl, marginBottom: SPACING.md, marginTop: SPACING.sm },
  landmarkRow: { flexDirection: "row", gap: SPACING.md, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  landmarkImage: { width: 80, height: 80, borderRadius: RADIUS.lg },
  landmarkInfo: { flex: 1, justifyContent: "center", gap: 4 },
  landmarkName: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  landmarkAddressRow: { flexDirection: "row", alignItems: "flex-start", gap: 3 },
  landmarkAddress: { fontSize: 12, color: COLORS.textMuted, flex: 1, lineHeight: 16 },
  badge: { alignSelf: "flex-start", paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full, marginTop: 2 },
  badgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,60,80,0.45)" },
  mapContent: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: SPACING.xl },
  mapTitle: { fontSize: 24, fontWeight: "800", color: COLORS.white, lineHeight: 28 },
  mapSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 6, lineHeight: 17 },
  openMapBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderRadius: RADIUS.full },
  openMapText: { fontSize: 12, fontWeight: "800", color: COLORS.white, textAlign: "center", letterSpacing: 0.5 },

  // Explore
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md },
  logoRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  logoImage: { width: 34, height: 34 },
  logoText: { fontSize: 22, fontWeight: "800", color: COLORS.primary },
  categoryScroll: { maxHeight: 44 },
  categoryContent: { paddingHorizontal: SPACING.xl, gap: SPACING.sm, alignItems: "center" },
  pillWrapper: { borderRadius: RADIUS.full, overflow: "hidden" },
  pillGradient: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: RADIUS.full },
  pill: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: RADIUS.full, backgroundColor: COLORS.gray100 },
  pillText: { fontSize: 13, fontWeight: "600", color: COLORS.gray600 },
  pillTextActive: { fontSize: 13, fontWeight: "700", color: COLORS.white },
  scrollContent: { paddingBottom: SPACING.xxxl },
  attractionCard: { marginHorizontal: SPACING.xl, marginTop: SPACING.lg, borderRadius: RADIUS.xl, overflow: "hidden" },
  attractionImage: { width: "100%", height: 220 },
  dots: { position: "absolute", bottom: SPACING.md, alignSelf: "center", flexDirection: "row", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.5)" },
  dotActive: { backgroundColor: COLORS.white, width: 18 },
  attractionInfo: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.lg },
  attractionName: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  ratingText: { fontSize: 13, color: COLORS.textMuted },
  ctaBanner: { marginHorizontal: SPACING.xl, backgroundColor: COLORS.orange, borderRadius: RADIUS.xl, padding: SPACING.xl, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: SPACING.xxl },
  ctaTitle: { fontSize: 17, fontWeight: "700", color: COLORS.white },
  ctaSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 2 },
  ctaArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.xl, marginBottom: SPACING.md },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  viewAll: { fontSize: 13, fontWeight: "600", color: COLORS.primary },
  feedCard: { flexDirection: "row", marginHorizontal: SPACING.xl, marginBottom: SPACING.md, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2, overflow: "hidden" },
  feedImage: { width: 90, height: 90 },
  feedInfo: { flex: 1, padding: SPACING.md, justifyContent: "space-between" },
  feedTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text, lineHeight: 20 },
  feedAuthor: { fontSize: 12, color: COLORS.textMuted },
  addBtn: { alignSelf: "flex-end", backgroundColor: COLORS.primary, paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: RADIUS.full },
  addBtnText: { fontSize: 12, fontWeight: "700", color: COLORS.white },
  aiCard: { marginHorizontal: SPACING.xl, marginTop: SPACING.xxl, backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl, padding: SPACING.xxl, alignItems: "center", gap: SPACING.md },
  aiTitle: { fontSize: 26, fontWeight: "800", color: COLORS.text },
  aiSubtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: "center", lineHeight: 20 },
  aiButton: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.xxl, paddingVertical: SPACING.md, borderRadius: RADIUS.full, marginTop: SPACING.sm },
  aiButtonText: { fontSize: 13, fontWeight: "800", color: COLORS.white, letterSpacing: 1 },
});
