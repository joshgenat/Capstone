import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";

function PairDeviceScreen(props) {
  return (
    <Screen>
      <AppText style={styles.text}>1 Device(s) Found</AppText>
      <ListItem
        title="Led Lights"
        icon="lightbulb-outline"
        toggleIcon="chevron-right"
      ></ListItem>
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
