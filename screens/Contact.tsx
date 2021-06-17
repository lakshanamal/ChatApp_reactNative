import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ContactListItem from "../components/ContactListItem";
// import NewMessageButton from "../components/NewMessageButton";
import { View } from "../components/Themed";
import firebase from "./../firebaseConfig";
// import s from "../data/Users";
import { useEffect } from "react";

export default function Contact() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    await firebase.firestore().collection("users").get().then((snapshot)=>{
      snapshot.forEach(doc=>{
        if(doc.exists){
          setUsers([...users,doc.data()])
        }
      })
    });
    
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        style={{ width: "100%" }}
        renderItem={({ item }) => <ContactListItem user={item} />}
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
