import React from "react";
import Goalsum from "./Goalsum";
import Outcomes from "./Outcomes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShareGoal from "./ShareGoal";
import Goalprogress from "./Goalprogress";

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
    <Tab.Screen name="Goal Progress" component={Goalprogress} />
  </Tab.Navigator>
  );
};

export default Goal;