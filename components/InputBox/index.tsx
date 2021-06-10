import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";
import styles from "./style";

// export type ChatMessageProps = {
//   message: Message;
// };

const InputBox = () => {
  const [message, setMessage] = useState("");

const onMicrophonePress=()=>{
    console.warn('Microphone');
}

const onSendPress=()=>{
    console.warn('sent');
}

const onPress=()=>{
    if(!message){
        onMicrophonePress();
    }else{
        onSendPress();
    }
}

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
        {!message && (
          <Entypo name="camera" size={24} color="gray" style={styles.icon} />
        )}
      </View>
   <TouchableOpacity onPress={onPress}>
   <View style={styles.buttonController}>
        {message ? (
          <MaterialIcons name="send" size={24} color={"white"} />
        ) : (
          <MaterialCommunityIcons name="microphone" size={24} color="white" />
        )}
      </View>
   </TouchableOpacity>
    </View>
  );
};

export default InputBox;
