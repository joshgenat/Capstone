import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import CardThermometer from "../components/CardThermometer";
import colors from "../config/colors";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function DashboardScreen({ navigation }) {
  // read devices from firebase
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "devices");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Add a fake item if the number of devices is odd
      if (usersList.length % 2 !== 0) {
        usersList = [...usersList, { id: "fake", fake: true }];
      }

      setDevices(usersList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    if (item.fake) {
      // Render an empty view for the fake item
      return (
        <View style={{ width: "45%", height: 250, marginHorizontal: 25 }} />
      );
    }

    const icon = getIconForDeviceType(item.deviceType);
    // Determine the type of card to render based on deviceType
    switch (item.deviceType) {
      case "Lights":
        return (
          <Card
            title={item.deviceName}
            icon={icon}
            device={item}
            onPress={() =>
              navigation.navigate("Edit Device", {
                deviceData: item,
                icon: icon,
              })
            }
          />
        );
      case "Thermometer":
        const iconColor = getThermometerIconColor(item);
        return (
          <CardThermometer
            title={item.deviceName}
            device={item}
            icon={icon}
            iconColor={iconColor}
            onPress={() =>
              navigation.navigate("Edit Thermometer", {
                deviceData: item,
                icon: icon,
              })
            }
          />
        );
      case "Sensor":
        return (
          <Card
            title={item.deviceName}
            icon={icon}
            device={item}
            onPress={() =>
              navigation.navigate("Edit Device", {
                deviceData: item,
                icon: icon,
              })
            }
          />
        );
      default:
        return null; // or some default card if deviceType is unknown
    }
  };

  function getIconForDeviceType(deviceType) {
    switch (deviceType) {
      case "Lights":
        return "lightbulb-outline";
      case "Sensor":
        return "smoke-detector";
      case "Thermometer":
        return "thermometer";
      case "camera":
        return "video";
    }
  }

  const getThermometerIconColor = (device) => {
    const currentTemp = parseFloat(device.currentTemp);
    const setTemp = parseFloat(device.setTemp);

    if (setTemp > currentTemp) {
      return colors.heat; // Heating
    } else if (setTemp < currentTemp) {
      return colors.cool; // Cooling
    } else {
      return colors.primary; // Neutral or equal
    }
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set number of columns to 2
        columnWrapperStyle={styles.columnWrapperStyle} // Apply the style here
      ></FlatList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    marginTop: 0,
  },
  columnWrapperStyle: {
    padding: 20,
    overflow: "visible",
    justifyContent: "space-evenly",
  },
});

export default DashboardScreen;
