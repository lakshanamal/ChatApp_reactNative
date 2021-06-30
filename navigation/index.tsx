import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity, View, Image } from "react-native";
import Colors from "../constants/Colors";
import NotFoundScreen from "../screens/NotFoundScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactScreen from "../screens/Contact";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./MainTabNavigator";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../assets/images/logoq.png";
import ConImg from "../assets/images/contact.png";
import Burger from "../assets/images/burger.png";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
import Edit from "../screens/Edit";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [visibale, setVisible] = useState(false);
  return <RootNavigator />;
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Root"
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
        options={({ navigation, route }) => ({
          title: "",
          headerStatusBarHeight: 50,
          headerLeft: () => {
            return (
              <Image
                style={{ width: 100, height: 40, resizeMode: "contain" }}
                source={Logo}
              />
            );
          },

          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  width: 50,
                  justifyContent: "space-around",
                  marginRight: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}
                >
                  <Image source={Burger} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
              </View>
            );
          },
        })}
      />

      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ navigation, route }) => ({
          title: route.params.name,
          headerTitleStyle: { fontSize: 26, color: "white", marginLeft: -25 },
          headerStatusBarHeight: 50,
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
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  navigation.navigate("Root");
                }}
              >
                <FontAwesome5 name="angle-left" size={30} color={"white"} />
              </TouchableOpacity>
            );
          },
        })}
      />

      <Stack.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          title: "",
          headerStatusBarHeight: 50,
          headerLeft: () => {
            return (
              <View style={{ paddingLeft: 20 }}>
                <Image
                  style={{
                    width: 100,
                    height: 40,
                    resizeMode: "contain",
                    paddingLeft: 10,
                  }}
                  source={ConImg}
                />
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={Edit}
        options={({ navigation, route }) => ({
          title: "Profile Info",
          headerTintColor: "white",
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  navigation.navigate("Root");
                }}
              >
                <FontAwesome5 name="angle-left" size={30} color={"white"} />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
