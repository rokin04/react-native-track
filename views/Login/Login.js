import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants';
import { DropDownCustom, Logo } from '../../components';
import { TextInput } from 'react-native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HOST } from '../../utils/Host-URL';
import styles from './login.style';
const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const pickerRef = useRef();
  const appIcons = [ICONS.google, ICONS.facebook, ICONS.twitter, ICONS.linkedin]

  const INITIAL_FORM_STATE = {
    email: "",
    password: ""
  };

  const FORM_VALIDATION = object().shape({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[0-9]/, 'Password must contain at least 1 number')
      .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .matches(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character')
      .required('Password is required'),
  });

  const handleSubmit = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        username: data.email,
        password: data.password,
        roleId: selectedRole
      }),
      redirect: "follow",
    };
    if (selectedRole) {
      fetch(`${HOST}:8081/api/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.statusCode === 200) {
            console.log(data)
            console.log(selectedRole)
            console.log(result.message);
            Alert.alert("Success", result.message, [{
              text: "OK", onPress: () => {
                navigation.navigate('About');
              }
            }]);
            // dispatch({ type: reduxAction.SET_ROLEID, payload: result.roleId });
            // dispatch({ type: reduxAction.USER_DATA, payload: {} });
            // dispatch({ type: reduxAction.ADD_EMAIL_AFTER_LOGIN, payload: data.username });

          } else {
            console.log(data)
            console.log(selectedRole)
            console.log(result.message);
            Alert.alert("Error", result.message, [{ text: "OK", onPress: () => { } }]);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log(data)
      console.log(selectedRole)
      Alert.alert("Error", "You must select a role before logging in.");
      return;
    }
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
    <SafeAreaView style={styles.container} alignItems={"center"}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} overScrollMode={Platform.OS === 'android'? "never":"auto"}>
      <Logo flex={0} marginTop={10} />
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Hey, Hello <Text style={styles.handEmoji}>&#128075;</Text> </Text>
        <Text style={styles.text}>Enter the information you entered while registering</Text>
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
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                paddingRight={50}
              />
              <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="account" size={24} color={COLORS.primary} />
              </View>
            </View>
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
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
            <View style={styles.forgotContainer} paddingHorizontal={5}>
              <TouchableOpacity onPress={() => setSelection(!isSelected)} style={styles.boxContainer}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                  {isSelected ? (
                    <MaterialCommunityIcons name="checkbox-marked" size={20} color={COLORS.secondary} />
                  ) : (
                     <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color={COLORS.primary} />
                  )}
                </View>
                <Text style={styles.label} paddingLeft={5}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxContainer} onPress={() => navigation.navigate('Forgot')}>
                <View>
                  <Text style={styles.label} >Forgot password?</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} title="Submit">
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>)}
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
        <Text style={styles.centerText}> Don't have Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} paddingTop={10}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
        </SafeAreaView>
  );
};

export default Login;
