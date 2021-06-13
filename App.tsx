import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/index";
import LoginScreen from "./screens/auth/loging";
import firebase from "./firebaseConfig";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const getUser = async () => {
    // var user = await firebase.auth().currentUser;
    // return user;
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, [setisAuthenticated]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {isAuthenticated ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <LoginScreen />
        )}
        {/* <Navigation colorScheme={colorScheme} /> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
