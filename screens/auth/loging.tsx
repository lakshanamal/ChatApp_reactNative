import React, { useState, useRef } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          navigation.navigate("OTP", { phoneNumber: phoneNumber });
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
