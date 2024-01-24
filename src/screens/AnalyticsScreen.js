import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";
import CardWide from "../components/CardWide";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function AnalyticsScreen(props) {
  // read devices from firebase
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "devices");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDevices(usersList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <>
        <ListItem
          title={item.deviceName}
          icon="lightbulb-outline"
          rightText="6h 25min"
        ></ListItem>
        <ListItemSeperator></ListItemSeperator>
      </>
    );
  };

  return (
    <Screen style={styles.container}>
      <CardWide
        subTextLeft="Total Usage Time"
        subTextRight="13h 25min"
        style={styles.card}
        chart
        toggle
      ></CardWide>
      <AppText style={styles.sectionText}>Most Used</AppText>

      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  sectionText: {
    marginLeft: 20,
  },
  card: {
    marginBottom: 30,
    height: 250,
  },
});

export default AnalyticsScreen;
