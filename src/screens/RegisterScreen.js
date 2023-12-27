import React from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen(props) {
  return (
    <Screen style={styles.container}>
      <Image
        source={require("../assets/logo-red.png")}
        style={styles.logo}
      ></Image>

      <AppForm
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
          textContentType="username"
        ></AppFormField>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        ></AppFormField>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        ></AppFormField>

        <View style={styles.button}>
          <SubmitButton title="Register"></SubmitButton>
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default RegisterScreen;
