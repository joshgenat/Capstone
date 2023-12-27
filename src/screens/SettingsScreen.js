import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import useLocation from "../hooks/useLocation";
import colors from "../config/colors";

function SettingsScreen({ navigation }) {
  const location = useLocation();

  const account = {
    id: 1,
    username: "Josh",
    email: "josh@gmail.com",
    password: "joshgenat",
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.sections}>
        <ListItem
          title={account.username}
          subTitle={account.email}
          icon="account"
          onPress={() =>
            navigation.navigate("Account", {
              username: account.username,
              email: account.email,
              password: account.password,
            })
          }
        ></ListItem>
      </View>
      <View style={styles.sections}>
        <ListItem
          title="Notifications"
          icon="bell"
          toggleIcon="chevron-right"
          onPress={() => navigation.navigate("Notifications")}
        ></ListItem>
        <ListItemSeperator></ListItemSeperator>
        <ListItem
          title="Privacy"
          icon="lock"
          toggleIcon="chevron-right"
          onPress={() => navigation.navigate("Privacy")}
        ></ListItem>
      </View>
      <View>
        <ListItem
          title="Sign Out"
          icon="logout"
          onPress={() => navigation.navigate("Sign Out")}
        ></ListItem>
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

export default SettingsScreen;
