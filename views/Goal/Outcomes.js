import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView, TextInput} from 'react-native'
import { RadioButton } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { DatePickerModal } from "react-native-paper-dates";
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { useState } from 'react';

const Outcomes = () => {

  const [visible, setVisible] = React.useState(false);
  const [selectedRadio, setSelectedRadio] = useState(1);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [nextPage, setNaxtPage] = useState(false);

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
  const containerStyle = {backgroundColor: 'white', padding: 20,height:540, borderRadius:3 };

  return (
    <PaperProvider>
    <SafeAreaView >
    <View className="pb-5">
      <Text className="text-lg font-popMedium mb-3" style={{color:'#263238'}}>Outcome</Text>
      <TextInput placeholderTextColor={'#54585A'} style={{borderColor:'#D0D2D2'}} 
      className="border p-3 text-lg rounded" placeholder='Enter Expected Outcome of this Goal' />
    </View>
    <View className="pb-2 mt-3">
      <Text className="text-lg font-popMedium pb-3" style={{fontSize:15, color:'#263238'}}>
        Do You want to Breakdown one time achievement goal into multiple milestones ? 
        </Text>
        <View>
          <RadioButton.Group>
          <View className="flex flex-row pb-5">
            <View className="flex flex-row justify-center items-center">
            <View className=" flex flex-row " style={{alignItems:'center'}}>
          <RadioButton value="Yes"  onPress={()=>setSelectedRadio(1)} />
          {selectedRadio==1? <View style={{backgroundColor:'#029BF7',height:12, width:12,marginLeft:-24,marginRight:12, borderRadius:10}}></View> :null}
          </View>
              <Text className="text-sm font-popMedium mr-6" style={{color:'#263238'}}>Yes</Text>
            </View>
            <View className="flex flex-row justify-center items-center ml-10">
            <View className=" flex flex-row " style={{alignItems:'center'}}>
          <RadioButton value="No"  onPress={()=>setSelectedRadio(2)} />
          {selectedRadio==2? <View style={{backgroundColor:'#029BF7',height:12, width:12,marginLeft:-24,marginRight:12, borderRadius:10}}></View> :null}
          </View>
              <Text className="text-sm font-popMedium" style={{color:'#263238'}}>No</Text>
            </View>
          </View>
          </RadioButton.Group>
        </View>
        <View>
          <View className="flex flex-row mt-2">
            <Text className="text-lg font-popMedium pb-1 mr-20" style={{color:'#263238'}}>Milestones</Text>
            <View className="flex flex-row ml-20">
              <TouchableOpacity className="flex flex-row ml-7" onPress={showModal}>
                <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'}/>
              <Text className="text-lg font-popMedium pb-1" style={{color:'#0D2B68'}}>
                ADD
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="border h-[18vh] my-2 rounded p-4" style={{borderColor:'#D0D2D2'}}>
            <View className="flex flex-row">
              <View>
                <Text className="text-lg font-popMedium" style={{color:'#0D2B68'}}>
                  Diet Plan
                </Text>
                <Text className="text-sm font-popMedium mb-2" style={{color:'#54585A'}}>
                  Eat everyday 100 calcium food
                </Text>
              </View>
                <TouchableOpacity className="ml-20">
                <Ionicons name="trash-outline" size={25} color={'red'}/>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row">
              <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Start Date</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>23-06-2023</Text>
              </View>
              <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>End Date</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>30-06-2023</Text>
              </View>
              <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Celebrations</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>yes</Text>
              </View>
            </View>
            <View style={{height:500, width:'100%', alignItems:'center'}}>
            <Progress.Bar progress={0.45} width={325} color='#ffb703' 
            style={{backgroundColor:'#E4E9EB',borderColor:'#E4E9EB'}} />
            </View>
          </View>
          <View className="border h-[18vh] my-2 rounded p-4" style={{borderColor:'#D0D2D2'}}>
            <View className="flex flex-row">
              <View>
                <Text className="text-lg font-popMedium" style={{color:'#0D2B68'}}>
                  Diet Plan
                </Text>
                <Text className="text-sm font-popMedium mb-2" style={{color:'#54585A'}}>
                  Eat everyday 100 calcium food
                </Text>
              </View>
              <TouchableOpacity className="ml-20">
                <Ionicons name="trash-outline" size={25} color={'red'}/>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row">
              <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Start Date</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>23-06-2023</Text>
              </View>
              <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>End Date</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>30-06-2023</Text>
              </View>
              <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Celebrations</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>yes</Text>
              </View>
              </View>
                <View style={{height:500, width:'100%', alignItems:'center'}}>
                <Progress.Bar progress={0.45} width={325} color='#ffb703' 
                style={{backgroundColor:'#E4E9EB',borderColor:'#E4E9EB'}} />
              </View>
            </View> 
          </View>
          <Portal>
          <Modal className="p-3 mb-40 h-70" visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View className='flex flex-row'>
              <Text className="text-lg font-popMedium mb-3 pb-1 mr-36" style={{color:'#263238'}}>
                Add Milestone
              </Text>
              <Ionicons size={25} name="close-outline" style={{color:'#444444'}} onPress={hideModal} />
            </View>
            <View>
              <Text className="text-lg font-popMedium" style={{color:'#263238'}}>Milestone Name</Text>
              <TextInput className="border p-3 text-lg rounded mb-3" style={{borderColor:'#D0D2D2'}} 
              placeholderTextColor={'#54585A'} placeholder='Enter Name' />
              <Text className="text-lg font-popMedium" style={{color:'#263238'}}>Description</Text>
              <TextInput className="border h-[10vh] rounded pb-10 pl-3 text-lg mb-3" style={{borderColor:'#D0D2D2'}} 
              placeholderTextColor={'#54585A'} placeholder='Enter Description'/>
              <View className='fle flex-row'>
              <Text className="text-lg font-popMedium mr-12" style={{color:'#263238'}}>Start Date</Text>
              <Text className="text-lg font-popMedium ml-1" style={{color:'#263238'}}>End Date</Text>
              </View>
              <View className=" flex justify-evenly flex-row gap-12 px-8">
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  mode="contained"
                  className="h-10 w-1/2">
                  <View className="flex flex-row items-center border p-1 rounded h-14 w-32 placeholder:font-popMedium" 
                  placeholder="Name" style={{borderColor:'#D0D2D2'}}>
                  <Text className='text-sm font-popMedium font-light mr-2 font-light' style={{color:'#54585A'}}>
                    05-04-2023
                  </Text> 
                    <Ionicons name="calendar" size={25} style={{color:'#CCCCCC'}}/>
                  </View>
                </TouchableOpacity>
                <DatePickerModal
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}/>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  mode="contained"
                  className="h-10 w-1/2">
                  <View className="flex flex-row items-center border p-1 rounded h-14 w-32 placeholder:font-popMedium" 
                  placeholder="Name" style={{borderColor:'#D0D2D2'}}>
                  <Text className='text-sm font-popMedium font-light mr-2 font-light' style={{color:'#54585A'}}>
                    10-04-2023
                  </Text> 
                    <Ionicons name="calendar" size={25} style={{color:'#CCCCCC'}}/>
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
                  <View className='flex flex-row mt-6'>
              <Text className="text-lg font-popMedium mr-7" style={{color:'#263238'}}>Celebrations</Text>
              <Text className="text-lg font-popMedium " style={{color:'#263238'}}>Progress</Text>
              </View>
              <View className='flex flex-row gap-4'> 
                <View className="border text-lg rounded w-32 " style={{borderColor:'#D0D2D2'}}>
                  <Picker style={{color:'#54585A'}}>
                    <Picker.Item label="No" value="reactJs" />
                    <Picker.Item label="Yes" value="reactJs Native" />
                  </Picker>
                </View>
                <View className="border text-lg rounded w-32 " style={{borderColor:'#D0D2D2'}}>
                  <Picker style={{color:'#54585A'}}>
                    <Picker.Item label="40%" value="reactJs" />
                    <Picker.Item label="50%" value="reactJs Native" />
                  </Picker>
                </View>
              </View>
              <View>
              <TouchableOpacity
                onPress={() => {
                  hideModal(false)
                }}
                className="w-full p-2 mt-5 bg-blue-400 ml-auto rounded-sm">
                <Text className="text-lg text-center font-popMedium text-white font-semibold">
                  Add Milestone
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </Portal>
        </View>
        <TouchableOpacity
          onPress={() => {
            setNaxtPage(false);
          }}
          className="w-1/4  p-2 bg-blue-400 ml-auto mt-3 rounded-md">
          <Text className="text-lg text-center font-popMedium text-white font-semibold">
            Save
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
    </PaperProvider>
  )
}

export default Outcomes