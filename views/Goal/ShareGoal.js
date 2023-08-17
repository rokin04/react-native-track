import React, { useState } from 'react'

import { Text, View, SafeAreaView, TextInput} from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";


const ShareGoal = () => {

   const [value, setValue] = React.useState('first');

    const [peoplechange, setPeoplechange] = useState('people');
    const [visible1, setVisible1] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const showModal1 = () => setVisible1(true);
    const hideModal1 = () => setVisible1(false);
    const showModal2 = () => setVisible2(true);
    const hideModal2 = () => setVisible2(false);

    const containerStyle1 = {backgroundColor: 'white', padding: 20, height:690, borderRadius:3};
    const containerStyle2 = {backgroundColor: 'white', padding: 20, height:550, borderRadius:3};

  return (
    <PaperProvider>
    <SafeAreaView>
      <Text className="text-md font-popMedium pb-1 mt-3" style={{fontSize:16, color:'#263238'}}>
      Trackability allows you to share your goals to Family, Friends, Colleagues, Motivators etc. You can also add a reviewer to track and monitor your goals...
      </Text>
      <Text className="text-md font-popMedium pb-1 mt-2" style={{fontSize:17, color:'#263238'}}>
      Select someone whom you want to share this goal with, you could add one more people
      </Text>
      <View className="mb-4">
        <RadioButton.Group onValueChange={newValue => setPeoplechange(newValue)} value={peoplechange}>
          <View className="flex-row">
            <View className="flex flex-row items-center">
              <RadioButton value="people"/>
              <Text>Family friends / Colleagues</Text>
            </View>
            <View className="flex flex-row items-center">
              <RadioButton value="reviewer"/>
              <Text>Reviewer</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <View className="flex flex-row ml-48">
        {peoplechange==='people'?<TouchableOpacity className="flex flex-row ml-7" onPress={showModal1}>
          <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'}/>
          <Text className="text-lg font-popMedium pb-1" style={{color:'#0D2B68'}}>
          Add People
          </Text>
        </TouchableOpacity> :null}

        {peoplechange==='reviewer'?<TouchableOpacity className="flex flex-row ml-7" onPress={showModal2}>
          <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'}/>
          <Text className="text-lg font-popMedium pb-3" style={{color:'#0D2B68'}}>
          Add Reviewer
          </Text>
        </TouchableOpacity> :null}

      </View>
      {peoplechange==='people'?
      <View>
      <View className="border h-[25vh]  rounded p-3" style={{borderColor:'#D0D2D2'}}>
        <View className="flex flex-row">
          <View className="mr-3">
            <Text className="text-lg font-popMedium" style={{color:'#0D2B68'}}>
            Henry Jones
            </Text>
            <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>
              johenry@gmail.com
            </Text>
            <Text className="text-sm font-popMedium mb-2" style={{color:'#54585A'}}>
            +02-12345-67890
            </Text>
          </View>
            <TouchableOpacity className="ml-32 flex-row">
            <Ionicons name="create-outline"size={25} color={'#3a86ff'}/>
            </TouchableOpacity>
            <TouchableOpacity className="ml-1">
            <Ionicons name="trash-outline" size={25} color={'red'}/>
            </TouchableOpacity>
        </View>
        <View className="flex flex-row">
          <View className="mr-8">
            <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Role</Text>
            <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>Nominated by</Text>
          </View>
          <View>
            <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Reason to share</Text>
            <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>Keep Update Tracking</Text>
          </View>
        </View>
        <View className="mr-7">
            <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Permissions</Text>
            <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>View, Mobile Notifications (Weekly Once)</Text>
        </View>
      </View>
      <View className="border h-[25vh] my-3 rounded p-3" style={{borderColor:'#D0D2D2'}}>
        <View className="flex flex-row">
          <View className="mr-3">
            <Text className="text-lg font-popMedium" style={{color:'#0D2B68'}}>
            Henry Jones
            </Text>
            <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>
              johenry@gmail.com
            </Text>
            <Text className="text-sm font-popMedium mb-2" style={{color:'#54585A'}}>
            +02-12345-67890
            </Text>
          </View>
            <TouchableOpacity className="ml-32 flex-row">
            <Ionicons name="create-outline"size={25} color={'#3a86ff'}/>
            </TouchableOpacity>
            <TouchableOpacity className="ml-1">
            <Ionicons name="trash-outline" size={25} color={'red'}/>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row">
            <View className="mr-8">
              <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Role</Text>
              <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>Nominated by</Text>
            </View>
            <View>
              <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Reason to share</Text>
              <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>Keep Update Tracking</Text>
            </View>
          </View>
          <View className="mr-7">
              <Text className="text-sm font-popMedium" style={{color:'#54585A'}}>Permissions</Text>
              <Text className="text-sm font-popMedium mb-3 " style={{color:'#54585A'}}>View, Mobile Notifications (Weekly Once)</Text>
          </View>
      </View>
      </View>
      :null}
      <Portal>
        <Modal className="p-2 mt-8 mb-8 h-70" visible={visible1} onDismiss={hideModal1} contentContainerStyle={containerStyle1}>
          <View className='flex flex-row'>
            <Text className="text-md font-popMedium mb-3 pb-1 mr-48" style={{color:'#263238',fontSize:17}}>
              Add People
            </Text>
            <Ionicons size={25} name="close-outline" style={{color:'#444444'}} onPress={hideModal1} />
          </View>
          <View>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>First Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter First Name' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Last Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter Last Name'/>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Email</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter Email' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Phone Number</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter Phone Number' />
            <View className>
            <Text className="text-sm font-popMedium mr-12" style={{color:'#263238',fontSize:15}}>Role</Text>
            </View>
            <View className="border rounded text-2xl font-popMedium mb-2" style={{borderColor:'#D0D2D2'}}>
              <Picker style={{color:'#54585A'}}>
                <Picker.Item label="Select Role" value="reactJs" />
                <Picker.Item label="Unselect Role" value="reactJs Native" />
              </Picker>
            </View>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Reason to share</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Write Reason' />
            <View className>
            <Text className="text-sm font-popMedium mr-12" style={{color:'#263238',fontSize:15}}>Permissions</Text>
            </View>
            <View className="border rounded text-2xl font-popMedium " style={{borderColor:'#D0D2D2'}}>
              <Picker style={{color:'#54585A'}}>
                <Picker.Item label="Select" value="reactJs" />
                <Picker.Item label="Unselect" value="reactJs Native" />
              </Picker>
            </View>
            <View>
            <TouchableOpacity
              onPress={() => {
                hideModal1(false)
              }}
              className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
              <Text className="text-lg text-center font-popMedium text-white font-semibold">
                Add Milestone
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal className="p-2 mt-8 mb-8 h-70" visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle2}>
          <View className='flex flex-row'>
            <Text className="text-md font-popMedium mb-3 pb-1 mr-44" style={{color:'#263238',fontSize:17}}>
              Add Reviewer
            </Text>
            <Ionicons size={25} name="close-outline" style={{color:'#444444'}} onPress={hideModal2} />
          </View>
          <View>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>First Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter First Name' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Last Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter Last Name'/>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Email</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter Email' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Phone Number</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Enter Phone Number' />
            {/* <View className>
            <Text className="text-sm font-popMedium mr-12" style={{color:'#263238',fontSize:15}}>Role</Text>
            </View>
            <View className="border rounded text-2xl font-popMedium mb-2" style={{borderColor:'#D0D2D2'}}>
              <Picker style={{color:'#54585A'}}>
                <Picker.Item label="Select Role" value="reactJs" />
                <Picker.Item label="Unselect Role" value="reactJs Native" />
              </Picker>
            </View> */}
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Reason to share</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} placeholder='Write Reason' />
            <View>
            <TouchableOpacity
              onPress={() => {
                hideModal2(false)
              }}
              className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
              <Text className="text-lg text-center font-popMedium text-white font-semibold">
                Add
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView >
    </PaperProvider>
  )
}

export default ShareGoal