import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, FlatList } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./src/config/firebase";

export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "users");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = [];
      snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }));
      setPeople(usersList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.username}</Text>
    </View>
  );

  console.log(people);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Open up App.js to start working on your app!
      </Text>
      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </SafeAreaView>
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
