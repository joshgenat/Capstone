import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import CardWide from "../components/CardWide";
import AppText from "../components/AppText";
import colors from "../config/colors";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function RoutinesScreen({ navigation }) {
  // read devices from firebase
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const routinesQuery = collection(db, "routines");
    onSnapshot(routinesQuery, (snapshot) => {
      let routinesList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setRoutines(routinesList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CardWide
        title={item.routineName}
        toggle
        icon="clock-outline"
        onPress={() =>
          navigation.navigate("Edit Routine", {
            routineData: item,
            id: item.id,
          })
        }
        style={styles.cardStyle}
        subTextLeft={item.action}
        subTextRight={item.time}
      ></CardWide>
    );
  };

  return (
    <Screen style={styles.container}>
      {routines.length === 0 && (
        <>
          <CardWide
            title="Create a Routine"
            icon="plus"
            style={{ height: 150 }}
            onPress={() => {
              navigation.navigate("Create Routine");
            }}
          ></CardWide>
          <AppText style={styles.text}>
            Have your accessories react to changes at home.
          </AppText>
        </>
      )}
      {routines.length > 0 && (
        <FlatList
          data={routines}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  text: {
    marginTop: 25,
    textAlign: "center",
    marginHorizontal: 20,
  },
  cardStyle: {
    height: 150,
    marginVertical: 15,
  },
});

export default RoutinesScreen;
