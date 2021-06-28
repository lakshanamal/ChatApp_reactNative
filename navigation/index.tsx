import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactScreen from "../screens/Contact";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./MainTabNavigator";
import { IoIosArrowBack } from "react-icons/io";

import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return <RootNavigator />;
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      // initialRouteName="ChatRoom"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#123858",

          shadowOpacity: 0,
          elevation: 0,
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
          title: "Memo",
          headerLeft: () => null,
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
        name="ChatRoom"
        component={ChatRoomScreen}
        // options={({ navigation, route }) => ({
        // title: route.params.name,
        // headerRight: () => {
        //   return (
        //     <View
        //       style={{
        //         flexDirection: "row",
        //         width: 140,
        //         justifyContent: "space-around",
        //         marginRight: 10,
        //       }}
        //     >
        //       <FontAwesome5 name="video" size={18} color={"white"} />
        //       <MaterialIcons name="call" size={18} color={"white"} />

        //       <MaterialCommunityIcons
        //         name="dots-vertical"
        //         size={18}
        //         color="white"
        //       />
        //     </View>
        //   );
        // },
        // headerLeft: () => {
        //   return (
        //     <TouchableOpacity
        //       // onPress={() => {
        //       //   navigation.navigate("Root");
        //       // }}
        //     >
        //       <IoIosArrowBack
        //         name="IoChevronBackCircleSharp"
        //         size={18}
        //         color={"white"}
        //       />
        //     </TouchableOpacity>
        //   );
        //   // <FontAwesome5 name="video" size={18} color={"white"} />
        //   // <Text>Hello</Text>;
        // },
        // })}
      />

      <Stack.Screen name="Contacts" component={ContactScreen} />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
