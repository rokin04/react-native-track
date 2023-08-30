import React, { useEffect } from "react";
import reduxAction from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FONT } from "../../constants";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Achiever = () => {
  const achieverGoalAreaData = useSelector(
    (state) => state.achieverGoalAreaData
  );

  const dispatch = useDispatch();
  const [achieverSelect, setAchieverSelect] = useState();
  const [subTypeData, setSubTypeData] = useState();
  const [subTypeSelection, setSubTypeSelection] = useState();

  const handleSubtypeClick = () => {
    setSubTypeSelection("");
  };
  const handleOnAchieverSelectRemove = () => {
    setAchieverSelect("");
    setSubTypeSelection("");
  };

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

  useEffect(() => {
    const filteredObj = achieverGoalAreaData?.achiever?.filter(
      (data) => data.type === achieverSelect
    );
    filteredObj && setSubTypeData(filteredObj[0]?.subTypes);
  }, [achieverSelect]);

  return (
    <SafeAreaView>
      {achieverSelect && (
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
              {achieverSelect}
            </Text>
            <Ionicons name="close-circle" size={18} color="white" />
          </TouchableOpacity>
          {subTypeSelection && (
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
                {subTypeSelection}
              </Text>
              <Ionicons name="close-circle" size={18} color="white" />
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
      <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}>
        {subTypeData ? (
          <View>
            <Picker
              selectedValue={subTypeSelection}
              onValueChange={(itemValue, itemIndex) =>
                setSubTypeSelection(itemValue)
              }
            >
              <Picker.Item label="Select Next or Add" value="default" />
              {subTypeData?.map((data, index) => (
                <Picker.Item
                  key={data.id}
                  label={data.name}
                  value={data.name}
                />
              ))}
            </Picker>
            <TextInput style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 , margin:10 , padding:5 , fontSize:15 , fontFamily:FONT.medium , textAlign:'center' }} placeholder="Add" />
          </View>
        ) : (
          <Picker
            selectedValue={achieverSelect}
            onValueChange={(itemValue, itemIndex) =>
              setAchieverSelect(itemValue)
            }
          >
            <Picker.Item label="Select Goal Areas" value="default" />
            {achieverGoalAreaData?.achiever?.map((data, index) => (
              <Picker.Item key={index} label={data.type} value={data.type} />
            ))}
          </Picker>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Achiever;
