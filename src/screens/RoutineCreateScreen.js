import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  routine: Yup.string().required().label("Routine"),
});

function RoutineCreateScreen(props) {
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
            <AppText style={styles.text}>
              Choose how this routine will start
            </AppText>
            <ListItem title="Start at" rightText="Select a Time"></ListItem>
            <ListItem title="End at" rightText="Select a Time"></ListItem>
          </View>

          <View style={styles.section}>
            <AppText style={styles.text}>
              Choose devices for this routine
            </AppText>
            <ListItem title="Add Device" icon="plus"></ListItem>
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
  text: {
    marginHorizontal: 20,
  },
  button: {
    alignItems: "center",
  },
});

export default RoutineCreateScreen;
