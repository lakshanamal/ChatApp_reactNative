import React, { useState} from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Welcome from "../../assets/images/Hello.mp4";
import Title from "../../assets/images/title.png";
import { Video } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={{ width: 350, height: 350 }}
        source={Welcome}
        resizeMode="contain"
        shouldPlay={true}
      />
      <Image
        source={Title}
        style={{
          width: 300,
          height: 70,
          resizeMode: "contain",
        }}
      />

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
      <Text
        style={{
          color: "#A3B7C8",
          fontWeight: "bold",
          marginTop: -5,
          marginBottom: 50,
        }}
      >
        Enter phone number
      </Text>
      <TouchableOpacity
        disabled={!phoneNumber}
        // style={phoneNumber.length !== 0 ? styles.btn : styles.btnDisable}
        style={styles.btn}
        onPress={async () => {
          navigation.navigate("OTP", { phoneNumber: phoneNumber });
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Send OTP
        </Text>
        <FontAwesome
          name="chevron-right"
          style={{ fontSize: 24, color: "white" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#0A1C31",
    padding: 8,
    width: "50%",
    borderRadius: 7,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
  },
  btnDisable: {
    backgroundColor: "gray",
    padding: 8,
    width: "50%",
    borderRadius: 7,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
  },
  intro: {
    width: "80%",
    textAlign: "left",
    marginTop: 20,
    color: "#A3B7C8",
    fontWeight: "700",
    fontSize: 18,
  },

  inputPhone: {
    marginVertical: 10,
    fontSize: 17,
    width: "60%",
    borderRadius: 7,
    backgroundColor: "white",
    marginTop: 30,
    textAlign: "center",
    padding: 10,
    shadowColor: "#A3B7C8",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16.0,
    elevation: 5,
  },
});
