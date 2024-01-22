import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

import { deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function EditDeviceScreen({ route, id }) {
  const { deviceName } = route.params; // Extract deviceName from route.params

  function deleteDevice() {
    const device = doc(db, "devices", id);
    deleteDoc(device);
  }

  const placeholderText = deviceName ? `${deviceName}` : "Enter Device Name";

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
          placeholder={placeholderText}
        ></AppTextInput>
      </View>
      <View style={styles.button}>
        <AppButton title="Save Changes" color="secondary"></AppButton>
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
