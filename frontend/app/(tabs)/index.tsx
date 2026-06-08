import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const storedEmail = await AsyncStorage.getItem("email");

      if (storedEmail) {
        setEmail(storedEmail);
      }
    }

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>{email}</Text> */}
      <Text>po</Text>
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