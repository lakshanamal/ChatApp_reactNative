import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff00",
    // height: "100%",
    padding: 10,
  },
  messageBox: {
    padding: 10,
    borderRadius: 15,
    borderBottomEndRadius: 0,
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
