import {
  TouchableHighlight,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import React from "react";

export default function Button({ scaleAnim, label, type, handlePress, icon }) {
  const getTextColor =
    type === "operator" ? "green" : type === "clear" ? "red" : "#fff";

  const getButtonColor =
    type === "equal"
      ? { backgroundColor: "green" }
      : { backgroundColor: "#171717" };

  return (
    <TouchableHighlight
      // activeOpacity={0.6}
      underlayColor={type === "equal" ? "#04ac04" : "#444444"}
      style={[styles.button, getButtonColor]}
      onPress={() => handlePress(label)}
    >
      {/* <Animated.View style={{ transform: [{ scale: scaleAnim }] }}> */}
      {icon ? (
        icon
      ) : (
        <Text style={{ fontSize: 26, color: getTextColor, fontWeight: "bold" }}>
          {label}
        </Text>
      )}
      {/* </Animated.View> */}
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
