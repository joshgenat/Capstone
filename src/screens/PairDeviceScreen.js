import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";

function PairDeviceScreen({ navigation }) {
  const devices = [
    {
      id: 1,
      title: "Philips Hue Light Bulb",
      icon: "lightbulb-outline",
    },
    {
      id: 2,
      title: "Govee Lightstrip",
      icon: "lightbulb-outline",
    },
  ];

  return (
    <Screen>
      <AppText style={styles.text}>{devices.length} Device(s) Found</AppText>
      {devices.map((item, index) => (
        <ListItem
          key={index}
          title={item.title}
          icon={item.icon}
          toggleIcon="chevron-right"
          onPress={() =>
            navigation.navigate("Edit Device", { deviceName: item.title })
          }
        ></ListItem>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: "center",
    marginBottom: 15,
  },
});

export default PairDeviceScreen;
