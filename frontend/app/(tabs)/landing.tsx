import { View, Text, StyleSheet } from "react-native";

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Text>Landing Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});