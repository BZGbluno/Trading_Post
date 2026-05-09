import { View, Text, StyleSheet } from "react-native";

export default function TradesScreen() {
  return (
    <View style={styles.container}>
      <Text>Trades Screen</Text>
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