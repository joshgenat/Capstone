import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { onValue, ref, remove, set, update } from "firebase/database";

import { db2 } from "../config/firebase";
import AppButton from "./AppButton";

export default function CreateUser() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  function create(user) {
    set(ref(db2, "users/" + username), {
      username: username,
      password: password,
    })
      .then(() => {
        alert("Successful");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  function update(user) {
    update(ref(db2, "users/" + username), {
      username: username,
      password: password,
    })
      .then(() => {
        alert("Successful");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function readData() {
    const starCountRef = ref(db2, "users/" + username);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setPassword(data.password);
    });
  }

  function deleteData() {
    remove(ref(db2, "users/" + username));
    alert("removed");
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(username) => {
          setName(username);
        }}
      ></TextInput>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(password) => {
          setPassword(password);
        }}
      ></TextInput>
      <AppButton title="Create User" onPress={create}></AppButton>
      <AppButton title="Update User" onPress={update}></AppButton>
      <AppButton title="Read Data" onPress={readData}></AppButton>
      <AppButton title="Delete Data" onPress={deleteData}></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
});
