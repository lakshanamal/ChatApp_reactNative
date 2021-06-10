import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  midContainer: {
    justifyContent: "space-around",
  },
  leftContainer: {
    flexDirection: "row",
  },
  avater: {
    height: 60,
    width: 60,
    marginRight: 15,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  //   midContainer: {},
});

export default styles;
