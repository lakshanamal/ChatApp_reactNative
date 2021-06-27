import React, { useState, useEffect } from "react";
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
import profile from "../../assets/images/profile2.png";
import * as Font from "expo-font";
import { Video } from "expo-av";
import Profile from "../../assets/images/profile.mp4";
import info from "../../assets/images/profile.png";
import { FontAwesome } from "@expo/vector-icons";

const CreateProfile = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prograss, setPrograss] = useState(0);
  const colorScheme = useColorScheme();
  const video = React.useRef(null);

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Gudea: require("../../assets/fonts/Gudea-Regular.ttf"),
      }))();
    console.log(Font);
  }, []);

  const createUser = async () => {
    const user = await firebase.auth().currentUser;
    const defaultImageUri =
      "https://firebasestorage.googleapis.com/v0/b/whatsappclone-b7830.appspot.com/o/images%2Favater.png?alt=media&token=ef3ae647-117a-4738-9aa4-ddc2b976ecf4";

    {
      image == "" && setImage(defaultImageUri);
    }

    const newUser = {
      id: user?.uid,
      name: name,
      imageUri: image,
      status: "iam using memo",
      chatRoomIds: [],
    };
    console.log(newUser);

    await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .set(newUser)
      .then(() => {
        console.log("User added!");
      })
      .catch((error) => {
        console.log(error);
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

  const uploadImage = async (uri: string, name: string) => {
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
      <Video
        ref={video}
        style={{ width: 350, height: 350 }}
        source={Profile}
        resizeMode="contain"
        shouldPlay={true}
      />
      <Image
        source={info}
        style={{
          width: 180,
          height: 50,
          resizeMode: "contain",
          marginTop: -10,
        }}
      />

      <Text
        style={{
          color: "#A3B7C8",
          marginBottom: 15,
          fontSize: 18,
          paddingHorizontal: 20,
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        Please provide your name and an optional profile photo
      </Text>
      <TouchableOpacity onPress={handleChoosePhoto}>
        {image !== "" ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
            }}
          />
        ) : (
          <View style={style.imageContainer}>
            <Image
              source={profile}
              style={{
                width: 30,
                height: 30,
                marginRight: 3,
                marginBottom: 2,
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
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Let's Start
        </Text>
        <FontAwesome
          name="chevron-right"
          style={{ fontSize: 24, color: "white" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfile;

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputName: {
    marginVertical: 10,
    fontSize: 17,
    width: "60%",
    // borderBottomWidth: 2,
    shadowColor: "#A3B7C8",
    shadowRadius: 50,
    borderRadius: 4,
    shadowOpacity: 0.4,
    backgroundColor: "white",
    marginTop: 30,
    padding: 10,
  },
  btn: {
    backgroundColor: "#0A1C31",
    padding: 8,
    width: "50%",
    borderRadius: 7,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
  },
  btnDisable: {
    backgroundColor: "gray",
    padding: 5,
    width: "50%",
    borderRadius: 7,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f1f1f1",
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
