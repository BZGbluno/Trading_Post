import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type ListingItem = {
  id: string;
  title: string;
  sizeDistance: string;
  wants: string;
  color: string;
  badgeColor: string;
  liked?: boolean;
};

export function ListingCard({ item }: { item: ListingItem }) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} activeOpacity={0.9}>
      <View style={styles.imageBlock}>
        <Text style={styles.imageLabel}>Image</Text>
        <View style={styles.heartButton}>
          <MaterialIcons name={item.liked ? "favorite" : "favorite-border"} size={18} color={item.liked ? "#BE185D" : "#6B7280"} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.sizeDistance}</Text>
        <View style={[styles.tagPill, { backgroundColor: item.badgeColor }]}> 
          <Text style={styles.tagText}>Wants: {item.wants}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 22,
    marginBottom: 14,
    overflow: "hidden",
  },
  imageBlock: {
    height: 120,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLabel: {
    color: "#374151",
    fontWeight: "700",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },
  tagPill: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
  },
});