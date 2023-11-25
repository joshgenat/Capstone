import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        ></MaterialCommunityIcons>
      )}
      <TextInput style={styles.textInput} {...otherProps}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 20,
  },
  textInput: {
    fontSize: 18,
    color: colors.dark,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
