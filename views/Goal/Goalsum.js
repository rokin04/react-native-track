import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from "../../constants";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Goalsum = () => {
  const [nextPage, setNaxtPage] = useState(false);
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <>
      {!nextPage ? (
        <SafeAreaView>
          <View className="pb-2">
            <Text className="text-lg font-popMedium m-1">Goal Title</Text>
            <TextInput className="border p-3 text-lg rounded" />
          </View>
          <View className="pb-2">
            <Text className="text-lg font-popMedium m-1">Goal Priorty</Text>
            <View>
              <RadioButton.Group>
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
          <View className="pb-2">
            <Text className="text-lg font-popMedium m-1">
              Trackability has a set of pre-configured goal areas for you to
              select. Do you want to select one of them or set your own goal ?
            </Text>
            <View>
              <RadioButton.Group>
                <View className="flex flex-row py-2 ">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="High" />
                    <Text className="text-sm font-popMedium">
                      Select Goal Area
                    </Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Medium" />
                    <Text className="text-sm font-popMedium">
                      Enter Your Goal Area
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>

              <View className="border rounded text-2xl font-popMedium ">
                <Picker>
                  <Picker.Item label="health" value="reactJs" />
                  <Picker.Item label="Welth" value="reactJs Native" />
                </Picker>
              </View>

              <View className="border h-[15vh] my-2 rounded"></View>
            </View>
          </View>
          <View className="">
            <Text className="text-lg font-popMedium m-1">
              Are you setting this goal for?
            </Text>
            <View>
              <RadioButton.Group>
                <View className="flex flex-row py-1 justify-evenly">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="High" />
                    <Text className="text-sm font-popMedium">Self</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Medium" />
                    <Text className="text-sm font-popMedium">Someone Else</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Low" />
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
            className="w-16 bg-blue-400 h-16 ml-auto rounded-full flex justify-center items-center"
          >
            <Ionicons name="chevron-forward-outline" size={30} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <SafeAreaView className='flex justify-evenly h-[80vh]' >  
          <View className="pb-3">
            <View className="flex flex-row justify-evenly items-center">
              <TextInput
                className="border p-2 text-l rounded w-2/5 placeholder:font-popMedium "
                placeholder="Name"
              />
              <TextInput
                className="border p-2 text-l rounded w-2/5 placeholder:font-popMedium "
                placeholder="Email"
              />
              <Ionicons name="add-circle-outline" size={40} color="gray" />
            </View>
            <View className="flex flex-row gap-2 m-1">
              <TouchableOpacity>
                <Text className="rounded-xl p-[2px] px-5 bg-gray-200 ">
                  John
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="rounded-xl p-[2px] px-5 bg-gray-200 ">
                  Williams
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="rounded-xl p-[2px] px-5 bg-gray-200 ">
                  James
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="pb-3">
            <Text className="text-lg font-popMedium mx-2">Goal Type</Text>
            <View>
              <RadioButton.Group>
                <View className="flex flex-row pb-2">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="High" />
                    <Text className="text-sm font-popMedium">Recurring</Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Medium" />
                    <Text className="text-sm font-popMedium">
                      One-Time Achievement
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>

            </View>
            <View className="border rounded text-2xl font-popMedium ">
              <Picker>
                <Picker.Item label="Daily" value="reactJs" />
                <Picker.Item label="Weekly" value="reactJs Native" />
              </Picker>
            </View>
              <View className="pt-3 flex justify-evenly flex-row gap-5 px-3">
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  mode="contained"
                  className="h-10 w-1/2"
                >
                  <View
                    className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                    placeholder="Name"
                  ><Text className='text-base font-popMedium font-light' >Start Date</Text> 
                    <Ionicons name="calendar" size={25} color="gray" />
                  </View>
                </TouchableOpacity>
                <DatePickerModal
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                />
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  mode="contained"
                  className="h-10 w-1/2"
                >
                  <View
                    className=" flex flex-row justify-evenly items-center border h-full text-l rounded w-full placeholder:font-popMedium"
                    placeholder="Name"
                  ><Text className='text-base font-popMedium font-light' >End Date</Text> 
                   <Ionicons name="calendar" size={25} color="gray" />
                  </View>
                </TouchableOpacity>
                <DatePickerModal
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                />
              </View>
          </View>

          <View className="pb-3">
            <Text className="text-lg font-popMedium mx-2">Goal Summary</Text>
            <View className="border h-[15vh] my-2 rounded"></View>
          </View>

          <View className="pb-3">
            <Text className="text-lg font-popMedium mx-2">
              Share Your Goal to
            </Text>
            <View>
              <RadioButton.Group>
                <View className="flex flex-row">
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="High" />
                    <Text className="text-sm font-popMedium">
                      Famil Friends/Colleagues
                    </Text>
                  </View>
                  <View className="flex flex-row justify-center items-center">
                    <RadioButton value="Medium" />
                    <Text className="text-sm font-popMedium">Reviewer</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setNaxtPage(false);
            }}
            className="w-1/4  p-2 bg-blue-400 ml-auto rounded-lg"
          >
            <Text className="text-lg text-center font-popMedium text-white font-semibold">
              Save
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

export default Goalsum;
