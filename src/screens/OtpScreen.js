import React, { useEffect, useRef, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Platform, Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AnimatedLogo from "../components/SampleLogo/AnimatedLogo";
import BackgroundPagesOne from "../components/BackgroundPages/BackgroundPagesOne";
import { userLoginRequest, userOtpRequest } from "../features/Auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP_LENGTH = 6;

const OtpScreen = ({ route, navigation }) => {
  const { success } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.auth);
  const Otp = useSelector((state) => state.auth.Otp);

  console.log(success) 
  console.log(mode) 
  console.log(Otp) 
  const { mobile_number } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (success === false) {
      dispatch(userLoginRequest({ mobile_number }));
    }
  }, [success, mobile_number, dispatch]);

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([...Array(OTP_LENGTH)].map(() => React.createRef()));

  const handleChange = (text, idx) => {
    if (text.length > 1) text = text.slice(-1);

    const newOtp = [...otp];
    newOtp[idx] = text;
    setOtp(newOtp);

    if (text && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1].current.focus();
    }
  };

  const handleKeyPress = (e, idx) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[idx] && idx > 0) {
        const newOtp = [...otp];
        newOtp[idx - 1] = "";
        setOtp(newOtp);
        inputRefs.current[idx - 1].current.focus();
      } else {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleotp = () => {
    const otpString = otp.join("");
    dispatch(userOtpRequest({ mobile_number, otp: otpString }));
  };

  // 👉 CHECK OTP RESPONSE (SUCCESS OR FAILURE)
  useEffect(() => {
    if (!Otp) return;

    // ❌ Wrong OTP → Show alert
    if (Otp.success === false) {
      Alert.alert("Invalid OTP", Otp.message || "Please try again.");
      return;
    }

    // ✅ Correct OTP → save & navigate
    const saveTokenAndNavigate = async () => {
      if (Otp.success === true && Otp.token) {
        try {
          await AsyncStorage.setItem("twittoke", String(Otp.token));
          await AsyncStorage.setItem("user_id", `${Otp.user.user_id}`);


          if (mode === "login") {
            navigation.navigate("Home");
          } else {
            navigation.navigate("DateofBirth");
          }
        } catch (err) {
          console.log("Error saving token:", err);
        }
      }
    };

    saveTokenAndNavigate();
  }, [Otp, mode, navigation]);


  return (
    <BackgroundPagesOne>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoSpace}>
          <AnimatedLogo />
        </View>

        <Text style={styles.title}>Enter the code we sent you</Text>
        <Text style={styles.subTitle}>
          We’ve sent a 6-digit code to your number.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={inputRefs.current[idx]}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t get the code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleotp}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </BackgroundPagesOne>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  inner: { flex: 1, paddingHorizontal: 25, paddingTop: 60 },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  logoSpace: {
    marginTop: Platform.OS === "ios" ? 44 : 30,
    marginBottom: 16,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: { color: "#aaa", fontSize: 14, textAlign: "center", marginBottom: 40 },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 25,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#b784ff",
    borderRadius: 10,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
  },
  resendContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  resendText: { color: "#aaa", fontSize: 14 },
  resendLink: { color: "#b784ff", fontSize: 14, textDecorationLine: "underline" },
  nextButton: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: "#b784ff",
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
