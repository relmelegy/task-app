import { StyleSheet } from "react-native";

export const taskItemStyles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  taskText: { flex: 1, fontSize: 16 },
  taskInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
  },
  icons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
  },
});