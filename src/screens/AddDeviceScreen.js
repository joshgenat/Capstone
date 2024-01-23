import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function AddDeviceScreen({ route, navigation }) {
  const { deviceName } = route.params; // Extract deviceName from route.params

  // add device to firebase
  const [device, setDevice] = useState({
    deviceName: "",
    toggle: false,
  });

  // read devices from firebase
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const usersQuery = collection(db, "devices");
  //   onSnapshot(usersQuery, (snapshot) => {
  //     let usersList = [];
  //     snapshot.docs.forEach((doc) => {
  //       const userData = doc.data(); // Use .data() to get the actual document data
  //       usersList.push({ ...userData, id: doc.id }); // Spread userData to include all fields
  //     });
  //     setPeople(usersList);
  //     setLoading(false);
  //   });
  // }, []);

  // const renderItem = ({ item }) => (
  //   <View>
  //     <AppText>{item.deviceName}</AppText>
  //   </View>
  // );

  function addDevice() {
    const deviceDb = collection(db, "devices");
    addDoc(deviceDb, {
      deviceName: device.deviceName,
      toggle: device.toggle,
    });
    navigation.navigate("Your Dashboard");
  }

  const placeholderText = deviceName ? `${deviceName}` : "Enter Device Name";

  return (
    <Screen style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="lightbulb-outline" size={50} />
      </View>
      <View style={styles.content}>
        <AppTextInput
          name="deviceName"
          placeholder={placeholderText}
          value={device.deviceName}
          onChangeText={(text) => setDevice({ ...device, deviceName: text })}
        ></AppTextInput>
      </View>
      {/* <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList> */}
      <View style={styles.button}>
        <AppButton
          title="Add Device"
          color="primary"
          onPress={addDevice}
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

export default AddDeviceScreen;
