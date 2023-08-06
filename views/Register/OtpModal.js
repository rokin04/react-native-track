import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { HOST } from "../../utils/Host-URL";
import { Alert } from 'react-native';

const OtpModal = ({
    isOtpModalOpen,
    setIsOtpModalOpen,
    otpSelectedOption,
    otpSelectedValue,
    setVerificationStatus,
    navigation
}) => {
    const [timer, setTimer] = useState(20);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('')
    const [otpRequestedAgain, setOtpRequestedAgain] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const otpTime = (s) => {
        const minutes = Math.floor(s / 60);
        const left = s % 60;
        return `${minutes.toString().padStart(2, "0")}:${left.toString().padStart(2, "0")}`;
    };

    const handleClose = () => {
        setIsOtpModalOpen(false);
        setError('')
        setOtp('');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            setOtpRequestedAgain(false);
        }
    }, [timer]);


    const handleOnOtpVerify = (otp, email) => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                ...{ email: email, verifyCode: otp, username: email },
            }),
            redirect: "follow",
        };
        fetch(`${HOST}:8081/api/signup/emailverify`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false);
                if (result.responseStatus === 200) {
                    setError("Success");
                    Alert.alert("Success!", result.responseMessage, [{
                        text: "OK", onPress: () => {
                            setVerificationStatus(true);
                            setIsOtpModalOpen(false);
                            navigation.navigate('Login')
                        }
                    }]);
                } else {
                    setError("Oops, wrong OTP. Please try again");
                    setTimer(0);
                    setIsOtpValid(false)
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleOTPagain = () => {
        if (timer === 0) {
            setTimer(20);
            setOtpRequestedAgain(true);
            setError('')
            setOtp('');
            setIsOtpValid(false)
        }
    };
    return (
        <>
            {isOtpModalOpen && (
                <Modal visible={isOtpModalOpen} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                                <Feather name="x" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                            <Text style={styles.textHeading}>Verify {otpSelectedOption} OTP</Text>
                            <Text style={styles.text}>Please Enter the OTP sent to</Text>
                            <Text style={[styles.text, styles.userText]}>{otpSelectedValue}</Text>
                            <TextInput
                                style={styles.modalinput}
                                onChangeText={text => {
                                    if (text.length <= 6) {
                                        setOtp(text);
                                        setIsOtpValid(text.length === 6);
                                    }
                                }}
                                value={otp}
                                keyboardType="numeric"
                                maxLength={6}
                            />

                            {error && (
                                <Text style={[styles.errorText, error === "Success" ? styles.successErrorText : null]}>
                                    {error}
                                </Text>
                            )}
                            <View style={styles.clickHereContainer}>
                                <Text style={styles.text}>
                                    Didn't receive OTP?{" "}
                                </Text>
                                {
                                    timer !== 0 ? <TouchableOpacity disabled>
                                        <Text style={[styles.text, styles.timerColor]}>
                                            {otpTime(timer)}
                                        </Text></TouchableOpacity> : (
                                        <TouchableOpacity onPress={handleOTPagain}>
                                            <Text style={[styles.text, styles.timerColor]}>
                                                Click here
                                            </Text></TouchableOpacity>)
                                }
                            </View>
                            <View style={{ width: "100%" }}>

                                <TouchableOpacity
                                    style={[styles.optBtn, !isOtpValid && styles.disabledOptBtn, isLoading && styles.loadingOptBtn]}
                                    onPress={() => isOtpValid && handleOnOtpVerify(otp, otpSelectedValue)}
                                    disabled={!isOtpValid || isLoading}
                                >
                                    {isLoading ? (
                                        <Text style={styles.optBtnText}>Loading...</Text>
                                    ) : (
                                        <Text style={styles.optBtnText}>Enter OTP</Text>
                                    )}
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

export default OtpModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
        backgroundColor: "white",
        paddingHorizontal: "8%",
        paddingTop: "8%",
        paddingBottom: "5%",
        alignItems: "center",
        borderRadius: 3,
        width: "85%",
        alignSelf: "center",
    },
    modalinput: {
        marginTop: 20,
        color: COLORS.primary,
        height: 40,
        width: '60%',
        borderBottomColor: COLORS.primary,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderStyle: "dotted",
        fontSize: SIZES.medium,
        textAlign: "center",
        letterSpacing: 10
    },
    clickHereContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textHeading: {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: SIZES.large,
        color: COLORS.primary,
    },
    text: {
        marginTop: 15,
        fontSize: SIZES.medium,
        color: COLORS.primary,
        lineHeight: 20,
    },
    timerColor: {
        color: COLORS.otpBtn.blue
    },
    errorText: {
        color: "red",
        marginTop: 0,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 24,
        width: '85%',
    },
    successErrorText: {
        color: "green",
    },
    userText: {
        marginTop: 5,
        fontWeight: "bold"
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    optBtn: {
        marginTop: 10,
        width: '100%',
        backgroundColor: COLORS.otpBtn.blue,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    optBtnText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        textAlign: 'center',
    },
    disabledOptBtn: {
        backgroundColor: "#8695b3"
    },
});
