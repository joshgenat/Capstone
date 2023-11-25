import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import AppBarChart from "./AppBarChart";

function CardWide({
  title,
  icon,
  subTextLeft,
  subTextRight,
  style,
  chart,
  toggle,
  height,
}) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons name={icon} size={40} />
        {chart && <AppBarChart></AppBarChart>}
      </View>
      {toggle && (
        <View style={styles.toggleContainer}>
          <AppText style={styles.subTextLeft}>{subTextLeft}</AppText>
          <AppText>{subTextRight}</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  contentContainer: {
    alignItems: "center", // Center the icon and title
    justifyContent: "center", // Center the icon and title
    padding: 10,
    flex: 5,
    overflow: "hidden",
  },
  title: {
    color: colors.black, // Title color
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  toggleContainer: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subTextLeft: {
    fontWeight: 700,
  },
});

export default CardWide;
