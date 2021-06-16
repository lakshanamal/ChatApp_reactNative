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
import Navigation from "../../navigation/index";
import useColorScheme from "../../hooks/useColorScheme";

const CreateProfile = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prograss, setPrograss] = useState(0);
  const colorScheme = useColorScheme();

  const createUser = async () => {
    // const user = await firebase.auth().currentUser;
    const defaultImageUri =
      "https://firebasestorage.googleapis.com/v0/b/whatsappclone-b7830.appspot.com/o/images%2Favater.png?alt=media&token=ef3ae647-117a-4738-9aa4-ddc2b976ecf4";

    {
      image == "" && setImage(defaultImageUri);
    }

    const newUser = {
      // id: user.uid,
      name: name,
      imageUri: image,
    };
    // await firebase
    //   .firestore()
    //   .collection("users")
    //   .add(newUser)
    //   .then(() => {
    //     console.log("User added!");

    //   });
    navigation.navigate("Root");
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
    }
  };

  const uploadImage = async (
    { uri }: { uri: any },
    { name }: { name: any }
  ) => {
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
          setImage(downloadURL);
        });
      }
    });
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
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        ) : (
          <Image
            source={Avater}
            style={{
              width: 120,
              height: 120,
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
        onPress={createUser}
        // disabled={true}
        style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfile;
