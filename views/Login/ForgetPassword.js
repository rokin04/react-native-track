import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { Stack } from "expo-router";
import { Logo } from "../../components";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants'
import styles from "./ForgetPassword.style";


const ForgetPassword = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} alignItems={"center"}>

    <Stack.Screen 
    // options={{
    //   headerTitle:''
    // }}
    />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center"  , justifyContent:'space-evenly' }}
        overScrollMode={Platform.OS === "android" ? "never" : "auto"}
      >
      <Logo flex={0} marginTop={0} />

      
      <View style={styles.mainContainer} >
        <View style={styles.subContainer}>
          <Image style={styles.forgotPasswordImage} source={IMAGES.FPI} /> 
          <Text style={styles.heading} >Forgot Password?</Text>
          <Text style={styles.para} >Don't worry it happens. Please enter the address associated withyour account</Text>
        </View>

        <View style={styles.subContainer} > 
          <TextInput 
          placeholder="Enter your email id"
          style={styles.input}
          />
          <TouchableOpacity style={styles.submitBtn} >
            <Text style={styles.sunmitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

        <View style={styles.pushLink}>
          <Text style={styles.centerText}> Don't have Account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            paddingTop={10}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default ForgetPassword;