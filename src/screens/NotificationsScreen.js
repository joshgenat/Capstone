import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";

function NotificationsScreen(props) {
  return (
    <Screen style={styles.container}>
      <ListItem title="Device Status Updates" switchToggle></ListItem>
      <ListItemSeperator></ListItemSeperator>
      <ListItem title="Energy Analytics" switchToggle></ListItem>
      <ListItemSeperator></ListItemSeperator>
      <ListItem title="Routine Triggers" switchToggle></ListItem>
      <ListItemSeperator></ListItemSeperator>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NotificationsScreen;
