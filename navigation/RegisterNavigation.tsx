import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import useColorScheme from "../hooks/useColorScheme";
import OTP from "../screens/auth/OTP";
import Login from "../screens/auth/loging";

import { RegParamList } from "../types";
import { Fontisto } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import CreateProfile from "../screens/auth/CreateProfile";

const RegStack = createStackNavigator<RegParamList>();

export default function RegNavigation() {
  return (
    <NavigationContainer>
      <RegisterNavigation />
    </NavigationContainer>
  );
}

function RegisterNavigation() {
  const colorScheme = useColorScheme(); //coustom hook

  return (
    <RegStack.Navigator initialRouteName="Phone">
      <RegStack.Screen name="Phone" component={Login} />
      <RegStack.Screen
        name="OTP"
        component={OTP}
        options={{
          headerLeft: () => null,
        }}
      />
      <RegStack.Screen name="Profile" component={CreateProfile} />
    </RegStack.Navigator>
  );
}
