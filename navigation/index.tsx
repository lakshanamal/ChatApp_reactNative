import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, View } from "react-native";
import Colors from "../constants/Colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity:0,
          elevation:0
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          title: "Whatsapp",
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  width: 60,
                  justifyContent: "space-around",
                  marginRight: 10,
                }}
              >
                <Octicons name="search" size={21} color="white" />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={22}
                  color="white"
                />
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
