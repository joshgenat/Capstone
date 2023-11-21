import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";
import CardWide from "../components/CardWide";

function AnalyticsScreen(props) {
  return (
    <Screen style={styles.container}>
      <CardWide
        title="Create a Routine"
        subTextLeft="Total Usage Time"
        subTextRight="13h 25min"
        style={styles.card}
      ></CardWide>
      <AppText style={styles.sectionText}>Most Used</AppText>
      <ListItem
        title="Ceiling Lights"
        icon="lightbulb-outline"
        rightText="6h 25min"
      ></ListItem>
      <ListItem
        title="Floor Lights"
        icon="lightbulb-outline"
        rightText="3h 37min"
      ></ListItem>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  sectionText: {
    marginLeft: 20,
  },
  card: {
    marginBottom: 30,
  },
});

export default AnalyticsScreen;
