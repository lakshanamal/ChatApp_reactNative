import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import firebase from "../../firebaseConfig";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";
import styles from "./style";

export type ChatMessageProps = {
  message: Message;
};

const InputBox = () => {
  const [message, setMessage] = useState("");
  const route = useRoute();
  const { id, user } = route.params;
  // console.log(user);

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = () => {
    const currentUserAuth = firebase.auth().currentUser?.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(String(currentUserAuth))
      .get()
      .then((docs) => {
        const currentUser = docs.data();
        const newMessage = {
          id: id,
          users: [
            {
              id: currentUser?.id,
              name: currentUser?.name,
              imageUri: currentUser?.imageUri,
            },
            {
              id: user.id,
              name: user.name,
              imageUri: user.imageUri,
            },
          ],
          message: [
            {
              id: "m1",
              content: message,
              // createdAt: ,
              user: {
                id: currentUser?.id,
                name: currentUser?.name,
              },
            },
          ],
        };
      });
    // console.log(currentUser);
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="gray" />
        <TextInput
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder={"Type a message ..."}
        />
        <Entypo name="attachment" size={24} color="gray" style={styles.icon} />
        {!message && (
          <Entypo name="camera" size={24} color="gray" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonController}>
          {message ? (
            <MaterialIcons name="send" size={24} color={"white"} />
          ) : (
            <MaterialCommunityIcons name="microphone" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
