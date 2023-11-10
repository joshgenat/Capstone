import React from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function DeleteUser({ id }) {
  function deleteUser() {
    const user = doc(db, "users", id);
    deleteDoc(user);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={deleteUser}>
        <Text>X</Text>
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
