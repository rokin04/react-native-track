import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { Portal, PaperProvider } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import reduxAction from '../../redux/action';
import { Modal, ScrollView, StyleSheet } from 'react-native';

const ShareGoal = ({navigate}) => {

  const [peoplechange, setPeoplechange] = useState('people');
  const [role, setRole] = useState();
  const [permissions, setPermissions] = useState();
  const [reviewFrequency, setReviewFrequency] = useState();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('')
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const familyData = useSelector((state) => state.settingFamilyData);
  const reviewerData = useSelector((state) => state.settingReviewerData);
  const shareFamilyData = useSelector((state) => state.shareFamilyData);
  const shareReviewerData = useSelector((state) => state.shareReviewerData);
  const [updateChange, setUpdateChange] = useState("");
  const [editId, setEditId] = useState(0);

  const [editfamilyData, setEditFamilyData] = useState(0);
  const [editreviewerData, setEditReviewerData] = useState(0);

  const parameterdata = useSelector((state) => state.parameterdata);

  const [reviewerFName, setReviewerFName] = useState("")
  const [reviewerLName, setReviewerLName] = useState("")
  const [reviewerEmail, setReviewerEmail] = useState("")
  const [reviewerPhNo, setReviewerPhno] = useState("")
  const [reviewerReason, setReviewerReason] = useState("")

  const [peopleFName, setPeopleFName] = useState("")
  const [peopleLName, setPeopleLName] = useState("")
  const [peopleEmail, setPeopleEmail] = useState("")
  const [peoplePhNo, setPeoplePhNo] = useState("")
  const [peopleReason, setPeopleReason] = useState("")

  const [editclick, setEditclick] = useState(false)
  const [editclick2, setEditclick2] = useState(false)


  const {
    peoplefirstname,
    peoplelastname,
    peopleemail,
    peoplephno,
    reasontoshare1,
    peoplerole,
    peoplepermissions
  } = shareFamilyData;

  const {
    reviewerfirstname,
    reviewerlastname,
    revieweremail,
    reviewerphno,
    reasontoshare2
  } = shareReviewerData;

  const handlePeopleFirstName = (e) => {
    setPeopleFName(e)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, peoplefirstname: e }
    })
  }

  const handlePeopleLastName = (e) => {
    setPeopleLName(e)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, peoplelastname: e }
    })
  }

  const handlePeopleEmail = (e) => {
    setPeopleEmail(e)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, peopleemail: e }
    })
  }

  const handlePeoplePhNo = (e) => {
    setPeoplePhNo(e)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, peoplephno: e }
    })
  }

  const handleReasonToShare1 = (e) => {
    setPeopleReason(e)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, reasontoshare1: e }
    })
  }

  const handlepeoplerole = (itemValue) => {
    setRole(itemValue)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, peoplerole: itemValue }
    })
  }

  const handlepermission = (itemValue) => {
    setPermissions(itemValue)
    dispatch({
      type: reduxAction.UPDATE_PEOPLE_DATA,
      payload: { ...shareFamilyData, peoplepermissions: itemValue }
    })
  }

  const handleReviewerFirstName = (e) => {
    setReviewerFName(e)
    dispatch({
      type: reduxAction.UPDATE_REVIEWER_DATA,
      payload: { ...shareReviewerData, reviewerfirstname: e }
    })
  }

  const handleReviewerLastName = (e) => {
    setReviewerLName(e)
    dispatch({
      type: reduxAction.UPDATE_REVIEWER_DATA,
      payload: { ...shareReviewerData, reviewerlastname: e }
    })
  }

  const handleReviewerEmail = (e) => {
    setReviewerEmail(e)
    dispatch({
      type: reduxAction.UPDATE_REVIEWER_DATA,
      payload: { ...shareReviewerData, revieweremail: e }
    })
  }

  const handleReviewerPhNo = (e) => {
    setReviewerPhno(e)
    dispatch({
      type: reduxAction.UPDATE_REVIEWER_DATA,
      payload: { ...shareReviewerData, reviewerphno: e }
    })
  }

  const handleReasonToShare2 = (e) => {
    setReviewerReason(e)
    dispatch({
      type: reduxAction.UPDATE_REVIEWER_DATA,
      payload: { ...shareReviewerData, reasontoshare2: e }
    })
  }

  const addfamilydata = () => {
    setModalVisible1(false);

    dispatch({
      type: reduxAction.ADD_GROUP_FAMILY_DATA,
      payload: [...familyData, shareFamilyData]
    })
    setPeopleFName('');
    setPeopleLName('');
    setPeopleEmail('');
    setPeoplePhNo('');
    setPeopleReason('');
    setRole('');
    setPermissions('');
    setEditFamilyData(0);
  }

  const addreviewerdata = () => {
    setModalVisible2(false);

    dispatch({
      type: reduxAction.ADD_GROUP_REVIEWER_DATA,
      payload: [...reviewerData, shareReviewerData]
    })
    setModalVisible2(false);
    setReviewerFName('');
    setReviewerLName('');
    setReviewerEmail('');
    setReviewerPhno('');
    setReviewerReason('');
    setEditReviewerData(0);
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

  const handleOnReviewFrequency = (itemValue, id) => {
    console.log(typeof (id));
    const editFrequency = parameterdata.find((i) => i.id === id);
    const updatedData = parameterdata.map((t) => t.id === editFrequency.id
      ? (t = { id: t.id, reviewfrequency: itemValue, data: t.data })
      : { id: t.id, reviewfrequency: t.reviewfrequency, data: t.data }
    );
    console.log(updatedData)

    dispatch({
      type: reduxAction.UPDATE_PARAMETER_DATA,
      payload: updatedData
    })
  }

  const editFamily = (targetIndex) => {
    setModalVisible1(true)
    const peopleEditor = familyData.find((_, index) => index === targetIndex)
    setPeopleFName(peopleEditor.peoplefirstname)
    setPeopleLName(peopleEditor.peoplelastname)
    setPeopleEmail(peopleEditor.peopleemail)
    setPeoplePhNo(peopleEditor.peoplephno)
    setPeopleReason(peopleEditor.reasontoshare1)
    setRole(peopleEditor.peoplerole)
    setPermissions(peopleEditor.peoplepermissions)
    setEditFamilyData(targetIndex);
    setEditclick(true);
  }


  const updateFamilyData =() => {

    const updatedObject = { peoplefirstname: peopleFName, peoplelastname: peopleLName, peopleemail: peopleEmail, peoplephno: peoplePhNo, reasontoshare1: peopleReason,peoplerole: role,peoplepermissions:permissions }

    const updatedArray = [...familyData]
    updatedArray[editfamilyData]=updatedObject

    dispatch({
      type: reduxAction.ADD_GROUP_FAMILY_DATA,
      payload: updatedArray
    })
    setPeopleFName('');
    setPeopleLName('');
    setPeopleEmail('');
    setPeoplePhNo('');
    setPeopleReason('');
    setRole('');
    setPermissions('');
    setEditclick(false);
    setModalVisible1(false);
  }

  const handleOnCloseTab = () => {
    setModalVisible1(false);
    setPeopleFName('');
    setPeopleLName('');
    setPeopleEmail('');
    setPeoplePhNo('');
    setPeopleReason('');
    setRole('');
    setPermissions('');
  }

  const handleCloseTab2 = () => {
    setModalVisible2(false);
    setReviewerFName('');
    setReviewerLName('');
    setReviewerEmail('');
    setReviewerPhno('');
    setReviewerReason('');
  }

  const editReview = (targetIndex) => {
    setModalVisible2(true);
    const reviewEditor = reviewerData.find((_, index) => index === targetIndex)
    setReviewerFName(reviewEditor.reviewerfirstname)
    setReviewerLName(reviewEditor.reviewerlastname)
    setReviewerEmail(reviewEditor.revieweremail)
    setReviewerPhno(reviewEditor.reviewerphno)
    setReviewerReason(reviewEditor.reasontoshare2)
    setEditReviewerData(targetIndex);
    setEditclick2(true)
  }

  const updateReviwerData = () => {

    const updatedReviewerObject = { reviewerfirstname: reviewerFName, reviewerlastname: reviewerLName, revieweremail: reviewerEmail, reviewerphno: reviewerPhNo, reasontoshare2: reviewerReason }

    const updatedReviewerArray = [...reviewerData]
    updatedReviewerArray[editreviewerData] = updatedReviewerObject

    dispatch({
      type: reduxAction.ADD_GROUP_REVIEWER_DATA,
      payload: updatedReviewerArray
    })
    setModalVisible2(false)

  }

  const deleteFamily = (targetIndex) => {
    const deleteFamilyData = familyData.filter((_, index) => index !== targetIndex);
    console.log(deleteFamilyData)
    dispatch({
      type: reduxAction.ADD_GROUP_FAMILY_DATA,
      payload: deleteFamilyData
    })
  }

  const deleteReviewer = (targetIndex) => {
    const deleteReviewerData = reviewerData.filter((_, index) => index !== targetIndex);
    console.log(deleteReviewerData)
    dispatch({
      type: reduxAction.ADD_GROUP_REVIEWER_DATA,
      payload: deleteReviewerData
    })
  }

  const editMode = (id) => {
    setModalVisible3(true)
    const editer = parameterdata.find((i) => i.id === id);
    setUpdateChange(editer.data);
    setEditId(id);
    // console.log(editer.data);
  }

  const handleUpdate = (e) => {

    e.preventDefault();
    setModalVisible3(false)
    if (editId) {
      const editer = parameterdata.find((i) => i.id === editId);
      const updatedData = parameterdata.map((t) => t.id === editer.id
        ? (t = { id: t.id, data: updateChange })
        : { id: t.id, data: t.data }
      );

      console.log(editer);

      dispatch({
        type: reduxAction.UPDATE_PARAMETER_DATA,
        payload: updatedData
      })

      setEditId(0);
      setUpdateChange('');
      return;
    };
  };
  // console.log(parameterdata)

  return (
    <ScrollView>
      <PaperProvider>
        <SafeAreaView className="p-4" style={{ marginTop: -15 }}>
          <Text className="text-md font-popMedium pb-1 mt-3" style={{ fontSize: 16, color: '#263238' }}>
            Trackability allows you to share your goals to Family, Friends, Colleagues, Motivators etc. You can also add a reviewer to track and monitor your goals...
          </Text>
          <Text className="text-md font-popMedium pb-1 mt-2" style={{ fontSize: 17, color: '#263238' }}>
            Select someone whom you want to share this goal with, you could add one more people
          </Text>
          <View className="mb-4">
            <RadioButton.Group onValueChange={newValue => setPeoplechange(newValue)} value={peoplechange}>
              <View className="flex-row">
                <View className="flex flex-row items-center">
                  <RadioButton value="people" />
                  <Text>Family friends / Colleagues</Text>
                </View>
                <View className="flex flex-row items-center">
                  <RadioButton value="reviewer" />
                  <Text>Reviewer</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <View className="flex flex-row ml-48">
            {peoplechange === 'people' ? !(familyData.length > 3) &&
              <TouchableOpacity className="flex flex-row ml-8" onPress={() => setModalVisible1(true)}>
                <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'} />
                <Text className="text-lg font-popMedium pb-3" style={{ color: '#0D2B68' }}>
                  Add People
                </Text>
              </TouchableOpacity> : null}

            {peoplechange === 'reviewer' ? !(reviewerData.length > 1) &&
              <TouchableOpacity className="flex flex-row ml-4" onPress={() => setModalVisible2(true)}>
                <Ionicons name="add-circle-outline" size={25} color={'#0D2B68'} />
                <Text className="text-lg font-popMedium pb-3" style={{ color: '#0D2B68' }}>
                  Add Reviewer
                </Text>
              </TouchableOpacity> : null}
          </View>

          {familyData.map((data, index) => {
            return (

              <View >
                {peoplechange === 'people' ?
                  data.peoplefirstname !== null && data.peoplefirstname !== '' &&
                  <View>
                    <View key={index} className="border h-[25vh] mb-3 rounded p-3" style={{ borderColor: '#D0D2D2' }}>
                      <View className="flex flex-row">
                        <View>
                          <View className="flex-row">
                            <Text className="text-lg font-popMedium mr-1" style={{ color: '#0D2B68' }}>
                              {data.peoplefirstname}
                            </Text>
                            <Text className="text-lg font-popMedium" style={{ color: '#0D2B68' }}>
                              {data.peoplelastname}
                            </Text>
                          </View>
                          <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>
                            {data.peopleemail}
                          </Text>
                          <Text className="text-sm font-popMedium mb-2" style={{ color: '#54585A' }}>
                            {data.peoplephno}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="create-outline" style={{ position: 'absolute', bottom: 54, left: 275 }} size={26} color={'#3a86ff'} onPress={() => editFamily(index)} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons name="trash-outline" style={{ position: 'absolute', bottom: 55, left: 310 }} size={25} color={'red'} onPress={() => deleteFamily(index)} />
                      </TouchableOpacity>
                      <View className="flex flex-row">
                        <View className="mr-8">
                          <Text className="text-sm font-popMedium" style={{ color: '#54585A', fontSize: 16 }}>Role</Text>
                          <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>{data.peoplerole}</Text>
                        </View>
                        <View>
                          <Text className="text-sm font-popMedium" style={{ color: '#54585A', fontSize: 16 }}>Reason to share</Text>
                          <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>{data.reasontoshare1}</Text>
                        </View>
                      </View>
                      <View className="mr-7">
                        <Text className="text-sm font-popMedium" style={{ color: '#54585A', fontSize: 16 }}>Permissions</Text>
                        <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>View, Mobile Notifications ({data.peoplepermissions} Once)</Text>
                      </View>
                    </View>
                  </View>
                  : null}
              </View>
            )
          })}

          {reviewerData.map((data, index) => {
            return (
              <View>
                {peoplechange !== 'people' ?
                  data.reviewerfirstname !== null && data.reviewerfirstname !== '' &&
                  <>
                    <View key={index} className="border h-[19vh] mb-3 rounded p-3" style={{ borderColor: '#D0D2D2' }}>
                      <View className="flex flex-row">
                        <View>
                          <View className="flex-row">
                            <Text className="text-lg font-popMedium mr-1" style={{ color: '#0D2B68' }}>
                              {data.reviewerfirstname}
                            </Text>
                            <Text className="text-lg font-popMedium" style={{ color: '#0D2B68' }}>
                              {data.reviewerlastname}
                            </Text>
                          </View>
                          <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>
                            {data.revieweremail}
                          </Text>
                          <Text className="text-sm font-popMedium mb-2" style={{ color: '#54585A' }}>
                            {data.reviewerphno}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="create-outline" style={{ position: 'absolute', bottom: 54, left: 285 }} size={26} color={'#3a86ff'} onPress={() => editReview(index)} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons name="trash-outline" style={{ position: 'absolute', bottom: 55, left: 317 }} size={25} color={'red'} onPress={() => deleteReviewer(index)} />
                      </TouchableOpacity>
                      <View className="flex flex-row">
                        <View className="mr-8">
                          <Text className="text-sm font-popMedium" style={{ color: '#54585A', fontSize: 16 }}>Role</Text>
                          <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>Reviewer</Text>
                        </View>
                        <View>
                          <Text className="text-sm font-popMedium" style={{ color: '#54585A', fontSize: 16 }}>Reason to share</Text>
                          <Text className="text-sm font-popMedium mb-3" style={{ color: '#54585A' }}>{data.reasontoshare2}</Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text className="text-lg font-popMedium" style={{ color: '#263238' }}>Parameters to Review</Text>
                      <View className="border h-[33vh] mb-3 rounded pl-3" style={{ borderColor: '#D0D2D2' }}>

                        {parameterdata.map((paramdata, index) => {
                          return (
                            <>
                              <View className="flex-row" style={{ alignItems: 'center' }}>
                                <Text className="mb-1 w-40" key={paramdata.id}>{paramdata.data}</Text>
                                <View className="font-popMedium w-32" style={{ borderColor: '#D0D2D2' }}>
                                  <Picker key={paramdata.id} style={{ color: '#54585A' }}
                                    selectedValue={parameterdata[index].reviewfrequency}
                                    onValueChange={(itemValue) =>
                                      handleOnReviewFrequency(itemValue, paramdata.id)
                                    }>
                                    <Picker.Item label="Daily" value="daily" />
                                    <Picker.Item label="Weekly" value="weekly" />
                                    <Picker.Item label="Monthly" value="month" />
                                    <Picker.Item label="Yearly" value="yearly" />
                                  </Picker>

                                </View>
                                <TouchableOpacity className="mr-1">
                                  <Ionicons name="document-text-outline" size={25} color={'red'}></Ionicons>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => editMode(paramdata.id)}>
                                  <Ionicons name="create-outline" size={26} color={'#3a86ff'} />
                                </TouchableOpacity>
                              </View>
                            </>
                          )
                        })}
                      </View>
                    </View>
                  </>
                  : null}
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
                        <Text className="text-md font-popMedium mr-48" style={{ color: '#263238', fontSize: 18, alignItems: "center", marginBottom: 10 }}>
                          Add People
                        </Text>
                        <Ionicons size={30} name="close-outline" style={{ color: '#444444' }} onPress={handleOnCloseTab} />
                      </View>
                      <View>
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>First Name</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={peopleFName} onChangeText={handlePeopleFirstName} placeholder='Enter First Name' required />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Last Name</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={peopleLName} onChangeText={handlePeopleLastName} placeholder='Enter Last Name' required />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Email</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={peopleEmail} onChangeText={handlePeopleEmail} placeholder='Enter Email' required />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Phone Number</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={peoplePhNo} onChangeText={handlePeoplePhNo} placeholder='Enter Phone Number' required />
                        <View>
                          <Text className="text-sm font-popMedium mr-12" style={{ color: '#263238', fontSize: 15 }}>Role</Text>
                        </View>
                        <View className="border rounded text-2xl font-popMedium mb-2" style={{ borderColor: '#D0D2D2' }}>
                          <Picker style={{ color: '#54585A' }}
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
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Reason to share</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={peopleReason} onChangeText={handleReasonToShare1} placeholder='Write Reason' />
                        <View className>
                          <Text className="text-sm font-popMedium mr-12" style={{ color: '#263238', fontSize: 15 }}>Permissions</Text>
                        </View>
                        <View className="border rounded text-2xl font-popMedium " style={{ borderColor: '#D0D2D2' }}>
                          <Picker style={{ color: '#54585A' }}
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
                            onPress={editclick ? updateFamilyData : addfamilydata}
                            className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
                            <Text className="text-lg text-center font-popMedium text-white font-semibold">
                              {editclick ? "Update FamilyData" : "Add FamilyData"}
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
                        <Text className="text-md font-popMedium mr-44" style={{ color: '#263238', fontSize: 18, alignItems: "center", marginBottom: 10 }}>
                          Add Reviewer
                        </Text>
                        <Ionicons size={30} name="close-outline" style={{ color: '#444444' }} onPress={handleCloseTab2} />
                      </View>
                      <View>
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>First Name</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={reviewerFName} onChangeText={handleReviewerFirstName} placeholder='Enter First Name' />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Last Name</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={reviewerLName} onChangeText={handleReviewerLastName} placeholder='Enter Last Name' />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Email</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={reviewerEmail} onChangeText={handleReviewerEmail} placeholder='Enter Email' />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Phone Number</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={reviewerPhNo} onChangeText={handleReviewerPhNo} placeholder='Enter Phone Number' />
                        <Text className="text-sm font-popMedium" style={{ color: '#263238', fontSize: 15 }}>Reason to share</Text>
                        <TextInput className="border p-3 text-lg rounded mb-2" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={reviewerReason} onChangeText={handleReasonToShare2} placeholder='Write Reason' />
                        <View>
                          <TouchableOpacity
                            onPress={editclick2 ? updateReviwerData :addreviewerdata}
                            className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
                            <Text className="text-lg text-center font-popMedium text-white font-semibold">
                              {editclick2 ? "Update ReviwerData" : "Add ReviewerData"}
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
                visible={modalVisible3}
                onRequestClose={() => setModalVisible3(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ScrollView>
                      <View className='flex flex-row'>
                        <Text className="text-md font-popMedium" style={{ color: '#263238', fontSize: 18, alignItems: "center", marginBottom: 10 }}>
                          Update Parameter
                        </Text>
                      </View>
                      <View>
                        <TextInput className="border h-[12vh] rounded pb-10 pl-3 text-lg mb-3" style={{ borderColor: '#D0D2D2' }}
                          placeholderTextColor={'#54585A'} value={updateChange} onChangeText={setUpdateChange} placeholder='Enter Your Parameter' />
                        <View className="flex-row justify-evenly gap-3">
                          <View>
                            <TouchableOpacity
                              onPress={() => setModalVisible3(false)}
                              className="w-40 p-2 mt-3 bg-gray-400 ml-auto rounded-sm">
                              <Text className="text-lg text-center font-popMedium text-white font-semibold">
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              onPress={handleUpdate}
                              className="w-40 p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
                              <Text className="text-lg text-center font-popMedium text-white font-semibold">
                                Update
                              </Text>
                            </TouchableOpacity>
                          </View>
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
    </ScrollView>
  )
}

export default ShareGoal