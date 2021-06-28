import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./style";
// import {Meterial}

const NewMessageButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Contacts");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NewMessageButton;
