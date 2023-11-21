import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";

function SearchDevice(props) {
  const [loading, setLoading] = useState(false);

  const loadDevices = async () => {
    setLoading(true);
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={true}></ActivityIndicator>
      <AppText style={styles.text}>Searching for new devices...</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  text: {
    textAlign: "center",
  },
});

export default SearchDevice;
