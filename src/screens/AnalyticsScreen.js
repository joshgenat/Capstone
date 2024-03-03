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

      // Calculate and set total usage time
      calculateTotalUsageTime(usersList);
      // Sort devices based on usage time before setting state
      const sortedDevices = sortDevicesByUsageTime(usersList);

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

  // Function to convert usage time string to total minutes
  const usageTimeToMinutes = (timeUsed) => {
    if (!timeUsed) return 0;
    const [hours, minutes] = timeUsed.split(/[hmin ]+/).map(Number);
    return hours * 60 + minutes;
  };

  // Function to sort devices by usage time
  const sortDevicesByUsageTime = (devices) => {
    return devices.sort((a, b) => {
      return usageTimeToMinutes(b.timeUsed) - usageTimeToMinutes(a.timeUsed);
    });
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
