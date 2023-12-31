import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function ListItem({
  title,
  subTitle,
  icon,
  toggleIcon,
  rightText,
  switchToggle,
  onPress,
}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          size={30}
          name={icon}
          style={styles.icon}
        ></MaterialCommunityIcons>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
        {rightText && <AppText>{rightText}</AppText>}
        {toggleIcon && <MaterialCommunityIcons name={toggleIcon} size={25} />}
        {switchToggle && (
          <Switch value={isEnabled} onValueChange={toggleSwitch} />
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.light,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontWeight: 500,
  },
  subTitle: {
    color: colors.medium,
  },
});

export default ListItem;
