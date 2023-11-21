import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { AppForm, AppFormField } from "../components/forms";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  deviceName: Yup.string().required().label("Device Name"),
});

function EditDeviceScreen(props) {
  return (
    <Screen style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="lightbulb-outline" size={50} />
      </View>
      <View style={styles.content}>
        <AppForm
          initialValues={{ deviceName: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="deviceName"
            placeholder="Ceiling Lights"
          ></AppFormField>
        </AppForm>
        <AppText>Manufacturer: </AppText>
        <AppText>Model: </AppText>
        <AppButton title="Save Changes" color="primary"></AppButton>
      </View>
      <AppButton title="Delete Device" color="danger"></AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light,
  },
  content: {
    flex: 1,
  },
  icon: {
    alignItems: "center", // Center the icon horizontally},
    marginBottom: 20,
  },
});

export default EditDeviceScreen;