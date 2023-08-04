import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView, Modal } from 'react-native';
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants';
import { TextInput } from 'react-native';
import { HOST } from '../../utils/Host-URL';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import * as Yup from "yup";
import { DropDownCustom, Logo } from '../../components';
import { Platform } from 'react-native';
import styles from '../Login/login.style';
import OtpModal from './OtpModal';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const countries = [
  { code: "AU", label: "Australia", countryCode: "61" },
  { code: "US", label: "United States", countryCode: "1" },
  { code: "GB", label: "United Kingdom", countryCode: "44" },
  { code: "CA", label: "Canada", countryCode: "1" },
  { code: "IN", label: "India", countryCode: "91" },
];

const appIcons = [ICONS.google, ICONS.facebook, ICONS.twitter, ICONS.linkedin]

const Register = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState(countries[0].countryCode);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleData, setRoleData] = useState([]);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpby, setOtpby] = useState('');
  const [otp, setOtp] = useState('');
  const pickerRef = useRef();
  const emailRef = useRef("");
  const phoneNoRef = useRef("");

  const handleOnCountryCodeChange = (itemValue) => {
    setCountryCode(itemValue);
  };

  const handleVerifyPhoneNo = () => {
    setOtpby('phoneno');
    setIsOtpModalOpen(true);
  }
  const handleVerifyEmail = () => {
    setOtpby('email');
    setIsOtpModalOpen(true);
  }

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: selectedRole === 4 ? "Provider" : "",
    phoneNo: "",
    email: "",
  };

  const FORM_VALIDATION = object().shape({
    firstName: string()
      .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
      .required("Required"),
    lastName: string()
      .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
      .required("Required"),
    phoneNo: number().positive("Number must not be negative").required("Required").min(99999999, "Invalid Number").max(999999999, "Invalid Number"),
    email: string().email("Invalid email").required("Required"),
    password: string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character")
      .required("Password is required"),
    confirmPassword: string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = (data) => {
    var myHeaders = new Headers();
    emailRef.current = data.email;
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        ...data,
        phoneNo: "+" + countryCode + data.phoneNo,
        roleId: selectedRole,
      }),
      redirect: "follow",
    };

    fetch(`${HOST}:8081/api/signup`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.responseStatus === 200) {
          setIsOtpModalOpen(true);
          Alert.alert("Success! Please Verify", result.responseMessage, [{ text: "OK", onPress: () => { } }]);
        } else {
          Alert.alert("Error", result.responseMessage, [{ text: "OK", onPress: () => { } }]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getRoleData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${HOST}:8081/api/get/roles`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.responseStatus === 200) {
          setRoleData(result.roles);
        } else {
          // toast.error(result.responseMessage);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getRoleData();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} overScrollMode={Platform.OS === 'android' ? "never" : "auto"}>
        <Logo flex={0} marginTop={10} />
        {!selectedRole ? (<View style={{ alignItems: "center", justifyContent: "center", flex: 1, width: '100%' }}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeading}>Hey, Hello <Text style={styles.handEmoji}>&#128075;</Text> </Text>
            <Text style={styles.text}>
              Please choose your required role from the below drop down for registration
            </Text>
          </View>
          <View style={styles.roleContainer}>
            {roleData.length > 0 && (
              <DropDownCustom
                selectedValue={selectedRole}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
                data={roleData}
                disabled={roleData.length == 0}
                width={"85%"}
                backgroundColor={COLORS.secondary}
              />
            )}
          </View>
          <Formik initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount={true}
          >
            {({ isValid, dirty, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} title="Submit">
                  <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.appSigninContainer}>
            {appIcons.map((icon, index) => (
              <Image key={index} source={icon} style={styles.appIcon} />
            ))}
          </View>
          <View style={styles.pushLink}>
            <Text style={styles.centerText}> Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} paddingTop={10}>
              <Text style={styles.registerText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>) : (<>
          <View style={styles.textContainer}>
            <Text style={styles.textHeading}>Hey, Hello <Text style={styles.handEmoji}>&#128075;</Text> </Text>
            <Text style={styles.text}>
              Please enter the required information below to complete your registration process
            </Text>
          </View>
          <View style={styles.roleContainer}>
            {roleData.length > 0 && (
              <DropDownCustom
                selectedValue={selectedRole}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
                data={roleData}
                disabled={roleData.length == 0}
                width={"85%"}
                backgroundColor={COLORS.secondary}
              />
            )}
          </View>
          <Formik initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}>
            {({ isValid, dirty, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.inputContainer}>
                <>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder={selectedRole !== 4 ? 'Enter your First Name' : 'Enter Provider First Name'}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />
                  </View>
                  {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder={selectedRole !== 4 ? 'Enter your Last Name' : 'Enter Provider Last Name'}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
                  </View>
                  {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                  <View style={styles.inputWrapper}>
                    <DropDownCustom
                      selectedValue={countryCode}
                      onValueChange={handleOnCountryCodeChange}
                      data={countries.map((data) => ({
                        id: data.countryCode,
                        name: data.label,
                      }))}
                      disabled={false}
                      width={"40%"}
                      backgroundColor={"lightgrey"}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Phone Number"
                      style={styles.input}
                      onChangeText={handleChange("phoneNo")}
                      onBlur={handleBlur("phoneNo")}
                      value={values.phoneNo}
                      paddingRight={50}
                      ref={phoneNoRef}
                    />
                    {errors.phoneNo ?
                      <TouchableOpacity style={styles.iconWrapper} disabled={true}>
                        <Text style={{ color: COLORS.primary,opacity:0.3 }}>Verify</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.iconWrapper} onPress={handleVerifyPhoneNo}>
                        <Text style={{ color: COLORS.secondary }}>Verify</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  {touched.phoneNo && errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}
                  <View style={[styles.lineContainer, styles.lineorContainer]}>
                    <View style={[styles.line, styles.lineColor]}></View>
                    <Text style={[styles.orText, styles.orTextColor]} color={COLORS.secondary}>or</Text>
                    <View style={[styles.line, styles.lineColor]}></View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your Email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      ref={emailRef}
                      paddingRight={50}
                    />
                    { errors.email ?
                      <TouchableOpacity style={styles.iconWrapper} disabled>
                        <Text style={{ color: COLORS.primary,opacity:0.3 }}>Verify</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.iconWrapper} onPress={handleVerifyEmail}>
                        <Text style={{ color: COLORS.secondary }}>Verify</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Choose your Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={!showPassword}
                      paddingRight={50}
                    />
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowPassword(!showPassword)}>
                      {!showPassword ?
                        <MaterialCommunityIcons name="eye-off" size={20} color={COLORS.primary} />
                        : <MaterialCommunityIcons name="eye" size={20} color={COLORS.primary} />
                      }
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Choose your Confirm Password"
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      paddingRight={50}
                    />
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {!showConfirmPassword ?
                        <MaterialCommunityIcons name="eye-off" size={20} color={COLORS.primary} />
                        : <MaterialCommunityIcons name="eye" size={20} color={COLORS.primary} />
                      }
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </>
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} title="Submit">
                  <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.appSigninContainer}>
            {appIcons.map((icon, index) => (
              <Image key={index} source={icon} style={styles.appIcon} />
            ))}
          </View>
          <View style={styles.pushLink}>
            <Text style={styles.centerText}> Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} paddingTop={10}>
              <Text style={styles.registerText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>)}
        <OtpModal
          isOtpModalOpen={isOtpModalOpen}
          setIsOtpModalOpen={setIsOtpModalOpen}
          email={`darsh@gmail.com`}
          otpSelectedOption={otpby == 'email' ? 'Email' : 'Mobile'}
          otpSelectedValue={otpby == 'email' ? `darshan@gmail.com` : `+${countryCode} xxx-xxx-xxxx`}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;


