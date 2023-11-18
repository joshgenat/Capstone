import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import useLocation from "../hooks/useLocation";

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
    <Screen>
      <View style={styles.container}>
        <ListItem
          title="Josh"
          subTitle="josh@gmail.com"
          icon="account"
        ></ListItem>
      </View>
      <View style={styles.container}>
        {/* <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              icon={item.icon}
              toggleIcon={item.toggleIcon}
            ></ListItem>
          )}
        /> */}
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
      <View style={styles.container}>
        <ListItem title="Sign Out" icon="logout"></ListItem>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default ProfileScreen;
