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
import firebase from "../../firebaseConfig";
import { ProgressBar } from "react-native-paper";

const CreateProfile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prograss, setPrograss] = useState(0);
  // const [prograss, setPrograss] = useState(0);

  const createProfile = () => {
    const user = firebase.auth().currentUser;
    setId(user.uid);
    console.log(image);
    console.log(user.uid);
    const newUser = {
      id: user.uid,
      name: name,
      imageUri: setImage,
    };
  };

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
    var uploadTask = firebase
      .storage()
      .ref()
      .child("images/" + name)
      .put(bob);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPrograss(progress);
      if (progress == 100) {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    });

    // console.log(ref.getDownloadURL());
    // return ref.;
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
        placeholder="Profile name"
        onChangeText={setName}
      />
      <ProgressBar
        style={{ marginTop: 5, backgroundColor: "gray", width: 100 }}
        progress={prograss}
        color={"green"}
      />

      <TouchableOpacity
        onPress={createProfile}
        title="Next"
        style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfile;