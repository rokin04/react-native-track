import React, { useEffect, useState } from "react";
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
import { TextInput, ActivityIndicator } from "react-native";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import reduxAction from "../../redux/action";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast, { BaseToast } from "react-native-toast-message";
import Achiever from "../../components/ForGoalSum/Achiever";
import CustomSelect from '../../components/common/CustomSelect/CustomSelect';
import useToast from "../../hooks";
import { formatDate } from "../../utils/formatDate";

const Goalsum = ({ navigation }) => {

  const dispatch = useDispatch();
  const goalSummaryData = useSelector((state) => state.goalSummaryData);
  const goalSummaryDataCollection = useSelector((state) => state.goalSummaryDataCollection);
  const settingGroupGoal = useSelector((state) => state.settingGroupGoal);
  const GoalFordata = useSelector((state) => state.settingGroupGoal);
  const [customGoalArea, setCustomGoalArea] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDatePicker1Visible, setDatePicker1Visibility] = useState(false);
  const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);
  const [RecurringFor, setRecurringFor] = useState("");
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = useToast();

  const {
    goalPriority,
    goalTitle,
    goalArea,
    enterGoalArea,
    goalFor,
    shareGoalTo,
    goalSelectedSubType,
    goalSelectedSubOption,
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

  const handleOnremoveSubSelect = () => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalSelectedSubOption: "" },
    });
  };

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

  const handleOnEnterGoalAreaSubmit = () => {
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, enterGoalArea: enterGoalArea },
    });

    setCustomGoalArea(enterGoalArea);
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

  const handleOnDeletePerson = (index) => {
    const filteredData = GoalFordata.filter(
      (data) => data?.name !== GoalFordata[index]?.name
    );
    dispatch({
      type: reduxAction.DEL_GROUP_PERSON,
      payload: filteredData,
    });
  };

  const handleOnSave = () => () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        title: goalTitle,
        priority: goalPriority,
        area: { name: goalSelectedSubOption, id: 114 },
        area_custom: enterGoalArea,
        goal_for: goalFor,
        forSomeoneElse: GoalFordata,
        recurring: goalType,
        start_date: startDate,
        target_date: targetDate,
        description: goalDescription,
      }),
      redirect: "follow",
    };

    const checkValues = Object.keys(JSON.parse(requestOptions.body)).every((key, value) => {
      if (goalSelectedSubOption !== "" && key === 'area_custom') {
        return true;
      }
      return JSON.parse(requestOptions.body)[key] !== "";
    })

    if (checkValues) {
      fetch(
        `http://dev.trackability.net.au:8082/goals/summary/save/${2165}`,
        requestOptions
      )
        .then((res) =>
          res.json().then((data) => {
            if (data.responseStatus === 200) {
              const goalData = JSON.parse(requestOptions.body)
              successToast(data);
              dispatch({
                type: reduxAction.CHANGE_GOAL_PAGE,
                payload: 1
              });
              dispatch({
                type: reduxAction.ADD_GOALSUM_COLLECTION,
                payload: [...goalSummaryDataCollection, goalData]
              })
            } else if (data.responseStatus === 400) {
              errorToast(data);
            }
          })
        )
        .catch(() => Alert.alert('fill all the values!'));
    } else {
      Alert.alert('fill all the values!',);
    }
  };



  useEffect(() => {
    if (goalArea === "Select") {
      setCustomGoalArea("");
      dispatch({
        type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
        payload: { ...goalSummaryData, enterGoalArea: "" },
      });
    } else {
      dispatch({
        type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
        payload: { ...goalSummaryData, goalSelectedSubType: "" },
      });
      dispatch({
        type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
        payload: { ...goalSummaryData, goalSelectedSubOption: "" },
      });
    }
  }, [goalArea]);

  return (
    <ScrollView className="p-2" style={{ backgroundColor: "white" }}>
      <SafeAreaView className="flex flex-col justify-between gap-5 mb-5">
        <View>
          <Text className="text-[15px] font-popMedium m-1">Goal Title</Text>
          <TextInput
            onChangeText={handleOnSetGoalTitle}
            value={goalTitle}
            className="border p-3 text-[15px] rounded font-popMedium"
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
                  <RadioButton.Android color="green" value="High" />
                  <Text className="text-sm font-popMedium">High</Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Medium" />
                  <Text className="text-sm font-popMedium">Medium</Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Low" />
                  <Text className="text-sm font-popMedium">Low</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View>
          <View className="hidden">
            <Achiever />
          </View>
          <Text className="text-[15px] font-popMedium m-1">
            Trackability has a set of pre-configured goal areas for you to
            select. Do you want to select one of them or set your own goal ?
          </Text>
          <View>
            <RadioButton.Group
              onValueChange={handleOnSetGoalArea}
              value={goalArea}
            >
              <View className="flex flex-row ">
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Select" />
                  <Text className="text-sm font-popMedium">
                    Select Goal Area
                  </Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Enter" />
                  <Text className="text-sm font-popMedium">
                    Enter Your Goal Area
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
            {goalSelectedSubOption || customGoalArea ? (
              customGoalArea ? (
                <Text className="text-lg font-popMedium text-center capitalize">
                  {customGoalArea}
                </Text>
              ) : (
                <View className="flex justify-center flex-col items-center gap-2 mt-2">
                  <TouchableOpacity className="flex flex-row items-center gap-x-1">
                    <Text className="text-xs font-popMedium text-center capitalize">
                      {goalSelectedSubType}
                    </Text>
                  </TouchableOpacity>
                  <Ionicons name="arrow-down" size={30} color="green" />
                  <TouchableOpacity
                    onPress={handleOnremoveSubSelect}
                    className="flex flex-row items-center gap-x-1"
                  >
                    <Text className="text-xs font-popMedium text-center capitalize">
                      {goalSelectedSubOption}
                    </Text>
                    <Ionicons name="close-circle" size={15} color="gray" />
                  </TouchableOpacity>
                </View>
              )
            ) : goalArea === "Select" ? (
              <View>
                <Achiever />
              </View>
            ) : goalArea === "Enter" ? (
              <View>
                <Text className="text-[15px] font-popMedium m-1">
                  Enter your area of goal
                </Text>
                <TextInput
                  onChangeText={handleOnEnterGoalArea}
                  onSubmitEditing={handleOnEnterGoalAreaSubmit}
                  value={enterGoalArea}
                  className="border p-3 text-[15px] rounded font-popMedium"
                />
              </View>
            ) : null}
          </View>
        </View>
        <View className="">
          <Text className="text-[15px] font-popMedium m-1">
            Are you setting this goal for?
          </Text>
          <View>
            <RadioButton.Group onValueChange={handleOnGoalFor} value={goalFor}>
              <View className="flex flex-row py-1 justify-between">
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Self" />
                  <Text className="text-sm font-popMedium">Self</Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Someone" />
                  <Text className="text-sm font-popMedium">Someone Else</Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="Group" />
                  <Text className="text-sm font-popMedium">For Group</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        {goalFor === "Self" ? null : goalFor === "Someone" ? (
          <View>
            <View className="flex-1 flex-row space-between gap-2 pr-2">
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row", backgroundColor: "#FFFFFF" }}
            >
              <View className="flex flex-row gap-2 m-1 flex-wrap">
                {GoalFordata.map((data, index) => {
                  return (
                    data.name !== null && (
                      <View className="rounded-xl p-[2px] px-2 bg-gray-200 flex flex-row justify-between">
                        <Text className="font-popMedium "> {data.name} </Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleOnDeletePerson(index);
                          }}
                          key={index}
                        >
                          <Ionicons
                            name="close-circle"
                            size={20}
                            color="gray"
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  );
                })}
              </View>
            </ScrollView>
          </View>
        ) : goalFor === 'Group' ? (
          <View>
            <View className="flex-1 flex-row space-between gap-2 pr-2">
              <TextInput
                className="border p-2 text-l w-1/4 rounded placeholder:font-popMedium "
                placeholder="Group Name"
                onChangeText={handleOnAddPersonName}
              />
              <TextInput
                className="border p-2 text-l w-1/4 rounded placeholder:font-popMedium "
                placeholder="Name"
                onChangeText={handleOnAddPersonEmail}
              />
              <TextInput
                className="border p-2 text-l w-1/3 rounded placeholder:font-popMedium "
                placeholder="Email"
                onChangeText={handleOnAddPersonEmail}
              />
              <TouchableOpacity onPress={handleAddPerson}>
                <Ionicons name="add-circle-outline" size={40} color="gray" />
              </TouchableOpacity>
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
                  <RadioButton.Android color="green" value="Recurring" />
                  <Text className="text-sm font-popMedium">Recurring</Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <RadioButton.Android color="green" value="One-Time" />
                  <Text className="text-sm font-popMedium">
                    One-Time Achievement
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {goalType === "Recurring" ? (
            <View className="border rounded text-2xl ">
              <CustomSelect
                data={[
                  { label: "Daily", value: "daily" },
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "month" },
                  { label: "Yearly", value: "yearly" },
                ]}
              />
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
                    {selectedEndDate ? formatDate(selectedEndDate) : "End Date"}
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

        <Text className="text-[15px] font-popMedium mx-2">Goal Summary</Text>
        <TextInput
          onChangeText={handleOnGoalDescription}
          value={goalDescription}
          multiline
          numberOfLines={4}
          className="border min-h-[13vh] p-1 my-2 rounded text-[15px] font-popMedium"
        ></TextInput>
        <View className="ml-auto">
          <TouchableOpacity
            onPress={handleOnSave()}
            className="w-1/4 p-2 bg-blue-400 ml-auto rounded-[15px]"
          >
            <Text className="text-[15px] text-center font-popMedium text-white font-semibold">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Goalsum;
