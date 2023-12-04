import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function SetupDeviceScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.text}>
        Make sure the device you want to add is connected to power and ready to
        pair.
      </AppText>
      <View style={styles.button}>
        <AppButton
          title="Search"
          onPress={() => navigation.navigate("Pair Device")}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
  },
});

export default SetupDeviceScreen;
