import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";

const TRAVEL_STYLES = [
  { id: "outdoors", label: "OUTDOORS/NATURE", icon: "leaf-outline" },
  { id: "history", label: "HISTORY/ART/CULTURE", icon: "library-outline" },
  { id: "adventure", label: "ADVENTURE", icon: "walk-outline" },
  { id: "relaxation", label: "RELAXATION", icon: "sunny-outline" },
  { id: "nightlife", label: "NIGHTLIFE", icon: "wine-outline" },
] as const;

const CUISINES = [
  { id: "chinese", label: "CHINESE" },
  { id: "western", label: "WESTERN" },
  { id: "street", label: "LOCAL STREET FOOD" },
  { id: "vegan", label: "VEGAN" },
  { id: "japanese", label: "JAPANESE" },
];

const BUDGET_MIN = 50;
const BUDGET_MAX = 1000;

export default function SmartPlanScreen() {
  const [destination, setDestination] = useState("Kyoto, Japan");
  const [arriveDate, setArriveDate] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [airport, setAirport] = useState("");
  const [hotel, setHotel] = useState("");
  const [travelingSolo, setTravelingSolo] = useState(true);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(250);
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set(["outdoors", "adventure"]));
  const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(new Set(["street", "japanese"]));

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleCuisine = (id: string) => {
    setSelectedCuisines((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const budgetLabel = budget >= BUDGET_MAX ? "$1000+" : `$${budget}`;

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Plan</Text>
        <TouchableOpacity>
          <Ionicons name="arrow-forward" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroHeading}>Design Your</Text>
          <Text style={styles.heroAccent}>Smart Plan.</Text>
          <Text style={styles.heroSub}>
            Tell us your rhythm, and we'll curate a kinetic journey that flows with your travel style.
          </Text>
        </View>

        {/* 01 Destination */}
        <View style={styles.formSection}>
          <Text style={styles.stepLabel}>01 DESTINATION</Text>
          <View style={styles.inputRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="Where to?"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
        </View>

        {/* 02 Logistics */}
        <View style={styles.formSection}>
          <Text style={styles.stepLabel}>02 LOGISTICS</Text>
          <View style={styles.logisticsGroup}>
            <View style={styles.logisticsRow}>
              <Ionicons name="airplane-outline" size={16} color={COLORS.text} style={{ transform: [{ rotate: "45deg" }] }} />
              <Text style={styles.logisticsLabel}>Arriving</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <TextInput
                  style={styles.inputBoxText}
                  value={arriveDate}
                  onChangeText={setArriveDate}
                  placeholder="mm/dd/yyyy"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <TextInput
                  style={styles.inputBoxText}
                  value={arriveTime}
                  onChangeText={setArriveTime}
                  placeholder="--:-- --"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputBoxText}
                value={airport}
                onChangeText={setAirport}
                placeholder="Arriving Airport (e.g., KIX)"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>
          </View>

          <View style={[styles.logisticsGroup, { marginTop: SPACING.md }]}>
            <View style={styles.logisticsRow}>
              <Ionicons name="airplane-outline" size={16} color={COLORS.text} style={{ transform: [{ rotate: "-135deg" }] }} />
              <Text style={styles.logisticsLabel}>Returning</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <TextInput
                  style={styles.inputBoxText}
                  placeholder="mm/dd/yyyy"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <TextInput
                  style={styles.inputBoxText}
                  placeholder="--:-- --"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>
          </View>
        </View>

        {/* 03 Home Base */}
        <View style={styles.formSection}>
          <Text style={styles.stepLabel}>03 HOME BASE</Text>
          <View style={styles.inputRow}>
            <Ionicons name="bed-outline" size={18} color={COLORS.text} />
            <TextInput
              style={styles.input}
              value={hotel}
              onChangeText={setHotel}
              placeholder="Hotel name or address"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
          <View style={styles.soloRow}>
            <View>
              <Text style={styles.soloTitle}>Traveling Solo?</Text>
              <Text style={styles.soloSub}>We'll find the best solo spots.</Text>
            </View>
            <Switch
              value={travelingSolo}
              onValueChange={setTravelingSolo}
              trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* 04 The Crew */}
        <View style={styles.formSection}>
          <Text style={styles.stepLabel}>04 THE CREW</Text>
          <View style={styles.crewRow}>
            <TouchableOpacity
              style={styles.crewBtn}
              onPress={() => setTravelers(Math.max(1, travelers - 1))}
            >
              <Ionicons name="remove" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
            <View style={styles.crewCount}>
              <Text style={styles.crewNumber}>{travelers}</Text>
              <Text style={styles.crewLabel}>TRAVELERS</Text>
            </View>
            <TouchableOpacity
              style={[styles.crewBtn, styles.crewBtnActive]}
              onPress={() => setTravelers(travelers + 1)}
            >
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* 05 Daily Budget */}
          <Text style={[styles.stepLabel, { marginTop: SPACING.xl }]}>05 DAILY BUDGET</Text>
          <View style={styles.budgetRow}>
            <Text style={styles.budgetEndLabel}>$50</Text>
            <View style={styles.budgetSliderTrack}>
              <View
                style={[
                  styles.budgetSliderFill,
                  { width: `${((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%` },
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.budgetThumb,
                  { left: `${((budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%` },
                ]}
              >
                <Text style={styles.budgetThumbText}>{budgetLabel}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.budgetEndLabel}>$1000</Text>
          </View>
        </View>

        {/* 06 Your Rhythm */}
        <View style={styles.formSection}>
          <Text style={styles.stepLabel}>06 YOUR RHYTHM</Text>

          <Text style={styles.prefLabel}>Travel Style Preferences</Text>
          <View style={styles.tagsWrap}>
            {TRAVEL_STYLES.map((s) => {
              const active = selectedStyles.has(s.id);
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.tag, active && styles.tagActive]}
                  onPress={() => toggleStyle(s.id)}
                >
                  <Ionicons name={s.icon as any} size={13} color={active ? COLORS.white : COLORS.gray600} />
                  <Text style={[styles.tagText, active && styles.tagTextActive]}>{s.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.prefLabel, { marginTop: SPACING.md }]}>Cuisine Preferences</Text>
          <View style={styles.tagsWrap}>
            {CUISINES.map((c) => {
              const active = selectedCuisines.has(c.id);
              return (
                <TouchableOpacity
                  key={c.id}
                  style={[styles.tag, active && styles.tagActive]}
                  onPress={() => toggleCuisine(c.id)}
                >
                  <Text style={[styles.tagText, active && styles.tagTextActive]}>{c.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateBtnText}>GENERATE MY SMART PLAN</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>Curating your adventure based on 1.4M data points...</Text>
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
  hero: { paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xxl, gap: 4 },
  heroHeading: { fontSize: 32, fontWeight: "800", color: COLORS.text },
  heroAccent: { fontSize: 32, fontWeight: "800", color: COLORS.primary },
  heroSub: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20, marginTop: SPACING.sm },
  formSection: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  stepLabel: { fontSize: 11, fontWeight: "700", color: COLORS.primary, letterSpacing: 1 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  input: { flex: 1, fontSize: 15, color: COLORS.text },
  logisticsGroup: { gap: SPACING.sm },
  logisticsRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  logisticsLabel: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  dateTimeRow: { flexDirection: "row", gap: SPACING.sm },
  inputBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  inputBoxText: { fontSize: 14, color: COLORS.text },
  soloRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  soloTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  soloSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  crewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xxl,
  },
  crewBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  crewBtnActive: { backgroundColor: COLORS.primary },
  crewCount: { alignItems: "center", gap: 2 },
  crewNumber: { fontSize: 28, fontWeight: "800", color: COLORS.text },
  crewLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 0.5 },
  budgetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingTop: SPACING.sm,
  },
  budgetEndLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: "600", width: 36 },
  budgetSliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
    position: "relative",
    justifyContent: "center",
  },
  budgetSliderFill: {
    position: "absolute",
    left: 0,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  budgetThumb: {
    position: "absolute",
    top: -14,
    marginLeft: -20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  budgetThumbText: { fontSize: 12, fontWeight: "700", color: COLORS.white },
  prefLabel: { fontSize: 13, fontWeight: "600", color: COLORS.gray600 },
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
  },
  tagActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tagText: { fontSize: 12, fontWeight: "700", color: COLORS.gray600 },
  tagTextActive: { color: COLORS.white },
  generateBtn: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.lg,
    alignItems: "center",
    marginTop: SPACING.md,
  },
  generateBtnText: { fontSize: 14, fontWeight: "800", color: COLORS.white, letterSpacing: 0.8 },
  footerNote: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
});
