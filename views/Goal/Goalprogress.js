import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import { View,Text,TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { Portal, PaperProvider } from 'react-native-paper';
import { Rating } from 'react-native-stock-star-rating'

const Goalprogress = () => {

  const parameterdata = useSelector((state) => state.parameterdata);

  return (        
    <ScrollView>
    <PaperProvider>
    <SafeAreaView className="p-4" style={{marginTop:-40}}>
      <Text className="text-lg font-popMedium mb-3" style={{color:'#263238'}}>Over All Goal Progress</Text>
      <View className="flex-row">
      <Text className="text-lg font-popMedium w-60" style={{color:'#263238'}}>Over All Rating</Text>
      <Text className="text-md font-popMedium" style={{color:'#407BFF',width:80,alignItems:'center'}}>Qualitative analysis</Text>
      </View>
      <Text className="text-xxl font-popMedium " style={{color:'#0D2B68',fontSize:40,fontWeight:'bold',marginBottom:-10}}>4.5</Text>
      <Rating stars={4.0} maxStars={5} color={'#FFBF06'} size={15} />
      <Text className="text-lg font-popMedium mb-3 mt-8" style={{color:'#263238'}}>Current Review Cycle Rating</Text>
      <View className="border h-[25vh] mb-3 rounded pl-3" style={{borderColor:'#D0D2D2'}}>
      {parameterdata.map((paramdata,index)=>{
      return(
      <View key={index} className="flex-row" style={{alignItems:'center'}}>
      <Text className="my-2 w-60 mr-1" key={paramdata.id}>{paramdata.data}</Text>
      <Rating stars={4.0} maxStars={5} color={'#FFBF06'} size={15} />
      <TouchableOpacity className="ml-1">
      <Ionicons name="document-text-outline" size={25} color={'red'}></Ionicons>
      </TouchableOpacity>
      </View>
      )
    })}
    </View>
    <TouchableOpacity
      className="w-1/4  p-2 bg-blue-400 ml-auto mt-3 rounded-md">
      <Text className="text-lg text-center font-popMedium text-white font-semibold">
        Save
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
  </PaperProvider>
  </ScrollView>
  )
}

export default Goalprogress