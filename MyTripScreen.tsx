import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, RADIUS } from "../constants/theme";
import TripCard, { TripCardProps } from "../components/TripCard";
import ItineraryDayRow, { ItineraryDayRowProps } from "../components/ItineraryDayRow";
import SectionHeader from "../components/SectionHeader";
import CTABanner from "../components/CTABanner";

// ─── Data ────────────────────────────────────────────────────────────────────

const TRIPS: TripCardProps[] = [
  {
    title: "New York City Escape",
    destination: "New York, USA",
    dates: "Apr 18 – Apr 21",
    daysCount: 3,
    status: "upcoming",
    imageSource: {
      uri: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=700",
    },
  },
  {
    title: "Bali Temple & Beach Retreat",
    destination: "Bali, Indonesia",
    dates: "Mar 5 – Mar 12",
    daysCount: 7,
    status: "completed",
    imageSource: {
      uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700",
    },
  },
];

const ITINERARY_DAYS: ItineraryDayRowProps[] = [
  {
    dayNumber: 1,
    dayLabel: "Arrival & Midtown",
    activities: [
      { time: "10:00 AM", name: "JFK Airport — Arrive", type: "transport" },
      { time: "1:00 PM", name: "Shake Shack Madison Sq.", type: "food" },
      { time: "3:00 PM", name: "Empire State Building", type: "attraction" },
      { time: "7:00 PM", name: "Hotel Hendricks Check-in", type: "hotel" },
    ],
  },
  {
    dayNumber: 2,
    dayLabel: "Downtown & Brooklyn",
    activities: [
      { time: "9:00 AM", name: "Brooklyn Bridge Walk", type: "attraction" },
      { time: "12:30 PM", name: "Grimaldi's Pizza", type: "food" },
      { time: "2:00 PM", name: "DUMBO Waterfront", type: "attraction" },
      { time: "6:00 PM", name: "Back to Hotel", type: "transport" },
    ],
  },
  {
    dayNumber: 3,
    dayLabel: "Uptown & Departure",
    activities: [
      { time: "9:00 AM", name: "Central Park Morning Stroll", type: "attraction" },
      { time: "11:00 AM", name: "The Met Museum", type: "attraction" },
      { time: "3:00 PM", name: "JFK — Departure", type: "transport" },
    ],
  },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

type Tab = "trips" | "itinerary";

export default function MyTripScreen() {
  const [tab, setTab] = useState<Tab>("trips");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Page header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Trips</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnLabel}>+ New Trip</Text>
        </TouchableOpacity>
      </View>

      {/* Segmented control */}
      <View style={styles.segmentWrap}>
        {(["trips", "itinerary"] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.segment, tab === t && styles.segmentActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.segmentLabel, tab === t && styles.segmentLabelActive]}>
              {t === "trips" ? "All Trips" : "Itinerary"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === "trips" ? (
          <>
            {TRIPS.map((trip, i) => (
              <TripCard key={i} {...trip} onPress={() => {}} />
            ))}
            <CTABanner
              headline="Plan a new adventure?"
              subtext="Let AI build your perfect itinerary."
              onPress={() => {}}
            />
          </>
        ) : (
          <>
            {/* Active trip header */}
            <View style={styles.activeTripHeader}>
              <Text style={styles.activeTripTitle}>🗽 New York City Escape</Text>
              <Text style={styles.activeTripDates}>Apr 18 – Apr 21 · 3 Days</Text>
            </View>

            <SectionHeader title="Day by Day" />

            {ITINERARY_DAYS.map((day) => (
              <ItineraryDayRow key={day.dayNumber} {...day} />
            ))}

            <View style={{ height: SPACING.xl }} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  addBtnLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.white,
  },
  segmentWrap: {
    flexDirection: "row",
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.lg,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderRadius: RADIUS.md,
  },
  segmentActive: {
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray400,
  },
  segmentLabelActive: {
    color: COLORS.text,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  activeTripHeader: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  activeTripTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  activeTripDates: {
    fontSize: 13,
    color: COLORS.primary,
    opacity: 0.75,
    marginTop: 2,
  },
});
