import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import { db2 } from "../config/firebase";
import AppButton from "./AppButton";

export default function CreateUser() {
  const [user, setUser] = useState({ username: "" });

  function addUser() {
    const userDb = collection(db2, "users");
    addDoc(userDb, {
      username: user.username,
    });
  }

  function create(user) {
    const database = getDatabase();

    set(ref(database, "users/" + user.username), {
      username: user.username,
    })
      .then(() => {
        alert("Successful");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
      ></TextInput>
      <AppButton title="Create User" onPress={create}></AppButton>
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
