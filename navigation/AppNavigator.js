import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../views/Login/Login';
import Home from '../views/Home/Home';
import About from '../views/QuickTour/About';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../views/Register/Register';
import ForgetPassword from '../views/Login/ForgetPassword';
import EnterOTP from '../views/Login/EnterOTP';
import ResetPassword from '../views/Login/ResetPassword';
import Goal from '../views/Goal/Goal';
import Profile from '../views/Profile/Profile';
import AvatarScreen from '../views/Avatars/Avatars';
import Privacysettings from '../views/Privacy Settings/Privacysettings';
import Setnotifications from '../views/Set Notifications/Setnotifications';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text , TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { FONT } from '../constants';
import Goalsum from '../views/Goal/Goalsum';
import Outcomes from '../views/Goal/Outcomes';
import Goalprogress from '../views/Goal/Goalprogress';
import ShareGoal from '../views/Goal/ShareGoal';
import { ScrollView } from 'react-native';

const Stack = createStackNavigator();

function Routing() {


  const FirstRoute = () => (
    <Goalsum />
  );
  
  const SecondRoute = () => (
    <Outcomes />
  );
  const ThirdRoute = () => (
    <ShareGoal />
  );
  const FourthRoute = () => (
    <Goalprogress />
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });
  
function Goal() {
  
    const [index, setIndex] = React.useState(0);
    
    const [routes] = React.useState([
      { key: 'first', title: 'Goal Summary' },
      { key: 'second', title: 'Outcomes' },
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
        renderTabBar={({ navigationState }) => (
          <View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
            {navigationState.routes.map((route, tabIndex) => {

              const isFocused = tabIndex === navigationState.index;
              const tabColor = isFocused ? 'black' : '#333';
  
              return (
                <TouchableOpacity
                  key={tabIndex}
                  onPress={() => setIndex(tabIndex)}
                  style={{
                    alignItems: 'center',
                    padding: 16,
                    borderBottomWidth: isFocused ? 2.5 : 0,
                    borderBottomColor: '#FFBF13',
                  }}
                >
                  <Text style={{ color: tabColor , fontFamily: !isFocused ? FONT.regular : FONT.medium  }} >{route.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          </View>
        )}
      />
    );
  }
  

  return (
    <NavigationContainer independent={true}>

      <Stack.Navigator style={{ backgroundColor: "white" }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot" component={ForgetPassword} />
        <Stack.Screen name="EnterOTP" component={EnterOTP} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Login" component={Goal} options={{ headerStyle: { backgroundColor: "#019FFE", }, headerTintColor: "white", }} />
      </Stack.Navigator>

    </NavigationContainer>
  ); 
};

export default Routing;