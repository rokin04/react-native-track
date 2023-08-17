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

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Routing() {

  function ProfileTopTabs() {
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
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen name="Profile Setting" component={Profile} />
        <Tab.Screen name="Avatars" component={AvatarScreen}/>
        <Tab.Screen name="Privacy Settings" component={Privacysettings}/>
        <Tab.Screen name="Set Notifications" component={Setnotifications} />
      </Tab.Navigator>
    )
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
        <Stack.Screen name="Create Goal" component={Goal} options={{ headerStyle: { backgroundColor: "#029BF7"},headerTintColor: "white" }} />
        <Stack.Screen name="Profile" component={ProfileTopTabs} options={{ headerStyle: { backgroundColor: "#019FFE", }, headerTintColor: "white", }} />
      </Stack.Navigator>

    </NavigationContainer>
  ); 
};

export default Routing;









