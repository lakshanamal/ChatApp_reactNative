import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // height: "100%",
    backgroundColor: "#ffffff00",
    margin: 10,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#E1EFFC",
    padding: 13,
    paddingRight: 60,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
  },
  buttonController: {
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    elevation: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#E1EFFC",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default styles;
