import React, { useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import Navigation from "../../navigation";
import firebase from "../../firebaseConfig";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const navigation = useNavigation();
  // user in the constact list
  const { user } = props;

  const onClick = async () => {
    try {
      // get current user
      const currentUserAuth = await firebase.auth().currentUser;
      const currentUser = await firebase
        .firestore()
        .collection("users")
        .where("id", "==", currentUserAuth?.uid)
        .get();

      const userData = currentUser.docs[0].data();

      //  check chat room is exists
      const idPosible1 = user.id + userData.id;
      const idPosible2 = userData.id + user.id;

      const checkChatRoom1 = await firebase
        .firestore()
        .collection("chatrooms")
        .doc(idPosible1)
        .get();

      const checkChatRoom2 = await firebase
        .firestore()
        .collection("chatrooms")
        .doc(idPosible2)
        .get();

      let chatRoomId = user.id + userData.id;
      if (!checkChatRoom1.exists && !checkChatRoom2.exists) {
        const chatRoom = {
          id: chatRoomId,
          user: [
            {
              id: userData.id,
              name: userData.name,
              imageUri: userData.imageUri,
            },
            {
              id: user.id,
              name: user.name,
              imageUri: user.imageUri,
            },
          ],
          lastMessage: {},
        };
        await firebase
          .firestore()
          .collection("chatrooms")
          .doc(chatRoomId)
          .set(chatRoom)
          .then(() => {
            console.log("Chat room create sucess full");
          });
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUserAuth?.uid)
          .update({
            chatRoomIds: firebase.firestore.FieldValue.arrayUnion(chatRoomId),
          })
          .then(() => {
            console.log("Chat room create sucess full");
          });
      } else if (checkChatRoom1.exists) {
        chatRoomId = checkChatRoom1.id;
      } else if (checkChatRoom2.exists) {
        chatRoomId = checkChatRoom2.id;
      }

      navigation.navigate("ChatRoom", { id: chatRoomId.id, name: user.name });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avater} />
          <View style={styles.midContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
