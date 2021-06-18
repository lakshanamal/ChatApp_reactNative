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

      // // check chat room is exists
      // const checkChatRoom = await firebase
      //   .firestore()
      //   .collection("chatrooms")
      //   .get();

      // checkChatRoom.docs.forEach((doc) => {
      //   console.log(doc.data().user);
      //   if(doc.data().user[0]. && doc.data().user[1])
      // });

      const chatRoomId = user.id + userData.id;
      console.log(chatRoomId);
      // create new chat room
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
        .add(chatRoom)
        .then(() => {
          console.log("Chat room create sucess full");
        });
      // navigation.navigate("ChatRoom", { id: chatRoom.id, name: user.name });
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
