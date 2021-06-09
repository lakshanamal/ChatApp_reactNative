import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // height: "100%",

    margin: 10,
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 10,
    borderRadius: 50,
    flex: 1,
  },
  buttonController: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default styles;
