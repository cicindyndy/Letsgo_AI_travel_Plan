import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING } from "../constants/theme";
import CategoryTabs, { Category } from "../components/CategoryTabs";
import MeetupCard, { MeetupCardProps } from "../components/MeetupCard";
import SectionHeader from "../components/SectionHeader";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "hiking", label: "Hiking" },
  { id: "food", label: "Food" },
  { id: "culture", label: "Culture" },
  { id: "nightlife", label: "Nightlife" },
];

const MEETUPS: MeetupCardProps[] = [
  {
    title: "Sunrise Hike at Griffith Observatory",
    location: "Los Angeles, CA",
    date: "Apr 19, 2026",
    time: "5:30 AM",
    category: "Hiking",
    attendees: [
      { initials: "SJ", color: "#7B4FF0" },
      { initials: "DC", color: "#F97B4F" },
      { initials: "AM", color: "#1A9E5C" },
    ],
    totalAttendees: 24,
    joined: true,
    imageSource: {
      uri: "https://images.unsplash.com/photo-1607513746994-51f730a44832?w=700",
    },
    onJoin: () => {},
  },
  {
    title: "Street Food Tour — Chinatown NYC",
    location: "New York, NY",
    date: "Apr 21, 2026",
    time: "11:00 AM",
    category: "Food",
    attendees: [
      { initials: "KL", color: "#F59E0B" },
      { initials: "MR", color: "#EF4444" },
    ],
    totalAttendees: 11,
    joined: false,
    imageSource: {
      uri: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=700",
    },
    onJoin: () => {},
  },
  {
    title: "Rooftop Jazz Night — Brooklyn",
    location: "Brooklyn, NY",
    date: "Apr 25, 2026",
    time: "8:00 PM",
    category: "Nightlife",
    attendees: [
      { initials: "TC", color: "#8B5CF6" },
      { initials: "PW", color: "#06B6D4" },
      { initials: "AB", color: "#F97B4F" },
    ],
    totalAttendees: 38,
    joined: false,
    imageSource: {
      uri: "https://images.unsplash.com/photo-1501386761578-eaa54b3ef1b3?w=700",
    },
    onJoin: () => {},
  },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function MeetupScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Page header */}
      <View style={styles.pageHeader}>
        <View>
          <Text style={styles.pageTitle}>Meetups</Text>
          <Text style={styles.pageSubtitle}>Find travelers near you</Text>
        </View>
        <Text style={styles.mapIcon}>🗺</Text>
      </View>

      {/* Category filter */}
      <CategoryTabs categories={CATEGORIES} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gap} />
        <SectionHeader title="Happening Soon" actionLabel="See all" onAction={() => {}} />
        <View style={{ height: SPACING.sm }} />

        {MEETUPS.map((meetup, i) => (
          <MeetupCard key={i} {...meetup} />
        ))}
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
  pageSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  mapIcon: { fontSize: 26 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  gap: { height: SPACING.md },
});
