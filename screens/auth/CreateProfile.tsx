import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Avater from "../../assets/images/avater.png";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  

  const createProfile = () => {};

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri, "profile");
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri, name) => {
    const responce = await fetch(uri);
    const bob = await responce.blob();
    console.log("methanin giya");
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + name);
    return ref.put(bob);
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello lets make a profile</Text>

      <TouchableOpacity onPress={handleChoosePhoto}>
        {image !== "" ? (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Image
            source={Avater}
            style={{
              width: 100,
              height: 100,
            }}
          />
        )}
      </TouchableOpacity>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        // editable={!!verificationId}
        placeholder="Profile name"
        onChangeText={setName}
      />
      <Button title="Next" onPress={createProfile} />
    </View>
  );
};

export default CreateProfile;
