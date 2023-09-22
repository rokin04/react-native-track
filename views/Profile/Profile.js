import Privacysettings from "./Privacy Settings/Privacysettings";
import ProfileSetting from "./ProfileSetting/ProfileSetting";
import { TabView, SceneMap } from "react-native-tab-view";
import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { FONT } from "../../constants";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";

function Profile({ navigation }) {
  const FirstRoute = () => <ProfileSetting navigation={navigation} />;

  const SecondRoute = () => <Privacysettings navigation={navigation} />;
  // const ThirdRoute = () => <ShareGoal navigation={navigation} />;
  // const FourthRoute = () => <Goalprogress navigation={navigation} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: FirstRoute,
    fourth: SecondRoute
  });

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Profile Setting" },
    { key: "second", title: "Privacy Setting" },
    { key: 'third', title: 'Share Goal' },
    { key: 'fourth', title: 'Goal Progress' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default Profile;
