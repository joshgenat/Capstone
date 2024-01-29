import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppFormDateTimePicker from "../components/forms/AppFormDateTimePicker";

const validationSchema = Yup.object().shape({
  routineName: Yup.string().required().label("Routine Name"),
  selectedDevice: Yup.object().required().label("Device"),
  selectedAction: Yup.object().required().label("Action"),
  selectedDate: Yup.date().required().nullable().label("Time"),
});

function RoutineCreateScreen({ route, navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [routineName, setRoutineName] = useState("");

  const [devices, setDevices] = useState([]);

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

  useEffect(() => {
    // Subscribe to the Firestore collection
    const unsubscribe = onSnapshot(collection(db, "devices"), (snapshot) => {
      const loadedDevices = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().deviceName, // Assuming 'deviceName' is the field in Firestore
        icon: "lightbulb-outline", // Assuming all devices use the same icon for simplicity
      }));
      setDevices(loadedDevices);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  async function handleSubmit(values) {
    // Destructure the values object to get each field's value
    const { routineName, selectedDevice, selectedAction, selectedDate } =
      values;

    try {
      await addDoc(collection(db, "routines"), {
        routineName: routineName,
        device: selectedDevice.title,
        action: selectedAction.title,
        time: selectedDate.toTimeString().substring(0, 5),
      });
      // Handle success, e.g., navigate back or show a message
    } catch (error) {
      // Handle the error, e.g., show an error message
    }
  }

  function addRoutine() {
    const routineDb = collection(db, "routines");
    addDoc(routineDb, {
      routineName: routineName,
      time: selectedDate ? selectedDate.toTimeString().substring(0, 5) : null,
      device: selectedDevice ? selectedDevice.title : null,
      action: selectedAction ? selectedAction.title : null,
    });
  }

  return (
    <Screen>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <AppForm
            initialValues={{
              routineName: "",
              selectedDevice: null,
              selectedAction: null,
              selectedDate: new Date(),
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={styles.section}>
              <AppFormField
                name="routineName"
                placeholder="Enter Routine Name"
              />
            </View>

            <AppText style={styles.text}>Choose time of day</AppText>
            <View style={styles.section}>
              <AppFormDateTimePicker name="selectedDate" />
            </View>

            <AppText style={styles.text}>
              Choose device(s) for this routine
            </AppText>
            <View style={styles.section}>
              <AppFormPicker
                name="selectedDevice"
                items={devices}
                placeholder="Select a device"
                icon="plus"
              />
            </View>

            <AppText style={styles.text}>
              Choose an action for this routine
            </AppText>
            <View style={styles.section}>
              <AppFormPicker
                name="selectedAction"
                items={actions}
                icon="playlist-edit"
                placeholder="Select an action"
              />
            </View>

            <View style={styles.button}>
              <SubmitButton title="Submit" />
            </View>
          </AppForm>
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

export default RoutineCreateScreen;
