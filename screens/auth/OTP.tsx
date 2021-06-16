import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  TextInput,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "../../components/Themed";
import firebase from "../../firebaseConfig";
import * as Logo from "../../assets/images/logo2.png";

import { useFonts } from "expo-font";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";

const OPT = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [font] = useFonts({
    Gudea: require("../../assets/fonts/Gudea-Regular.ttf"),
  });
  const recaptchaVerifier = useRef(null);
  const attemptInvisibleVerification = false;
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("d");

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );

  const getOTP = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone.",
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}` });
    }
  };

  useEffect(() => {
    getOTP();
  }, []);

  return (
    <View style={style.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
        cancelLabel="Close"
      />
      <Image source={Logo} style={style.image} />
      <Text style={style.mainTitle}>Varification</Text>
      <Text style={style.intro}>
        You will get OTP from{" "}
        <Text style={{ color: "black" }}>{phoneNumber}</Text> via a SMS
      </Text>
      <TextInput
        maxLength={6}
        style={style.inputOTP}
        editable={!!verificationId}
        placeholder="XXXXXX"
        onChangeText={setVerificationCode}
      />
      <Text style={{ color: "#a7abbb", marginVertical: 10 }}>
        Enter 6-digit code
      </Text>
      <TouchableOpacity
        style={verificationCode.length == 6 ? style.btn : style.btnDisable}
        disabled={verificationCode.length == 6 ? false : true}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}` });
          }
          navigation.navigate("Profile");
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>VERIFY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OPT;

const style = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  mainTitle: {
    marginTop: 20,
    fontFamily: "Gudea",
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    color: "black",
  },
  intro: {
    width: "60%",
    textAlign: "center",
    marginTop: 40,
    color: "#3d3d3d",
    fontFamily: "Gudea",
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#7759de",
    padding: 8,
    width: "40%",
    borderRadius: 3,
  },
  inputOTP: {
    fontSize: 17,
    // width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: "#f6f6fb",
    marginTop: 30,
    // textAlign: "center",
    padding: 5,
    color: "#3d3d3d",
    fontWeight: "bold",
    letterSpacing: 25,
  },
  btnDisable: {
    backgroundColor: "gray",
    padding: 8,
    width: "40%",
    borderRadius: 3,
  },
});
