import React, { useEffect } from "react";
import reduxAction from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FONT } from "../../constants";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomSelect from "../common/CustomSelect/CustomSelect";

const Achiever = () => {
  const achieverGoalAreaData = useSelector(
    (state) => state.achieverGoalAreaData
  );
  const goalSummaryData = useSelector((state) => state.goalSummaryData);
  const goalArea = useSelector((state) => state.goalSummaryData.goalArea);

  const dispatch = useDispatch();
  const [achieverSelect, setAchieverSelect] = useState();
  const [subTypeData, setSubTypeData] = useState();
  const [subTypeSelection, setSubTypeSelection] = useState();
  const [subSelectCustom, setSubSelectCustom] = useState();
  const [subSelectCustomEnter, setSubSelectCustomEnter] = useState();

  const handleSubtypeClick = () => {
    setSubTypeSelection("");
    setSubSelectCustomEnter('')
  };
  const handleOnAchieverSelectRemove = () => {
    setAchieverSelect("");
    setSubTypeSelection("");
    setSubSelectCustomEnter('')
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalSelectedSubType: '' },
    });
  };

  const handleOnSubSelectCustom = () => {
    setSubSelectCustomEnter(subSelectCustom)
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalSelectedSubOption: subSelectCustom },
    });
  }

  const handleOnSubTypeSelection = (data) => {
    setSubTypeSelection(data.value)
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalSelectedSubOption: data.value },
    });
  }
  const handleOnAchieverSelect = (data) => {
    setAchieverSelect(data.value)
    dispatch({
      type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
      payload: { ...goalSummaryData, goalSelectedSubType: data.value },
    });
  }

  useEffect(() => {
    fetch(
      `http://dev.trackability.net.au:8082/goals/summary/areas/achiever`
    ).then((res) =>
      res.json().then((GoalAreaData) => {
        dispatch({
          type: reduxAction.UPDATE_ACHIEVER_GOAL_AREA_DATA,
          payload: GoalAreaData,
        });
      })
    );
  }, []);

  useEffect(()=>{

    if(goalArea !== 'Select'){
      dispatch({
        type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
        payload: { ...goalSummaryData, goalSelectedSubType: '' },
      });
      dispatch({
        type: reduxAction.UPDATE_GOAL_SUMMARY_DATA,
        payload: { ...goalSummaryData, goalSelectedSubOption: '' },
      });
      setAchieverSelect("");
      setSubTypeSelection("");
      setSubSelectCustomEnter('')
    }

  } , [goalArea])

  useEffect(() => {
    const filteredObj = achieverGoalAreaData?.achiever?.filter(
      (data) => data.type === achieverSelect || goalSummaryData.goalSelectedSubType
    );
    filteredObj && setSubTypeData(filteredObj[0]?.subTypes);
  }, [achieverSelect || goalSummaryData.goalSelectedSubType]);

  return (
    <SafeAreaView>
      {(achieverSelect || goalSummaryData.goalSelectedSubType) && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row", marginVertical: 10 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#00A24E",
              padding: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              gap: 5,
              paddingHorizontal: 8,
              marginHorizontal: 5,
            }}
            onPress={handleOnAchieverSelectRemove}
          >
            <Text
              style={{ fontSize: 12, fontFamily: FONT.medium, color: "white" }}
            >
              {achieverSelect || goalSummaryData.goalSelectedSubType}
            </Text>
            <Ionicons name="close-circle" size={18} color="white" />
          </TouchableOpacity>
          {(subTypeSelection || subSelectCustomEnter) && (
            <TouchableOpacity
              style={{
                backgroundColor: "#00A24E",
                padding: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                gap: 5,
                paddingHorizontal: 8,
              }}
              onPress={handleSubtypeClick}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.medium,
                  color: "white",
                }}
              >
                {subTypeSelection || subSelectCustomEnter}
              </Text>
              <Ionicons name="close-circle" size={18} color="white" />
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
      <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}>
        {subTypeData ? (
          <View>
            <CustomSelect
          data={subTypeData?.map((data, index) => ({ label: data.name, value: data.name }))}
          onChange={handleOnSubTypeSelection}
        />
            <TextInput style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 , margin:10 , padding:5 , fontSize:15 , fontFamily:FONT.medium , textAlign:'center' }} 
            onSubmitEditing={handleOnSubSelectCustom} 
            onChangeText={text => setSubSelectCustom(text)}
            placeholder="Add" />
          </View>
        ) : (
          <CustomSelect
          data={achieverGoalAreaData?.achiever?.map((data, index) => ({ label: data.type, value: data.type }))}
          onChange={handleOnAchieverSelect}
        />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Achiever;
