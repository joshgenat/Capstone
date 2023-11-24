import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import EditDeviceScreen from "../screens/EditDeviceScreen";
import SearchDeviceScreen from "../screens/SearchDeviceScreen";

const Stack = createNativeStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Edit" component={EditDeviceScreen} />
    <Stack.Screen name="Search" component={SearchDeviceScreen} />
  </Stack.Navigator>
);

export default DashboardNavigator;
