import React, { useEffect, useState } from "react";
import { View, Text } from "../components/Themed";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import BG from "../assets/images/avater.png";
import firebase from "../firebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import Camera from "../assets/images/profile2.png";

const Edit = () => {
  const [name, setName] = useState("");
  const [uri, setUri] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUserAuth = firebase.auth().currentUser;
    setId(currentUserAuth!.uid);
    setLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(currentUserAuth?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setName(doc.data()!.name);
          setUri(doc.data()!.imageUri);
          setLoading(false);
        }
      });
  }, []);

  const EditName = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({ name: name });

    Alert.alert(
      "Memo aleart",
      "User name sucessfully updated",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={style.container}>
      <View style={style.midContainer}>
        <Text style={style.title}>{name}</Text>
        <View style={style.imageContainer}>
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <TouchableOpacity>
              <Image
                style={{ width: 200, height: 200, borderRadius: 100 }}
                source={{ uri: uri }}
              />
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  right: -10,
                  bottom: -10,
                  elevation: 5,
                }}
              >
                <Image style={{ width: 20, height: 20 }} source={Camera} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* <View style={style.editContainer}> */}
        <Text
          style={{
            color: "white",
            textAlign: "left",
            fontSize: 30,
            width: "100%",
            marginTop: 50,
            borderTopWidth: 2,
            paddingTop: 20,
            borderTopColor: "#123858",
          }}
        >
          Edit Profile
        </Text>
        <Text style={{ textAlign: "left", width: "100%", marginTop: 30 }}>
          Enter name :
        </Text>
        <TextInput
          style={style.inputName}
          placeholder="Profile name"
          onChangeText={setName}
          value={name}
        />
        <TouchableOpacity onPress={EditName} disabled={false} style={style.btn}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

export default Edit;

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#123858",
  },
  midContainer: {
    backgroundColor: "#16456D",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    textAlign: "left",
    color: "black",
    padding: 20,
  },
  // editContainer: {
  //   marginTop: 20,
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: "white",
  //   margin: -10,
  //   borderTopLeftRadius: 40,
  //   borderTopRightRadius: 40,
  // },
  inputName: {
    marginVertical: 10,
    fontSize: 17,
    width: "80%",
    borderRadius: 7,
    backgroundColor: "white",
    marginBottom: 30,
    // textAlign: "center",
    padding: 10,
    shadowColor: "#A3B7C8",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16.0,
    elevation: 5,
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
    width: 200,
    height: 200,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
    paddingBottom: 10,
  },
});
