import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../firebaseConfig";
import { ActivityIndicator } from "react-native-paper";

export type ContactListItemProps = {
  user: User;
  curUser: string;
};

const ContactListItem = (props: ContactListItemProps) => {
  const navigation = useNavigation();
  // user in the constact list
  const { user, curUser } = props;
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      // get current user
      setLoading(true);
      const currentUser = await firebase
        .firestore()
        .collection("users")
        .doc(curUser)
        .get();
      const userData = currentUser.data();

      // //  check chat room is exists
      const idPosible1 = user.id + userData?.id;
      const idPosible2 = userData?.id + user.id;

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

      let chatRoomId = user.id + userData?.id;
      if (!checkChatRoom1.exists && !checkChatRoom2.exists) {
        const chatRoom = {
          id: chatRoomId,
          user: [
            {
              id: userData?.id,
              name: userData?.name,
              imageUri: userData?.imageUri,
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
          .set(chatRoom);

        await firebase
          .firestore()
          .collection("users")
          .doc(curUser)
          .update({
            chatRoomIds: firebase.firestore.FieldValue.arrayUnion(chatRoomId),
          });
        await firebase
          .firestore()
          .collection("users")
          .doc(user.id as string)
          .update({
            chatRoomIds: firebase.firestore.FieldValue.arrayUnion(chatRoomId),
          });
        setLoading(false);
      } else if (checkChatRoom1.exists) {
        chatRoomId = checkChatRoom1.id;
      } else if (checkChatRoom2.exists) {
        chatRoomId = checkChatRoom2.id;
      }

      navigation.navigate("ChatRoom", {
        id: chatRoomId,
        user: user,
        currentUser: userData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      {loading ? (
        <View
          style={{
            height: 80,
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <ActivityIndicator color={"white"} />
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default ContactListItem;
