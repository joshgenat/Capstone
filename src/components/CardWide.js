import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import AppBarChart from "./AppBarChart";

function CardWide({ title, icon, subTextLeft, subTextRight, style }) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.contentContainer}>
        {/* <MaterialCommunityIcons name={icon} size={50} />
        <Text style={styles.title}>{title}</Text> */}
        <AppBarChart></AppBarChart>
      </View>
      <View style={styles.toggleContainer}>
        <AppText style={styles.subTextLeft}>{subTextLeft}</AppText>
        <AppText>{subTextRight}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginHorizontal: 25,
    height: 250,
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
    padding: 20,
    flex: 5,
    overflow: "hidden",
  },
  title: {
    color: colors.black, // Title color
    marginVertical: 20, // Space between icon and title
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
