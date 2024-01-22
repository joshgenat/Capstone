import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppPicker from "../components/AppPicker";

const validationSchema = Yup.object().shape({
  routine: Yup.string().required().label("Routine"),
});

function RoutineCreateScreen(props) {
  const [date, setDate] = useState(new Date());
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

  return (
    <Screen>
      <View style={styles.container}>
        <AppForm
          initialValues={{ routine: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <View style={styles.section}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="routine"
              placeholder="Routine Name"
            ></AppFormField>
          </View>
          <View style={styles.section}>
            <AppText style={styles.text}>Choose time of day</AppText>
            <DateTimePicker
              mode="time"
              display="spinner"
              value={date}
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
              selectedItem={device}
              onSelectItem={(device) => setDevice(device)}
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
              selectedItem={action}
              onSelectItem={(action) => setAction(action)}
              items={actions}
            ></AppPicker>
          </View>

          <View style={styles.button}>
            <SubmitButton title="Save" color="medium"></SubmitButton>
          </View>
          <View style={styles.button}>
            <SubmitButton title="Delete" color="danger"></SubmitButton>
          </View>
        </AppForm>
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
