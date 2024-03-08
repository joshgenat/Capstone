import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, db2 } from "../config/firebase";
import { ref, set, onValue } from "firebase/database";

function EditCameraScreen({ route, navigation }) {
  const [newDeviceName, setNewDeviceName] = useState(
    route.params.deviceData.deviceName
  );
  const [toggleStatus, setToggleStatus] = useState(route.params.toggle); // Initial toggle status passed through route.params

  const deviceData = route.params?.deviceData;
  const icon = route.params?.icon;
  const iconColor = route.params?.iconColor;

  useEffect(() => {
    // Listen for real-time updates to the sensor's toggle status
    console.log(deviceData.deviceName);
    const toggleRef = ref(db2, `devices/${deviceData.deviceName}/toggle`);
    const unsubscribe = onValue(toggleRef, (snapshot) => {
      const currentToggleStatus = snapshot.val();
      setToggleStatus(currentToggleStatus); // Update state with new toggle status
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [deviceData.deviceName]);

  // Save changes to the device name (this is just a placeholder, adjust based on your needs)
  const saveDevice = async () => {
    try {
      // Assuming the document has a 'deviceName' field that you want to update
      const firestoreRef = doc(db, "devices", deviceData.id);
      const realtimeRef = ref(db2, "devices/" + deviceData.deviceName);

      await updateDoc(firestoreRef, {
        deviceName: newDeviceName,
      });

      await set(realtimeRef, {
        toggle: toggleStatus, // Or any other update you need
      });

      navigation.navigate("Your Dashboard");
    } catch (error) {
      console.error("Error saving device: ", error);
      // Handle the error, perhaps show a message to the user
    }
  };
  // Delete the device
  const deleteDevice = async () => {
    try {
      await deleteDoc(doc(db, "devices", deviceData.id));
      navigation.navigate("Your Dashboard");
    } catch (error) {
      console.error("Error deleting device: ", error);
      // Handle the error, perhaps show a message to the user
    }
  };

  // Function to dynamically determine icon color
  const getDynamicIconColor = () => {
    return toggleStatus === 1 ? colors.live : colors.black; // Example: Heat for ON, Cool for OFF
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={icon}
            size={50}
            color={getDynamicIconColor()}
          />
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

          <View style={styles.tempRow}>
            <AppText style={styles.tempLabel}>Status: ON</AppText>
            {toggleStatus === 1 && (
              <AppText style={styles.alert}>ALERT: Person Detected</AppText>
            )}
          </View>
        </View>
      </ScrollView>

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
  tempRow: {
    alignItems: "center",
    marginTop: 15,
  },
  tempLabel: {
    fontWeight: "bold",
  },
  alert: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: colors.danger,
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.black,
    textAlign: "center",
  },
});

export default EditCameraScreen;
