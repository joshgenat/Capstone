import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import useLocation from "../hooks/useLocation";
import colors from "../config/colors";

function ProfileScreen(props) {
  const location = useLocation();

  const menuItems = [
    {
      title: "Notifications",
      icon: "bell",
      toggleIcon: "chevron-right",
    },
    {
      title: "Privacy",
      icon: "lock",

      toggleIcon: "chevron-right",
    },
  ];

  return (
    <Screen style={styles.container}>
      <View style={styles.sections}>
        <ListItem
          title="Josh"
          subTitle="josh@gmail.com"
          icon="account"
        ></ListItem>
      </View>
      <View style={styles.sections}>
        <ListItem
          title="Notifications"
          icon="bell"
          toggleIcon="chevron-right"
        ></ListItem>
        <ListItemSeperator></ListItemSeperator>
        <ListItem
          title="Privacy"
          icon="lock"
          toggleIcon="chevron-right"
          onPress={(values) => console.log(location)}
        ></ListItem>
      </View>
      <View>
        <ListItem title="Sign Out" icon="logout"></ListItem>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 0,
  },
  sections: {
    marginBottom: 30,
  },
});

export default ProfileScreen;
