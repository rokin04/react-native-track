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
import OtpInput from 'custom-react-native-otp-input'
import { Stack } from "expo-router";
import styles from "./forgotPassword.style";
import { Logo } from "../../components";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants'

const EnterOTP = ({ navigation }) => {

    const handelSubmit = () => {
        navigation.navigate('ResetPassword')
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
          <Image style={styles.forgotPasswordImage} source={IMAGES.Eotp} /> 
          <Text style={styles.para} >A four digit code has been sent to your associated email address</Text>
          <OtpInput
        numberOfDigits={5}
        inputShape={'box_with_border_radius'}
        secureEntry
      />
      <TouchableOpacity  >
        <Text style={styles.resendOTP}>Resend OTP</Text>
      </TouchableOpacity>
        </View>

        <View style={styles.subContainer} > 
          <TouchableOpacity style={styles.submitBtn} onPress={handelSubmit} >
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



export default EnterOTP;
