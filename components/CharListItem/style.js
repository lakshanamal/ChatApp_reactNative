import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
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
    marginRight: 10,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "gray",
    fontSize: 16,
  },
  time: {
    color: "gray",
    fontSize: 16,
  },
  //   midContainer: {},
});

export default styles;
