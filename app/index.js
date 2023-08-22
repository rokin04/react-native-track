import Routing from "../navigation/AppNavigator";
import React, { useEffect, useCallback, useState } from "react";
import { LogBox, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import store from "../redux/store";
import Toast from 'react-native-toast-message';

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

    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 80, width: '95%', backgroundColor: 'white'  }} className='rounded-lg p-2 justify-center items-center' >
        <Text className='text-[15px] font-popMedium text-red-500' >{props.text}</Text>
      </View>
    )
  };

  return (
    <Provider store={store}>
      <Routing onLayoutRootView={onLayoutRootView} />
      <Toast config={toastConfig} />
    </Provider>
  );
}
