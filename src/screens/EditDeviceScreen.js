import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  deviceName: Yup.string().required().label("Device Name"),
});

function EditDeviceScreen({ route }) {
  const { deviceName } = route.params; // Extract deviceName from route.params

  const placeholderText = deviceName ? `${deviceName}` : "Enter Device Name";

  console.log(deviceName);
  return (
    <Screen style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="lightbulb-outline" size={50} />
      </View>
      <AppForm
        initialValues={{ deviceName }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <View style={styles.content}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="deviceName"
            placeholder={placeholderText}
          ></AppFormField>

          <AppText>Manufacturer: </AppText>
          <AppText>Model: </AppText>
        </View>
        <View style={styles.button}>
          <SubmitButton title="Save Changes" color="secondary"></SubmitButton>
          <SubmitButton title="Delete Device" color="danger"></SubmitButton>
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
  },
  icon: {
    alignItems: "center", // Center the icon horizontally},
    marginBottom: 20,
  },

  button: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default EditDeviceScreen;
