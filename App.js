import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  AppState,
} from "react-native";
import Button from "./components/Button";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function valueHasOp(text) {
  if (text.length === 0) return false;
  if (
    text[text.length - 1] === "+" ||
    text[text.length - 1] === "-" ||
    text[text.length - 1] === "*" ||
    text[text.length - 1] === "/" ||
    text[text.length - 1] === "%" ||
    text[text.length - 1] === "(" ||
    text[text.length - 1] === ")"
  )
    return false;

  for (let i = 0; i <= text.length; i++) {
    if (
      text[i] === "+" ||
      text[i] === "-" ||
      text[i] === "*" ||
      text[i] === "/" ||
      text[i] === "%"
    ) {
      return true;
    }
    // return false;
  }
  return false;
}
export default function App() {
  const [calValue, setCalValue] = useState("");
  const [previewValue, setPreviewValue] = useState("");
  const [cursorSel, setCursorSel] = useState({ end: 0, start: 0 });
  const [isCursorSel, setIsCursorSel] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const appState = useRef(AppState.currentState);

  // const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = 0;
  const ansColor = {
    color: isAnswer ? "green" : "white",
  };

  useEffect(() => {
    if (valueHasOp(calValue)) {
      let prevAns = Function(`return ${calValue}`)();
      setPreviewValue(`${prevAns}`);
    } else {
      setPreviewValue(``);
    }
  }, [calValue]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        Keyboard.dismiss();
      }

      appState.current = nextAppState;
      // console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handlePress = (text) => {
    setIsAnswer(false);
    const corrText = text === "X" ? "*" : text === "+/-" ? "-" : text;

    setCursorSel({ end: cursorSel.end + 1, start: cursorSel.start + 1 });
    setCalValue((prev) => {
      if (prev.length !== cursorSel.end && isCursorSel) {
        let leftOver = prev.slice(0, cursorSel.end);
        let rightOver = prev.slice(cursorSel.end, prev.length);

        return `${leftOver}` + `${corrText}` + `${rightOver}`;
      }
      return prev + `${corrText}`;
    });
  };

  const handleClear = () => {
    setCalValue("");
  };

  const handleBackSpace = () => {
    const remainValue = calValue.slice(0, calValue.length - 1);
    setCalValue((prev) => remainValue);
  };

  const handleEqual = () => {
    if (!previewValue) return;
    setCalValue(previewValue);
    setPreviewValue("");
    setIsAnswer(true);
    setCursorSel({ end: previewValue.length, start: previewValue.length });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ansColor]}
        value={calValue}
        onChangeText={setCalValue}
        selection={cursorSel}
        cursorColor='#8ad8d1'
        autoFocus={true}
        textAlign='right'
        onSelectionChange={(e) => {
          setIsCursorSel(true);
          setCursorSel(e.nativeEvent.selection);
        }}
        showSoftInputOnFocus={false}
        // onFocus={Keyboard.dismiss()}
        // editable={false}
      />
      <TextInput
        value={previewValue}
        onChangeText={setPreviewValue}
        cursorColor='#8ad8d1'
        textAlign='right'
        caretHidden={true}
        showSoftInputOnFocus={false}
        style={[styles.input, styles.prevInput]}
      />

      <View style={styles.backButton}>
        <Pressable
          onPress={() => handleBackSpace()}
          disabled={calValue ? false : true}
        >
          <Ionicons
            name='md-backspace-outline'
            size={24}
            color={calValue ? "green" : "#035903"}
          />
        </Pressable>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#575757",
          marginVertical: 20,
        }}
      />

      <View style={styles.buttonContainer}>
        <Row>
          <Button
            handlePress={handleClear}
            label={"C"}
            type='clear'
            scaleAnim={scaleAnim}
          />
          <Button
            handlePress={handlePress}
            label={"()"}
            type='operator'
            icon={
              <MaterialCommunityIcons
                name='code-parentheses'
                size={30}
                color='green'
                style={{ fontWeight: "bold" }}
              />
            }
            scaleAnim={scaleAnim}
          />
          <Button
            handlePress={handlePress}
            label={"%"}
            type='operator'
            scaleAnim={scaleAnim}
          />
          <Button
            handlePress={handlePress}
            label={"/"}
            type='operator'
            icon={<FontAwesome5 name='divide' size={24} color='green' />}
            scaleAnim={scaleAnim}
          />
        </Row>
        <Row>
          <Button handlePress={handlePress} label={"7"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"8"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"9"} scaleAnim={scaleAnim} />
          <Button
            handlePress={handlePress}
            label={"X"}
            type='operator'
            icon={<FontAwesome5 name='times' size={24} color='green' />}
            scaleAnim={scaleAnim}
          />
        </Row>
        <Row>
          <Button handlePress={handlePress} label={"4"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"5"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"6"} scaleAnim={scaleAnim} />
          <Button
            handlePress={handlePress}
            label={"-"}
            type='operator'
            icon={<FontAwesome name='minus' size={24} color='green' />}
            scaleAnim={scaleAnim}
          />
        </Row>
        <Row>
          <Button handlePress={handlePress} label={"1"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"2"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"3"} scaleAnim={scaleAnim} />
          <Button
            handlePress={handlePress}
            label={"+"}
            type='operator'
            icon={<FontAwesome5 name='plus' size={24} color='green' />}
            scaleAnim={scaleAnim}
          />
        </Row>
        <Row>
          <Button
            handlePress={handlePress}
            label={"+/-"}
            scaleAnim={scaleAnim}
          />
          <Button handlePress={handlePress} label={"0"} scaleAnim={scaleAnim} />
          <Button handlePress={handlePress} label={"."} scaleAnim={scaleAnim} />
          <Button
            handlePress={handleEqual}
            label={"="}
            type='equal'
            icon={<FontAwesome5 name='equals' size={24} color='white' />}
            scaleAnim={scaleAnim}
          />
        </Row>
      </View>

      <StatusBar style='light' />
    </View>
  );
}

function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010101",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  input: {
    // height: 100,
    marginTop: 40,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    fontSize: 36,
  },
  prevInput: {
    fontSize: 24,
    marginTop: 40,
    marginBottom: 30,
    color: "#616161",
  },
  buttonContainer: {
    flex: 4,
    // backgroundColor: "red",
    // paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "lightblue",
  },
});
