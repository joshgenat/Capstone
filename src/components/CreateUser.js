import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import AppButton from "./AppButton";
import AppTextInput from "./AppTextInput";

import { getDatabase, onValue, ref, set } from "firebase/database";
import { db2, app } from "../config/firebase";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [isUserOn, setIsUserOn] = useState(false); // New state for the toggle

  // function addUser() {
  //   const userDb = collection(db2, "users");
  //   addDoc(userDb, {
  //     username: user.username,
  //   });
  // }

  function create() {
    // Get a reference to the database service
    const database = getDatabase(app); // Ensure 'app' is the initialized Firebase app instance
    const userRef = ref(database, "users/" + username);

    set(userRef, {
      username: username,
      isOn: isUserOn,
    })
      .then(() => {
        alert("Successful");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function updateUserStatus(newStatus) {
    // Only update the user's status in the database if the username is not empty
    if (username) {
      const database = getDatabase(app);
      const userStatusRef = ref(database, "users/" + username + "/isOn");

      set(userStatusRef, newStatus)
        .then(() => {
          console.log("User status updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update user status", error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <AppTextInput
        placeholder="username"
        value={username}
        onChangeText={(newUsername) => setUsername(newUsername)}
        style={styles.text}
      ></AppTextInput>
      <Switch
        value={isUserOn}
        onValueChange={(newStatus) => {
          setIsUserOn(newStatus);
          updateUserStatus(newStatus);
        }}
        style={styles.switch}
      />
      <AppButton title="Create User" onPress={create}></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  text: {
    width: "100%",
  },
});
