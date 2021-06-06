import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

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

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

// meke thamai appbar eka flutter eke wage
function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
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
              <View style={{backgroundColor:Colors.light.tint,
              flexDirection:"row" ,
              width:60,
              justifyContent:'space-around',
              marginRight:10
              }}>
                <Octicons name="search" size={22} color={"white"} />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color={"white"}
                />
              </View>
           )
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
