import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import EditDeviceScreen from "../screens/EditDeviceScreen";
import SearchDeviceScreen from "../screens/SearchDeviceScreen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SetupDeviceScreen from "../screens/SetupDeviceScreen";
import PairDeviceScreen from "../screens/PairDeviceScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";

const Stack = createNativeStackNavigator();

function CustomHeaderTitle({ title }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <AppText style={{ fontSize: 26, fontWeight: "bold" }}>{title}</AppText>
    </View>
  );
}

const DashboardNavigator = () => (
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
        route.name === "Your Dashboard" ? (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setup Device")}
            >
              <MaterialCommunityIcons name="plus" size={25} color="black" />
            </TouchableOpacity>
          </View>
        ) : null,
      headerTitle: () => <CustomHeaderTitle title={route.name} />,
    })}
  >
    <Stack.Screen name="Your Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Edit Device" component={EditDeviceScreen} />
    <Stack.Screen name="Setup Device" component={SetupDeviceScreen} />
    <Stack.Screen name="Search Device" component={SearchDeviceScreen} />
    <Stack.Screen name="Pair Device" component={PairDeviceScreen} />
    <Stack.Screen name="Add Device" component={AddDeviceScreen} />
  </Stack.Navigator>
);

export default DashboardNavigator;
