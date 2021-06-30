import React, { useState } from "react";
import { View, Text } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import BG from "../assets/images/avater.png";
function Edit() {
  const [name, setName] = useState("");
  return (
    <View style={style.container}>
      <View style={style.midContainer}>
        <Text style={style.title}>Lakshan Amal</Text>
        <View style={style.imageContainer}>
          <Image style={{ width: 200, height: 200 }} source={BG} />
        </View>

        {/* <View style={style.editContainer}> */}
        <Text
          style={{
            color: "white",
            textAlign: "left",
            fontSize: 30,
            width: "100%",
            marginTop: 80,
          }}
        >
          Edit Profile
        </Text>
        <Text style={{ textAlign: "left", width: "100%", marginTop: "30" }}>
          Enter name :
        </Text>
        <TextInput
          style={style.inputName}
          placeholder="Profile name"
          onChangeText={setName}
        />
        <TouchableOpacity onPress={() => {}} disabled={true} style={style.btn}>
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
}

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
    marginTop: 10,
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
  },
});
