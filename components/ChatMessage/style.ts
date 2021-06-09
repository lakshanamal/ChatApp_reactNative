import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // height: "100%",
    padding: 10,
  },
  messageBox: {
    padding: 10,
    borderRadius: 5,
  },
  name: {
    color: Colors.light.tint,
    marginBottom: 5,
    fontWeight: "bold",
  },
  time: {
    alignSelf: "flex-end",
    color: "gray",
  },
  message: {},
});

export default styles;
