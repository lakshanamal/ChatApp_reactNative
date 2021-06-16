import React, { useState, useRef } from "react";
import { Text, View, TextInput, Button, StyleSheet, Image } from "react-native";
import Logo from "../../assets/images/logo1.png";
import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }) => {
  const [font] = useFonts({
    Gudea: require("../../assets/fonts/Gudea-Regular.ttf"),
  });
  const [phoneNumber, setPhoneNumber] = useState("+94");
  return (
    <View
      style={{
        padding: 20,
        marginTop: 30,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text
          style={{
            marginTop: 21,
            fontFamily: "Gudea",
            fontSize: 20,
            color: "#636363",
            fontWeight: "bold",
          }}
        >
          Welcome to Chatty!
        </Text>
        <Text
          style={{
            marginTop: 20,
            width: "60%",
            textAlign: "center",
            color: "#a7abbb",
            fontWeight: "500",
          }}
        >
          We will send you one time code on your phone number
        </Text>
      </View>

      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        value={phoneNumber}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        color="#7759de"
        onPress={async () => {
          navigation.navigate("OTP", { phoneNumber: phoneNumber });
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
