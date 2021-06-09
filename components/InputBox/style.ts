import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // height: "100%",
    backgroundColor: "#ffffff00",
    margin: 10,
    alignItems: "flex-end",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 10,
    borderRadius: 25,
    flex: 1,
    alignItems: "flex-end",
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
