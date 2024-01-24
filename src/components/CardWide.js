import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import AppBarChart from "./AppBarChart";
import colors from "../config/colors";

function CardWide({
  title,
  icon,
  subTextLeft,
  subTextRight,
  style,
  chart,
  toggle,
  onPress,
}) {
  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity onPress={onPress} style={styles.touchableArea}>
        <View style={styles.contentContainer}>
          {!chart && (
            <>
              <MaterialCommunityIcons name={icon} size={30} />
              <Text style={styles.title}>{title}</Text>
            </>
          )}
          {chart && <AppBarChart />}
        </View>
      </TouchableOpacity>
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
  },
  title: {
    color: colors.black, // Title color
    fontSize: 20,
    marginVertical: 10,
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
  touchableArea: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default CardWide;
