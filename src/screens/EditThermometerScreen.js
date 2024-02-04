import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function EditThermometerScreen({ route, navigation }) {
  const [newDeviceName, setNewDeviceName] = useState(
    route.params.deviceData.deviceName
  );
  const [temp, setTemp] = useState("");

  const deviceData = route.params?.deviceData;
  const icon = route.params?.icon;

  // Save changes to the device name (this is just a placeholder, adjust based on your needs)
  const saveDevice = async () => {
    try {
      // Assuming the document has a 'deviceName' field that you want to update
      const deviceRef = doc(db, "devices", deviceData.id);

      await updateDoc(deviceRef, {
        deviceName: newDeviceName,
        setTemp: parseFloat(temp) || 0,
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
  // Determine the icon color based on temperature comparison
  const getIconColor = () => {
    const currentTemp = parseFloat(deviceData.currentTemp);
    const setTempValue = parseFloat(deviceData.setTemp);

    if (setTempValue > currentTemp) {
      return colors.heat; // Heating
    } else if (setTempValue < currentTemp) {
      return colors.cool; // Cooling
    } else {
      return colors.black; // Neutral or equal
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={icon}
            size={50}
            color={getIconColor()}
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
            <AppText style={styles.tempLabel}>Current Temperature:</AppText>
            <AppText>{deviceData.currentTemp}°C</AppText>
          </View>

          <View style={styles.tempRow}>
            <AppText style={styles.tempLabel}>Set Temperature:</AppText>
            <View style={styles.tempInputContainer}>
              <AppTextInput
                style={styles.tempInput}
                keyboardType="numeric"
                placeholder={deviceData.setTemp.toString()}
                value={temp}
                onChangeText={setTemp}
              />
              <AppText style={styles.celsiusSymbol}>°C</AppText>
            </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  tempLabel: {
    flex: 1, // Take up half the space
  },
  tempInput: {
    width: 40,
    textAlign: "center",
    fontSize: 18,
  },
  tempInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  celsiusSymbol: {
    marginLeft: -10, // Reduced space between text input and Celsius symbol
  },
});

export default EditThermometerScreen;
