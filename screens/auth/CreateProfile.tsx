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
const CreateProfile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const createProfile = () => {};

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    // ImagePiker.launchImageLibrary({}, (responce) => {
    //   console.log("responce", responce);
    // });
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
        <Image
          source={Avater}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        // editable={!!verificationId}
        placeholder="Profile name"
        onChangeText={setName}
      />
      <Button title="Next" onPress={createProfile} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, borderRadius: 25% }}
        />
      )}
    </View>
  );
};

export default CreateProfile;
