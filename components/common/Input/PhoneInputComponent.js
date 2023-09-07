import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
// import PhoneInput from 'react-native-phone-number-input';
import { FONT, SIZES } from '../../../constants';

const PhoneInputComponent = (props) => {

  return (
    <View >
       <View>
        <Text style={styles.inputLabel}>{props.title}</Text>
      </View>
      <PhoneInput 
        value={props.value}
        containerStyle={styles.input}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeStyle}
        onChangeCountry={props.onChangeCountry}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

export default PhoneInputComponent

const {height,width} = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d0d2d2",
    width: width * 0.9,
    height: height * 0.06,
    alignSelf: "center",
    borderRadius: 3,
    zIndex: -1,
    marginVertical: height * 0.012,
    backgroundColor: '#fff',
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
  textInput:{
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
     height: height*0.05,
  },
  textContainer:{
    backgroundColor:'#fff',
    alignItems:'center',
    marginLeft: -width*0.038,
    paddingLeft:width*0.02
  },
  codeStyle:{
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color:'#898D8D',
    marginTop: -height*0.005,
  },
})