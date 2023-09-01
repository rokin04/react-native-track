import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DatePickerModal } from "react-native-paper-dates";
import { Portal, PaperProvider } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reduxAction from "../../redux/action";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast, { BaseToast } from "react-native-toast-message";
import { KeyboardAvoidingView } from "react-native";
import { Modal, ScrollView, Button, StyleSheet } from "react-native";
import { HOST } from "../../utils/Host-URL";

const Outcomes = () => {
  const dispatch = useDispatch();
  const out = useSelector((state) => state.settingmilestonedata.expectedOutcome);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [milestone, setMilestone] = useState("no");
  const [celebrations, setCelebrations] = useState("");
  const [progress, setProgress] = useState();
  const [inputValue, setInputValue] = useState("");

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDatePicker1Visible, setDatePicker1Visibility] = useState(false);
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);

  const milestonedata = useSelector((state) => state.milestonedata);
  const data = useSelector((state) => state.settingmilestonedata.milestone);
  const milestoneData = useSelector((state) => state.settingmilestonedata);

  const {
    milestonename,
    milestonedesc,
    milestonestartdate,
    milestoneenddate,
    milestonecelebration,
  } = milestonedata;

  const handleOnOutcomeGoalChange = (e) => {
    dispatch({
      type: reduxAction.ADD_GROUP_MILESTONE_DATA,
      payload: { ...milestoneData, expectedOutcome: e },
    });
  };

  const milestonename1 = (e) => {
    dispatch({
      type: reduxAction.UPDATE_MILESTONE_DATA,
      payload: { ...milestonedata, milestonename: e },
    });
  };

  const milestonedesc1 = (e) => {
    dispatch({
      type: reduxAction.UPDATE_MILESTONE_DATA,
      payload: { ...milestonedata, milestonedesc: e },
    });
  };

  const showDatePicker1 = () => {
    setDatePicker1Visibility(true);
  };

  const showDatePicker2 = () => {
    setDatePicker2Visibility(true);
  };

  const hideDatePicker = () => {
    setDatePicker1Visibility(false);
    setDatePicker2Visibility(false);
  };

  const handleStartDate = (date) => {
    const startdate = formatDate(date);
    setSelectedStartDate(startdate);
    hideDatePicker();
    dispatch({
      type: reduxAction.UPDATE_MILESTONE_DATA,
      payload: { ...milestonedata, milestonestartdate: startdate },
    });
  };

  const handleEndDate = (date) => {
    const enddate = formatDate(date);
    setSelectedEndDate(enddate);
    hideDatePicker();
    dispatch({
      type: reduxAction.UPDATE_MILESTONE_DATA,
      payload: { ...milestonedata, milestoneenddate: enddate },
    });
    console.log(selectedEndDate);
  };

  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Outcomes saved successfully!',
  //   });
  // }

  const formatDate = (date) => {
    if (!date) return "";

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  console.log(milestoneData);

  const milestonecelebration1 = (itemValue) => {
    setCelebrations(itemValue);
    dispatch({
      type: reduxAction.UPDATE_MILESTONE_DATA,
      payload: { ...milestonedata, milestonecelebration: itemValue },
    });
  };

  // const milestoneprogress1 = (e) => {
  //   dispatch({
  //     type: reduxAction.UPDATE_MILESTONE_DATA,
  //     payload: { ...milestonedata, milestoneprogress: e},
  //   });
  // };

  const addmilestonedata = () => {
    setModalVisible(false);
    const milestonedata = {
      action:1,
      name: milestonename,
      description: milestonedesc,
      startDate: milestonestartdate,
      targetDate: milestoneenddate,
      celebration: milestonecelebration,
      progress:50
    };
    dispatch({
      type: reduxAction.ADD_GROUP_MILESTONE_DATA,
      payload: { ...milestoneData, milestone: [...data, milestonedata] },
    });
    setInputValue("");
    setCelebrations("");
    setProgress("");
    setSelectedStartDate("");
    setSelectedEndDate("");
  };

  
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Goal-Outcomes saved successfully!",
    });
  };

  useEffect(() => {
    if (out) {
      setCheck1(true);
    } else {
      setCheck1(false);
    }
  }, [out, check1]);

  const styles = StyleSheet.create({
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

  const handlesubmit = async (next) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(milestoneData),
      redirect: "follow",
    };
    console.log(requestOptions.body);

    await fetch(
      `http://dev.trackability.net.au:8082/api/goals/outcomes/add/outcome/`,
      requestOptions
    )
      .then((res) =>
        res.json().then((result) => {
          if (result.responseStatus === 400) {
            console.log(result.responseMessage);
          }
          if (result.responseStatus === 200) {
            showToast();
            dispatch({
              type:reduxAction.CHANGE_GOAL_PAGE,
              payload: 2
            })
          } else {
            console.log(result);
          }
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <PaperProvider>
      <SafeAreaView
        className="p-4"
        style={{ marginTop: -10, backgroundColor: "white" }}
      >
        <View className="pb-5">
          <Text
            className="text-lg font-popMedium mb-3"
            style={{ color: "#263238" }}
          >
            Outcome
          </Text>
          <TextInput
            style={{ borderColor: "#D0D2D2" }}
            className="border p-3 text-base rounded placeholder:font-popMedium placeholder:text-['#54585A']"
            onChangeText={handleOnOutcomeGoalChange}
            value={out}
            placeholder="Enter Expected Outcome of this Goal"
          />
        </View>
        <View className="pb-2 mt-3">
          <Text
            className="text-lg font-popMedium pb-3"
            style={{ fontSize: 16, color: "#263238" }}
          >
            Do You want to Breakdown one time achievement goal into multiple
            milestones ?
          </Text>
          <View className="mb-4">
            <RadioButton.Group
              onValueChange={(newValue) => setMilestone(newValue)}
              value={milestone}
            >
              <View className="flex-row">
                <View className="flex flex-row items-center mr-16">
                  <RadioButton value="yes" />
                  <Text className="font-popMedium text-sm">Yes</Text>
                </View>
                <View className="flex flex-row items-center">
                  <RadioButton value="no" />
                  <Text className="font-popMedium text-sm">No</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View>
            <View className="flex flex-row mt-2">
              <Text
                className="text-lg font-popMedium pb-1 mr-20"
                style={{ color: "#263238" }}
              >
                Milestones
              </Text>
              <View className="flex flex-row ml-20">
                {milestone === "yes" ? (
                  <TouchableOpacity
                    className="flex flex-row ml-7"
                    onPress={() => setModalVisible(true)}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={25}
                      color={"#0D2B68"}
                    />
                    <Text
                      className="text-lg font-popMedium pb-1"
                      style={{ color: "#0D2B68" }}
                    >
                      ADD
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>

          {data.map((data, index) => {
            return (
              data.name !== null && (
                <View
                  key={index}
                  className="border h-[18vh] my-1 rounded p-4"
                  style={{ borderColor: "#D0D2D2" }}
                >
                  <View className="flex flex-row">
                    <View>
                      <Text
                        className="text-lg font-popMedium"
                        style={{ color: "#0D2B68" }}
                      >
                        {data.name}
                      </Text>
                      <Text
                        className="text-sm font-popMedium mb-2"
                        style={{ color: "#54585A" }}
                      >
                        {data.description}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="trash-outline"
                      style={{ position: "absolute", bottom: 30, left: 310 }}
                      size={25}
                      color={"red"}
                    />
                  </TouchableOpacity>
                  <View className="flex flex-row">
                    <View className="mr-7">
                      <Text
                        className="text-md font-popMedium"
                        style={{ color: "#54585A", fontSize: 16 }}
                      >
                        Start Date
                      </Text>
                      <Text
                        className="text-sm font-popMedium mb-3"
                        style={{ color: "#54585A" }}
                      >
                        {data.startDate}
                      </Text>
                    </View>
                    <View className="mr-7">
                      <Text
                        className="text-md font-popMedium"
                        style={{ color: "#54585A", fontSize: 16 }}
                      >
                        End Date
                      </Text>
                      <Text
                        className="text-sm font-popMedium mb-3"
                        style={{ color: "#54585A" }}
                      >
                        {data.targetDate}
                      </Text>
                    </View>
                    <View className="mr-7">
                      <Text
                        className="text-md font-popMedium"
                        style={{ color: "#54585A", fontSize: 16 }}
                      >
                        Celebrations
                      </Text>
                      <Text
                        className="text-sm font-popMedium mb-3"
                        style={{ color: "#54585A" }}
                      >
                        {data.celebration}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ height: 500, width: "100%", alignItems: "center" }}
                  >
                    <Progress.Bar
                      progress={0.45}
                      width={325}
                      color="#ffb703"
                      style={{
                        backgroundColor: "#E4E9EB",
                        borderColor: "#E4E9EB",
                      }}
                    />
                  </View>
                </View>
              )
            );
          })}

          <View style={styles.container}>
            <Portal>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ScrollView>
                      <View
                        className="flex flex-row"
                        style={{ alignItems: "center", marginBottom: 15 }}
                      >
                        <Text
                          className="text-xl font-popMedium mr-40"
                          style={{ color: "#263238" }}
                        >
                          Add Milestone
                        </Text>
                        <Ionicons
                          size={30}
                          name="close-outline"
                          style={{ color: "#444444" }}
                          onPress={() => setModalVisible(false)}
                        />
                      </View>
                      <View>
                        <Text
                          className="text-lg font-popMedium"
                          style={{ color: "#263238" }}
                        >
                          Milestone Name
                        </Text>
                        <TextInput
                          className="border p-3 text-lg rounded mb-3"
                          style={{ borderColor: "#D0D2D2" }}
                          placeholderTextColor={"#54585A"}
                          onChangeText={milestonename1}
                          inputValue={milestonename}
                          placeholder="Enter Name"
                        />
                        <Text
                          className="text-lg font-popMedium"
                          style={{ color: "#263238" }}
                        >
                          Description
                        </Text>
                        <TextInput
                          className="border h-[10vh] rounded pb-10 pl-3 text-lg mb-3"
                          style={{ borderColor: "#D0D2D2" }}
                          placeholderTextColor={"#54585A"}
                          onChangeText={milestonedesc1}
                          inputValue={milestonedesc}
                          placeholder="Enter Description"
                        />
                        <View className="fle flex-row">
                          <Text
                            className="text-lg font-popMedium mr-10"
                            style={{ color: "#263238" }}
                          >
                            Start Date
                          </Text>
                          <Text
                            className="text-lg font-popMedium ml-8"
                            style={{ color: "#263238" }}
                          >
                            End Date
                          </Text>
                        </View>
                        <View className="flex justify-evenly flex-row gap-5 px-3">
                          <TouchableOpacity
                            onPress={showDatePicker1}
                            uppercase={false}
                            mode="contained"
                            className="h-14 w-40"
                          >
                            <View
                              className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                              placeholder="Name"
                              style={{ borderColor: "#D0D2D2" }}
                            >
                              <Text className="text-base font-popMedium font-light">
                                {selectedStartDate
                                  ? selectedStartDate
                                  : "Start Date"}
                              </Text>
                              <Ionicons
                                name="calendar"
                                size={25}
                                color="gray"
                              />
                            </View>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={isDatePicker1Visible}
                            mode="date"
                            onConfirm={handleStartDate}
                            onCancel={hideDatePicker}
                          />
                          <TouchableOpacity
                            onPress={showDatePicker2}
                            uppercase={false}
                            mode="contained"
                            className="h-14 w-40"
                          >
                            <View
                              className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                              placeholder="Name"
                              style={{ borderColor: "#D0D2D2" }}
                            >
                              <Text className="text-base font-popMedium font-light">
                                {selectedEndDate ? selectedEndDate : "End Date"}
                              </Text>
                              <Ionicons
                                name="calendar"
                                size={25}
                                color="gray"
                              />
                            </View>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={isDatePicker2Visible}
                            mode="date"
                            onConfirm={handleEndDate}
                            onCancel={hideDatePicker}
                          />
                        </View>
                        <View className="flex flex-row mt-2">
                          <Text
                            className="text-lg font-popMedium mr-12"
                            style={{ color: "#263238" }}
                          >
                            Celebrations
                          </Text>
                          <Text
                            className="text-lg font-popMedium "
                            style={{ color: "#263238" }}
                          >
                            Progress
                          </Text>
                        </View>
                        <View className="flex justify-evenly flex-row gap-5 px-3">
                          <View
                            className="border rounded w-40 "
                            style={{ borderColor: "#D0D2D2" }}
                          >
                            <Picker
                              selectedValue={celebrations}
                              onValueChange={(itemValue) =>
                                milestonecelebration1(itemValue)
                              }
                            >
                              <Picker.Item label="Select" value="select" />
                              <Picker.Item label="Yes" value="Yes" />
                              <Picker.Item label="No" value="No" />
                            </Picker>
                          </View>
                          <View
                            className="border rounded w-40 "
                            style={{ borderColor: "#D0D2D2" }}
                          >
                            <Picker
                              selectedValue={progress}
                              onValueChange={(itemValue) =>
                                setProgress(itemValue)
                              }
                            >
                              <Picker.Item label="40%" value="No" />
                              <Picker.Item label="50%" value="Yes" />
                            </Picker>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={addmilestonedata}
                        className="w-full p-2 mt-5 bg-blue-400 ml-auto rounded-sm"
                      >
                        <Text className="text-lg text-center font-popMedium text-white font-semibold">
                          Add Milestone
                        </Text>
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </Portal>
          </View>
        </View>
          <TouchableOpacity
            onPress={handlesubmit}
            className="w-1/4  p-2 bg-blue-400 ml-auto mt-3 rounded-md"
          >
            <Text className="text-lg text-center font-popMedium text-white font-semibold">
              Save
            </Text>
          </TouchableOpacity>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Outcomes;
