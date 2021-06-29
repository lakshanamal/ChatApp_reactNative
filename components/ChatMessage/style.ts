import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff00",
    // height: "100%",
    display: "flex",
    padding: 10,
    width: "auto",
    alignSelf: "flex-end",
  },
  messageBox: {
    padding: 10,
    paddingStart: 40,
    borderRadius: 15,
    borderBottomEndRadius: 0,
    // width: 100,
  },
  name: {
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
  },
  time: {
    alignSelf: "flex-end",
    color: "gray",
  },
  message: {
    color: "white",
  },
});

export default styles;
