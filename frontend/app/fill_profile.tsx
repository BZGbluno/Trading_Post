import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SegmentedButtons } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FillProfileScreen() {
  const router = useRouter();
  const [pant_size, set_pant_size] = useState("");
  const [shirt_size, set_shirt_size] = useState("");
  const [description, set_description] = useState("");
  const [shoe_size, set_shoe_size] = useState("");
  const [sex, set_sex] = useState("");
  

async function handleSignup() {
  try {
    // await AsyncStorage.setItem("email", email);



    router.replace("/(tabs)");
  } catch (error) {
    console.log(error);
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill Out Profile</Text>

      <Text style={styles.description}>Description of what you want</Text>
      <TextInput
        style={styles.input}
        placeholder="Looking for Y2k fashion and streetwear"
        placeholderTextColor="#888"
        value={description}
        onChangeText={set_description}
      />

      <Text style={styles.description}>Selecting Gender</Text>
      <Picker
        style={styles.input}
        
        
        selectedValue={sex}
        onValueChange={(itemValue:string) => set_sex(itemValue)}
      >
        <Picker.Item label="Select a gender" value="" />
        <Picker.Item label="Other" value="Other" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <Text style={styles.description}> Shirt Size</Text>
      <Picker
        style={styles.input}
        
        selectedValue={shirt_size}
        onValueChange={(itemValue:string) => set_shirt_size(itemValue)}
        
        
      >
        <Picker.Item label="Select a shirt size" value="" />
        <Picker.Item label="XSmall" value="XSmall" />
        <Picker.Item label="Small" value="Small" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Large" value="Large" />
        <Picker.Item label="XLarge" value="XLarge" />
        <Picker.Item label="XXLarge" value="XXLarge" />
      </Picker>


      <SegmentedButtons
        value={shoe_size}
        onValueChange={set_shoe_size}
        buttons={[
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
        ]}
      />
      
      <Button title="Sign Up" onPress={handleSignup} />
    




    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },


  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});