import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AccountScreen(props) {
  return (
    <Screen>
      <AppForm
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="username"
              placeholder="Username"
            ></AppFormField>
          </View>
          <View style={styles.section}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="email"
              placeholder="Email"
            ></AppFormField>
          </View>
          <View style={styles.section}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="Password"
            ></AppFormField>
          </View>
        </View>

        <View style={styles.button}>
          <SubmitButton title="Save"></SubmitButton>
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },

  button: {
    alignItems: "center",
  },
});

export default AccountScreen;
