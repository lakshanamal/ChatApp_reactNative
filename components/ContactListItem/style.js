import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
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
    height: 60,
    width: 60,
    marginRight: 15,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  status: {
    color: "#d1d1d1",
    fontSize: 14,
  },
  //   midContainer: {},
});

export default styles;
