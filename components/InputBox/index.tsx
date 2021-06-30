import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import firebase from "../../firebaseConfig";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";
import styles from "./style";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native-paper";

export type ChatMessageProps = {
  message: Message;
};

const InputBox = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const route = useRoute<any>();
  const { id, user, currentUser } = route.params;
  const [loading, setLoading] = useState(false);

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };

  const onSendPress = async (message: string) => {
    if (message !== "") {
      await firebase
        .firestore()
        .collection("chats")
        .doc(id)
        .get()
        .then(async (chat) => {
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
            await firebase
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

            await firebase
              .firestore()
              .collection("chats")
              .doc(id)
              .set(newMessage);
          }
        });

      await firebase
        .firestore()
        .collection("chatrooms")
        .doc(id)
        .update({ lastMessage: message });
      setMessage("");
      // }
      // console.log(currentUser);
    }
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress(message);
    }
  };

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      //   uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setLoading(true);
    const responce = await fetch(uri);
    const bob = await responce.blob();
    let roomUri = id + "/";
    let r = Math.random().toString(36).substring(7);
    var uploadTask = firebase
      .storage()
      .ref()
      .child(roomUri + r)
      .put(bob);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // setPrograss(progress);
      if (progress == 100) {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          onSendPress(downloadURL);
          setImage("");
          setLoading(false);
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      {image !== "" && (
        <View
          style={{
            width: "100%",
            height: 200,
            position: "absolute",
            // flex: 0,
            backgroundColor: "#E1EFFC",
            // marginTop:10
            // elevation: 10,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: "#194680",
            alignItems: "center",
            padding: 10,
            // zIndex:-1
          }}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: "90%", height: "70%" }}
            />
          )}
        </View>
      )}
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder={"Type a message ..."}
        />

        {!message && (
          <Entypo
            name="camera"
            size={24}
            color="gray"
            style={styles.icon}
            onPress={handleChoosePhoto}
          />
        )}

        <TouchableOpacity
          onPress={onPress}
          style={{ position: "absolute", right: 0 }}
        >
          <View style={styles.buttonController}>
            <MaterialIcons
              name="send"
              size={24}
              color={"#123858"}
              onPress={() => {
                image == "" ? onSendPress(message) : uploadImage(image);
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputBox;
