import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Lq</Text>
          </View>
        </View>

        <Text style={styles.title}>Enter the code we sent you</Text>
        <Text style={styles.subTitle}>
          We’ve sent a 6-digit code to your number.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t get the code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Navigate to Home */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 25, paddingTop: 60 },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  logoContainer: { alignItems: "center", marginTop: 40, marginBottom: 30 },
  logoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#b784ff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "#fff", fontSize: 26, fontWeight: "700" },
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
