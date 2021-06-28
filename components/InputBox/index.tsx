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
import uuid from "react-native-uuid";

export type ChatMessageProps = {
  message: Message;
};

const InputBox = () => {
  const [message, setMessage] = useState("");
  const route = useRoute();
  // const { id, user, currentUser } = route.params;

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = () => {
    firebase
      .firestore()
      .collection("chats")
      .doc(id)
      .get()
      .then((chat) => {
        if (chat.exists) {
          const newMessage = {
            id: uuid.v4(),
            content: message,
            createdAt: firebase.firestore.Timestamp.now(),
            user: {
              id: currentUser?.id,
              name: currentUser?.name,
            },
          };
          firebase
            .firestore()
            .collection("chats")
            .doc(id)
            .update({
              message: firebase.firestore.FieldValue.arrayUnion(newMessage),
            });
        } else {
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
                id: uuid.v4(),
                content: message,
                createdAt: firebase.firestore.Timestamp.now(),
                user: {
                  id: currentUser?.id,
                  name: currentUser?.name,
                },
              },
            ],
          };

          firebase.firestore().collection("chats").doc(id).set(newMessage);
        }
      });

    firebase
      .firestore()
      .collection("chatrooms")
      .doc(id)
      .update({ lastMessage: message });
    setMessage("");
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

        <TouchableOpacity
          onPress={onPress}
          style={{ position: "absolute", right: 0 }}
        >
          <View style={styles.buttonController}>
            {message ? (
              <MaterialIcons name="send" size={24} color={"#123858"} />
            ) : (
              <MaterialCommunityIcons
                name="microphone"
                size={24}
                color="#123858"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputBox;
