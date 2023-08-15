import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from "../../constants";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import Goalsum from "./Goalsum";
import { useState } from "react";
import Outcomes from "./Outcomes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShareGoal from "./ShareGoal";

const Goal = () => {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarScrollEnabled: true,
      tabBarIndicatorStyle: {
        backgroundColor: "#FFBF13",
        height: 3,
      },
      labelStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        opacity: 0.8,
        }
    }}
    sceneContainerStyle={{ backgroundColor: "white" , padding:12, paddingTop:3 }}
  >
    <Tab.Screen name="Goal Summary" component={Goalsum}  />
    <Tab.Screen name="Outcomes" component={Outcomes}/>
    <Tab.Screen name="Share Goal / Review" component={ShareGoal}/>
    <Tab.Screen name="Goal Progress" component={Goalsum} />
  </Tab.Navigator>
  );
};

export default Goal;
