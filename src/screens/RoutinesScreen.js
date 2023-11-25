import React from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import CardWide from "../components/CardWide";
import AppText from "../components/AppText";
import colors from "../config/colors";

function RoutinesScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <CardWide
        title="Create a Routine"
        icon="plus"
        style={{ height: 150 }}
        onPress={() => navigation.navigate("Create Routine")}
      ></CardWide>
      <AppText style={styles.text}>
        Have your accessories react to changes at home.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default RoutinesScreen;
