import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import EditDeviceScreen from "../screens/EditDeviceScreen";
import SearchDeviceScreen from "../screens/SearchDeviceScreen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SettingsScreen from "../screens/SettingsScreen";
import AccountScreen from "../screens/AccountScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PrivacyScreen from "../screens/PrivacyScreen";

const Stack = createNativeStackNavigator();

function CustomHeaderTitle({ title }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <AppText style={{ fontSize: 26, fontWeight: "bold" }}>{title}</AppText>
    </View>
  );
}

const SettingsNavigator = () => (
  <Stack.Navigator
    screenOptions={({ navigation, route }) => ({
      headerTitleStyle: {
        fontSize: 30,
      },
      headerStyle: {
        backgroundColor: colors.light,
      },
      headerBackTitle: "Back",

      headerTitle: () => <CustomHeaderTitle title={route.name} />,
    })}
  >
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
  </Stack.Navigator>
);

export default SettingsNavigator;
