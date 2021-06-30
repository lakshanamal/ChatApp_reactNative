import React from "react";
import { View, Text } from "../components/Themed";
import { StyleSheet } from "react-native";

function Edit() {
  return (
    <View style={style.container}>
      <Text>Hi</Text>
    </View>
  );
}

export default Edit;

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
    borderRadius: 7,
    backgroundColor: "white",
    marginTop: 30,
    // textAlign: "center",
    padding: 10,
    shadowColor: "#A3B7C8",
    shadowOffset: {
      width: 0,
      height: 1,
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
  },
});
