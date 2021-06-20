import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { View } from "../components/Themed";
import firebase from "./../firebaseConfig";
import { useEffect } from "react";

export default function Contact() {
  const [users, setUsers] = useState<Array<{}>>([]);
  const [curUser,setCurUser]=useState("");
  useEffect(() => {
    const getUsers = async () => {
      const currentUser = firebase.auth().currentUser;
      setCurUser(currentUser.uid);
      await firebase
        .firestore()
        .collection("users")
        .where("id", "!=", currentUser?.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const user = doc.data();
            setUsers((prevState) => [...prevState, user]);
          });
        });
    };
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        style={{ width: "100%" }}
        renderItem={({ item }) => <ContactListItem curUser={curUser} user={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "black",
  },
});
