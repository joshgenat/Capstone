import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import { updateDoc, doc } from "firebase/firestore";
import { db, db2 } from "../config/firebase";
import { getDatabase, onValue, ref, set } from "firebase/database";
import AppText from "./AppText";

function CardThermometer({ title, icon, onPress, device }) {
  const [temperature, setTemperature] = useState(null);

  const toggleSwitch = async () => {
    const newToggleState = setTemperature;

    const firestoreRef = device.id ? doc(db, "devices", device.id) : null;
    const realtimeRef = device.deviceName
      ? ref(db2, "devices/" + device.deviceName)
      : null;

    // Update Firestore
    if (firestoreRef) {
      try {
        await updateDoc(firestoreRef, { setTemp: temperature });
      } catch (error) {
        console.error("Error updating device in Firestore: ", error);
      }
    }

    // Update Realtime Database
    if (realtimeRef) {
      try {
        await set(realtimeRef, { setTemp: temperature });
      } catch (error) {
        console.error("Error updating device in Realtime Database: ", error);
      }
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.touchableArea}>
        <View style={styles.contentContainer}>
          <MaterialCommunityIcons name={icon} size={50} color={colors.black} />
          <Text style={styles.title}>{title}</Text>
          <AppText style={styles.text}>{device.currentTemp}°C</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginHorizontal: 25,
    height: 250,
    width: "45%",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  contentContainer: {
    alignItems: "center", // Center the icon and title
    justifyContent: "center", // Center the icon and title
    padding: 15,
  },
  title: {
    color: colors.black, // Title color
    fontSize: 18,
    marginVertical: 20, // Space between icon and title
  },
  toggleContainer: {
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  touchableArea: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default CardThermometer;
