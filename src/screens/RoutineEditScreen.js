import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppPicker from "../components/AppPicker";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

// const validationSchema = Yup.object().shape({
//   routine: Yup.string().required().label("Routine"),
// });

function RoutineEditScreen({ route, navigation }) {
  const [device, setDevice] = useState();
  const [action, setAction] = useState();

  const devices = [
    {
      id: 1,
      title: "Ceiling Lights",
      icon: "lightbulb-outline",
    },
    {
      id: 2,
      title: "Floor Lights",
      icon: "lightbulb-outline",
    },
    {
      id: 3,
      title: "Lightstrip",
      icon: "lightbulb-outline",
    },
  ];

  const actions = [
    {
      id: 1,
      title: "Turn On",
    },
    {
      id: 2,
      title: "Turn Off",
    },
  ];

  const routine = route.params?.routineData;
  const routineId = route.params.id; // Assuming 'id' is passed via params

  // Convert time string to Date object
  const getTimeFromDate = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const time = new Date();
    time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return time;
  };

  // Find the matching device object
  const findDevice = (deviceTitle) => {
    return devices.find((device) => device.title === deviceTitle);
  };

  // Find the matching action object
  const findAction = (actionTitle) => {
    return actions.find((action) => action.title === actionTitle);
  };

  // Set initial states
  const [selectedTime, setSelectedTime] = useState(
    routine ? getTimeFromDate(routine.time) : new Date()
  );
  const [selectedDevice, setSelectedDevice] = useState(
    findDevice(routine?.device)
  );
  const [selectedAction, setSelectedAction] = useState(
    findAction(routine?.action)
  );

  const [routineName, setRoutineName] = useState(routine?.routineName || "");

  const saveRoutine = async () => {
    try {
      const routineRef = doc(db, "routines", routineId);
      await updateDoc(routineRef, {
        routineName: routineName, // Use the correct state variable name
        time: selectedTime.toTimeString().substring(0, 5), // Use selectedTime instead of date
        device: selectedDevice ? selectedDevice.title : "", // Check if selectedDevice is not null
        action: selectedAction ? selectedAction.title : "", // Check if selectedAction is not null
      });
      navigation.goBack(); // Navigate back to the previous screen after saving
    } catch (error) {
      console.error("Error saving routine: ", error);
      // Handle the error, perhaps show a message to the user
    }
  };
  console.log(routineId);
  // Delete the device
  const deleteRoutine = async () => {
    try {
      await deleteDoc(doc(db, "routines", routineId));
      navigation.goBack(); // Navigate back to the previous screen after saving
    } catch (error) {
      console.error("Error deleting device: ", error);
      // Handle the error, perhaps show a message to the user
    }
  };

  return (
    <Screen>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.section}>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              name="routineName"
              value={routineName}
              onChangeText={setRoutineName}
            ></AppTextInput>
          </View>
          <View style={styles.section}>
            <AppText style={styles.text}>Choose time of day</AppText>
            <DateTimePicker
              mode="time"
              display="spinner"
              value={selectedTime}
              onChange={(event, newTime) => {
                setSelectedTime(newTime || selectedTime); // Keep the old value if newTime is undefined (e.g., when the picker is dismissed)
              }}
            ></DateTimePicker>
          </View>

          <View style={styles.section}>
            <AppText style={styles.text}>
              Choose device(s) for this routine
            </AppText>
            <AppPicker
              placeholder="Add Device"
              icon="plus"
              selectedItem={selectedDevice}
              onSelectItem={(item) => setSelectedDevice(item)}
              items={devices}
            ></AppPicker>
          </View>

          <View style={styles.section}>
            <AppText style={styles.text}>
              Choose an action for this routine
            </AppText>
            <AppPicker
              placeholder="Choose Action"
              icon="playlist-edit"
              selectedItem={selectedAction}
              onSelectItem={(item) => setSelectedAction(item)}
              items={actions}
            ></AppPicker>
          </View>

          <View style={styles.button}>
            <AppButton
              title="Save Changes"
              color="secondary"
              onPress={saveRoutine}
            ></AppButton>
            <AppButton
              title="Delete Routine"
              color="danger"
              onPress={deleteRoutine}
            ></AppButton>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  datePicker: {
    height: 150,
  },
  text: {
    marginHorizontal: 20,
  },
  button: {
    alignItems: "center",
  },
});

export default RoutineEditScreen;
