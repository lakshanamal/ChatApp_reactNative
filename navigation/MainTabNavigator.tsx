// import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChatsScreeen from "../screens/ChatsScreeen";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { Fontisto } from "@expo/vector-icons";
// import { TabBarItem } from "react-native-tab-view";
// import LoginScreen from "../screens/auth/loging";
const MainTap = createMaterialTopTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme(); //coustom hook

  return (
    <MainTap.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor: "white",
        active: {
          fontSize: 50,
        },
        style: {
          position: "absolute",
          backgroundColor: "#16456D",
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingVertical: 5,
          height:100
        },
        indicatorStyle: {
          backgroundColor: Colors.light.background,
          height: 0,
        },
        labelStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },

        showIcon: true,
      }}
    >
      {/* <MainTap.Screen
        name="Camera"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="camera" color={color} size={18} />
          ),
          tabBarLabel: () => null,
        }}
      /> */}
      <MainTap.Screen name="Chats" component={TabOneNavigator} />
      <MainTap.Screen name="Status" component={TabOneNavigator} />
      <MainTap.Screen name="Calls" component={TabOneNavigator} />
    </MainTap.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabOneStack.Screen name="TabOneScreen" component={ChatsScreeen} />
    </TabOneStack.Navigator>
  );
}
