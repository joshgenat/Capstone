import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppPicker from "../components/AppPicker";

const validationSchema = Yup.object().shape({
  routine: Yup.string().required().label("Routine"),
});

function RoutineCreateScreen(props) {
  const [date, setDate] = useState(new Date());
  const [device, setDevice] = useState();

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
      title: "Floor Lights",
      icon: "lightbulb-outline",
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
              onSelectItem={(item) => setDevice(item)}
              items={devices}
            ></AppPicker>
          </View>

          <View style={styles.section}>
            <AppText style={styles.text}>
              Create an action for this routine
            </AppText>
            <ListItem title="Choose Action" icon="chevron-down"></ListItem>
          </View>

          <View style={styles.button}>
            <SubmitButton title="Save"></SubmitButton>
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
