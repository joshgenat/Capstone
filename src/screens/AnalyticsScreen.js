import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Platform } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AppText from "../components/AppText";
import CardWide from "../components/CardWide";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";

import { getModelData } from "../config/apiService";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function AnalyticsScreen(props) {
  // read devices from firebase
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalUsageTime, setTotalUsageTime] = useState("");

  const [modelData1, setModelData1] = useState(null); // State for model ID 1
  const [modelData2, setModelData2] = useState(null); // State for model ID 2

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
    getModelDataById([1, 2]);
  }, []);

  const getModelDataById = async (ids) => {
    try {
      const promises = ids.map((id) => getModelData(id));
      const results = await Promise.all(promises);
      // console.log(results[0]);
      setModelData1(results[0]); // Assuming the first promise corresponds to ID 1
      setModelData2(results[1]); // Assuming the second promise corresponds to ID 2
      // console.log("Model data 1: " + modelData1);
      // console.log("Model data 2: " + modelData2);
    } catch (error) {
      console.error("Error fetching model data:", error);
      // Handle error, e.g., set error message state to display error
    } finally {
      setLoading(false);
    }

    if (modelData1) {
      const peakHour24Format = findPeakHour(modelData1);
      const peakHourFormatted = formatHour(peakHour24Format.toString());
      const naturalLightMessage = suggestNaturalLightUse(modelData1);

      // Now you can set these in state or use them directly in your render
      console.log(
        `${peakHourFormatted} is the highest usage period, try using routines to automatically turn off certain devices during this time.`
      );
      console.log(naturalLightMessage);
    }
  };

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

  // Render function to display model data
  const renderModelData = (modelData, title) => {
    if (modelData) {
      return (
        <>
          <AppText style={styles.titleText}>{title}</AppText>
          <AppText style={styles.modelDataText}>
            {JSON.stringify(modelData, null, 2)}
          </AppText>
        </>
      );
    }
    return null;
  };

  const findPeakHour = (modelData) => {
    let peakHour = null;
    let maxProbability = 0;

    // Iterate over each key-value pair in the modelData object
    Object.entries(modelData).forEach(([hour, { on }]) => {
      const hourInt = parseInt(hour.split("_")[1], 10); // Convert hour string to integer
      if (on > maxProbability) {
        maxProbability = on;
        peakHour = hourInt; // Assign the hour integer to peakHour
      }
    });

    return peakHour; // Returns the peak hour as an integer
  };
  // Function to format hour to 12-hour format with AM/PM
  const formatHour = (hour24) => {
    const hourInt = parseInt(hour24, 10);
    const ampm = hourInt >= 12 ? "pm" : "am";
    const hour12 = hourInt % 12 || 12; // Converts "0" to "12" for 12 AM
    return `${hour12}${ampm}`;
  };

  // Function to suggest usage of natural light during high usage periods
  const suggestNaturalLightUse = (modelData) => {
    let minHour = 24;
    let maxHour = 0;
    let totalProbability = 0;
    let count = 0;

    Object.entries(modelData).forEach(([hour, { on }]) => {
      const hourInt = parseInt(hour.split("_")[1], 10);
      if (on > 0.3 && hourInt >= 12 && hourInt <= 16) {
        // Adjust the range as needed
        // Update min and max hours based on conditions
        if (hourInt < minHour) minHour = hourInt;
        if (hourInt > maxHour) maxHour = hourInt;
        totalProbability += on;
        count++;
      }
    });

    // Calculate average probability if any hour met the condition
    if (minHour < 24 && maxHour > 0 && count > 0) {
      const avgProbability = ((totalProbability / count) * 100).toFixed(2); // Convert to percentage and format
      const timeRange = `${formatHour(minHour.toString())}-${formatHour(
        maxHour.toString()
      )}`;
      const title = `The "Ceiling Lights" are on during ${timeRange}`;
      const body = `These lights tend to be on ${avgProbability}% of the time during these hours.\n\nTo conserve energy, consider using natural light during the day.`;
      return { title, body };
    }

    return null;
  };

  return (
    <ScrollView>
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
          scrollEnabled={false} // Disable scrolling of FlatList
        ></FlatList>
        {modelData1 && (
          <>
            <AppText style={styles.badge}>Usage Tips</AppText>
            <View style={styles.tipBox}>
              <AppText style={styles.titleText}>
                {formatHour(findPeakHour(modelData1))} has the highest usage
              </AppText>
              <AppText style={styles.bodyText}>
                Try setting up a routine to automatically turn off certain
                devices during this time.
              </AppText>
            </View>

            {suggestNaturalLightUse(modelData1) && (
              <View style={styles.tipBox}>
                <AppText style={styles.titleText}>
                  {suggestNaturalLightUse(modelData1).title}
                </AppText>
                <AppText style={styles.bodyText}>
                  {suggestNaturalLightUse(modelData1).body}
                </AppText>
              </View>
            )}
          </>
        )}
        {/* {renderModelData(modelData1, "Model Data for ID 1")} */}
      </Screen>
    </ScrollView>
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
  titleText: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 15,
  },
  bodyText: {},
  badge: {
    backgroundColor: colors.primary, // A pleasant shade of blue for the badge background
    color: "white", // White text color for contrast
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15, // Rounded corners for the badge look
    overflow: "hidden", // Ensures the background does not bleed outside the border radius
    alignSelf: "flex-start", // Aligns the badge to the start of the container
    marginTop: 30,
    marginLeft: 20,
  },
  tipBox: {
    backgroundColor: colors.light, // A light grey background for the tip box
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the box
    margin: 25,
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
});

export default AnalyticsScreen;
