import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import AnalyticsScreen from "../screens/AnalyticsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoutinesScreen from "../screens/RoutinesScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      tabBarActiveTintColor: "tomato",
      headerTitleStyle: {
        fontSize: 30,
        paddingHorizontal: 20,
      },
      headerTitleAlign: "left",
      headerRight: () =>
        route.name === "Home" || route.name === "Routines" ? (
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => console.log("Icon Pressed")}>
              <MaterialCommunityIcons name="plus" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ) : null,
    })}
  >
    <Tab.Screen
      name="Home"
      component={DashboardScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" size={30} color={color} />
        ),
        headerTitle: "Your Dashboard",
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
