import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import Avater from "../../assets/images/avater.png";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../firebaseConfig";
import { ProgressBar } from "react-native-paper";
import Navigation from "../../navigation/index";
import useColorScheme from "../../hooks/useColorScheme";
import * as profile from "../../assets/images/profile2.png";
import { useFonts } from "expo-font";

const CreateProfile = ({ navigation }: { navigation: any }) => {
  const [font] = useFonts({
    Gudea: require("../../assets/fonts/Gudea-Regular.ttf"),
  });
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prograss, setPrograss] = useState(0);
  const colorScheme = useColorScheme();

  const createUser = async () => {
    const user = await firebase.auth().currentUser;
    console.log(user);
    const defaultImageUri =
      "https://firebasestorage.googleapis.com/v0/b/whatsappclone-b7830.appspot.com/o/images%2Favater.png?alt=media&token=ef3ae647-117a-4738-9aa4-ddc2b976ecf4";

    {
      image == "" && setImage(defaultImageUri);
    }

    const newUser = {
      id: user.uid,
      name: name,
      imageUri: image,
    };
    console.log(newUser);
    await firebase
      .firestore()
      .collection("users")
      .add(newUser)
      .then(() => {
        console.log("User added!");
      });
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
    { uri }: { uri: String },
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
    <View style={style.container}>
      <Text style={style.title}>Profile Info</Text>
      <Text
        style={{
          color: "#a7abbb",
          marginBottom: 20,
          fontSize: 18,
          paddingHorizontal: 20,
          textAlign: "center",
        }}
      >
        Please provide your name and an optional profile photo
      </Text>
      <TouchableOpacity onPress={handleChoosePhoto}>
        {image !== "" ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
            }}
          />
        ) : (
          <View style={style.imageContainer}>
            <Image
              source={profile}
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
              }}
            />
          </View>
        )}
      </TouchableOpacity>

      <ProgressBar
        // indeterminate
        style={{
          marginTop: 5,
          backgroundColor: "#a7abbb",
          width: 100,
          marginBottom: 5,
          borderRadius: 20,
        }}
        progress={prograss}
        color={"#6aefae"}
      />

      <TextInput
        style={style.inputName}
        placeholder="Profile name"
        onChangeText={setName}
      />

      <TouchableOpacity
        onPress={createUser}
        disabled={name.length == 0 ? true : false}
        style={name.length == 0 ? style.btnDisable : style.btn}
      >
        <Text style={{ color: "white", textAlign: "center" }}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfile;

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputName: {
    marginVertical: 10,
    fontSize: 17,
    width: "60%",
    borderBottomWidth: 2,
    borderBottomColor: "#f6f6fb",
    marginTop: 30,
    padding: 3,
  },
  btn: {
    backgroundColor: "#7759de",
    padding: 8,
    width: "50%",
    borderRadius: 3,
    textAlign: "center",
  },
  btnDisable: {
    backgroundColor: "gray",
    padding: 8,
    width: "50%",
    borderRadius: 3,
    textAlign: "center",
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#dcdcdc",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 40,
    fontSize: 28,
    color: "#8d69ee",
    fontWeight: "bold",
    fontFamily: "Gudea",
  },
});
