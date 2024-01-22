import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function EditDeviceScreen({ route, navigation }) {
  const [newDeviceName, setNewDeviceName] = useState(route.params.deviceName);
  const deviceId = route.params.id; // Assuming 'id' is passed via params

  // Save changes to the device name (this is just a placeholder, adjust based on your needs)
  const saveDevice = async () => {
    try {
      // Assuming the document has a 'deviceName' field that you want to update
      const deviceRef = doc(db, "devices", deviceId);
      await updateDoc(deviceRef, { deviceName: newDeviceName });
      navigation.navigate("Your Dashboard");
    } catch (error) {
      console.error("Error saving device: ", error);
      // Handle the error, perhaps show a message to the user
    }
  };

  // Delete the device
  const deleteDevice = async () => {
    try {
      await deleteDoc(doc(db, "devices", id));
      navigation.navigate("Your Dashboard");
    } catch (error) {
      console.error("Error deleting device: ", error);
      // Handle the error, perhaps show a message to the user
    }
  };

  // const placeholderText = deviceName ? `${deviceName}` : "Enter Device Name";

  return (
    <Screen style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="lightbulb-outline" size={50} />
      </View>
      <View style={styles.content}>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          name="deviceName"
          // placeholder={placeholderText}
          value={newDeviceName}
          onChangeText={setNewDeviceName}
        ></AppTextInput>
      </View>
      <View style={styles.button}>
        <AppButton
          title="Save Changes"
          color="secondary"
          onPress={saveDevice}
        ></AppButton>
        <AppButton
          title="Delete Device"
          color="danger"
          onPress={deleteDevice}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
  },
  icon: {
    alignItems: "center", // Center the icon horizontally},
    marginBottom: 20,
  },

  button: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default EditDeviceScreen;
