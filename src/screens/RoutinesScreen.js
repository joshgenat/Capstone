import React from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import CardWide from "../components/CardWide";
import AppText from "../components/AppText";
import colors from "../config/colors";

function RoutinesScreen(props) {
  return (
    <Screen style={styles.container}>
      <CardWide title="Create a Routine" icon="plus"></CardWide>
      <AppText style={styles.text}>
        Have your accessories react to changes at home.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: colors.white,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default RoutinesScreen;
