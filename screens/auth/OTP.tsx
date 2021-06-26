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
import Hello from "../../assets/images/Hello.mp4";
import Veri from "../../assets/images/veri.png";
import { FontAwesome } from "@expo/vector-icons";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { Video } from "expo-av";

const OPT = ({ navigation, route }) => {
  // const { phoneNumber } = route.params;
  const video = React.useRef(null);
  const phoneNumber = "0755535393";
  const recaptchaVerifier = useRef(null);
  const attemptInvisibleVerification = false;
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");

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
  const verifyPhone = async () => {
    // try {
    //   const credential = firebase.auth.PhoneAuthProvider.credential(
    //     verificationId,
    //     verificationCode
    //   );
    //   await firebase.auth().signInWithCredential(credential);
    //   showMessage({ text: "Phone authentication successful 👍" });
    // } catch (err) {
    //   showMessage({ text: `Error: ${err.message}` });
    // }
    navigation.navigate("Profile");
  };

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
    // getOTP();
  }, []);

  return (
    <View style={style.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
        cancelLabel="Close"
      />
      <Video
        ref={video}
        style={{ width: 350, height: 350 }}
        source={Hello}
        resizeMode="contain"
        shouldPlay={true}
      />
      <Image
        source={Veri}
        style={{ width: 200, height: 60, resizeMode: "contain" }}
      />
      <Text style={style.intro}>
        Enter the code we just sent you on your your mobile number
        <Text style={{ color: "black" }}> ({phoneNumber})</Text>
      </Text>

      <View
        style={{
          width: "80%",
          alignItems: "center",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TextInput
          maxLength={1}
          ref={""}
          style={style.inputOtp}
          // editable={!!verificationId}
          onChangeText={setVerificationCode}
        />
        <TextInput
          maxLength={1}
          style={style.inputOtp}
          // editable={!!verificationId}
          onChangeText={setVerificationCode}
        />
        <TextInput
          maxLength={1}
          style={style.inputOtp}
          // editable={!!verificationId}
          onChangeText={setVerificationCode}
        />
        <TextInput
          maxLength={1}
          style={style.inputOtp}
          // editable={!!verificationId}
          onChangeText={setVerificationCode}
        />
        <TextInput
          maxLength={1}
          style={style.inputOtp}
          // editable={!!verificationId}
          onChangeText={setVerificationCode}
        />
        <TextInput
          maxLength={1}
          style={style.inputOtp}
          // editable={!!verificationId}
          onChangeText={setVerificationCode}
        />
      </View>

      <Text
        style={{ color: "#a7abbb", marginVertical: 10, alignItems: "center" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="187"
          height="21"
          viewBox="0 0 187 21"
        >
          <text
            id="Enter_phone_number"
            data-name="ENter phone number"
            transform="translate(0 16)"
            fill="#A3B7C8"
            fontWeight="bold"
          >
            <tspan style={{ textAlign: "center" }}>Enter phone number</tspan>
          </text>
        </svg>
      </Text>
      <TouchableOpacity
        style={verificationCode.length == 6 ? style.btn : style.btnDisable}
        disabled={verificationCode.length == 6 ? false : true}
        onPress={verifyPhone}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Create Profile
        </Text>
        <FontAwesome
          name="chevron-right"
          style={{ fontSize: 24, color: "white" }}
        />
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

    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
    // justifyContent: "center",
    color: "black",
  },
  intro: {
    width: "80%",
    textAlign: "left",
    marginTop: 20,
    color: "#A3B7C8",

    fontWeight: "700",
    fontSize: 18,
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

  inputOtp: {
    marginVertical: 10,
    fontSize: 17,
    width: 40,
    // borderBottomWidth: 2,
    shadowColor: "#A3B7C8",
    shadowRadius: 50,
    borderRadius: 4,
    shadowOpacity: 0.4,
    backgroundColor: "white",
    marginTop: 30,
    textAlign: "center",
    padding: 10,
  },
});
