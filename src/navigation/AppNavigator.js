import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import AnalyticsScreen from "../screens/AnalyticsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SearchDeviceScreen from "../screens/SearchDeviceScreen";
import EditDeviceScreen from "../screens/EditDeviceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoutinesScreen from "../screens/RoutinesScreen";
import colors from "../config/colors";
import DashboardNavigator from "./DashboardNavigator";
import RoutinesNavigator from "./RoutinesNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AnalyticsNavigator from "./AnalyticsNavigator";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="HomeTab"
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" size={30} color={color} />
        ),

        tabBarLabel: "Home",
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="AnalyticsTab"
      component={AnalyticsNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chart-bar" size={25} color={color} />
        ),

        tabBarLabel: "Analytics",
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="RoutinesTab"
      component={RoutinesNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="clock" size={25} color={color} />
        ),
        tabBarLabel: "Routines",
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="SettingsTab"
      component={SettingsNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cog" size={25} color={color} />
        ),

        tabBarLabel: "Settings",
      }}
    ></Tab.Screen>
  </Tab.Navigator>
);

export default AppNavigator;
