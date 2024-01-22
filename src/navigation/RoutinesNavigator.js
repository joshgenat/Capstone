import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import EditDeviceScreen from "../screens/EditDeviceScreen";
import SearchDeviceScreen from "../screens/SearchDeviceScreen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import RoutinesScreen from "../screens/RoutinesScreen";
import RoutineCreateScreen from "../screens/RoutineCreateScreen";
import RoutineEditScreen from "../screens/RoutineEditScreen";

const Stack = createNativeStackNavigator();

function CustomHeaderTitle({ title }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <AppText style={{ fontSize: 26, fontWeight: "bold" }}>{title}</AppText>
    </View>
  );
}

const RoutinesNavigator = () => (
  <Stack.Navigator
    screenOptions={({ navigation, route }) => ({
      headerTitleStyle: {
        fontSize: 30,
      },
      headerStyle: {
        backgroundColor: colors.light,
      },
      headerBackTitle: "Back",
      headerRight: () =>
        route.name === "Routines" ? (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Create Routine")}
            >
              <MaterialCommunityIcons name="plus" size={25} color="black" />
            </TouchableOpacity>
          </View>
        ) : null,

      headerTitle: () => <CustomHeaderTitle title={route.name} />,
    })}
  >
    <Stack.Screen name="Routines" component={RoutinesScreen} />
    <Stack.Screen name="Create Routine" component={RoutineCreateScreen} />
    <Stack.Screen name="Edit Routine" component={RoutineEditScreen} />
    <Stack.Screen name="Search" component={SearchDeviceScreen} />
  </Stack.Navigator>
);

export default RoutinesNavigator;
