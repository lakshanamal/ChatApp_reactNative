import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123858",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  startContainer: {
    backgroundColor: "#123858",
    width: 200,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    elevation: 1,
    marginTop: 50,
    borderRadius: 20,
  },
});

export default styles;
