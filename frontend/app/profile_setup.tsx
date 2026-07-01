import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { useFonts } from "expo-font";



export default function FillProfileScreen() {
  const [fontsLoaded] = useFonts({ Kalam: require("../assets/fonts/kalam.ttf") });
  const titleImage = require("../assets/images/nice-to-meet-you.png");
  const catImage = require("../assets/images/cat-w-pen.png");
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  async function handleContinue() {
    try {
      await AsyncStorage.setItem("displayName", displayName);
      await AsyncStorage.setItem("username", username);

      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        {/* Header */}
        <Image
          source={titleImage}
          style={styles.titleImage}
          resizeMode="contain"
        />

        {/* Photo Upload */}
        <TouchableOpacity style={styles.photoCircle}>
          <Text style={styles.plus}>＋</Text>
          <Text style={styles.addPhoto}>Add photo</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.skip}>Skip for now</Text>
        </TouchableOpacity>

        {/* Display Name */}
        <View style={styles.inputContainer}>

          <Image
            source={catImage}
            style={styles.cat}
            resizeMode="contain"
          />

          <Text style={styles.label}>
            Display Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Alex"
            placeholderTextColor="#777"
            value={displayName}
            onChangeText={setDisplayName}
          />

        </View>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>

          <TextInput
            style={styles.input}
            placeholder="@alexfits"
            placeholderTextColor="#8664f8"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Text style={styles.helper}>
          This is how other swappers will see you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#fff",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },

  titleImage: {
    width: 360,
    height: 200,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 30,
  },

  subtitle: {
    textAlign: "center",
    color: "#6A40F3",
    marginTop: 10,
    marginBottom: 35,
    fontFamily: "Kalam",
  },

  photoCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#6A40F3",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(106, 64, 243, 0.1)"
  },

  plus: {
    fontSize: 45,
    color: "#6A40F3",
  },

  addPhoto: {
    color: "#6A40F3",
    marginTop: 8,
    fontSize: 16,
  },

  skip: {
    fontFamily: "Kalam",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 30,
    textDecorationLine: "underline",
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
    right: -10
  },

  input: {
    borderWidth: 1,
    borderColor: "#a8a8a8",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },

  helper: {
    fontFamily: "Kalam",
    color: "#666",
    fontSize: 12,
    marginBottom: 40,
    top: 10,
    left: 20,
  },

  cat: {
    width: 80,
    height: 80,

    position: "absolute",

    right: -5,
    top: -45,
  },

  button: {
    backgroundColor: "#5D3CF2",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    letterSpacing: 1,
  },
});