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
  const [totalUsageTime, setTotalUsageTime] = useState("");

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "devices");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDevices(usersList);
      calculateTotalUsageTime(usersList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <>
        <ListItem
          title={item.deviceName}
          icon="lightbulb-outline"
          rightText={item.timeUsed}
        ></ListItem>
        <ListItemSeperator></ListItemSeperator>
      </>
    );
  };

  const calculateTotalUsageTime = (devices) => {
    let totalMinutes = 0;
    devices.forEach((device) => {
      const [hours, minutes] = device.timeUsed.split(/[hmin ]+/).map(Number);
      totalMinutes += hours * 60 + minutes;
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    setTotalUsageTime(`${totalHours}h ${remainingMinutes}min`);
  };

  return (
    <Screen style={styles.container}>
      <CardWide
        subTextLeft="Total Usage Time"
        subTextRight={totalUsageTime}
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
