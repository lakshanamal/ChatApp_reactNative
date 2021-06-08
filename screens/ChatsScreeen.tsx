import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import { View } from "../components/Themed";

import chatRooms from "../data/ChatRooms";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      {/* <ChatListItem chatRoom={chatRooms[0]} /> */}
      <FlatList data={chatRooms} 
      style={{width:"100%"}}
      renderItem={({item})=><ChatListItem chatRoom={item} />}
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
