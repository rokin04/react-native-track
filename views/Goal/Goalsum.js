import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from "../../constants";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import reduxAction from "../../redux/action";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast , { BaseToast } from 'react-native-toast-message';

const Goalsum = () => {
  const [nextPage, setNaxtPage] = useState(false);

  const dispatch = useDispatch();
  const goalSummaryData = useSelector((state) => state.goalSummaryData);
  const settingGroupGoal = useSelector((state) => state.settingGroupGoal);
  const GoalFordata = useSelector((state) => state.settingGroupGoal);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDatePicker1Visible, setDatePicker1Visibility] = useState(false);
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);

  // const GoalFordata = [
  //   { name: 'Goal 1' },
  //   { name: 'Goal 2' },
  //   { name: 'Goal 3' },
  // ];
  const {
    goalPriority,
    goalTitle,
    goalArea,
    enterGoalArea,
    goalFor,
    shareGoalTo,
    goalSelectedSubType,
    name,
    email,
    groupName,
    goalType,
    recurring,
    goalDescription,
    startDate,
    targetDate,
  } = goalSummaryData;

  const newGoalForData = { groupName, email, name };

  console.log(goalSummaryData);

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
    setSelectedStartDate(date);
    hideDatePicker();
  };

  const handleEndDate = (date) => {
    setSelectedEndDate(date);
    hideDatePicker();
  };

  const formatDate = (date) => {
    if (!date) return "";

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Goal-Summary saved successfully!',
    });
  }
  const showErrorToast = () => {
      Toast.show({
        type: 'tomatoToast',
        props: { text: 'Bad Request!' }
      });

  }

  const handleOnSetGoalTitle = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalTitle: e },
    });
  };

  const handleOnSetGoalPriority = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalPriority: e },
    });
  };

  const handleOnSetGoalArea = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalArea: e },
    });
  };

  const handleOnEnterGoalArea = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, enterGoalArea: e },
    });
  };

  const handleOnGoalFor = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalFor: e },
    });
  };

  const handleOnSetGoalType = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalType: e },
    });
  };

  const handleOnGoalDescription = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalDescription: e },
    });
  };
  const handleOnShareGoalTo = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, shareGoalTo: e },
    });
  };

  const handleOnAddPersonName = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, name: e },
    });
  };

  const handleOnAddPersonEmail = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, email: e },
    });
  };

  const handleOnAddPersonGroupName = (e) => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, groupName: e },
    });
  };

  const handleAddPerson = () => {
    dispatch({
      type: reduxAction.ADD_GROUP_PERSON,
      payload: [...GoalFordata, newGoalForData],
    });
  };

  const handleOnSave = (next) => () => {
    console.log('triggered');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        title: goalTitle,
        priority: goalPriority,
        area: '',
        area_custom: enterGoalArea,
        goal_for: goalFor,
        forSomeoneElse: GoalFordata,
        recurring: '',
        start_date: selectedStartDate,
        target_date: selectedEndDate,
        description: goalDescription,
      }),
      redirect: "follow",
    };

    fetch(`http://dev.trackability.net.au:8082/goals/summary/save/${2165}`, requestOptions)
      .then((res) =>
        res.json().then((data) => {
          if (data.responseStatus === 200) {
            showToast()
            if (next === "next") {
              navigate("/trackability/goal/outcomes");
            }
          } else if (data.responseStatus === 400) {
            showErrorToast();
          }
        })
      )
      .catch(showErrorToast());
  };

  return (
    <>
      {!nextPage ? (
        <ScrollView>
            <SafeAreaView className="flex flex-col gap-10 p-2" >

          <View>
            <Text className="text-[15px] font-popMedium m-1">Goal Title</Text>
            <TextInput
              onChangeText={handleOnSetGoalTitle}
              value={goalTitle}
              className="border p-3 text-[15px] rounded"
            />
          </View>
          <View>
            <Text className="text-[15px] font-popMedium m-1">Goal Priorty</Text>
            <View>
              <RadioButton.Group
                onValueChange={handleOnSetGoalPriority}
                value={goalPriority}
              >
                <View className="flex flex-row">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="High" />
                    <Text className="text-sm font-popMedium">High</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Medium" />
                    <Text className="text-sm font-popMedium">Medium</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Low" />
                    <Text className="text-sm font-popMedium">Low</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View>
            <Text className="text-[15px] font-popMedium m-1">
              Trackability has a set of pre-configured goal areas for you to
              select. Do you want to select one of them or set your own goal ?
            </Text>
            <View></View>
            <View>
              <RadioButton.Group
                onValueChange={handleOnSetGoalArea}
                value={goalArea ? goalArea : "Enter"}
              >
                <View className="flex flex-row ">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Select" />
                    <Text className="text-sm font-popMedium">
                      Select Goal Area
                    </Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Enter" />
                    <Text className="text-sm font-popMedium">
                      Enter Your Goal Area
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>

              {goalArea === "Select" ? (
                <View>
                  <View className="border rounded text-2xl font-popMedium ">
                    <Picker>
                      <Picker.Item label="health" value="reactJs" />
                      <Picker.Item label="Welth" value="reactJs Native" />
                    </Picker>
                  </View>
                  <View className="border h-[15vh] my-2 rounded"></View>
                </View>
              ) : (
                <View>
                  <Text className="text-[15px] font-popMedium m-1">
                    Enter your area of goal
                  </Text>
                  <TextInput
                    onChangeText={handleOnEnterGoalArea}
                    value={enterGoalArea}
                    className="border p-3 text-[15px] rounded"
                  />
                </View>
              )}
            </View>
          </View>
          <View className="">
            <Text className="text-[15px] font-popMedium m-1">
              Are you setting this goal for?
            </Text>
            <View>
              <RadioButton.Group
                onValueChange={handleOnGoalFor}
                value={goalFor}
              >
                <View className="flex flex-row py-1 justify-evenly">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Self" />
                    <Text className="text-sm font-popMedium">Self</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Someone" />
                    <Text className="text-sm font-popMedium">Someone Else</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Group" />
                    <Text className="text-sm font-popMedium">For Group</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setNaxtPage(true);
            }}
          >
            <View 
            className="w-16 bg-blue-400 h-[60px] ml-auto rounded-full flex justify-center items-center">
            <Ionicons name="chevron-forward-outline" size={30} color="white" />
            </View>
          </TouchableOpacity>

        </SafeAreaView>
          </ScrollView>
      ) : (
        <ScrollView>
        <SafeAreaView className="flex flex-col justify-evenly h-[80vh] p-1">
          {goalFor !== "Self" ? (
            <View>
              <View className="flex flex-row justify-evenly items-center">
                <TextInput
                  className="border p-2 text-l rounded w-2/5 placeholder:font-popMedium "
                  placeholder="Name"
                  onChangeText={handleOnAddPersonName}
                />
                <TextInput
                  className="border p-2 text-l rounded w-2/5 placeholder:font-popMedium "
                  placeholder="Email"
                  onChangeText={handleOnAddPersonEmail}
                />
                <TouchableOpacity onPress={handleAddPerson}>
                  <Ionicons name="add-circle-outline" size={40} color="gray" />
                </TouchableOpacity>
              </View>

              <View className="flex flex-row gap-2 m-1 flex-wrap">
                {GoalFordata.map((data) => {
                  return (
                    data.name !== '' && <TouchableOpacity>
                      <View className="rounded-xl p-[2px] px-5 bg-gray-200 flex flex-row items-center">
                        <Text className="font-popMedium "> {data.name} </Text>
                        <Ionicons name="close-circle" size={20} color="gray" />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : null}

          <View>
            <Text className="text-[15px] font-popMedium mx-2">Goal Type</Text>
            <View>
              <RadioButton.Group
                onValueChange={handleOnSetGoalType}
                value={goalType}
              >
                <View className="flex flex-row pb-2">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Recurring" />
                    <Text className="text-sm font-popMedium">Recurring</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="One-Time" />
                    <Text className="text-sm font-popMedium">
                      One-Time Achievement
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            {goalType === "Recurring" ? (
              <View className="border rounded text-2xl font-popMedium ">
                <Picker>
                  <Picker.Item label="Daily" value="Daily" />
                  <Picker.Item label="Weekly" value="Weekly" />
                </Picker>
              </View>
            ) : null}
            {goalType && (
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
                  isVisible={isDatePicker1Visible}
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
                      {selectedEndDate
                        ? formatDate(selectedEndDate)
                        : "End Date"}
                    </Text>
                    <Ionicons name="calendar" size={25} color="gray" />
                  </View>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePicker2Visible}
                  mode="date"
                  onConfirm={handleEndDate}
                  onCancel={hideDatePicker}
                />
              </View>
            )}
          </View>

            <Text className="text-[15px] font-popMedium mx-2">
              Goal Summary
            </Text>
            <TextInput
              onChangeText={handleOnGoalDescription}
              value={goalDescription}
              multiline
              className="border min-h-[13vh] p-1 my-2 rounded text-[15px] font-popMedium"
            ></TextInput>

          <View>
            <Text className="text-[15px] font-popMedium mx-2">
              Share Your Goal to
            </Text>
            <View>
              <RadioButton.Group
                onValueChange={handleOnShareGoalTo}
                value={shareGoalTo}
              >
                <View className="flex flex-row">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="fam/Friends" />
                    <Text className="text-sm font-popMedium">
                      Family Friends/Colleagues
                    </Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Reviewer" />
                    <Text className="text-sm font-popMedium">Reviewer</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleOnSave()}
            className="w-1/4  p-2 bg-blue-400 ml-auto rounded-[15px]"
          >
            <Text className="text-[15px] text-center font-popMedium text-white font-semibold">
              Save
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
      )}
    </>
  );
};

export default Goalsum;