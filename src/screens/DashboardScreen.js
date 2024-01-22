import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function DashboardScreen({ navigation }) {
  // read devices from firebase
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "devices");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = [];
      snapshot.docs.forEach((doc) => {
        const userData = doc.data(); // Use .data() to get the actual document data
        usersList.push({ ...userData, id: doc.id }); // Spread userData to include all fields
      });
      setDevices(usersList);
      setLoading(false);
    });
  }, []);

  // const devices = [
  //   {
  //     id: 1,
  //     title: "Ceiling Lights",
  //     icon: "lightbulb-outline",
  //   },
  //   {
  //     id: 2,
  //     title: "Floor Lights",
  //     icon: "lightbulb-outline",
  //   },
  //   // {
  //   //   id: 3,
  //   //   title: "Lightstrip",
  //   //   icon: "lightbulb-outline",
  //   // },
  // ];

  // Add a fake item if the number of devices is odd
  const isOdd = devices.length % 2 !== 0;
  if (isOdd) {
    devices.push({ id: "fake", fake: true });
  }

  const renderItem = ({ item }) => {
    if (item.fake) {
      // Render an empty view for the fake item
      return (
        <View style={{ width: "45%", height: 250, marginHorizontal: 25 }} />
      );
    }
    return (
      <Card
        title={item.deviceName}
        icon="lightbulb-outline"
        onPress={() =>
          navigation.navigate("Edit Device", {
            deviceName: item.deviceName,
            id: item.id,
          })
        }
      />
    );
  };

  console.log(devices);

  return (
    <Screen style={styles.screen}>
      {/* <FlatList
        data={devices}
        keyExtractor={(device) => device.id.toString()}
        renderItem={renderItem}
        numColumns={2} // Set number of columns to 2
        columnWrapperStyle={styles.columnWrapperStyle} // Apply the style here
      ></FlatList> */}

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
