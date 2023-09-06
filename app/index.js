import Routing from "../navigation/AppNavigator";
import React, { useEffect, useCallback, useState } from "react";
import { LogBox, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import Toast from 'react-native-toast-message';
import { NativeBaseProvider } from "native-base";

export default function App() {

  const [fontsLoaded] = useFonts({
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await loadFontsAsync();
    }
    prepare();
  }, []);

  const loadFontsAsync = async () => {
    await Font.loadAsync({
      FontAwesome: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf"),
    });
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);

  const toastConfig = {
    tomatoToast: ({ props }) => (
      <View style={{ height: 80, width: '95%', backgroundColor: 'red'}} className='rounded-lg p-2 justify-center items-center' >
        <Text className='text-[15px] font-popMedium text-white' >{props.text}</Text>
      </View>
    ),
    successToast: ({ props }) => (
      <View style={{ height: 80, width: '95%', backgroundColor: 'green'}} className='rounded-lg p-2 justify-center items-center' >
        <Text className='text-[15px] font-popMedium text-white' >{props.text}</Text>
      </View>
    )
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider>
      <Routing onLayoutRootView={onLayoutRootView} />
      <Toast config={toastConfig} />
      </NativeBaseProvider>
    </Provider>
  );
}
