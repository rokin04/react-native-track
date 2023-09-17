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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "react-native-elements";
import { Alert } from "react-native";
import reduxAction from "../../../redux/action";
import useSettings from "./useSettings";
import useToast from "../../../hooks";
import CustomMultipleSelect from "../../../components/common/CustomSelect/CustomMultipleSelect";
import CustomSelect from "../../../components/common/CustomSelect/CustomSelect";
import { formatDate } from "../../../utils/formatDate";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const { height, width } = Dimensions.get("window");

const gender = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
  { label: "Other", value: "Other" },
];

const ProfileSetting = ({ navigation }) => {
  const [screen1, setScreen1] = useState(true);
  const [countryData, setCountryData] = useState([
    { value: "41", label: "Australia" },
  ]);
  const [stateData, setStateData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [state, setState] = useState([]);
  const [stateSelectionValue, setStateSelectionValue] = useState();
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
  const toggleSwitch = (swithAgree) => {
    setIsEnabled({ ...isEnabled, [swithAgree]: !isEnabled[swithAgree] });
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
  };
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail || "");

  const roleId = useSelector((state) => state.roleId);
  const userDetails = useSelector((state) => state.userDetails || "");

  console.log(userDetails?.state);

  const { getUserDetails } = useSettings(dispatch);
  const { successToast, errorToast } = useToast();

  const [providerModalVisible, setProviderModalVisible] = useState(false);
  const [providersData, setProvidersData] = useState();

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
    setStateSelectionValue(obj.value);
  };
  const handleOnProviderNameChange = (obj) => {
    setStateSelectionValue(obj.value);
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

  useEffect(()=>{
    if(userDetails.state){
      setStateSelectionValue(userDetails.state)
    }
  },[userDetails.state])

  console.log(userDetails);

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
        return {'value': value, 'label': value};
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
                      className="h-12 w-1/2"
                    >
                      <View
                        style={{ borderColor: "#d0d2d2" }}
                        className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                        placeholder="Name"
                      >
                        <Text className="text-base font-popMedium font-light">
                          {userDetails?.dateOfBirth ? userDetails?.dateOfBirth : selectedDOB
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
                      display="inline"
                      onConfirm={handleDOBChange}
                      onCancel={hideDOBPicker}
                    />
                    <View className="w-[42vw]">
                      <CustomSelect
                        initialValue={userDetails?.gender || ''}
                        title={"Gender"}
                        value={values.gender}
                        data={gender}
                        width={width * 0.43}
                      />
                    </View>
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
                  <View className="w-[96vw] pb-4">
                    <CustomSelect
                      title="Country"
                      initialValue={userDetails?.location || ''}
                      value={values.country}
                      data={[{ value: "41", label: "Australia" }]}
                      search={true}
                      onChange={(selectedObj) => {
                        handleOnStateChange(selectedObj);
                        handleChange("country")(selectedObj.value);
                      }}
                    />
                  </View>
                  {touched.country && errors.country && (
                    <Text className="text-red-500 font-popMedium text-right text-xs">
                      {errors.country}
                    </Text>
                  )}
                  <View className="w-[96vw] mb-4">
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
                  </View>
                  <View className="w-[96vw] mb-4">
                    <CustomSelect
                      title="State"
                      initialValue={userDetails?.state || ''}
                      value={values.state}
                      data={stateData}
                      search={true}
                      onChange={(selectedObj) => {
                        handleOnStateChange(selectedObj);
                        handleChange("state")(selectedObj.value);
                      }}
                    />
                    {touched.state && errors.state && (
                      <Text className="text-red-500 font-popMedium text-right text-xs">
                        {errors.state}
                      </Text>
                    )}
                  </View>
                  <View className="w-[96vw] pb-4">
                    <CustomSelect
                      title="Area"
                      initialValue={userDetails?.state || ''}
                      value={values.areaSuburban}
                      data={areaData.length ? areaData.map(area => ({label: area.name, value: area.name, code: area.postalCode})) : []}
                      search={true}
                      onChange={(selectedArea) => {
                        handleChange("areaSuburban")(selectedArea.value);
                      }}
                    />

                    {touched.areaSuburban && errors.areaSuburban && (
                      <Text className="text-red-500 font-popMedium text-right text-xs">
                        {errors.areaSuburban}
                      </Text>
                    )}
                  </View>
                  <CustomInput
                    title="Address"
                    name="address"
                    placeholder="Enter address"
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}
        >
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <View>
                  <Text
                    className="text-md font-popMedium m-4"
                    style={{
                      color: "#263238",
                      fontSize: 18,
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Please Complete the{" "}
                    <Text style={{ fontWeight: "bold" }}>NDIS</Text> Declaration
                    Form
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
                  ]}
                >
                  <Text style={styles.btnTxt}>OK</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <View
                  className="flex-row justify-between  p-2"
                  style={{ backgroundColor: "#10AFB9" }}
                >
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
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
                    onPress={() => setModalVisible2(false)}
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
                  Confirm that the following topics have been discussed and
                  understood by the participant.
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
                  Plan Funding Included in the participant’s NDIS Plan
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
                  The different support categories and their flexibility
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
                  Fund management and claiming
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
                  Organising and planning supports over the life of the NDIS
                  Plan
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
                  The role of community and mainstream supports
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
                  How to access and use the My NDIS portal and App
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
                  The value and importance of service agreements
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
                  If any supports have been listed in the plan, the participant
                  knows who can deliver the support and how it may be provided
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible2(false)}
                  style={[
                    styles.btnPrimary,
                    {
                      width: width * 0.8,
                      alignSelf: "center",
                      marginVertical: height * 0.02,
                    },
                  ]}
                >
                  <Text style={styles.btnTxt}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => setModalVisible3(false)}
        >
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <Text
                  className="text-md font-popMedium m-4"
                  style={{
                    color: "#263238",
                    fontSize: 18,
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  “ Please Complete the{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    Terms and Conditions
                  </Text>{" "}
                  “
                </Text>
                <TouchableOpacity
                  onPress={handleTermsAndCondition}
                  style={[
                    styles.btnPrimary,
                    {
                      width: width * 0.7,
                      alignSelf: "center",
                      marginVertical: height * 0.02,
                    },
                  ]}
                >
                  <Text style={styles.btnTxt}>OK</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible4}
          onRequestClose={() => {
            setModalVisible4(false);
            setChecked(false);
          }}
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
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Terms and Conditions
                  </Text>
                  <Ionicons
                    size={30}
                    name="close-outline"
                    style={{ color: "#FFFFFF" }}
                    onPress={() => setModalVisible4(false)}
                  />
                </View>
                <View className="p-4">
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 14,
                      alignItems: "center",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Please read these terms and conditions carefully before
                    using Our Service.
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
                    Interpretation and Definitions
                  </Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 14,
                      alignItems: "center",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Interpretation
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
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 14,
                      alignItems: "center",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Definitions
                  </Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    For the purposes of these Terms and Conditions:
                  </Text>
                  <View className="gap-2 ml-1 pr-2">
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Application means the software program provided by the
                        Company downloaded by You on any electronic device,
                        named MyCareteam.Online
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Application Store means the digital distribution service
                        operated and developed by Apple Inc. (Apple App Store)
                        or Google Inc. (Google Play Store) in which the
                        Application has been downloaded.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Affiliate means an entity that controls, is controlled
                        by or is under common control with a party, where
                        "control" means ownership of 50% or more of the shares,
                        equity interest or other securities entitled to vote for
                        election of directors or other managing authority.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Account means a unique account created for You to access
                        our Service or parts of our Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text> Country refers to: Victoria, Australia</Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Company (referred to as either "the Company", "We", "Us"
                        or "Our" in this Agreement) refers to Four Square
                        Venture Holdings , 3 Bravo Loop, Pakenham, Victoria,
                        3810.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Content refers to content such as text, images, or other
                        information that can be posted, uploaded, linked to or
                        otherwise made available by You, regardless of the form
                        of that content.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Device means any device that can access the Service such
                        as a computer, a cellphone or a digital tablet.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Feedback means feedback, innovations or suggestions sent
                        by You regarding the attributes, performance or features
                        of our Service.Service refers to the Application.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Terms and Conditions (also referred as "Terms") mean
                        these Terms and Conditions that form the entire
                        agreement between You and the Company regarding the use
                        of the Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Third-party Social Media Service means any services or
                        content (including data, information, products or
                        services) provided by a third-party that may be
                        displayed, included or made available by the Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You means the individual accessing or using the Service,
                        or the company, or other legal entity on behalf of which
                        such individual is accessing or using the Service, as
                        applicable.
                      </Text>
                    </View>
                    <Text>Acknowledgment</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        These are the Terms and Conditions governing the use of
                        this Service and the agreement that operates between You
                        and the Company. These Terms and Conditions set out the
                        rights and obligations of all users regarding the use of
                        the Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Your access to and use of the Service is conditioned on
                        Your acceptance of and compliance with these Terms and
                        Conditions. These Terms and Conditions apply to all
                        visitors, users and others who access or use the
                        Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        By accessing or using the Service You agree to be bound
                        by these Terms and Conditions. If You disagree with any
                        part of these Terms and Conditions then You may not
                        access the Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You represent that you are over the age of 18. The
                        Company does not permit those under 18 to use the
                        Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Your access to and use of the Service is also
                        conditioned on Your acceptance of and compliance with
                        the Privacy Policy of the Company. Our Privacy Policy
                        describes Our policies and procedures on the collection,
                        use and disclosure of Your personal information when You
                        use the Application or the Website and tells You about
                        Your privacy rights and how the law protects You. Please
                        read Our Privacy Policy carefully before using Our
                        Service.
                      </Text>
                    </View>
                    <Text>User Accounts</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        When You create an account with Us, You must provide Us
                        information that is accurate, complete, and current at
                        all times. Failure to do so constitutes a breach of the
                        Terms, which may result in immediate termination of Your
                        account on Our Service. You are responsible for
                        safeguarding the password that You use to access the
                        Service and for any activities or actions under Your
                        password, whether Your password is with Our Service or a
                        Third-Party Social Media Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You agree not to disclose Your password to any third
                        party. You must notify Us immediately upon becoming
                        aware of any breach of security or unauthorized use of
                        Your account.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You may not use as a username the name of another person
                        or entity or that is not lawfully available for use, a
                        name or trademark that is subject to any rights of
                        another person or entity other than You without
                        appropriate authorization, or a name that is otherwise
                        offensive, vulgar or obscene.
                      </Text>
                    </View>
                    <Text>Content</Text>
                    <Text>Your Right to Post Content</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Our Service allows You to post Content. You are
                        responsible for the Content that You post to the
                        Service, including its legality, reliability, and
                        appropriateness.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        By posting Content to the Service, You grant Us the
                        right and license to use, modify, publicly perform,
                        publicly display, reproduce, and distribute such Content
                        on and through the Service. You retain any and all of
                        Your rights to any Content You submit, post or display
                        on or through the Service and You are responsible for
                        protecting those rights. You agree that this license
                        includes the right for Us to make Your Content available
                        to other users of the Service, who may also use Your
                        Content subject to these Terms.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You represent and warrant that: (i) the Content is Yours
                        (You own it) or You have the right to use it and grant
                        Us the rights and license as provided in these Terms,
                        and (ii) the posting of Your Content on or through the
                        Service does not violate the privacy rights, publicity
                        rights, copyrights, contract rights or any other rights
                        of any person.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Company is not responsible for the content of the
                        Service's users. You expressly understand and agree that
                        You are solely responsible for the Content and for all
                        activity that occurs under your account, whether done so
                        by You or any third person using Your account.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You may not transmit any Content that is unlawful,
                        offensive, upsetting, intended to disgust, threatening,
                        libelous, defamatory, obscene or otherwise
                        objectionable. Examples of such objectionable Content
                        include, but are not limited to, the following:
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text> Unlawful or promoting unlawful activity.</Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Defamatory, discriminatory, or mean-spirited content,
                        including references or commentary about religion, race,
                        sexual orientation, gender, national/ethnic origin, or
                        other targeted groups.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Spam, machine – or randomly – generated, constituting
                        unauthorized or unsolicited advertising, chain letters,
                        any other form of unauthorized solicitation, or any form
                        of lottery or gambling.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Containing or installing any viruses, worms, malware,
                        trojan horses, or other content that is designed or
                        intended to disrupt, damage, or limit the functioning of
                        any software, hardware or telecommunications equipment
                        or to damage or obtain unauthorized access to any data
                        or other information of a third person.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Infringing on any proprietary rights of any party,
                        including patent, trademark, trade secret, copyright,
                        right of publicity or other rights.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Impersonating any person or entity including the Company
                        and its employees or representatives.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text> Violating the privacy of any third person.</Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text> False information and features.</Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Company reserves the right, but not the obligation,
                        to, in its sole discretion, determine whether or not any
                        Content is appropriate and complies with these Terms,
                        refuse or remove this Content. The Company further
                        reserves the right to make formatting and edits and
                        change the manner of any Content. The Company can also
                        limit or revoke the use of the Service if You post such
                        objectionable Content. As the Company cannot control all
                        content posted by users and/or third parties on the
                        Service, you agree to use the Service at your own risk.
                        You understand that by using the Service You may be
                        exposed to content that You may find offensive,
                        indecent, incorrect or objectionable, and You agree that
                        under no circumstances will the Company be liable in any
                        way for any content, including any errors or omissions
                        in any content, or any loss or damage of any kind
                        incurred as a result of your use of any content.
                      </Text>
                    </View>
                    <Text>Content Backups</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Although regular backups of Content are performed, the
                        Company does not guarantee there will be no loss or
                        corruption of data.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Corrupt or invalid backup points may be caused by,
                        without limitation, Content that is corrupted prior to
                        being backed up or that changes during the time a backup
                        is performed.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Company will provide support and attempt to
                        troubleshoot any known or discovered issues that may
                        affect the backups of Content. But You acknowledge that
                        the Company has no liability related to the integrity of
                        Content or the failure to successfully restore Content
                        to a usable state.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You agree to maintain a complete and accurate copy of
                        any Content in a location independent of the Service.
                      </Text>
                    </View>
                    <Text>Copyright Policy</Text>
                    <Text>Intellectual Property Infringement</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        We respect the intellectual property rights of others.
                        It is Our policy to respond to any claim that Content
                        posted on the Service infringes a copyright or other
                        intellectual property infringement of any person.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        If You are a copyright owner, or authorized on behalf of
                        one, and You believe that the copyrighted work has been
                        copied in a way that constitutes copyright infringement
                        that is taking place through the Service, You must
                        submit Your notice in writing to the attention of our
                        copyright agent via email at{" "}
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You may be held accountable for damages (including costs
                        and attorneys' fees) for misrepresenting that any
                        Content is infringing Your copyright.
                      </Text>
                    </View>
                    <Text>
                      DMCA Notice and DMCA Procedure for Copyright Infringement
                      Claims
                    </Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You may submit a notification pursuant to the Digital
                        Millennium Copyright Act (DMCA) by providing our
                        Copyright Agent with the following information in
                        writing (see 17 U.S.C 512(c)(3) for further detail):
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        An electronic or physical signature of the person
                        authorized to act on behalf of the owner of the
                        copyright's interest.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        A description of the copyrighted work that You claim has
                        been infringed, including the URL (i.e., web page
                        address) of the location where the copyrighted work
                        exists or a copy of the copyrighted work.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Identification of the URL or other specific location on
                        the Service where the material that You claim is
                        infringing is located.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Your address, telephone number, and email address.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        A statement by You that You have a good faith belief
                        that the disputed use is not authorized by the copyright
                        owner, its agent, or the law.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        A statement by You, made under penalty of perjury, that
                        the above information in Your notice is accurate and
                        that You are the copyright owner or authorized to act on
                        the copyright owner's behalf.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        You can contact our copyright agent via email at Upon
                        receipt of a notification, the Company will take
                        whatever action, in its sole discretion, it deems
                        appropriate, including removal of the challenged content
                        from the Service.
                      </Text>
                    </View>
                    <Text>Intellectual Property</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Service is protected by copyright, trademark, and
                        other laws of both the Country and foreign countries.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Our trademarks and trade dress may not be used in
                        connection with any product or service without the prior
                        written consent of the Company.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Service and its original content (excluding Content
                        provided by You or other users), features and
                        functionality are and will remain the exclusive property
                        of the Company and its licensors.
                      </Text>
                    </View>
                    <Text>Your Feedback to Us</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You assign all rights, title and interest in any
                        Feedback You provide the Company. If for any reason such
                        assignment is ineffective, You agree to grant the
                        Company a non-exclusive, perpetual, irrevocable, royalty
                        free, worldwide right and license to use, reproduce,
                        disclose, sub-license, distribute, modify and exploit
                        such Feedback without restriction.
                      </Text>
                    </View>
                    <Text>Links to Other Websites</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Our Service may contain links to third-party web sites
                        or services that are not owned or controlled by the
                        Company.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Company has no control over, and assumes no
                        responsibility for, the content, privacy policies, or
                        practices of any third party web sites or services. You
                        further acknowledge and agree that the Company shall not
                        be responsible or liable, directly or indirectly, for
                        any damage or loss caused or alleged to be caused by or
                        in connection with the use of or reliance on any such
                        content, goods or services available on or through any
                        such web sites or services.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        We strongly advise You to read the terms and conditions
                        and privacy policies of any third-party web sites or
                        services that You visit.
                      </Text>
                    </View>
                    <Text>Termination</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        We may terminate or suspend Your Account immediately,
                        without prior notice or liability, for any reason
                        whatsoever, including without limitation if You breach
                        these Terms and Conditions.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Upon termination, Your right to use the Service will
                        cease immediately. If You wish to terminate Your
                        Account, You may simply discontinue using the Service.
                      </Text>
                    </View>
                    <Text>Limitation of Liability</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Notwithstanding any damages that You might incur, the
                        entire liability of the Company and any of its suppliers
                        under any provision of this Terms and Your exclusive
                        remedy for all of the foregoing shall beo the amount
                        actually paid by You through the Service or 100 USD if
                        You haven't purchased anything through the Service.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        To the maximum extent permitted by applicable law, in no
                        event shall the Company or its suppliers be liable for
                        any special, incidental, indirect, or consequential
                        damages whatsoever (including, but noto, damages for
                        loss of profits, loss of data or other information, for
                        business interruption, for personal injury, loss of
                        privacy arising out of or in any way related to the use
                        of or inability to use the Service, third-party software
                        and/or third-party hardware used with the Service, or
                        otherwise in connection with any provision of this
                        Terms), even if the Company or any supplier has been
                        advised of the possibility of such damages and even if
                        the remedy fails of its essential purpose.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Some states do not allow the exclusion of implied
                        warranties or limitation of liability for incidental or
                        consequential damages, which means that some of the
                        above limitations may not apply. In theseach party's
                        liability will be limited to the greatest extent
                        permitted by law.
                      </Text>
                    </View>
                    <Text>
                      &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
                    </Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The Service is provided to You &quot;AS IS&quot; and
                        &quot;AS AVAILABLE&quot; and with all faults and defects
                        without warranty of any kind. To the maximum extent
                        permitted under applicable law, theon its own behalf and
                        on behalf of its Affiliates and its and their respective
                        licensors and service providers, expressly disclaims all
                        warranties, whether express, implied, statutory or
                        otherwise, with respect to the Service, including all
                        implied warranties of merchantability, fitness for a
                        particular purpose, title and non-infringement, and
                        warranties that may arise out of course of dealing,
                        course of performance, usage or trade practice. Without
                        limitation to the foregoing, the Company provides no
                        warranty or undertaking, and makes no representation of
                        any kind that the Service will meet Your requirements,
                        achieve any intended results, be compatible or work with
                        any other software, applications, systems or services,
                        operate without interruption, meet any performance or
                        reliability standards or be error free or that any
                        errors or defects can or will be corrected.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Without limiting the foregoing, neither the Company nor
                        any of the company's provider makes any representation
                        or warranty of any kind, express or implied: (i) as to
                        the operation or availability of the Service, or the
                        information, content, and materials or products included
                        thereon; (ii) that the Service will be uninterrupted or
                        error-free; (iii) as to the accuracy, reliability, or
                        currency of any information or content provided through
                        the Service; or (iv) that the Service, its servers, the
                        content, or e-mails sent from or on behalf of the
                        Company are free of viruses, scripts, trojan horses,
                        worms, malware, timebombs or other harmful components.{" "}
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Some jurisdictions do not allow the exclusion of certain
                        types of warranties or limitations on applicable
                        statutory rights of a consumer, so some or all of the
                        above exclusions and limitations may not apply to You.
                        But in such a case the exclusions and limitations set
                        forth in this section shall be applied to the greatest
                        extent enforceable under applicable law.
                      </Text>
                    </View>
                    <Text>Governing Law</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        The laws of the Country, excluding its conflicts of law
                        rules, shall govern this Terms and Your use of the
                        Service. Your use of the Application may also be subject
                        to other local, state, national, or international laws.
                      </Text>
                    </View>
                    <Text>Disputes Resolution</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        If You have any concern or dispute about the Service,
                        You agree to first try to resolve the dispute informally
                        by contacting the Company.
                      </Text>
                    </View>
                    <Text>For European Union (EU) Users</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        If You are a European Union consumer, you will benefit
                        from any mandatory provisions of the law of the country
                        in which you are resident in.
                      </Text>
                    </View>
                    <Text>United States Legal Compliance</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        You represent and warrant that (i) You are not located
                        in a country that is subject to the United States
                        government embargo, or that has been designated by the
                        United States government as a &quot;terrorist
                        supporting&quot; country, and (ii) You are not listed on
                        any United States government list of prohibited or
                        restricted parties.
                      </Text>
                    </View>
                    <Text>Severability and Waiver</Text>
                    <Text>Severability</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        If any provision of these Terms is held to be
                        unenforceable or invalid, such provision will be changed
                        and interpreted to accomplish the objectives of such
                        provision to the greatest extent possible under
                        applicable law and the remaining provisions will
                        continue in full force and effect.
                      </Text>
                    </View>
                    <Text>Waiver</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Except as provided herein, the failure to exercise a
                        right or to require performance of an obligation under
                        these Terms shall not effect a party's ability to
                        exercise such right or require such performance at any
                        time thereafter nor shall the waiver of a breach
                        constitute a waiver of any subsequent breach.
                      </Text>
                    </View>
                    <Text>Translation Interpretation</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        These Terms and Conditions may have been translated if
                        We have made them available to You on our Service. You
                        agree that the original English text shall prevail in
                        the case of a dispute.
                      </Text>
                    </View>
                    <Text>Changes to These Terms and Conditions</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        We reserve the right, at Our sole discretion, to modify
                        or replace these Terms at any time. If a revision is
                        material We will make reasonable efforts to provide at
                        least 30 days' notice prior to any new terms taking
                        effect. What constitutes a material change will be
                        determined at Our sole discretion.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        By continuing to access or use Our Service after those
                        revisions become effective, You agree to be bound by the
                        revised terms. If You do not agree to the new terms, in
                        whole or in part, please stop using the website and the
                        Service.
                      </Text>
                    </View>
                    <Text>Contact Us</Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        If you have any questions about these Terms and
                        Conditions, You can contact us:
                      </Text>
                    </View>
                    <Text> By email: </Text>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        To the maximum extent permitted by applicable fav, in no
                        event shall the Company of ts supplies be liable for any
                        special, incidental, indirect, or consequential damages
                        whatsoever (including, but not limited to, damages for
                        loss of profit, loss of data or other information, for
                        business interruption, for personal injury, loss of
                        privacy arising out of or in any way related to the use
                        of or inabilty to use the Service, third-party software
                        andor third-party hardware used with the Service, of
                        otherwise in connection with any provision of this
                        Terms), even i the Company or any supplier has been
                        advised of the possibilty of such damages and even i the
                        remedy fais of its essential purpose.
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text style={{ marginRight: 4, fontWeight: "bold" }}>
                        •
                      </Text>
                      <Text>
                        {" "}
                        Some states do not allow the exclusion of implied
                        warranties or limitation of ability for incidental or
                        consequential damages, which means that some of the
                        above limitations may not apply. In these states, each
                        partys liability will be limited to the greatest extent
                        permitted by law.
                      </Text>
                    </View>
                  </View>
                  <CheckBox
                    title="I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS AGREEMENT BY
                      READING IT BEFORE ACCEPTING THE TERMS AND CONDITIONS"
                    checked={checked}
                    onPress={toggleCheckbox}
                  />
                </View>
                {checked ? (
                  <TouchableOpacity
                    onPress={() => setModalVisible4(false)}
                    style={[
                      styles.btnPrimary,
                      {
                        width: width * 0.8,
                        alignSelf: "center",
                        marginVertical: height * 0.02,
                      },
                    ]}
                  >
                    <Text style={styles.btnTxt}>Accept</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setModalVisible4(false)}
                    disabled={true}
                    style={[
                      styles.btnDisable,
                      {
                        width: width * 0.8,
                        alignSelf: "center",
                        marginVertical: height * 0.02,
                      },
                    ]}
                  >
                    <Text style={styles.btnTxt}>Accept</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView> : null}
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
