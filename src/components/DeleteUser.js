import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AppButton from "./AppButton";

export default function DeleteUser({ id }) {
  function deleteUser() {
    const user = doc(db, "users", id);
    deleteDoc(user);
  }

  return (
    <View style={styles.container}>
      <AppButton
        title="Delete User"
        onPress={() =>
          Alert.alert("Are you sure you want to delete", "", [
            {
              text: "Yes",
              onPress: () => {
                deleteUser();
              },
            },
            { text: "No" },
          ])
        }
      ></AppButton>
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
    padding: 20,
  },
});
