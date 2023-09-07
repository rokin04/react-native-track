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
  Modal,
} from "react-native";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from "../../../constants";
import styles from './profile.style'
import { TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HOST } from "../../../utils/Host-URL";
import { Formik } from "formik";
import { object, string, number } from "yup";
import * as Yup from "yup";
import CustomInput from "../../../components/common/Input/CustomInput";
import icons from "../../../constants/icons";
import Chips from "../../../components/common/Chips/Chips";
import DatePicker from "../../../components/common/DatePicker/DatePicker";
import InputDropdown from "../../../components/common/Input/InputDropdown";
// import PhoneInputComponent from "../../components/common/Input/PhoneInputComponent";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const gender = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Other", label: "Other" },
];

const ProfileSetting = ({ navigation }) => {
  const [screen1, setScreen1] = useState(false);
  const [countryData, setCountryData] = useState([{name:'Australia' ,label:'Australia'}]);
  const [stateData, setStateData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [state , setState] = useState([])
  const [stateSelectionValue , setStateSelectionValue] = useState('')

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
          .required('Required'),
        lastName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required('Required'),
        phone: number()
          .required('Required')
          .positive("Number must not be negative")
          .max(9999999999, "exceeds 10 digit"),
        email: string()
          .email('Invalid email')
          .required('Required'),
        dateOfBirth: string().required(),
        aboutUser: string().required(),
        postalCode: number().required(),
        areaSuburban: string().required(),
        state: string().required(),
        country: string().required(),
        ndisNumber: number().required(),
      });
    } else {
      return object().shape({
        firstName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required('Required'),
        lastName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required('Required'),
        phone: number()
          .required('Required')
          .positive("Number must not be negative")
          .max(9999999999, "exceeds 9 digit"),
        email: string()
          .email('Invalid email')
          .required('Required'),
        gender: string().required(),
        dateOfBirth: string().required(),
        ndisNumber: number()
          .required('Required'),
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
    phone: number()
      .required()
      .positive("Number must not be negative")
      .max(9999999999, "exceeds 10 digit"),
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

  // useEffect(() => {
  //   fetch(`${HOST}:8080/api/country/get`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCountryData(data.country.map((value) => value.country));
  //     });
  // }, []);

  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 8,
      padding: 15,
      width: "92%",
      maxHeight: "80%",
    },
    text: {
      fontSize: 16,
    },
  });

  const handleDeclaration = () => {
    setModalVisible1(false);
    setModalVisible2(true);
  }

  const handleOnStateChange = (obj) => {
    setStateSelectionValue(obj.name);
  }

  useEffect(() => {
    if (countryData) {
      fetch(`${HOST}:8080/api/country/states/${countryData.label}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setState(data.state);
          console.log(data.state);
        });
    }
  }, []);

  useEffect(() => {
    if(state.length > 0){

      const arrayOfObjects = state?.map((value, index) => {
        const propertyName = 'name';
        const propertyLabel = 'label';
        const obj = {};
        obj[propertyName] = value;
        obj[propertyLabel] = value;
        return obj;
      });

      arrayOfObjects && setStateData(arrayOfObjects)
      // console.log(arrayOfObjects);
    }
  }, [state]);

  useEffect(() => {
    if (stateSelectionValue) {
      fetch(`${HOST}:8080/api/country/areas/${stateSelectionValue}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAreaData(data.area);
        });
    }
  }, [stateSelectionValue]);

  return (
    <SafeAreaView style={styles.container} alignItems={"center"}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        overScrollMode={Platform.OS === "android" ? "never" : "auto"}>
        {screen1 ? (
          <>
            <View style={styles.rowView}>
              <TouchableOpacity>
                <Image source={IMAGES.ProfileImg} style={styles.profileImg} />
                <TouchableOpacity style={styles.camera}>
                  <Image source={icons.camera} />
                </TouchableOpacity>
              </TouchableOpacity>
              <Text style={styles.profileTxt}>
                Gabriel Jackson
                {"\n"}
                <Text style={styles.roleTxt}>Participant</Text>
              </Text>
            </View>

            <Chips />

            <View style={styles.line}></View>
          </>
        ) : null}

        <View
          style={{
            flex: 1,
            width: "100%",
          }}>
          {roleId === 4 ? (
            <Formik
              initialValues={PROVIDER_INITIAL_FORM_STATE(userDetails)}
              validationSchema={PROVIDER_FORM_VALIDATION}>
              {({
                isValid,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => <View style={styles.inputContainer}></View>}
            </Formik>
          ) : (
            <Formik
              // onSubmit={(values) => handleSubmit(values)}
              initialValues={INITIAL_FORM_STATE(userDetails)}
              validationSchema={FORM_VALIDATION(roleId)}>
              {({
                values,
                setFieldValue,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldTouched
              }) => (
                <View style={styles.inputContainer}>
                  {screen1 ? (
                    <>
                      <CustomInput
                        title="First Name"
                        placeholder="Enter First Name"
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={() => setFieldTouched('firstName')}
                      />

                      <Text style={styles.errorTxt}>
                        {errors.firstName}
                      </Text>

                      <CustomInput
                        title="Last Name"
                        placeholder="Enter Last Name"
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={() => setFieldTouched('lastName')}
                      />
                      <Text style={styles.errorTxt}>
                        {errors.lastName}
                      </Text>

                      {/* <PhoneInputComponent
                        title="Phone Number"
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={() => setFieldTouched('phone')}
                      /> */}
                      <Text style={styles.errorTxt}>
                        {errors.phone}
                      </Text>

                      <CustomInput
                        title="Email"
                        placeholder="Enter Your Email "
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                      />
                      <Text style={styles.errorTxt}>
                        {errors.email}
                      </Text>

                      <TouchableOpacity
                        style={styles.btnRound}
                        onPress={() => setScreen1(false)}>
                        <Image source={icons.chevronRightWhiteColor} />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <View style={{ alignItems: "center" }}>
                      <View style={styles.rowView}>
                        <DatePicker label="Date of Birth" />
                        <InputDropdown
                          title={"Gender"}
                          value={"Select Gender"}
                          data={gender}
                          width={width * 0.43}
                        />
                      </View>

                      <View>
                        <CustomInput
                          title="NDIS Number"
                          value={values.ndisNumber}
                          placeholder="Enter NDIS Number"
                          onChangeText={handleChange("ndisNumber")}
                          onBlur={handleBlur("ndisNumber")}
                          keyboardType="number-pad"
                        />
                        <Text style={styles.errorTxt}>
                          {errors.ndisNumber}
                        </Text>
                        <TouchableOpacity style={styles.arrow}>
                          <Image
                            source={icons.arrow}
                            style={{
                              height: width * 0.04,
                              width: width * 0.05,
                            }}
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={[
                          styles.rowView,
                          { justifyContent: "space-between" },
                        ]}>
                        <DatePicker label="NDIS Plan Start Date" />
                        <DatePicker label="NDIS Plan End Date" />
                      </View>

                      <InputDropdown
                        title="Country"
                        value={values.country}
                        width={width * 0.9}
                        data={countryData}
                        dropHeight={height * 0.2}
                        dropWidth={width * 0.9}
                        search={true}
                      />
                      <Text style={styles.errorTxt}>
                        {errors.country}
                      </Text>
                      <CustomInput
                        title="Postal Code"
                        value={values.postalCode}
                        onChangeText={handleChange("postalCode")}
                        onBlur={handleBlur("postalCode")}
                        placeholder="3567820"
                        keyboardType="number-pad"
                      />
                      <Text style={styles.errorTxt}>
                        {errors.postalCode}
                      </Text>
                      <InputDropdown
                        title="State"
                        value={values.state}
                        data={stateData}
                        width={width * 0.9}
                        dropHeight={height * 0.2}
                        dropWidth={width * 0.9}
                        search={true}
                        onChange={(selectedObj) => {
                          handleOnStateChange(selectedObj);
                      
                        }}
                      />
                      <Text style={styles.errorTxt}>
                        {errors.state}
                      </Text>
                        <InputDropdown
                        title="Area"
                        value={values.areaSuburban}
                        data={areaData}
                        width={width * 0.9}
                        dropHeight={height * 0.2}
                        dropWidth={width * 0.9}
                        search={true}
                        // onChange={(selectedObj) => {
                        //   handleOnStateChange(selectedObj);
                        // }}
                      />
                      <Text style={styles.errorTxt}>
                        {errors.areaSuburban}
                      </Text>

                      <Text
                        style={[
                          styles.headingTxt,
                          { marginVertical: height * 0.01 },
                        ]}>
                        About Me
                      </Text>

                      <TextInput
                        style={styles.box}
                        multiline={true}
                        placeholder={
                          "Write your Bio, e.g your hobbies, interests, etc...\n\n\n"
                        }
                        value={values.aboutUser}
                        onChangeText={handleChange("aboutUser")}
                        onBlur={handleBlur("aboutUser")}
                      />
                      <Text style={styles.errorTxt}>
                        {errors.aboutUser}
                      </Text>

                      <TouchableOpacity
                      onPress={() => setModalVisible1(true)}
                        style={[
                          styles.btnPrimary,
                          {
                            width: width * 0.9,
                            alignSelf: "center",
                            marginVertical: height * 0.02,
                          },
                        ]}>
                        <Text
                          style={styles.btnTxt}
                          >
                          Update Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </Formik>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}>
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <View>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 18,
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Please Complete the NDIS Declaration Form
                  </Text>
                </View>
                <TouchableOpacity
                onPress={handleDeclaration}
                  style={[
                    styles.btnPrimary,
                    {
                      width: width * 0.7,
                      alignSelf: "center",
                      marginVertical: height * 0.02,
                    },
                  ]}>
                  <Text
                    style={styles.btnTxt}
                    >
                    OK
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}>
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <View className="flex-row justify-between">
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 18,
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    NDIS Agreement
                  </Text>
                  <Ionicons
                          size={30}
                          name="close-outline"
                          style={{ color: "#444444" }}
                          onPress={()=>setModalVisible2(false)}
                        />
                </View>
                <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 17,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  Confirm that the following topics have been discussed and understood by the participant.
                  </Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  Plan Funding Included in the participant’s NDIS Plan</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  The different support categories and their flexibility</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  Fund management and claiming</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  Organising and planning supports over the life of the NDIS Plan</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  The role of community and mainstream supports</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  How to access and use the My NDIS portal and App</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                  The value and importance of service agreements</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                 If any supports have been listed in the plan, the participant knows who can deliver the support and how it may be provided</Text>
                <TouchableOpacity
                onPress={() => setModalVisible2(false)}
                  style={[
                    styles.btnPrimary,
                    {
                      width: width * 0.8,
                      alignSelf: "center",
                      marginVertical: height * 0.02,
                    },
                  ]}>
                  <Text
                    style={styles.btnTxt}
                    >
                    Submit
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSetting;
