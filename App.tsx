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
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const getUser = async () => {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user !== null) {
        firebase
          .firestore()
          .collection("users")
          .where("id", "==", user?.uid)
          .get()
          .then((snapshot) => {
            if (!snapshot.empty) {
              console.log(" matching documents.");
              setisAuthenticated(!!user);
              setIsAuthReady(true);
              return;
            } else {
              setisAuthenticated(false);
              setIsAuthReady(true);
              console.log(user?.uid);
              console.log("no matching documents.");
              return;
            }
          });
      } else {
        setIsAuthReady(true);
        return;
      }
    });
  };
  useEffect(() => {
    getUser();
    console.log("check");
  }, []);

  if (!isLoadingComplete || !isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  } else {
    console.log("anith ");
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? (
            <MainNavigator colorScheme={colorScheme} />
          ) : (
            <RegisterNavigator />
          )}
          <StatusBar />
          {/* <RegisterNavigator /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
