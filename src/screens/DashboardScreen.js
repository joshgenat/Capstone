import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
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
    return (
      <Card
        title={item.deviceName}
        icon="lightbulb-outline"
        device={item}
        onPress={() =>
          navigation.navigate("Edit Device", {
            deviceName: item.deviceName,
            id: item.id,
          })
        }
      />
    );
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
