import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";

function DashboardScreen({ navigation }) {
  const devices = [
    {
      id: 1,
      title: "Ceiling Lights",
      icon: "lightbulb-outline",
    },
    {
      id: 2,
      title: "Floor Lights",
      icon: "lightbulb-outline",
    },
    // {
    //   id: 3,
    //   title: "Lightstrip",
    //   icon: "lightbulb-outline",
    // },
  ];

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
        title={item.title}
        icon={item.icon}
        onPress={() =>
          navigation.navigate("Edit Device", { deviceName: item.title })
        }
      />
    );
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={devices}
        keyExtractor={(device) => device.id.toString()}
        renderItem={renderItem}
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
