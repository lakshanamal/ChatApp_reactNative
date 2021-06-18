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
  const { user } = props;
  const navigation = useNavigation();

  const onClick = async () => {
    try {
      const currentUserAuth = await firebase.auth().currentUser;
      const currentUser = await firebase
        .firestore()
        .collection("users")
        .where("id", "==", currentUserAuth?.uid)
        .get();
      const userData=currentUser.docs[0].data();

      
      const chatRoom = {
        id: "lakshan",
        user: [{
          id:userData.id,
          name:userData.name,
          imageUri:userData.imageUri,
        },{
          id:user.id,
          name:user.name,
          imageUri:user.imageUri,
        }],
        lastMessage:{}
      };
      await firebase
      .firestore()
      .collection("chatrooms")
      .add(chatRoom).then(() => {
        console.log("Chat room create sucess full");
      })

    } catch (err) {
      console.log(err);
    }
    // navigation.navigate("Contacts");
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
