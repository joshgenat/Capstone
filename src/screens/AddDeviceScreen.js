import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import Screen from "../components/Screen";
import colors from "../config/colors";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

function AddDeviceScreen({ route, navigation }) {
  const { deviceName } = route.params; // Extract deviceName from route.params

  const placeholderText = deviceName ? `${deviceName}` : "Enter Device Name";

  const validationSchema = Yup.object().shape({
    deviceName: Yup.string().required().label("Device Name"),
  });

  async function handleSubmit(values) {
    const { deviceName } = values;
    const deviceDb = collection(db, "devices");
    try {
      await addDoc(deviceDb, {
        deviceName,
        toggle: false, // Assuming default toggle state is false
      });
      navigation.navigate("Your Dashboard");
    } catch (error) {
      // Handle the error, maybe set some state to show an error message
      console.error("Error adding device: ", error);
    }
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="lightbulb-outline" size={50} />
      </View>
      <AppForm
        initialValues={{ deviceName: route.params?.deviceName || "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.content}>
          <AppFormField
            name="deviceName"
            placeholder={placeholderText}
          ></AppFormField>
        </View>
        <View style={styles.button}>
          <SubmitButton title="Add Device"></SubmitButton>
        </View>
      </AppForm>
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

export default AddDeviceScreen;
