import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#123858",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  midContainer: {
    justifyContent: "space-around",
  },
  leftContainer: {
    flexDirection: "row",
  },
  avater: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  imageContainer: {
    height: 60,
    width: 60,
    marginRight: 15,
    borderRadius: 30,
    backgroundColor: "#0afff7",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  lastMessage: {
    color: "#cfcfcf",
    fontSize: 14,
  },
  time: {
    color: "#a8a8a8",
    fontSize: 14,
  },
  //   midContainer: {},
});

export default styles;
