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
    // try {
    //   var user = await firebase.auth().currentUser;
    //   console.log(user);
    //   setisAuthenticated(!!user);
    //   setIsAuthReady(true);
    // } catch (err) {
    //   console.log(err);
    // }
    // var user = firebase.auth().currentUser;
    // console.log(user);
    // if (user == null) {
    //   setisAuthenticated(!!user);
    //   setIsAuthReady(true);
    // }
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      if (user !== null) {
        firebase
          .firestore()
          .collection("users")
          .where("id", "==", user?.uid)
          .get()
          .then((snapshot) => {
            if (!snapshot.empty) {
              console.log("No matching documents.");
              setisAuthenticated(!!user);
              console.log(user?.uid);
              setIsAuthReady(true);
              return;
            } else {
              setisAuthenticated(false);
              setIsAuthReady(true);
              console.log(user?.uid);
              console.log("matching documents.");
              return;
            }
          });
      }
      setIsAuthReady(true);
      return;
    });
  };
  useEffect(() => {
    getUser();
    console.log(firebase.auth());
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
        <NavigationContainer>
          {isAuthenticated ? (
            <MainNavigator colorScheme={colorScheme} />
          ) : (
            <RegisterNavigator />
          )}
          <StatusBar />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
