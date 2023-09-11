import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import {
  COLORS,
  SHADOWS,
  SIZES,
  IMAGES,
  FONT,
  ICONS,
} from "../../../constants";
import { TextInput } from "react-native";
import styles from "./profile.style";
import React, { useEffect, useState } from "react";
import { HOST } from "../../../utils/Host-URL";
import { Formik } from "formik";
import { object, string, number, array } from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomInput from "../../../components/common/Input/CustomInput";
import icons from "../../../constants/icons";
import Chips from "../../../components/common/Chips/Chips";
import DatePicker from "../../../components/common/DatePicker/DatePicker";
import InputDropdown from "../../../components/common/Input/InputDropdown";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "react-native-elements";
import { Alert } from "react-native";
import reduxAction from "../../../redux/action";
import useSettings from "./useSettings";
import useToast from "../../../hooks";
import CustomMultipleSelect from "../../../components/common/CustomSelect/CustomMultipleSelect";
import { formatDate } from "../../../utils/formatDate";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import NDISAgreement from "../NDIS/NDISAgreement";
import TermsAndConditions from "../NDIS/TermsAndConditions";

const { height, width } = Dimensions.get("window");

const gender = [
  { name: "Female", name: "Female" },
  { name: "Male", name: "Male" },
  { name: "Other", name: "Other" },
];

const ProfileSetting = ({ navigation }) => {
  const [screen1, setScreen1] = useState(true);
  const [countryData, setCountryData] = useState([
    { name: "Australia", name: "Australia" },
  ]);
  const [stateData, setStateData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [state, setState] = useState([]);
  const [stateSelectionValue, setStateSelectionValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [ndisQuestions, setNdisQuestions] = useState([]);
  const [ndisUserAnswer, setNdisUserAnswer] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isDOBPickerVisible, setIsDOBPickerVisible] = useState(false);
  const [selectedDOB, setSelectedDOB] = useState();
  const [imageUri, setImageUri] = useState(null);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail || "");

  const roleId = useSelector((state) => state.roleId);
  const userDetails = useSelector((state) => state.userDetails || "");

  const { getUserDetails } = useSettings(dispatch);
  const { successToast, errorToast } = useToast();

  const [providerModalVisible, setProviderModalVisible] = useState(false);
  const [providersData, setProvidersData] = useState([
    { name: "Trackability", label: "Trackability" },
  ]);

  const toggleSwitch = (swithAgree) => {
    setIsEnabled({ ...isEnabled, [swithAgree]: !isEnabled[swithAgree] });
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const openProviderModal = () => {
    setProviderModalVisible(true);
  };

  const closeProviderModal = () => {
    setProviderModalVisible(false);
  };

  const handleOnProviderSelect = () => {
    openProviderModal();
  };

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
    address: userDetails.address,
    ndisEndDate: userDetails.ndisEndDate,
    providers: userDetails?.providers?.length
      ? userDetails?.providers.map((data) => data.providerId)
      : [],
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

  const FORM_VALIDATION = (loggedInRoleId) => {
    if (loggedInRoleId === 3 || loggedInRoleId === 2) {
      return object().shape({
        firstName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required("Required"),
        lastName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required("Required"),
        phone: number()
          .required("Required")
          .positive("Number must not be negative")
          .max(9999999999, "exceeds 10 digit"),
        email: string().email("Invalid email").required("Required"),
        dateOfBirth: string().required(),
        aboutUser: string().required(),
        postalCode: number().required(),
        areaSuburban: string().required(),
        state: string().required(),
        country: string().required(),
        ndisNumber: number().required(),
      });
    } else if (loggedInRoleId === 1) {
      return object().shape({
        firstName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required("Required"),
        lastName: string()
          .matches(/^[A-Za-z\s]+$/, " only alphabetical characters are allowed")
          .required("Required"),
        phone: number()
          .required("Required")
          .positive("Number must not be negative")
          .max(9999999999, "exceeds 9 digit"),
        email: string().email("Invalid email").required("Required"),
        gender: string().required(),
        dateOfBirth: string().required(),
        ndisNumber: number().required("Required"),
        aboutUser: string().required(),
        postalCode: number().required(),
        areaSuburban: string().required(),
        state: string().required(),
        address: string().required(),
        country: string().required(),
        providers: array().min(1, "Please select providers").required(),
        ndisStartDate: string().required(),
        ndisEndDate: string().required(),
      });
    } else {
      return PROVIDER_FORM_VALIDATION;
    }
  };

  const handleDeclaration = () => {
    setModalVisible1(false);
    setModalVisible2(true);
  };

  const handleAgreement = () => {
    setModalVisible2(false);
    setModalVisible3(true);
    setIsEnabled(false);
  };

  const handleTermsAndCondition = () => {
    setModalVisible3(false);
    setModalVisible4(true);
    setChecked(false);
  };

  const handleOnStateChange = (obj) => {
    setStateSelectionValue(obj.name);
  };
  const handleOnProviderNameChange = (obj) => {
    setStateSelectionValue(obj.name);
  };

  const handleNextPage = (err, touched) => {
    const check = Object.keys(touched).some((key) => touched[key] === true);

    if (
      userDetails &&
      !(err.firstName || err.lastName || err.phone || err.email)
    ) {
      setScreen1(false);
    } else {
      if (!(err.firstName || err.lastName || err.phone || err.email) && check) {
        setScreen1(false);
      } else {
        Alert.alert("Fill all the fields");
      }
    }
  };

  const showDatePicker1 = () => {
    setStartDatePickerVisibility(true);
  };

  const showDatePicker2 = () => {
    setEndDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setStartDatePickerVisibility(false);
    setEndDatePickerVisibility(false);
  };

  const handleStartDate = (date) => {
    setSelectedStartDate(date);
    hideDatePicker();
    const formatedDate = formatDate(date);
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, startDate: formatedDate },
    });
  };

  const handleEndDate = (date) => {
    setSelectedEndDate(date);
    hideDatePicker();
    const formatedDate = formatDate(date);
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, targetDate: formatedDate },
    });
  };

  const showDOBPicker = () => {
    setIsDOBPickerVisible(true);
  }

  const hideDOBPicker = () => {
    setIsDOBPickerVisible(false);
  }

  const handleDOBChange = (value) => {
    hideDOBPicker();
    setSelectedDOB(value);
  }

  const handleOnProfileUpdate = async (val) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const prepareBodyData = () => {
      if (roleId === 4) {
        return {
          provider: {
            ...val,
            phone: val.phone,
            interests: [{ id: 1431, name: "Health" }],
            dateOfBirth: val.dateOfBirth,
          },
          participant: null,
        };
      }

      const participantPayload = {
        participant: {
          ...val,
          phone: val.phone,
          interests: [{ id: 1431, name: "Health" }],
          dateOfBirth: val.dateOfBirth,
        },
        provider: null,
      };

      if (roleId === 1) {
        participantPayload.participant = {
          ...participantPayload.participant,
        };
      }
      return participantPayload;
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(prepareBodyData()),
      redirect: "follow",
    };

    await fetch(
      `${HOST}:8080/api/userprofile/update/user/${userEmail}/${roleId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.responseStatus === 200) {
          successToast({ responseMessage: result.responseMessage });
          getUserDetails();
          // navigation.navigate('Dashboard')
        } else if (result.responseStatus === 400) {
          errorToast({ responseMessage: result.responseMessage });
        } else {

        }
      })
      .catch((err) => {
        errorToast({ responseMessage: "something went wrong, please try again!" });
      });
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri)

      if (fileInfo.size >= 10240 && fileInfo.size <= 5242880) {

        setImageUri(result.assets[0].uri);
        let formData = new FormData();
        formData.append("file", result.assets[0].uri);
        dispatch({
          type: reduxAction.USER_DATA,
          payload: {
            ...userDetails,
            profilePic: imageUri,
          },
        });
        try{
          await fetch(`${HOST}:8080/api/userprofile/upload/` + userEmail, {
          method: "POST",
          body: formData,
        });
        }catch (error) {
          console.log('err' , error);
        }

      }else{
        alert('Image should be uploaded as JPG or PNG that between 10KB to 5MB in size!')
      }}

    } catch (error) {
      console.error('Error picking an image: ', error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access media library is required.');
      }
    })();
  }, []);

  useEffect(() => {
    if (countryData) {
      fetch(`${HOST}:8080/api/country/states/${countryData.label}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setState(data.state);
        });
    }
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      const arrayOfObjects = state?.map((value, index) => {
        const propertyName = "name";
        const propertyLabel = "label";
        const obj = {};
        obj[propertyName] = value;
        obj[propertyLabel] = value;
        return obj;
      });

      arrayOfObjects && setStateData(arrayOfObjects);
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

  const getQuestions = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${HOST}:8080/api/ndis/questions/${userEmail}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.responseStatus === 200) {
          setNdisQuestions(result.questions);
          // setNdisUserAnswer({ email: userEmail, answers: result.questions });
        } else {
          toast.error(result.responseMessage);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // useEffect(() => {
  //   fetch(`${HOST}:8080/api/ndis/providers`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProvidersData(data.providerNames || []);
  //     });
  // }, []);

  return (
    <SafeAreaView style={styles.container} alignItems={"center"}>
    {Object.keys(userDetails).length ? <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        overScrollMode={Platform.OS === "android" ? "never" : "auto"}
      >
        <View style={styles.rowView}>
          <TouchableOpacity>
            <Image source={imageUri ? { uri: imageUri } : { uri: userDetails.profilePic }} style={styles.profileImg} />
            <TouchableOpacity onPress={pickImage} style={styles.camera}>
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color={"white"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.profileTxt}>
            {`${userDetails.firstName} ${userDetails.lastName}`}
            {"\n"}
            <Text style={styles.roleTxt}>{userDetails.roleName}</Text>
          </Text>
        </View>
        <Chips />
        <View style={styles.line}></View>
         <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          <Formik
            initialValues={roleId === 4 ? PROVIDER_INITIAL_FORM_STATE(userDetails) : INITIAL_FORM_STATE(userDetails)}
            validationSchema={FORM_VALIDATION(roleId)}
            onSubmit={handleOnProfileUpdate}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldTouched,
              handleSubmit,
            }) => (
              <View style={styles.inputContainer}>
                <CustomInput
                  title="First Name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={values.firstName}
                  onChangeText={(value) => {
                    handleChange("firstName")(value);
                  }}
                  onBlur={() => setFieldTouched("firstName")}
                />
                {touched.firstName && errors.firstName && (
                  <Text className="text-red-500 font-popMedium text-right text-xs">
                    {errors.firstName}
                  </Text>
                )}
                <CustomInput
                  title="Last Name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={values.lastName}
                  onChangeText={(value) => {
                    handleChange("lastName")(value);
                  }}
                  onBlur={() => setFieldTouched("lastName")}
                />
                {touched.lastName && errors.lastName && (
                  <Text className="text-red-500 font-popMedium text-right text-xs">
                    {errors.lastName}
                  </Text>
                )}
                <CustomInput
                  title="Phone Number"
                  name="phone"
                  placeholder="Enter PhoneNum"
                  value={values.phone}
                  onChangeText={(value) => {
                    handleChange("phone")(value);
                  }}
                  onBlur={() => setFieldTouched("phone")}
                  keyboardType="number-pad"
                />
                {touched.phone && errors.phone && (
                  <Text className="text-red-500 font-popMedium text-right text-xs">
                    {errors.phone}
                  </Text>
                )}
                <CustomInput
                  title="Email"
                  name="email"
                  placeholder="Enter Your Email "
                  value={values.email}
                  onChangeText={(value) => {
                    handleChange("email")(value);
                  }}
                  onBlur={() => setFieldTouched("email")}
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 font-popMedium text-right text-xs">
                    {errors.email}
                  </Text>
                )}
                <View style={{ alignItems: "center" }}>
                  <View style={styles.rowView}>
                    <TouchableOpacity
                      onPress={showDOBPicker}
                      uppercase={false}
                      mode="contained"
                      className="h-10 w-1/2"
                    >
                      <View
                        className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                        placeholder="Name"
                      >
                        <Text className="text-base font-popMedium font-light">
                          {selectedDOB
                            ? formatDate(selectedDOB)
                            : "Date of birth"}
                        </Text>
                        <Ionicons name="calendar" size={25} color="gray" />
                      </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDOBPickerVisible}
                      mode="date"
                      date={selectedDOB}
                      onConfirm={handleDOBChange}
                      onCancel={hideDOBPicker}
                    />
                    <InputDropdown
                      title={"Gender"}
                      value={values.gender}
                      data={gender}
                      width={width * 0.43}
                    />
                  </View>
                  {touched.gender && errors.gender && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.gender}
                    </Text>
                  )}
                  <View>
                    <CustomInput
                      title="NDIS Number"
                      value={values.ndisNumber}
                      placeholder="Enter NDIS Number"
                      editable={false}
                      onBlur={handleBlur("ndisNumber")}
                      onPress={(value) => {
                        handleOnProviderSelect(value, setFieldValue);
                      }}
                    />
                    <Text style={styles.errorTxt}>{errors.ndisNumber}</Text>
                    <TouchableOpacity
                      onPress={(value) => {
                        handleOnProviderSelect(value, setFieldValue);
                      }}
                      style={styles.arrow}
                    >
                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={24}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={providerModalVisible}
                  >
                    <View style={styles2.modalContainer}>
                      <View style={styles2.modalContent}>
                        <ScrollView>
                          <View
                            className="flex-row justify-between p-2"
                            style={{ backgroundColor: "#10AFB9" }}
                          >
                            <Text
                              className="text-md font-popMedium"
                              style={{
                                color: "#FFFFFF",
                                fontSize: 18,
                                textAlign: "center",
                              }}
                            >
                              NDIS Plan Information
                            </Text>
                            <Ionicons
                              size={30}
                              name="close-outline"
                              style={{ color: "#444444" }}
                              onPress={() => {
                                setModalVisible2(false);
                                closeProviderModal();
                              }}
                            />
                          </View>
                          <View className="flex flex-col py-2">
                            <CustomInput
                              title="NDIS Number"
                              value={values.ndisNumber}
                              placeholder="Enter NDIS Number"
                              onChangeText={(value) => {
                                handleChange("ndisNumber")(value);
                              }}
                              onBlur={handleBlur("ndisNumber")}
                              keyboardType="number-pad"
                            />
                            <View className="px-1">
                              <CustomMultipleSelect />
                            </View>
                            <View
                              style={[
                                styles.rowView,
                                { justifyContent: "space-between" },
                              ]}
                            >
                              <View className="pt-3 flex justify-evenly flex-row gap-5 px-3">
                                <TouchableOpacity
                                  onPress={showDatePicker1}
                                  uppercase={false}
                                  mode="contained"
                                  className="h-10 w-1/2"
                                >
                                  <View
                                    className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                                    placeholder="Name"
                                  >
                                    <Text className="text-base font-popMedium font-light">
                                      {selectedStartDate
                                        ? formatDate(selectedStartDate)
                                        : "Start Date"}
                                    </Text>
                                    <Ionicons name="calendar" size={25} color="gray" />
                                  </View>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                  isVisible={isStartDatePickerVisible}
                                  mode="date"
                                  onConfirm={handleStartDate}
                                  onCancel={hideDatePicker}
                                />
                                <TouchableOpacity
                                  onPress={showDatePicker2}
                                  uppercase={false}
                                  mode="contained"
                                  className="h-10 w-1/2"
                                >
                                  <View
                                    className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                                    placeholder="Name"
                                  >
                                    <Text className="text-base font-popMedium font-light">
                                      {selectedEndDate ? formatDate(selectedEndDate) : "End Date"}
                                    </Text>
                                    <Ionicons name="calendar" size={25} color="gray" />
                                  </View>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                  isVisible={isEndDatePickerVisible}
                                  mode="date"
                                  onConfirm={handleEndDate}
                                  onCancel={hideDatePicker}
                                />
                              </View>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={closeProviderModal}
                            style={[
                              styles.btnPrimary,
                              {
                                width: width * 0.7,
                                alignSelf: "center",
                                marginVertical: height * 0.02,
                              },
                            ]}
                          >
                            <TouchableOpacity onPress={closeProviderModal}>
                              <Text style={styles.btnTxt}>Submit</Text>
                            </TouchableOpacity>
                          </TouchableOpacity>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>

                  {touched.providers && errors.providers && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.providers}
                    </Text>
                  )}
                  <InputDropdown
                    title="Country"
                    value={values.country}
                    width={width * 0.96}
                    data={countryData}
                    dropHeight={height * 0.2}
                    dropWidth={width * 0.9}
                    search={true}
                  />
                  {touched.country && errors.country && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.country}
                    </Text>
                  )}
                  <CustomInput
                    title="Postal Code"
                    value={values.postalCode}
                    onChangeText={handleChange("postalCode")}
                    onBlur={handleBlur("postalCode")}
                    placeholder="3567820"
                    keyboardType="number-pad"
                  />
                  {touched.postalCode && errors.postalCode && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.postalCode}
                    </Text>
                  )}
                  <InputDropdown
                    title="State"
                    value={values.state}
                    data={stateData}
                    width={width * 0.96}
                    dropHeight={height * 0.2}
                    dropWidth={width * 0.9}
                    search={true}
                    onChange={(selectedObj) => {
                      handleOnStateChange(selectedObj);
                      handleChange("state")(selectedObj.name);
                    }}
                  />

                  {touched.state && errors.state && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.state}
                    </Text>
                  )}
                  <InputDropdown
                    title="Area"
                    value={values.areaSuburban}
                    data={areaData}
                    width={width * 0.96}
                    dropHeight={height * 0.2}
                    dropWidth={width * 0.9}
                    search={true}
                    onChange={(selectedObj) => {
                      handleChange("areaSuburban")(selectedObj.name);
                    }}
                  />

                  {touched.areaSuburban && errors.areaSuburban && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.areaSuburban}
                    </Text>
                  )}
                  <CustomInput
                    title="Address"
                    name="address"
                    placeholder="Enter First Name"
                    value={values.address}
                    onChangeText={(value) => {
                      handleChange("address")(value);
                    }}
                    onBlur={() => setFieldTouched("address")}
                  />

                  {touched.address && errors.address && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.address}
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.headingTxt,
                      {
                        marginVertical: height * 0.01,
                        fontFamily: FONT.medium,
                      },
                    ]}
                  >
                    About Me
                  </Text>

                  <TextInput
                    style={styles.box}
                    multiline={true}
                    className='font-popMedium'
                    placeholder={
                      "Write your Bio, e.g your hobbies, interests, etc...\n\n\n"
                    }
                    value={values.aboutUser}
                    onChangeText={handleChange("aboutUser")}
                    onBlur={handleBlur("aboutUser")}
                  />
                  {touched.aboutUser && errors.aboutUser && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.aboutUser}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                      styles.btnPrimary,
                      {
                        width: width * 0.9,
                        alignSelf: "center",
                        marginVertical: height * 0.02,
                      },
                    ]}
                  >
                    <Text style={styles.btnTxt}>Update Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View> 
      </ScrollView> : null}

{/* <NDISAgreement />
<TermsAndConditions /> */}

    </SafeAreaView>
  );
};

export default ProfileSetting;

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
    width: "92%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
  },
});
