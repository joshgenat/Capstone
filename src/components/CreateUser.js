import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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
      <Pressable onPress={addUser}>
        <Text>Create User</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
