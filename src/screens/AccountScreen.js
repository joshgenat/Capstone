import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AccountScreen({ route }) {
  const { username, email, password } = route.params || {};

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
              icon="account"
              placeholder={username}
              textContentType="username"
            ></AppFormField>
          </View>
          <View style={styles.section}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder={email}
              textContentType="emailAddress"
            ></AppFormField>
          </View>
          <View style={styles.section}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="••••••••"
              secureTextEntry={true}
              textContentType="password"
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
