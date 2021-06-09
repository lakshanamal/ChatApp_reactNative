import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Text, TextInput } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";
import styles from "./style";

// export type ChatMessageProps = {
//   message: Message;
// };

const InputBox = () => {
  //   const { message } = props;

  //   const isMyMessage = () => {
  //     return message.user.id === "u1";
  //   };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="gray" />
        <TextInput style={styles.textInput} multiline />
        <Entypo name="attachment" size={24} color="gray" style={styles.icon} />
        <Entypo name="camera" size={24} color="gray" style={styles.icon} />
        {/* {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text> */}
      </View>
      <View style={styles.buttonController}>
        <MaterialCommunityIcons name="microphone" size={24} color="white" />
      </View>
    </View>
  );
};

export default InputBox;
