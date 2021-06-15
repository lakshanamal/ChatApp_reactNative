import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/index";
import RegisterNavigation from "./navigation/RegisterNavigation";
import firebase from "./firebaseConfig";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const getUser = () => {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user == null) {
      setisAuthenticated(!!user);
      console.log(user);
      setIsAuthReady(true);
    }
    // firebase.auth().onAuthStateChanged(function (user) {
    //   setisAuthenticated(!!user);
    //   // console.log(user.uid);
    //   setIsAuthReady(true);
    // });
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!isLoadingComplete || !isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  } else {
    return (
      <SafeAreaProvider>
        {isAuthenticated ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <RegisterNavigation />
        )}
        {/* <Navigation colorScheme={colorScheme} /> */}
        {/* <RegisterNavigation /> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
