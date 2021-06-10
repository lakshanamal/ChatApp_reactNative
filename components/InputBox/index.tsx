import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";
import styles from "./style";

// export type ChatMessageProps = {
//   message: Message;
// };

const InputBox = () => {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="gray" />
        <TextInput
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder={"Type a message ..."}
        />
        <Entypo name="attachment" size={24} color="gray" style={styles.icon} />
        <Entypo name="camera" size={24} color="gray" style={styles.icon} />
      </View>
      <View style={styles.buttonController}>
        {message ? (
          <MaterialIcons name="send" size={24} color={"white"} />
        ) : (
          <MaterialCommunityIcons name="microphone" size={24} color="white" />
        )}
      </View>
    </View>
  );
};

export default InputBox;
