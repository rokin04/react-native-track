import React, { useState } from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
import { ICONS } from "../../constants";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/icons/Logo.png";
import ProgressCircle from "react-native-progress-circle";
import * as Progress from "react-native-progress";
import StarRating from "react-native-star-rating";
import { Avatar, Center, NativeBaseProvider } from "native-base";
import profile from "../../assets/icons/profile.png";
import { TouchableOpacity } from "react-native";
import more from "../../assets/icons/more.png";
import { useSelector } from "react-redux";
import dashboard from "../../assets/images/dashboard.png";

const Dashboard = ({navigation}) => {
  const [starCount, setStarCount] = useState(3.5);
  const goalSummaryDataCollection = useSelector(
    (state) => state.goalSummaryDataCollection
  );
  const ShareGoalData = useSelector((state) => state.ShareGoalData);

  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  const handleOnCreateGoal = () => {
    navigation.navigate('Goal');
  }

  const Example = () => {
    return (
      <Center style={{ marginLeft: 8}}>
        <Avatar.Group
          _avatar={{
            size: "sm",
          }}
          max={2}
          space={-2}
        >     
          {
            ShareGoalData.family.familyColleagueList.map(()=>(
          <Avatar
            bg="green.500"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            AJ
          </Avatar>
            ))
          }
    
        </Avatar.Group>
      </Center>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", position: "relative" }}
    >
      <View style={styles.container} className="my-1">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View className="flex flex-row justify-evenly items-center">
          <TouchableOpacity>
            <Ionicons name="menu" size={32} color="black" />
          </TouchableOpacity>
          <View className="flex flex-row gap-1 items-center">
            <Image
              source={Logo}
              className=""
              style={{ width: 28, height: 28 }}
            />
            <Text className="text-[16px] font-poplarge pt-1 text-[#4D4D4D]">
              MYCARETEAM.ONLINE
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row gap-1 items-center w-11 h-11 border mt-1 rounded-full"></TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleOnCreateGoal} className="absolute bottom-5 right-5 h-16 rounded-full w-16 bg-[#029BF7] z-10 flex justify-center items-center">
        <Ionicons name="add" size={42} color="white" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} className="p-3 gap-y-3">
        <View className="bg-[#029BF7] overflow-hidden rounded-2xl p-3 flex flex-row items-center space-x-3 h-40">
          <View className="items-center w-2/6 h-full justify-center">
            <ProgressCircle
              percent={20}
              radius={60}
              borderWidth={5}
              color="#00C3A5"
              shadowColor="white"
              bgColor="#029BF7"
            >
              <View style={{ alignItems: "center" }}>
                <ProgressCircle
                  percent={50}
                  radius={45}
                  borderWidth={5}
                  color="#FFCF4E"
                  shadowColor="white"
                  bgColor="#029BF7"
                >
                  <Text className="text-base font-popMedium  text-white">
                    00
                  </Text>
                </ProgressCircle>
              </View>
            </ProgressCircle>
          </View>
          <View className="flex flex-col w-4/6 px-3 h-full justify-between ">
            <Text className="font-popMedium text-white text-base">
              Hey, AbiRam <Text>&#128075;</Text>{" "}
            </Text>
            <Text className="font-PopLight text-white text-sm ">
              Your Goals
            </Text>

            <View className="flex flex-col gap-1">
              <View className="flex flex-row justify-between">
                <Text className="font-PopLight text-white text-xs">
                  Progress
                </Text>
                <Text className="font-PopLight text-white text-sm">80%</Text>
              </View>
              <Progress.Bar
                progress={0.8}
                width={220}
                color="#ffb703"
                style={{ backgroundColor: "#E4E9EB", borderColor: "#E4E9EB" }}
              />
            </View>
            <View className="flex flex-row justify-between ">
              <View className="flex flex-col items-center justify-center mt-1">
                <Text className='font-popMedium text-white text-base"'>10</Text>
                <Text className="font-PopLight text-white text-[10px]">
                  To DO
                </Text>
              </View>
              <View className="flex flex-col items-center justify-center mt-1">
                <Text className='font-popMedium text-white text-base"'>07</Text>
                <Text className="font-PopLight text-white text-[10px]">
                  In Progress
                </Text>
              </View>
              <View className="flex flex-col items-center justify-center mt-1">
                <Text className='font-popMedium text-white text-base"'>04</Text>
                <Text className="font-PopLight text-white text-[10px]">
                  Completed
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-lg font-popMedium my-2 text-[#0D2B68]">
          Goals Category
        </Text>

        {goalSummaryDataCollection.length > 0 ? (
          <View className="flex flex-col gap-4 mb-10">

            {goalSummaryDataCollection.map( (data)=> (
            <View>
              <View className=" gap-y-1 border-[1px] rounded-2xl px-3 py-2 flex flex-col justify-evenly">
                <View className="flex flex-row justify-between items-center">
                  <View className="w-1/5 h-[5px] rounded-full bg-[#F0B764]"></View>
                  <View className="flex flex-row justify-end items-center gap-2">
                    <View className="p-[5px] rounded-full bg-red-400"></View>
                    <Text className="font-PopLight text-sm">{data.priority}</Text>
                    <TouchableOpacity>
                      <Image source={more} className="" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="w-8/12">
                  <Text className="text-lg font-popMedium text-[#029BF7]">
                  {data.title}
                  </Text>
                  <View className="flex flex-row items-center w-full justify-between">
                    <Ionicons name="time-outline" size={22} color="#FFBF06" />
                    <Text className="text-xs opacity-50 font-PopLight">
                      Updated 2 hour ago
                    </Text>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={starCount}
                      selectedStar={onStarRatingPress}
                      starSize={15}
                      fullStarColor={"#FFBF06"}
                    />
                  </View>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="w-4/12 gap-1">
                    <Text className="text-sm font-PopLight">
                      Current Status
                    </Text>
                    <View className="border-0.5 rounded border-gray-500 flex flex-row justify-evenly items-center">
                      <View className="p-1 rounded-full bg-green-400"></View>
                      <Text className="font-PopLight text-sm">Completed</Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-5">
                    <View className="flex flex-col items-center">
                      <Text className="font-popMedium text-sm text-[#029BF7]">
                        Start Date
                      </Text>
                      <Text className="font-PopLight text-sm opacity-50">
                        {data.start_date}
                      </Text>
                    </View>
                    <View className="flex flex-col items-center">
                      <Text className="font-popMedium text-sm text-[#029BF7]">
                        Target Date
                      </Text>
                      <Text className="font-PopLight text-sm opacity-50">
                        {data.target_date}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex gap-1">
                    <Text className="text-xs font-popMedium">Shared With</Text>
                    <Center>
                      <Example />
                    </Center>
                  </View>
                  <View className="flex flex-col items-end gap-1">
                    <Text className="text-xs font-popMedium">Reviewed By</Text>
                    <Image
                      source={profile}
                      className=""
                      style={{ width: 28, height: 28 }}
                    />
                  </View>
                </View>
              </View>
            </View>
            ) ) 
            }
           
          </View>
        ) : (
          <View className="flex justify-center items-center gap-y-10">
            <View className="w-2/3 flex flex-col justify-center items-center gap-2">
              <Image source={dashboard} />
              <Text className="font-popMedium opacity-50 text-center">
                Still you don’t have any goals please add a new goal!{" "}
              </Text>
            </View>
            <TouchableOpacity onPress={handleOnCreateGoal} className='border-2 border-dotted border-[#64B4F5] p-2 px-5' >
              <Text className='font-popMedium text-lg text-[#019FFE]' >Create Goal</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
    height: 60,
  },
});

export default Dashboard;
