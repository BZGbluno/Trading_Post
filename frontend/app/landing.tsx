import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ListingCard, type ListingItem } from "../components/landing-card";

const listings: ListingItem[] = [
  {
    id: "1",
    title: "Zip Hoodie",
    sizeDistance: "L · 1.2 mi",
    wants: "Crewnecks",
    color: "#F3E8FF",
    badgeColor: "#F8C2FF",
    liked: true,
  },
  {
    id: "2",
    title: "Baggy Jeans",
    sizeDistance: "32 · 0.6 mi",
    wants: "Hoodies",
    color: "#E8F4FF",
    badgeColor: "#D6E8FF",
  },
  {
    id: "3",
    title: "Graphic Tee",
    sizeDistance: "M · 0.9 mi",
    wants: "Anything",
    color: "#FFF4E1",
    badgeColor: "#FFE5B7",
  },
  {
    id: "4",
    title: "Quarter Zip",
    sizeDistance: "S · 1.4 mi",
    wants: "Jeans",
    color: "#DCE7FF",
    badgeColor: "#B8D0FF",
    liked: true,
  },
  {
    id: "5",
    title: "Cargo Pants",
    sizeDistance: "30 · 1.1 mi",
    wants: "Hoodies",
    color: "#F7F0FF",
    badgeColor: "#E9D7FE",
  },
  {
    id: "6",
    title: "Knit Sweater",
    sizeDistance: "S · 2.0 mi",
    wants: "Anything",
    color: "#F0FFF4",
    badgeColor: "#D5F7D2",
  },
];

export default function LandingScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.heading}>matches for you</Text>
          <Text style={styles.subheading}>Personalized item swaps for your style</Text>
        </View>
        <View style={styles.iconChip}>
          <Text style={styles.iconEmoji}>💖</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]} activeOpacity={0.85}>
          <Text style={[styles.filterText, styles.filterTextActive]}>Best Mattts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
          <Text style={styles.filterText}>Nearby</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchBadgeText}>IT'S A MATCH!</Text>
        </View>
        <Text style={styles.heroTitle}>You & cool liked each other’s items</Text>
        <Text style={styles.heroDescription}>2 items you liked · 2 items kayla liked</Text>

        <View style={styles.heroFooter}>
          <View style={styles.clothingRow}>
            <View style={[styles.clothingItem, { backgroundColor: "#FBBF24" }]}>
              <Text style={styles.clothingEmoji}>👕</Text>
            </View>
            <View style={[styles.clothingItem, { backgroundColor: "#7C3AED" }]}>
              <Text style={styles.clothingEmoji}>👖</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.messageButton} activeOpacity={0.85}>
            <MaterialIcons name="chat" size={18} color="#6B21A8" />
            <Text style={styles.messageButtonText}>Message kayla</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionCard}>
        <View>
          <Text style={styles.actionTitle}>New matches just for you!</Text>
          <Text style={styles.actionDescription}>We found 6 people who liked your items</Text>
        </View>
        <View style={styles.actionFooter}>
          <View style={styles.miniAvatars}>
            <View style={[styles.miniAvatar, { backgroundColor: "#FBBF24" }]}>
              <Text style={styles.miniAvatarLabel}>A</Text>
            </View>
            <View style={[styles.miniAvatar, { backgroundColor: "#7C3AED" }]}>
              <Text style={styles.miniAvatarLabel}>M</Text>
            </View>
            <View style={[styles.miniAvatar, { backgroundColor: "#10B981" }]}>
              <Text style={styles.miniAvatarLabel}>S</Text>
            </View>
            <View style={styles.miniAvatarMore}>
              <Text style={styles.miniAvatarMoreText}>+2</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.arrowButton} activeOpacity={0.85}>
            <MaterialIcons name="chevron-right" size={24} color="#7C3AED" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.grid}>
        {listings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </View>

      <TouchableOpacity style={styles.footerCard} activeOpacity={0.85}>
        <View style={styles.footerIconWrapper}>
          <MaterialIcons name="sentiment-satisfied" size={20} color="#7C3AED" />
        </View>
        <View style={styles.footerTextGroup}>
          <Text style={styles.footerTitle}>NEW TO SWAP FITS?</Text>
          <Text style={styles.footerSubtitle}>Read our tips for safe & successful trades</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#7C3AED" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FAF7FF",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  heading: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1F2937",
    textTransform: "capitalize",
  },
  subheading: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 240,
    fontFamily: "Inter_400Regular",
  },
  iconChip: {
    backgroundColor: "#F3E8FF",
    padding: 12,
    borderRadius: 18,
    minWidth: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  iconEmoji: {
    fontSize: 18,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  filterButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  filterButtonActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  filterText: {
    color: "#4B5563",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "white",
  },
  heroCard: {
    backgroundColor: "#7C3AED",
    borderRadius: 28,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  matchBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  matchBadgeText: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 34,
    marginBottom: 12,
  },
  heroDescription: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
    maxWidth: 280,
  },
  heroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clothingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  clothingItem: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  clothingEmoji: {
    fontSize: 20,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "white",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  messageButtonText: {
    color: "#6B21A8",
    fontWeight: "700",
    fontSize: 14,
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  actionTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  actionDescription: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 16,
    maxWidth: 260,
  },
  actionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  miniAvatars: {
    flexDirection: "row",
  },
  miniAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  miniAvatarLabel: {
    color: "white",
    fontWeight: "700",
  },
  miniAvatarMore: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
    borderWidth: 2,
    borderColor: "white",
  },
  miniAvatarMoreText: {
    color: "#7C3AED",
    fontWeight: "800",
    fontSize: 12,
  },
  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "space-between",
  },
  footerCard: {
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  footerIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  footerTextGroup: {
    flex: 1,
  },
  footerTitle: {
    color: "#1F2937",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 2,
  },
  footerSubtitle: {
    color: "#6B7280",
    fontSize: 12,
  },
});