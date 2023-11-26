import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";

function AppPickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    padding: 10,
    textAlign: "center",
    fontWeight: 500,
  },
});

export default AppPickerItem;
