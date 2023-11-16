import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";

function ProfileScreen(props) {
  const menuItems = [
    {
      title: "Notifications",
      icon: "bell",
    },
    {
      title: "Privacy",
      icon: "lock",
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
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem title={item.title} icon={item.icon}></ListItem>
          )}
        />
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
