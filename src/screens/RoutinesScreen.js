import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import CardWide from "../components/CardWide";
import AppText from "../components/AppText";
import colors from "../config/colors";

function RoutinesScreen({ navigation }) {
  // State to track if a routine has been created
  const [hasRoutine, setHasRoutine] = useState(false);

  return (
    <Screen style={styles.container}>
      {!hasRoutine && (
        <CardWide
          title="Create a Routine"
          icon="plus"
          style={{ height: 150 }}
          onPress={() => {
            setHasRoutine(true);
            navigation.navigate("Create Routine");
          }}
        ></CardWide>
      )}
      {hasRoutine && (
        <CardWide
          title="Sleep Time"
          toggle
          subTextLeft="Turns off Device(s)"
          subTextRight="9:00 PM"
          style={{ height: 150 }}
          onPress={() => navigation.navigate("Edit Routine")}
        ></CardWide>
      )}
      <AppText style={styles.text}>
        Have your accessories react to changes at home.
      </AppText>
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
});

export default RoutinesScreen;
