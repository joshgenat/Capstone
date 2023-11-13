import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, FlatList } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./src/config/firebase";

import CreateUser from "./src/components/CreateUser";
import DeleteUser from "./src/components/DeleteUser";
import Card from "./src/components/Card";
import colors from "./src/config/colors";

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
      <DeleteUser id={item.id}></DeleteUser>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CreateUser />
      <View style={styles.cardContainer}>
        <Card title="Ceiling Lights" icon="lightbulb-outline"></Card>
        <Card title="Floor Lights" icon="lightbulb-outline"></Card>
      </View>
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
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
});
