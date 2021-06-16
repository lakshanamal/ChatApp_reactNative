import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Logo from "../../assets/images/logo2.png";
import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [font] = useFonts({
    Gudea: require("../../assets/fonts/Gudea-Regular.ttf"),
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 100, height: 100 }} />
      <Text style={styles.mainTitle}>Welcome to Chatty!</Text>
      <Text style={styles.intro}>
        We will send you one time code on your phone number
      </Text>

      <TextInput
        style={styles.inputPhone}
        placeholder="+94 99 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        value={phoneNumber}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />

      <TouchableOpacity
        disabled={!phoneNumber}
        style={phoneNumber.length !== 0 ? styles.btn : styles.btnDisable}
        onPress={async () => {
          navigation.navigate("OTP", { phoneNumber: phoneNumber });
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Send Verification Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#7759de",
    padding: 8,
    width: "50%",
    borderRadius: 3,
  },
  btnDisable: {
    backgroundColor: "gray",
    padding: 8,
    width: "50%",
    borderRadius: 3,
  },
  intro: {
    width: "60%",
    textAlign: "center",
    marginTop: 40,
    color: "#3d3d3d",
    fontFamily: "Gudea",
    fontWeight: "700",
  },
  mainTitle: {
    marginTop: 20,
    fontFamily: "Gudea",
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  inputPhone: {
    marginVertical: 10,
    fontSize: 17,
    width: "60%",
    borderBottomWidth: 2,
    borderBottomColor: "#f6f6fb",
    marginTop: 30,
    textAlign: "center",
    padding: 3,
  },
});
