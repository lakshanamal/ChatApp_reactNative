import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff00",
    // height: "100%",
    display: "flex",
    padding: 2,
    paddingHorizontal: 10,
    width: "auto",
  },
  messageBox: {
    padding: 7,
    paddingStart: 40,
    borderRadius: 5,
    borderBottomEndRadius: 0,
    alignSelf: "flex-end",
    // width: 100,
  },
  otherMeassge: {
    padding: 10,
    paddingEnd: 40,
    borderRadius: 10,
    borderBottomStartRadius: 0,
    alignSelf: "flex-start",
    // width: 100,
  },
  name: {
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
  },
  time: {
    alignSelf: "flex-end",
    color: "#dedede",
    fontSize: 10,
  },
  message: {
    color: "white",
  },
});

export default styles;
