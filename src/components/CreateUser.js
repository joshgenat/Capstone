import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AppButton from "./AppButton";

export default function CreateUser() {
  const [user, setUser] = useState({ username: "" });

  function addUser() {
    const userDb = collection(db, "users");
    addDoc(userDb, {
      username: user.username,
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
      ></TextInput>
      <AppButton title="Create User" onPress={addUser}></AppButton>
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
