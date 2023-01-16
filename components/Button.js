import { TouchableHighlight, Text, StyleSheet } from "react-native";
import React from "react";

export default function Button({ label, type, handlePress, icon }) {
  const getTextColor =
    type === "operator" ? "green" : type === "clear" ? "red" : "#fff";

  const getButtonColor =
    type === "equal"
      ? { backgroundColor: "green" }
      : { backgroundColor: "#171717" };

  return (
    <TouchableHighlight
      underlayColor={type === "equal" ? "#04ac04" : "#444444"}
      style={[styles.button, getButtonColor]}
      onPress={() => handlePress(label)}
    >
      {icon ? (
        icon
      ) : (
        <Text style={{ fontSize: 26, color: getTextColor, fontWeight: "bold" }}>
          {label}
        </Text>
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: "#171717",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
