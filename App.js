import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./src/config/firebase";

import colors from "./src/config/colors";
import navigationTheme from "./src/navigation/navigationTheme";
import AppNavigator from "./src/navigation/AppNavigator";

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";

export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "users");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = [];
      snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }));
      setPeople(usersList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.username}</Text>
      <DeleteUser id={item.id}></DeleteUser>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content"></StatusBar>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator></AppNavigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

// Right after your component, register it:
AppRegistry.registerComponent(appName, () => App);
