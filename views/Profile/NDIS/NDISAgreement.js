import React from 'react'
import { useState,useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../ProfileSetting/profile.style';
import { HOST } from "../../../utils/Host-URL";
import { useSelector} from 'react-redux';
import { Switch } from "react-native";

const { height, width } = Dimensions.get("window");

const NDISAgreement = () => {
  const [modalVisible2, setModalVisible2] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (switchAgree) => {
    setIsEnabled({ ...isEnabled, [switchAgree]: !isEnabled[switchAgree] });
  }

  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 8,
      width: "92%",
      maxHeight: "80%",
    },
    text: {
      fontSize: 16,
    },
  });

  const getQuestions = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${HOST}:8080/api/ndis/questions/${userEmail}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.responseStatus === 200) {
          setNdisQuestions(result.questions);
          // setNdisUserAnswer({ email: userEmail, answers: result.questions });
        } else {
          toast.error(result.responseMessage);
        }
      })
      .catch((error) => console.log("error", error));
    // console.log(userEmail);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const [ndisQuestions, setNdisQuestions] = useState([]);
  const [ndisUserAnswer, setNdisUserAnswer] = useState([]);
  const userEmail = useSelector((state) => state.userEmail || "");

  return (
    <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(false);
            setIsEnabled(false);
          }}>
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <View className="flex-row justify-between  p-2" style={{ backgroundColor: '#10AFB9' }}>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    NDIS Agreement
                  </Text>
                  <Ionicons
                    size={30}
                    name="close-outline"
                    style={{ color: "#FFFFFF" }}
                    onPress={() => {
                      setModalVisible2(false);
                      setIsEnabled(false);
                    }}
                  />
                </View>
                <Text
                  className="text-md font-popMedium p-3"
                  style={{
                    color: "#263238",
                    fontSize: 15,
                    alignItems: "center",
                    marginBottom: 5,
                    backgroundColor: '#DCF1EF'
                  }}
                >
                  Confirm that the following topics have been discussed and understood by the participant.
                </Text>

                <View className="p-3">
                  {
                    ndisQuestions.length ? ndisQuestions.map((que) => {
                      // console.log(que.id);
                      return (
                        <>
                          <View key={que.id} className="flex flex-row" style={{ alignItems: "flex-start" }}>
                            <Text
                              className="text-md font-popMedium"
                              style={{
                                color: "#263238",
                                fontSize: 13,
                                alignItems: "center",
                                marginRight: 30,
                                width: 250
                              }}
                            >
                              {que.name}
                            </Text>

                            <Switch
                              trackColor={{ false: '#EFF8F2', true: '#EFF8F2' }}
                              thumbColor={isEnabled[que.id] ? '#44D788' : '#FFFFFF'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={() => toggleSwitch(que.id)}
                              value={isEnabled[que.id]}
                            />
                          </View>
                          <View style={styles.line}></View>
                        </>
                      )
                    }) : null
                  }
                </View>
                <TouchableOpacity
                  // onPress={handleAgreement}
                  style={[
                    styles.btnPrimary,
                    {
                      width: width * 0.8,
                      alignSelf: "center",
                      marginVertical: height * 0.02,
                    },
                  ]}>
                  <Text
                    style={styles.btnTxt}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}

export default NDISAgreement