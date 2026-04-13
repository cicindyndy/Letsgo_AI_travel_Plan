import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";

const { width } = Dimensions.get("window");

const MEETUPS = [
  {
    title: "Brooklyn Social Mix",
    date: "Oct 24",
    time: "7:00 PM",
    category: "SOCIAL",
    categoryColor: "#6C47FF",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
  },
  {
    title: "Rome Walking Tour",
    date: "Oct 26",
    time: "9:00 AM",
    category: "ADVENTURE",
    categoryColor: "#FF7B47",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400",
  },
];

const CONNECT = [
  { name: "Sarah J.", destination: "HEADING TO: TOKYO", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
  { name: "Mark D.", destination: "HEADING TO: ICELAND", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
  { name: "Elena K.", destination: "HEADING TO: NEW YORK", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
];

// ─── Event Detail Screen ─────────────────────────────────────────────────────
function EventDetailScreen({ onBack }: { onBack: () => void }) {
  const VIBES = ["Cocktails", "Solo Friendly", "Low-Key", "No Couples"];
  const JOINERS = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60",
  ];

  const MapPin = () => (
    <View style={styles.mapPlaceholder}>
      <View style={styles.mapPinOuter}>
        <View style={styles.mapPinInner}>
          <Ionicons name="location" size={20} color={COLORS.primary} />
        </View>
      </View>
      <View style={styles.mapPinShadow} />
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Hub</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <View style={styles.detailHero}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700" }}
            style={styles.detailHeroImage}
            resizeMode="cover"
          />
          <View style={styles.detailHeroOverlay} />
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={12} color={COLORS.white} />
            <Text style={styles.verifiedText}>VERIFIED SAFE</Text>
          </View>
        </View>

        {/* Title + description */}
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>Brooklyn Social Mix</Text>
          <Text style={styles.detailDesc}>
            A casual evening for solo travelers to swap stories over cocktails. Experience the heartbeat of the borough through shared laughter and new connections.
          </Text>

          <TouchableOpacity style={styles.joinBtn}>
            <Text style={styles.joinBtnText}>JOIN MEETUP</Text>
          </TouchableOpacity>

          {/* Time */}
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            <View>
              <Text style={styles.infoLabel}>TIME</Text>
              <Text style={styles.infoValue}>7:00 PM — 10:00 PM</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.infoCard}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <View>
              <Text style={styles.infoLabel}>LOCATION</Text>
              <Text style={styles.infoValue}>The Alchemist Bar, BK</Text>
            </View>
          </View>

          {/* Who's Joining */}
          <Text style={styles.whoTitle}>Who's Joining</Text>
          <View style={styles.whoRow}>
            <View style={styles.whoAvatarStack}>
              {JOINERS.map((u, i) => (
                <Image key={i} source={{ uri: u }} style={[styles.whoAvatar, { left: i * 22 }]} />
              ))}
              <View style={[styles.whoAvatar, styles.whoMore, { left: JOINERS.length * 22 }]}>
                <Text style={styles.whoMoreText}>+14</Text>
              </View>
            </View>
            <Text style={styles.whoConfirmed}>18 travelers{"\n"}confirmed</Text>
          </View>

          {/* Map placeholder */}
          <MapPin />

          {/* Vibe Check */}
          <View style={styles.vibeSection}>
            <Text style={styles.vibeLabel}>VIBE CHECK</Text>
            <View style={styles.vibeRow}>
              {VIBES.map((v) => (
                <View key={v} style={styles.vibeChip}>
                  <Text style={styles.vibeChipText}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Elena K. Profile Screen ─────────────────────────────────────────────────
function ElenaProfileScreen({ onBack, onInvite }: { onBack: () => void; onInvite: () => void }) {
  const INTERESTS = [
    { label: "Coffee", icon: "cafe-outline" as const },
    { label: "Hiking", icon: "walk-outline" as const },
    { label: "Photography", icon: "camera-outline" as const },
  ];
  const PAST = [
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200",
  ];
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Hub</Text>
        <TouchableOpacity><Ionicons name="add" size={26} color={COLORS.text} /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <View style={styles.profileAvatarWrap}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300" }}
            style={styles.profileAvatar}
          />
          <View style={styles.profileVerifiedBadge}>
            <Ionicons name="checkmark" size={14} color={COLORS.white} />
          </View>
        </View>

        {/* Name & info */}
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Elena K.</Text>
          <Text style={styles.profileSub}>Based in Lisbon • 4.98 Rating</Text>
          <View style={styles.profileDestRow}>
            <Ionicons name="location-outline" size={13} color={COLORS.primary} />
            <Text style={styles.profileDest}>HEADING TO: NEW YORK CITY</Text>
          </View>
          <Text style={styles.profileBio}>
            "Avid hiker and coffee lover, currently exploring NYC! Looking for local secrets and fellow explorers."
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewProfileLink}>View Profile {">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Shared Interests */}
        <View style={styles.profileSection}>
          <Text style={styles.profileSectionLabel}>SHARED INTERESTS</Text>
          <View style={styles.interestRow}>
            {INTERESTS.map((it) => (
              <View key={it.label} style={styles.interestChip}>
                <Ionicons name={it.icon} size={13} color={COLORS.white} />
                <Text style={styles.interestChipText}>{it.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Connections */}
        <View style={styles.connectionCard}>
          <Text style={styles.connectionLabel}>CONNECTIONS</Text>
          <View style={styles.sharedTripRow}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.orange} />
            <Text style={styles.sharedTripText}>Shared trip dates: Dec 12–15</Text>
          </View>
        </View>

        {/* Coffee Chat */}
        <View style={styles.coffeeChatCard}>
          <View style={styles.coffeeChatTop}>
            <Ionicons name="cafe-outline" size={20} color={COLORS.white} />
            <View style={styles.verifiedSafePill}>
              <Text style={styles.verifiedSafePillText}>VERIFIED SAFE</Text>
            </View>
          </View>
          <Text style={styles.coffeeChatTitle}>Coffee Chat</Text>
          <Text style={styles.coffeeChatDesc}>
            Quick 15-min meetups in safe public spaces. Perfect for a quick tip or local vibe check.
          </Text>
        </View>

        {/* Languages */}
        <View style={styles.languagesCard}>
          <View style={styles.languagesHeader}>
            <Ionicons name="globe-outline" size={20} color={COLORS.text} />
            <Text style={styles.languagesTitle}>Languages</Text>
          </View>
          <View style={styles.languageRow}>
            {["English", "Japanese", "French"].map((l) => (
              <View key={l} style={styles.languageChip}>
                <Text style={styles.languageChipText}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA buttons */}
        <TouchableOpacity style={styles.inviteCoffeeBtn} onPress={onInvite}>
          <Ionicons name="cafe-outline" size={16} color={COLORS.white} />
          <Text style={styles.inviteCoffeeBtnText}>INVITE FOR COFFEE CHAT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendMsgOutlineBtn}>
          <Ionicons name="send-outline" size={15} color={COLORS.text} />
          <Text style={styles.sendMsgOutlineText}>SEND MESSAGE</Text>
        </TouchableOpacity>

        {/* Past Explorations */}
        <View style={styles.pastSection}>
          <View style={styles.pastHeader}>
            <Text style={styles.sectionTitle}>Past Explorations</Text>
            <Text style={styles.pastCount}>24 Adventures</Text>
          </View>
          <View style={styles.pastGrid}>
            {PAST.map((u, i) => (
              <Image key={i} source={{ uri: u }} style={styles.pastThumb} resizeMode="cover" />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Coffee Chat Invite Screen ────────────────────────────────────────────────
function CoffeeChatScreen({ onBack, onSend }: { onBack: () => void; onSend: () => void }) {
  const TIME_SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];
  const [selectedTime, setSelectedTime] = useState("10:30 AM");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Hub</Text>
        <TouchableOpacity><Ionicons name="add" size={26} color={COLORS.text} /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.inviteScroll}>
        {/* Hero text */}
        <View style={styles.inviteHero}>
          <View style={styles.nextStepBadge}>
            <Text style={styles.nextStepText}>NEXT STEP</Text>
          </View>
          <Text style={styles.inviteHeading}>Coffee</Text>
          <Text style={styles.inviteAccent}>Chat.</Text>
          <Text style={styles.inviteDesc}>
            Compose your invitation to connect with a fellow explorer in Lisbon.
          </Text>
        </View>

        {/* Person card */}
        <View style={styles.invitePersonCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" }}
            style={styles.invitePersonAvatar}
          />
          <View style={styles.invitePersonInfo}>
            <Text style={styles.invitePersonName}>Elena Karsten</Text>
            <Text style={styles.invitePersonSub}>Architect & Urban Sketcher • Rome</Text>
            <View style={styles.inviteTagsRow}>
              <View style={[styles.inviteTag, { backgroundColor: "#1B9E77" }]}>
                <Text style={styles.inviteTagText}>LISBON LOCAL</Text>
              </View>
              <View style={[styles.inviteTag, { backgroundColor: "#1B9E77" }]}>
                <Text style={styles.inviteTagText}>COFFEE LOVER</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Verified safe */}
        <View style={styles.inviteVerifiedCard}>
          <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteVerifiedTitle}>Verified Safe Connection</Text>
            <Text style={styles.inviteVerifiedSub}>
              Elena's identity has been verified by the Letsgo community.
            </Text>
          </View>
        </View>

        {/* Suggest a time */}
        <Text style={styles.inviteFieldLabel}>SUGGEST A TIME</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeSlotRow}>
          {TIME_SLOTS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timeSlot, selectedTime === t && styles.timeSlotActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeSlotText, selectedTime === t && styles.timeSlotTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Meeting point */}
        <Text style={[styles.inviteFieldLabel, { marginTop: SPACING.lg }]}>SUGGESTED MEETING POINT</Text>
        <View style={styles.meetingPointInput}>
          <Text style={styles.meetingPointText}>Fabrica Coffee Roasters, Baixa</Text>
          <Ionicons name="location-outline" size={16} color={COLORS.textMuted} />
        </View>

        {/* Place image */}
        <View style={styles.placeImageCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700" }}
            style={styles.placeImage}
            resizeMode="cover"
          />
          <View style={styles.recommendedBadge}>
            <Ionicons name="star" size={10} color={COLORS.orange} />
            <Text style={styles.recommendedText}>Recommended for Chats</Text>
          </View>
        </View>

        {/* Personal note */}
        <Text style={[styles.inviteFieldLabel, { marginTop: SPACING.lg }]}>PERSONAL NOTE</Text>
        <View style={styles.personalNoteBox}>
          <Text style={styles.personalNotePlaceholder}>
            Hi Elena! I'd love to hear your thoughts on Lisbon's modern architecture...
          </Text>
        </View>

        <TouchableOpacity style={styles.sendInviteBtn} onPress={onSend}>
          <Text style={styles.sendInviteBtnText}>SEND INVITATION</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── You're All Set Screen ────────────────────────────────────────────────────
function AllSetScreen({ onDone }: { onDone: () => void }) {
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: "#F9F7FF" }]} edges={["top"]}>
      <View style={styles.allSetHeader}>
        <TouchableOpacity onPress={onDone}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.allSetScroll}>
        {/* Check icon */}
        <View style={styles.allSetIconWrap}>
          <View style={styles.allSetIcon}>
            <Ionicons name="checkmark" size={36} color={COLORS.white} />
          </View>
        </View>

        <Text style={styles.allSetTitle}>You're all set!</Text>
        <Text style={styles.allSetSub}>
          Your invite to{" "}
          <Text style={{ color: COLORS.primary, fontWeight: "700" }}>Elena Karsten</Text>
          {"\n"}has been sent!
        </Text>

        {/* Booking card */}
        <View style={styles.allSetCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" }}
            style={styles.allSetCardAvatar}
          />
          <View style={styles.allSetCardInfo}>
            <View style={styles.allSetChatLabel}>
              <Ionicons name="cafe-outline" size={12} color={COLORS.primary} />
              <Text style={styles.allSetChatLabelText}>COFFEE CHAT</Text>
            </View>
            <Text style={styles.allSetCardTitle}>Fabrica Coffee{"\n"}Roasters</Text>
            <View style={styles.allSetDateRow}>
              <Ionicons name="calendar-outline" size={13} color={COLORS.textMuted} />
              <Text style={styles.allSetDateText}>Tomorrow, 10:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Response info */}
        <View style={styles.allSetInfoCard}>
          <View style={styles.allSetClockWrap}>
            <Ionicons name="time" size={20} color={COLORS.white} />
          </View>
          <Text style={styles.allSetInfoText}>
            Elena typically responds quickly. She has{" "}
            <Text style={{ textDecorationLine: "underline", fontWeight: "600" }}>48 hours</Text>
            {" "}to accept the invitation.
          </Text>
        </View>

        <TouchableOpacity style={styles.backToExploreBtn} onPress={onDone}>
          <Text style={styles.backToExploreBtnText}>BACK TO EXPLORE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Main Meetup Screen ───────────────────────────────────────────────────────
export default function MeetupScreen() {
  const [screen, setScreen] = useState<"main" | "detail" | "profile" | "invite" | "sent">("main");

  if (screen === "sent") return <AllSetScreen onDone={() => setScreen("main")} />;
  if (screen === "invite") return <CoffeeChatScreen onBack={() => setScreen("profile")} onSend={() => setScreen("sent")} />;
  if (screen === "profile") return <ElenaProfileScreen onBack={() => setScreen("main")} onInvite={() => setScreen("invite")} />;
  if (screen === "detail") return <EventDetailScreen onBack={() => setScreen("main")} />;

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Hub</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Upcoming Meetups */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.happeningSoon}>HAPPENING SOON</Text>
            <Text style={styles.sectionTitle}>Upcoming Meetups</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.meetupScroll} contentContainerStyle={styles.meetupScrollContent}>
          {MEETUPS.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={styles.meetupCard}
              activeOpacity={0.9}
              onPress={() => m.title === "Brooklyn Social Mix" && setScreen("detail")}
            >
              <Image source={{ uri: m.image }} style={styles.meetupImage} resizeMode="cover" />
              <View style={styles.meetupOverlay} />
              <View style={[styles.categoryBadge, { backgroundColor: m.categoryColor }]}>
                <Text style={styles.categoryText}>{m.category}</Text>
              </View>
              <View style={styles.meetupInfo}>
                <Text style={styles.meetupTitle}>{m.title}</Text>
                <View style={styles.meetupMeta}>
                  <Ionicons name="calendar-outline" size={12} color={COLORS.white} />
                  <Text style={styles.meetupMetaText}>{m.date}</Text>
                  <Ionicons name="time-outline" size={12} color={COLORS.white} />
                  <Text style={styles.meetupMetaText}>{m.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Live Community Feed */}
        <View style={styles.feedSection}>
          <Text style={styles.sectionTitle}>Live Community Feed</Text>
          <Text style={styles.feedSubtitle}>Real-time snapshots from travelers worldwide</Text>
        </View>

        {/* Post 1 — photo post */}
        <View style={styles.postCard}>
          <View style={styles.justPostedBadge}>
            <Text style={styles.justPostedText}>JUST POSTED</Text>
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700" }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={styles.postActions}>
            <View style={styles.postActionGroup}>
              <Ionicons name="heart-outline" size={20} color={COLORS.text} />
              <Text style={styles.postActionCount}>1.2k</Text>
            </View>
            <View style={styles.postActionGroup}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.text} />
              <Text style={styles.postActionCount}>84</Text>
            </View>
            <Ionicons name="bookmark-outline" size={20} color={COLORS.text} style={{ marginLeft: "auto" }} />
          </View>
          <Text style={styles.postCaption}>
            Finally booked my flight to Tokyo! 🎌 Exploring Shinjuku and looking for coffee shop buddies. Who's around next Tuesday?
          </Text>
        </View>

        {/* Post 2 — Looking for a buddy */}
        <View style={styles.buddyCard}>
          <View style={styles.buddyHeader}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" }}
              style={styles.buddyAvatar}
            />
            <View style={styles.buddyMeta}>
              <Text style={styles.buddyName}>Marcus Thorne</Text>
              <View style={styles.lookingBadge}>
                <Ionicons name="person-add-outline" size={10} color={COLORS.primary} />
                <Text style={styles.lookingText}>LOOKING FOR A BUDDY</Text>
              </View>
            </View>
          </View>
          <View style={styles.activityRow}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300" }}
              style={styles.activityImage}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Hiking El Capitan</Text>
              <Text style={styles.activityLocation}>Yosemite National Park</Text>
              <Text style={styles.activityDistance}>• 12mi Loop</Text>
              <TouchableOpacity style={styles.joinTrekBtn}>
                <Text style={styles.joinTrekText}>JOIN THE TREK</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.buddyCaption}>
            Heading to Yosemite this weekend for the El Capitan loop. Looking for an experienced buddy to join the trek! 🧗 Intermediate level required.
          </Text>
          <TouchableOpacity style={styles.sendMsgBtn}>
            <Text style={styles.sendMsgText}>SEND MESSAGE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Post 3 — Elena Rossi */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" }}
              style={styles.postAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.posterName}>Elena Rossi</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color={COLORS.textMuted} />
                <Text style={styles.locationText}>At Amalfi Coast, Italy</Text>
              </View>
            </View>
            <Ionicons name="ellipsis-horizontal" size={18} color={COLORS.textMuted} />
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=700" }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={styles.postActions}>
            <View style={styles.postActionGroup}>
              <Ionicons name="heart-outline" size={20} color={COLORS.text} />
              <Text style={styles.postActionCount}>3.8k</Text>
            </View>
            <View style={styles.postActionGroup}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.text} />
              <Text style={styles.postActionCount}>112</Text>
            </View>
            <Ionicons name="bookmark-outline" size={20} color={COLORS.text} style={{ marginLeft: "auto" }} />
          </View>
          <Text style={styles.postCaption}>
            Magical sunset in Positano. 🌅 If you're in the area, we're having a small dinner meetup at Da Adolfo tomorrow! DM for details.
          </Text>
        </View>

        {/* Connect by Interest */}
        <View style={styles.connectSection}>
          <Text style={styles.sectionTitle}>Connect by Interest</Text>
          <Text style={styles.feedSubtitle}>Match with travelers heading to the same spot.</Text>
          {CONNECT.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.connectRow}
              activeOpacity={0.7}
              onPress={() => c.name === "Elena K." && setScreen("profile")}
            >
              <Image source={{ uri: c.avatar }} style={styles.connectAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.connectName}>{c.name}</Text>
                <Text style={styles.connectDest}>{c.destination}</Text>
              </View>
              <TouchableOpacity style={styles.msgBtn}>
                <Ionicons name="chatbubble-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.findMateBtn}>
            <Text style={styles.findMateBtnText}>FIND MY TRAVEL MATE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_W = width * 0.6;

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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  happeningSoon: { fontSize: 11, fontWeight: "700", color: COLORS.primary, letterSpacing: 1, marginBottom: 2 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  seeAll: { fontSize: 13, fontWeight: "600", color: COLORS.primary },
  meetupScroll: { marginBottom: SPACING.xxl },
  meetupScrollContent: { paddingHorizontal: SPACING.xl, gap: SPACING.md },
  meetupCard: {
    width: CARD_W,
    height: 180,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    backgroundColor: COLORS.gray200,
  },
  meetupImage: { width: "100%", height: "100%" },
  meetupOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  categoryBadge: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  categoryText: { fontSize: 10, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  meetupInfo: { position: "absolute", bottom: SPACING.md, left: SPACING.md, right: SPACING.md },
  meetupTitle: { fontSize: 15, fontWeight: "700", color: COLORS.white, marginBottom: 4 },
  meetupMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  meetupMetaText: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginRight: 4 },
  feedSection: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.md, gap: 4 },
  feedSubtitle: { fontSize: 13, color: COLORS.textMuted },
  postCard: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
  },
  postAvatar: { width: 38, height: 38, borderRadius: 19 },
  posterName: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 2 },
  locationText: { fontSize: 11, color: COLORS.textMuted },
  justPostedBadge: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 2,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  justPostedText: { fontSize: 9, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  postImage: { width: "100%", height: 200 },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
  },
  postActionGroup: { flexDirection: "row", alignItems: "center", gap: 4 },
  postActionCount: { fontSize: 13, color: COLORS.text, fontWeight: "600" },
  postCaption: {
    fontSize: 13,
    color: COLORS.gray600,
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  buddyCard: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    gap: SPACING.md,
  },
  buddyHeader: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  buddyAvatar: { width: 42, height: 42, borderRadius: 21 },
  buddyMeta: { gap: 4 },
  buddyName: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  lookingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
  },
  lookingText: { fontSize: 9, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  activityRow: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  activityImage: { width: 80, height: 80 },
  activityInfo: { flex: 1, padding: SPACING.sm, gap: 2 },
  activityTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  activityLocation: { fontSize: 11, color: COLORS.textMuted },
  activityDistance: { fontSize: 11, color: COLORS.textMuted },
  joinTrekBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  joinTrekText: { fontSize: 9, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  buddyCaption: { fontSize: 13, color: COLORS.gray600, lineHeight: 18 },
  sendMsgBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  sendMsgText: { fontSize: 13, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  shareBtn: {
    position: "absolute",
    bottom: SPACING.md,
    right: SPACING.md,
  },
  connectSection: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  connectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  connectAvatar: { width: 40, height: 40, borderRadius: 20 },
  connectName: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  connectDest: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 0.5 },
  msgBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  findMateBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  findMateBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },

  // Elena profile
  profileAvatarWrap: { alignItems: "center", paddingTop: SPACING.lg, position: "relative" },
  profileAvatar: { width: 110, height: 110, borderRadius: RADIUS.xl, backgroundColor: COLORS.gray200 },
  profileVerifiedBadge: {
    position: "absolute", bottom: 0, right: width / 2 - 55 - 4,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: COLORS.white,
  },
  profileInfo: { alignItems: "center", paddingHorizontal: SPACING.xl, paddingVertical: SPACING.lg, gap: SPACING.sm },
  profileName: { fontSize: 30, fontWeight: "800", color: COLORS.text },
  profileSub: { fontSize: 13, color: COLORS.textMuted },
  profileDestRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  profileDest: { fontSize: 12, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  profileBio: { fontSize: 14, color: COLORS.gray600, textAlign: "center", lineHeight: 22, fontStyle: "italic" },
  viewProfileLink: { fontSize: 13, fontWeight: "700", color: COLORS.primary },
  profileSection: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.md },
  profileSectionLabel: { fontSize: 11, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1, marginBottom: SPACING.sm },
  interestRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  interestChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "#1B9E77",
    paddingHorizontal: SPACING.md, paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  interestChipText: { fontSize: 13, fontWeight: "700", color: COLORS.white },
  connectionCard: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.md,
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl, padding: SPACING.lg, gap: SPACING.sm,
  },
  connectionLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1 },
  sharedTripRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  sharedTripText: { fontSize: 13, fontWeight: "600", color: COLORS.text },
  coffeeChatCard: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.md,
    backgroundColor: COLORS.primary, borderRadius: RADIUS.xl, padding: SPACING.lg, gap: SPACING.sm,
  },
  coffeeChatTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  verifiedSafePill: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full,
  },
  verifiedSafePillText: { fontSize: 10, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  coffeeChatTitle: { fontSize: 18, fontWeight: "800", color: COLORS.white },
  coffeeChatDesc: { fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 20 },
  languagesCard: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.lg,
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl, padding: SPACING.lg, gap: SPACING.md,
  },
  languagesHeader: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  languagesTitle: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  languageRow: { flexDirection: "row", gap: SPACING.sm },
  languageChip: {
    paddingHorizontal: SPACING.md, paddingVertical: 5,
    backgroundColor: COLORS.white, borderRadius: RADIUS.full,
    borderWidth: 1, borderColor: COLORS.gray200,
  },
  languageChipText: { fontSize: 13, color: COLORS.text, fontWeight: "500" },
  inviteCoffeeBtn: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.md,
    backgroundColor: COLORS.primary, borderRadius: RADIUS.full,
    paddingVertical: SPACING.lg, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  inviteCoffeeBtnText: { fontSize: 14, fontWeight: "800", color: COLORS.white, letterSpacing: 0.8 },
  sendMsgOutlineBtn: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.xl,
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.full,
    paddingVertical: SPACING.lg, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  sendMsgOutlineText: { fontSize: 14, fontWeight: "700", color: COLORS.text, letterSpacing: 0.5 },
  pastSection: { marginHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  pastHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: SPACING.md },
  pastCount: { fontSize: 13, color: COLORS.textMuted, fontWeight: "600" },
  pastGrid: { flexDirection: "row", gap: SPACING.sm },
  pastThumb: { flex: 1, height: 80, borderRadius: RADIUS.lg, backgroundColor: COLORS.gray200 },

  // Coffee Chat invite
  inviteScroll: { paddingBottom: SPACING.xxxl },
  inviteHero: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.lg },
  nextStepBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md, paddingVertical: 4,
    borderRadius: RADIUS.full, marginBottom: SPACING.md,
  },
  nextStepText: { fontSize: 11, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  inviteHeading: { fontSize: 38, fontWeight: "800", color: COLORS.text, lineHeight: 44 },
  inviteAccent: { fontSize: 38, fontWeight: "800", color: COLORS.primary, fontStyle: "italic", lineHeight: 44 },
  inviteDesc: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20, marginTop: SPACING.sm },
  invitePersonCard: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.md,
    backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    borderWidth: 1, borderColor: COLORS.gray200,
    flexDirection: "row", gap: SPACING.md, padding: SPACING.md,
  },
  invitePersonAvatar: { width: 80, height: 90, borderRadius: RADIUS.lg, backgroundColor: COLORS.gray200 },
  invitePersonInfo: { flex: 1, gap: SPACING.sm, justifyContent: "center" },
  invitePersonName: { fontSize: 17, fontWeight: "800", color: COLORS.text },
  invitePersonSub: { fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },
  inviteTagsRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.xs },
  inviteTag: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.sm },
  inviteTagText: { fontSize: 10, fontWeight: "700", color: COLORS.white, letterSpacing: 0.3 },
  inviteVerifiedCard: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.lg,
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl,
    flexDirection: "row", gap: SPACING.md, padding: SPACING.lg, alignItems: "flex-start",
  },
  inviteVerifiedTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  inviteVerifiedSub: { fontSize: 12, color: COLORS.textMuted, lineHeight: 18, marginTop: 2 },
  inviteFieldLabel: { fontSize: 11, fontWeight: "700", color: COLORS.primary, letterSpacing: 1, paddingHorizontal: SPACING.xl, marginBottom: SPACING.sm },
  timeSlotRow: { paddingHorizontal: SPACING.xl, gap: SPACING.sm, paddingBottom: SPACING.xs },
  timeSlot: {
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full, backgroundColor: COLORS.gray100,
    borderWidth: 1, borderColor: COLORS.gray200,
  },
  timeSlotActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  timeSlotText: { fontSize: 13, fontWeight: "600", color: COLORS.gray600 },
  timeSlotTextActive: { color: COLORS.white, fontWeight: "700" },
  meetingPointInput: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.md,
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.md,
  },
  meetingPointText: { fontSize: 14, color: COLORS.gray600, flex: 1 },
  placeImageCard: {
    marginHorizontal: SPACING.xl, borderRadius: RADIUS.xl, overflow: "hidden",
    height: 130, marginBottom: SPACING.md, position: "relative",
  },
  placeImage: { width: "100%", height: "100%" },
  recommendedBadge: {
    position: "absolute", bottom: SPACING.md, left: SPACING.md,
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: COLORS.white, borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md, paddingVertical: 5,
  },
  recommendedText: { fontSize: 12, fontWeight: "700", color: COLORS.text },
  personalNoteBox: {
    marginHorizontal: SPACING.xl, marginBottom: SPACING.xl,
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl,
    padding: SPACING.lg, minHeight: 100,
  },
  personalNotePlaceholder: { fontSize: 14, color: COLORS.textMuted, lineHeight: 22, fontStyle: "italic" },
  sendInviteBtn: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.primary, borderRadius: RADIUS.full,
    paddingVertical: SPACING.lg, alignItems: "center",
  },
  sendInviteBtnText: { fontSize: 14, fontWeight: "800", color: COLORS.white, letterSpacing: 0.8 },

  // All set screen
  allSetHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md,
  },
  doneText: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  allSetScroll: { alignItems: "center", paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xxxl, paddingTop: SPACING.xxl },
  allSetIconWrap: { marginBottom: SPACING.xl },
  allSetIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center",
  },
  allSetTitle: { fontSize: 30, fontWeight: "800", color: COLORS.text, marginBottom: SPACING.sm },
  allSetSub: { fontSize: 15, color: COLORS.gray600, textAlign: "center", lineHeight: 24, marginBottom: SPACING.xl },
  allSetCard: {
    width: "100%", backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    borderWidth: 1, borderColor: COLORS.gray200,
    flexDirection: "row", gap: SPACING.md, padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  allSetCardAvatar: { width: 80, height: 90, borderRadius: RADIUS.lg, backgroundColor: COLORS.gray200 },
  allSetCardInfo: { flex: 1, gap: SPACING.sm, justifyContent: "center" },
  allSetChatLabel: { flexDirection: "row", alignItems: "center", gap: 4 },
  allSetChatLabelText: { fontSize: 11, fontWeight: "700", color: COLORS.primary, letterSpacing: 0.5 },
  allSetCardTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text, lineHeight: 24 },
  allSetDateRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  allSetDateText: { fontSize: 13, color: COLORS.textMuted },
  allSetInfoCard: {
    width: "100%", backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl,
    flexDirection: "row", alignItems: "center", gap: SPACING.md, padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  allSetClockWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#C0392B", alignItems: "center", justifyContent: "center",
  },
  allSetInfoText: { flex: 1, fontSize: 13, color: COLORS.gray600, lineHeight: 20 },
  backToExploreBtn: {
    width: "100%", backgroundColor: COLORS.gray100, borderRadius: RADIUS.full,
    paddingVertical: SPACING.lg, alignItems: "center",
  },
  backToExploreBtnText: { fontSize: 14, fontWeight: "700", color: COLORS.text, letterSpacing: 0.5 },

  // Event detail
  detailHero: { height: 260, position: "relative" },
  detailHeroImage: { width: "100%", height: "100%" },
  detailHeroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.2)" },
  verifiedBadge: {
    position: "absolute",
    top: SPACING.lg,
    left: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#1B9E77",
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  verifiedText: { fontSize: 11, fontWeight: "700", color: COLORS.white, letterSpacing: 0.5 },
  detailContent: { padding: SPACING.xl, gap: SPACING.lg },
  detailTitle: { fontSize: 28, fontWeight: "800", color: COLORS.text },
  detailDesc: { fontSize: 14, color: COLORS.gray600, lineHeight: 22 },
  joinBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: "center",
  },
  joinBtnText: { fontSize: 14, fontWeight: "800", color: COLORS.white, letterSpacing: 0.8 },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  infoLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 0.8, marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  whoTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  whoRow: { flexDirection: "row", alignItems: "center", gap: SPACING.xl },
  whoAvatarStack: { flexDirection: "row", height: 36, width: 5 * 22 + 14 },
  whoAvatar: {
    position: "absolute",
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 2, borderColor: COLORS.white,
    backgroundColor: COLORS.gray200,
  },
  whoMore: {
    backgroundColor: COLORS.primary,
    alignItems: "center", justifyContent: "center",
  },
  whoMoreText: { fontSize: 10, fontWeight: "700", color: COLORS.white },
  whoConfirmed: { fontSize: 13, fontWeight: "600", color: COLORS.text, lineHeight: 20 },
  mapPlaceholder: {
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.xl,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  mapPinOuter: {
    width: 80, height: 90,
    borderRadius: 40,
    backgroundColor: "#4A5568",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    // teardrop shape via skew
  },
  mapPinInner: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center", justifyContent: "center",
  },
  mapPinShadow: {
    width: 24, height: 8,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.15)",
    marginTop: 4,
  },
  vibeSection: { gap: SPACING.sm },
  vibeLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1 },
  vibeRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  vibeChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray100,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  vibeChipText: { fontSize: 13, fontWeight: "600", color: COLORS.text },
});
