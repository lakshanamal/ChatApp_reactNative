import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ConatactListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View } from "../components/Themed";

import users from "../data/Users";

export default function Contact() {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        style={{ width: "100%" }}
        renderItem={({ item }) => <ConatactListItem user={item} />}
      />
      <NewMessageButton />
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
