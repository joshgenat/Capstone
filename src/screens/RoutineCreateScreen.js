import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppPicker from "../components/AppPicker";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function RoutineCreateScreen({ route, navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [routineName, setRoutineName] = useState("");

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

  function addRoutine() {
    const routineDb = collection(db, "routines");
    addDoc(routineDb, {
      routineName: routineName,
      device: selectedDevice ? selectedDevice.title : null,
      action: selectedAction ? selectedAction.title : null,
      time: selectedDate ? selectedDate.toTimeString().substring(0, 5) : null,
    });
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.section}>
          <AppTextInput
            name="routine"
            placeholder="Enter Routine name"
            value={routineName}
            onChangeText={setRoutineName}
          ></AppTextInput>
        </View>
        <View style={styles.section}>
          <AppText style={styles.text}>Choose time of day</AppText>
          <DateTimePicker
            mode="time"
            display="spinner"
            value={selectedDate}
            onChange={(event, selectedDate) => setSelectedDate(selectedDate)}
            style={styles.datePicker}
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
            title="Submit"
            color="primary"
            onPress={addRoutine}
          ></AppButton>
        </View>
      </View>
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

export default RoutineCreateScreen;
