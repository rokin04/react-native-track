import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView, Modal } from 'react-native';
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants';
import styles from './profile.style';
import { TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { HOST } from '../../utils/Host-URL';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import * as Yup from "yup";
const Profile = ({ navigation }) => {
  // const roleId = useSelector((state) => state.roleId || "");
  const roleId = 2;
  // const userDetails = useSelector((state) => state.userDetails || "");
  const userDetails = "";

  const INITIAL_FORM_STATE = (userDetails) => ({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    phone: userDetails.phone,
    email: userDetails.email,
    gender: userDetails.gender,
    dateOfBirth: userDetails.dateOfBirth,
    ndisNumber: userDetails.ndis,
    aboutUser: userDetails.aboutUser,
    postalCode: userDetails.postalCode,
    areaSuburban: userDetails.areaSuburban,
    state: userDetails.state,
    country: userDetails.location,
    ndisStartDate: userDetails.ndisStartDate,
    ndisEndDate: userDetails.ndisEndDate,
    providerName: userDetails.providerName,
  });

  const FORM_VALIDATION = (loggedInRoleId) => {
    console.log(loggedInRoleId, "llg");
    if (loggedInRoleId === 3 || loggedInRoleId === 2) {
      return object().shape({
        firstName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required(),
        lastName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required(),
        phone: number().required().positive("Number must not be negative").max(999999999, "exceeds 9 digit"),
        email: string().required(),
        dateOfBirth: string().required(),
        aboutUser: string().required(),
        postalCode: number().required(),
        areaSuburban: string().required(),
        state: string().required(),
        country: string().required(),
      });
    } else {
      return object().shape({
        firstName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required(),
        lastName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required(),
        phone: number().required().positive("Number must not be negative").max(9999999999, "exceeds 9 digit"),
        email: string().required(),
        gender: string().required(),
        dateOfBirth: string().required(),
        ndisNumber: number().required(),
        aboutUser: string().required(),
        postalCode: number().required(),
        areaSuburban: string().required(),
        state: string().required(),
        country: string().required(),
        providerName: mixed().required(),
        ndisStartDate: string().required(),
        ndisEndDate: string().required(),
      });
    }
  };

  const PROVIDER_FORM_VALIDATION = object().shape({
    firstName: string()
      .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
      .required(),
    phone: number().required().positive("Number must not be negative").max(9999999999, "exceeds 10 digit"),
    email: string().required(),
    aboutUser: string().required(),
    postalCode: number().required(),
    areaSuburban: string().required(),
    state: string().required(),
    country: string().required(),
  });

  const PROVIDER_INITIAL_FORM_STATE = (userDetails) => ({
    firstName: userDetails.firstName,
    phone: userDetails.phone,
    email: userDetails.email,
    aboutUser: userDetails.aboutUser,
    postalCode: userDetails.postalCode,
    areaSuburban: userDetails.areaSuburban,
    state: userDetails.state,
    country: userDetails.location,
  });

  useEffect(() => {
    // if (userEmail) {
    // getUserDetails();
    // }
  }, []);

  return (
    <SafeAreaView style={styles.container} alignItems={"center"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} overScrollMode={Platform.OS === 'android' ? "never" : "auto"}>
         <View style={{ alignItems: "center", justifyContent: "center", flex: 1, width: '100%' }}>
        {roleId === 4 ? (
          <Formik
            initialValues={PROVIDER_INITIAL_FORM_STATE(userDetails)}
            validationSchema={PROVIDER_FORM_VALIDATION}
          >
            {({ isValid, dirty, handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.inputContainer}>

              </View>
            )}

          </Formik>
        ) : (
          <Formik
            // onSubmit={(values) => handleSubmit(values)}
            initialValues={INITIAL_FORM_STATE(userDetails)}
            validationSchema={FORM_VALIDATION(roleId)}
          >
            {({ values, setFieldValue, errors, touched, handleChange, handleBlur }) => (
              <View style={styles.inputContainer}>
                  <Text>Hello</Text>                 
              </View>
            )}
          </Formik>
        )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
