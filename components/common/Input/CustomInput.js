import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { FONT, SIZES } from "../../../constants";

const CustomInput = (props) => {
  return (
    <View>
      <View>
        <Text style={Styles.inputLabel}>{props.title}</Text>
      </View>
      <TextInput
        placeholder={props.placeholder}
        style={Styles.input}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        onBlur={props.onBlur}
        editable={props.editable}
        value={props.value}
        onPressIn={props.onPress}
      />
    </View>
  );
};

export default CustomInput;

const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d0d2d2",
    width: width * 0.9,
    height: height * 0.06,
    alignSelf: "center",
    borderRadius: 3,
    zIndex: -1,
    marginVertical: height * 0.012,
    paddingHorizontal: width * 0.03,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  inputLabel: {
    fontFamily: FONT.regular,
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    marginHorizontal: width * 0.02,
    fontSize: height * 0.018,
    paddingHorizontal: width * 0.01,
    marginTop: height * 0.001,
  },
});
