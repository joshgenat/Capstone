import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";
import Card from "../components/Card";

function AnalyticsScreen(props) {
  return (
    <Screen style={styles.container}>
      <Card></Card>
      <AppText style={styles.sectionText}>Most Used</AppText>
      <ListItem
        title="Ceiling Lights"
        icon="lightbulb-outline"
        rightText="6h 25min"
      ></ListItem>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  sectionText: {
    marginLeft: 20,
  },
});

export default AnalyticsScreen;
