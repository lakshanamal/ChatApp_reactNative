import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import useColorScheme from "../hooks/useColorScheme";
import OTP from "../screens/auth/OTP";
import Login from "../screens/auth/loging";
import RootNavigation from "./index";
import { RegParamList } from "../types";
import { Fontisto } from "@expo/vector-icons";
import CreateProfile from "../screens/auth/CreateProfile";
import MainNavigator from "./index";

const RegStack = createStackNavigator<RegParamList>();

export default function RegNavigation() {
  return <RegisterNavigation />;
}

function RegisterNavigation() {
  const colorScheme = useColorScheme(); //coustom hook

  return (
    <RegStack.Navigator
      initialRouteName="OTP"
      screenOptions={{
        headerLeft: () => null,
        headerShown: false,
      }}
    >
      <RegStack.Screen name="Phone" component={Login} />
      <RegStack.Screen name="OTP" component={OTP} />
      <RegStack.Screen name="Profile" component={CreateProfile} />
      <RegStack.Screen name="Root" component={MainNavigator} />
    </RegStack.Navigator>
  );
}
