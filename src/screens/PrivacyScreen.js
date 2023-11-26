import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";

function PrivacyScreen(props) {
  return (
    <Screen style={styles.container}>
      <ListItem title="Analytics Tracking" switchToggle></ListItem>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PrivacyScreen;
