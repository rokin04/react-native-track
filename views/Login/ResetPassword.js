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
import styles from "./forgotPassword.style";
import { Logo } from "../../components";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants'
const ResetPassword = ({ navigation }) => {

  const handelSubmit = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container} alignItems={"center"}>

    <Stack.Screen 
    />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center"  , justifyContent:'space-evenly' }}
        overScrollMode={Platform.OS === "android" ? "never" : "auto"}
      >
      <Logo flex={0} marginTop={0} />

      
      <View style={styles.mainContainer} >
        <View style={styles.subContainer}>
          <Image style={styles.resetPasswordImage} source={IMAGES.ResetPassword} /> 
          <Text style={styles.heading} >Reset Password</Text>
        </View>

        <View style={styles.subContainer} > 
          <TextInput 
          placeholder="New Password"
          style={styles.input}
          />
          <TextInput 
          placeholder="Confirm New Password"
          style={styles.input}
          />
      <View style={styles.resetHint} >
          <Text>Must be at least 8 characters </Text>
          <Text>Both Passwords must match </Text>
      </View>
          <TouchableOpacity 
          onPress={handelSubmit}
          style={styles.submitBtn} >
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



export default ResetPassword;
