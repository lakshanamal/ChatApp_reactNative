import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import MainNavigator from "./navigation/index";
import RegisterNavigator from "./navigation/RegisterNavigation";
import firebase from "./firebaseConfig";
import { ActivityIndicator, ImageBackground, View, Image } from "react-native";
import BG from "./assets/images/splash3.png";
import Logo from "./assets/images/lo.png";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    const getUser = () => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user !== null) {
          firebase
            .firestore()
            .collection("users")
            .where("id", "==", user?.uid)
            .get()
            .then((snapshot) => {
              if (!snapshot.empty) {
                setisAuthenticated(!!user);
                setIsAuthReady(true);
                return;
              } else {
                setisAuthenticated(false);
                setIsAuthReady(true);
                return;
              }
            });
        } else {
          setIsAuthReady(true);
          return;
        }
      });
    };
    getUser();
  }, []);

  if (!isLoadingComplete || !isAuthReady) {
    return (
      <ImageBackground source={BG} style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={Logo}
            style={{
              width: 300,
              height: 300,
              resizeMode: "contain",
            }}
          />
          <ActivityIndicator size="large" color="white" />
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? (
            <MainNavigator colorScheme={colorScheme} />
          ) : (
            <RegisterNavigator />
          )}
          <StatusBar />
          {/* <MainNavigator colorScheme={colorScheme} /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
