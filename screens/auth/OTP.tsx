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
import Hello from "../../assets/images/otp.mp4";
import Veri from "../../assets/images/veri.png";
import { FontAwesome } from "@expo/vector-icons";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { Video } from "expo-av";
import { useRoute, useNavigation } from "@react-navigation/native";

const OPT = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { phoneNumber } = route.params;
  // const phoneNumber = "515515";
  const video = React.useRef(null);
  const recaptchaVerifier = useRef(null);
  const attemptInvisibleVerification = false;
  const [verificationCode, setVerificationCode] = useState<string[]>([]);
  let OTP = new Array(6).fill("");
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
    let verificationNumber = (verificationCode as any).join("");
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationNumber
      );
      await firebase.auth().signInWithCredential(credential);
      showMessage({ text: "Phone authentication successful 👍" });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}` });
    }
    navigation.navigate("Profile");
  };

  const getOTP = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current!
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
    OTP[0].focus();
  }, []);

  function handleChange(value: string, index: number) {
    if (index < OTP.length - 1 && value) {
      OTP[index + 1].focus();
    }
    if (index === OTP.length - 1) {
      OTP[index].blur();
    }

    setVerificationCode([...verificationCode, value]);
  }

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
        {OTP.map((data, index) => {
          return (
            <TextInput
              maxLength={1}
              key={index}
              style={style.inputOtp}
              keyboardType="numeric"
              onChangeText={(el) => {
                handleChange(el, index);
              }}
              ref={(ref) => (OTP[index] = ref)}
              // editable={!!verificationId}
            />
          );
        })}
      </View>

      <Text
        style={{ color: "#a7abbb", marginVertical: 10, alignItems: "center" }}
      >
        <Text
          style={{
            color: "#A3B7C8",
            fontWeight: "bold",
            marginTop: -5,
            marginBottom: 50,
          }}
        >
          Enter 6 digit code
        </Text>
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
    elevation: 5,
    color: "black",
  },
});
