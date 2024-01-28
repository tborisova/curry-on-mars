import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    gap: 3,
    width: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  buttonLabel: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
  },
  searchText: {
    color: "white",
  },
  list: {
    borderColor: "red",
    borderWidth: 12,
  },
});
