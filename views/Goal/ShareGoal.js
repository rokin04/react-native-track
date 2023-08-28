import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput} from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { Portal, PaperProvider } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import reduxAction from '../../redux/action';
import { Modal, ScrollView, StyleSheet } from 'react-native';

const ShareGoal = () => {

    const [peoplechange, setPeoplechange] = useState('people');
    const [role, setRole] = useState();
    const [permissions, setPermissions] = useState();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('')
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const familyData = useSelector((state) => state.settingFamilyData);
    const reviewerData = useSelector((state) => state.settingReviewerData);
    const shareFamilyData = useSelector((state)=> state.shareFamilyData);
    const shareReviewerData = useSelector((state)=> state.shareReviewerData);

    const {
      peoplefirstname,
      peoplelastname,
      peopleemail,
      peoplephno,
      reasontoshare1,
      peoplerole,
      peoplepermissions
    }=shareFamilyData;

    const {
      reviewerfirstname,
      reviewerlastname,
      revieweremail,
      reviewerphno,
      reasontoshare2
    }=shareReviewerData;

    const handlePeopleFirstName = (e) => {
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, peoplefirstname: e}
      })
    }

    const handlePeopleLastName = (e) => {
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, peoplelastname: e}
      })
    }

    const handlePeopleEmail = (e) => {
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, peopleemail: e}
      })
    }

    const handlePeoplePhNo = (e) => {
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, peoplephno: e}
      })
    }

    const handleReasonToShare1 = (e) => {
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, reasontoshare1: e}
      })
    }

    const handlepeoplerole = (itemValue) => {
      setRole(itemValue)
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, peoplerole: itemValue}
      })
    }

    const handlepermission = (itemValue) => {
      setPermissions(itemValue)
      dispatch({
        type: reduxAction.UPDATE_PEOPLE_DATA,
        payload: {...shareFamilyData, peoplepermissions: itemValue}
      })
    }

    const handleReviewerFirstName = (e) => {
      dispatch({
        type: reduxAction.UPDATE_REVIEWER_DATA,
        payload: {...shareReviewerData, reviewerfirstname: e}
      })
    }

    const handleReviewerLastName = (e) => {
      dispatch({
        type: reduxAction.UPDATE_REVIEWER_DATA,
        payload: {...shareReviewerData, reviewerlastname: e}
      })
    }

    const handleReviewerEmail = (e) => {
      dispatch({
        type: reduxAction.UPDATE_REVIEWER_DATA,
        payload: {...shareReviewerData, revieweremail: e}
      })
    }

    const handleReviewerPhNo = (e) => {
      dispatch({
        type: reduxAction.UPDATE_REVIEWER_DATA,
        payload: {...shareReviewerData, reviewerphno: e}
      })
    }

    const handleReasonToShare2 = (e) => {
      dispatch({
        type: reduxAction.UPDATE_REVIEWER_DATA,
        payload: {...shareReviewerData, reasontoshare2: e}
      })
    }

    const addfamilydata = () =>{
      setModalVisible1(false);
      dispatch({ 
        type: reduxAction.ADD_GROUP_FAMILY_DATA,
        payload: [ ...familyData, shareFamilyData]
      })
      setInputValue('');
      setRole('');
      setPermissions('');
      
    }

    const addreviewerdata = () => {
      setModalVisible2(false);
      dispatch({
        type: reduxAction.ADD_GROUP_REVIEWER_DATA,
        payload: [...reviewerData, shareReviewerData]
      })
      setInputValue('');
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        width: '92%',
        maxHeight: '80%',
      },
      text: {
        fontSize: 16,
      },
    });

  return (
    <PaperProvider>
    <SafeAreaView className="p-4" style={{marginTop:-15}}>
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
        {peoplechange==='people'?
        <TouchableOpacity className="flex flex-row ml-8" onPress={() => setModalVisible1(true)}>
          <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'}/>
          <Text className="text-lg font-popMedium pb-3" style={{color:'#0D2B68'}}>
          Add People
          </Text>
        </TouchableOpacity> :null}

        {peoplechange==='reviewer'?
        <TouchableOpacity className="flex flex-row ml-4" onPress={() => setModalVisible2(true)}>
          <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'}/>
          <Text className="text-lg font-popMedium pb-3" style={{color:'#0D2B68'}}>
          Add Reviewer
          </Text>
        </TouchableOpacity> :null}
      </View>

      {familyData.map((data)=>{
        return(
          
          <View >
            {peoplechange==='people' ? 
            data.peoplefirstname!== null && data.peoplefirstname!=='' &&
          <View className="border h-[25vh] mb-3 rounded p-3" style={{borderColor:'#D0D2D2'}}>
            <View className="flex flex-row">
              <View>
                <View className="flex-row">
                <Text className="text-lg font-popMedium mr-1" style={{color:'#0D2B68'}}>
                {data.peoplefirstname}
                </Text>
                <Text className="text-lg font-popMedium" style={{color:'#0D2B68'}}>
                {data.peoplelastname}
                </Text>
                </View>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>
                  {data.peopleemail}
                </Text>
                <Text className="text-sm font-popMedium mb-2" style={{color:'#54585A'}}>
                {data.peoplephno}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
                <Ionicons name="create-outline" style={{position:'absolute', bottom:54, left:275}} size={26} color={'#3a86ff'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="trash-outline" style={{position:'absolute', bottom:55, left:310}} size={25} color={'red'}/>
            </TouchableOpacity>
            <View className="flex flex-row">
              <View className="mr-8">
                <Text className="text-sm font-popMedium" style={{color:'#54585A',fontSize:16}}>Role</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>{data.peoplerole}</Text>
              </View>
              <View>
                <Text className="text-sm font-popMedium" style={{color:'#54585A',fontSize:16}}>Reason to share</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>{data.reasontoshare1}</Text>
              </View>
            </View>
            <View className="mr-7">
                <Text className="text-sm font-popMedium" style={{color:'#54585A',fontSize:16}}>Permissions</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>View, Mobile Notifications ({data.peoplepermissions} Once)</Text>
            </View>
            
          </View>
          :null}
          </View>
        )
      })}
      
      {reviewerData.map((data)=>{
        return(
      <View>
      {peoplechange!=='people' ? 
          data.reviewerfirstname!== null && data.reviewerfirstname!=='' &&
          <View className="border h-[20vh] mb-3 rounded p-3" style={{borderColor:'#D0D2D2'}}>
            <View className="flex flex-row">
            <View>
              <View className="flex-row">
              <Text className="text-lg font-popMedium mr-1" style={{color:'#0D2B68'}}>
              {data.reviewerfirstname}
              </Text>
              <Text className="text-lg font-popMedium" style={{color:'#0D2B68'}}>
              {data.reviewerlastname}
              </Text>
              </View>
              <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>
                {data.revieweremail}
              </Text>
              <Text className="text-sm font-popMedium mb-2" style={{color:'#54585A'}}>
              {data.reviewerphno}
              </Text>
            </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" style={{position:'absolute', bottom:54, left:275}} size={26} color={'#3a86ff'}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="trash-outline" style={{position:'absolute', bottom:55, left:310}} size={25} color={'red'}/>
            </TouchableOpacity>
            <View className="flex flex-row">
              <View className="mr-8">
                <Text className="text-sm font-popMedium" style={{color:'#54585A',fontSize:16}}>Role</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>Reviewer</Text>
              </View>
              <View>
                <Text className="text-sm font-popMedium" style={{color:'#54585A',fontSize:16}}>Reason to share</Text>
                <Text className="text-sm font-popMedium mb-3" style={{color:'#54585A'}}>{data.reasontoshare2}</Text>
              </View>
            </View>
          </View>
          :null}
      </View>
        )
      })}

      <View style={styles.container}>
      <Portal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => setModalVisible1(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ScrollView>
            <View className='flex flex-row'>
            <Text className="text-md font-popMedium mr-48" style={{color:'#263238',fontSize:18,alignItems:"center", marginBottom:10}}>
              Add People
            </Text>
            <Ionicons size={30} name="close-outline" style={{color:'#444444'}} onPress={() => setModalVisible1(false)} />
          </View>
          <View>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>First Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handlePeopleFirstName} inputValue={peoplefirstname} placeholder='Enter First Name' required/>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Last Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handlePeopleLastName} inputValue={peoplelastname} placeholder='Enter Last Name' required/>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Email</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handlePeopleEmail} inputValue={peopleemail} placeholder='Enter Email' required/>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Phone Number</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handlePeoplePhNo} inputValue={peoplephno} placeholder='Enter Phone Number' required/>
            <View className>
            <Text className="text-sm font-popMedium mr-12" style={{color:'#263238',fontSize:15}}>Role</Text>
            </View>
            <View className="border rounded text-2xl font-popMedium mb-2" style={{borderColor:'#D0D2D2'}}>
              <Picker style={{color:'#54585A'}} 
                    selectedValue={role}
                    onValueChange={(itemValue) =>
                    handlepeoplerole(itemValue)
                    }>
                <Picker.Item label="Select Role" value="reactJs" />
                <Picker.Item label="Nominated" value="nominated" />
                <Picker.Item label="Primary" value="primary" />
                <Picker.Item label="Secondary" value="secondary" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </View>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Reason to share</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handleReasonToShare1} inputValue={reasontoshare1} placeholder='Write Reason' />
            <View className>
            <Text className="text-sm font-popMedium mr-12" style={{color:'#263238',fontSize:15}}>Permissions</Text>
            </View>
            <View className="border rounded text-2xl font-popMedium " style={{borderColor:'#D0D2D2'}}>
              <Picker style={{color:'#54585A'}}
              selectedValue={permissions}
              onValueChange={(itemValue) =>
              handlepermission(itemValue)
              }>
                <Picker.Item label="Select" value="reactJs" />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
                <Picker.Item label="Yearly" value="yearly" />
              </Picker>
            </View>
            <View>
            <TouchableOpacity
              onPress={addfamilydata}
              className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
              <Text className="text-lg text-center font-popMedium text-white font-semibold">
                Add Milestone
              </Text>
            </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
          </View>
        </View>
      </Modal>
      </Portal>
      </View>
    
      <View style={styles.container}>
      <Portal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ScrollView>
          <View className='flex flex-row'>
            <Text className="text-md font-popMedium mr-44" style={{color:'#263238',fontSize:18,alignItems:"center", marginBottom:10}}>
              Add Reviewer
            </Text>
            <Ionicons size={30} name="close-outline" style={{color:'#444444'}} onPress={() => setModalVisible2(false)} />
          </View>
          <View>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>First Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handleReviewerFirstName} inputValue={reviewerfirstname} placeholder='Enter First Name' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Last Name</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handleReviewerLastName} inputValue={reviewerlastname} placeholder='Enter Last Name'/>
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Email</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handleReviewerEmail} inputValue={revieweremail} placeholder='Enter Email' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Phone Number</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handleReviewerPhNo} inputValue={reviewerphno} placeholder='Enter Phone Number' />
            <Text className="text-sm font-popMedium" style={{color:'#263238',fontSize:15}}>Reason to share</Text>
            <TextInput className="border p-3 text-lg rounded mb-2" style={{borderColor:'#D0D2D2'}} 
            placeholderTextColor={'#54585A'} onChangeText={handleReasonToShare2} inputValue={reasontoshare2} placeholder='Write Reason' />
            <View>
            <TouchableOpacity
              onPress={addreviewerdata}
              className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
              <Text className="text-lg text-center font-popMedium text-white font-semibold">
                Add
              </Text>
            </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
          </View>
        </View>
      </Modal>
      </Portal>
    </View>
    </SafeAreaView >
    </PaperProvider>
  )
}

export default ShareGoal