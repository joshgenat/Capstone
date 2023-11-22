import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import RoutinesScreen from "../screens/RoutinesScreen";

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = ({ color }) => (
  <Tab.Navigator activeColor="tomato" inactiveColor="dodgerblue">
    <Tab.Screen
      name="Home"
      component={DashboardScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" size={25} color={color} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Analytics"
      component={AnalyticsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chart-bar" size={25} color={color} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Routines"
      component={RoutinesScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="clock" size={25} color={color} />
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Settings"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cog" size={25} color={color} />
        ),
      }}
    ></Tab.Screen>
  </Tab.Navigator>
);

export default AppNavigator;
