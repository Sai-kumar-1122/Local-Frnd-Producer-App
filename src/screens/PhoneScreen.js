import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterRequest, userLoginRequest, authReset } from "../features/Auth/authAction";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundPagesOne from "../components/BackgroundPages/BackgroundPagesOne";
import AnimatedLogo from "../components/SampleLogo/AnimatedLogo";

const PhoneScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { success, message, error } = useSelector((state) => state.auth);

  console.log(success, message,error)
  const [mobile_number, setMobile_number] = useState("");
  const phoneInputRef = useRef(null);

  const handlePhoneChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, "");

    if (numeric.length <= 10) {
      setMobile_number(numeric);
    }
  };

  useEffect(() => {
  dispatch(authReset());   // 🧹 Clear old login/register results
}, []);


useEffect(() => {
  if (success === null) return;

  if (success === true) {
    navigation.navigate("Otp", { mobile_number });
  }

  if (success === false) {
    dispatch(userLoginRequest({ mobile_number }));
    navigation.navigate("Otp", { mobile_number });
  }

}, [success, message]);

  
  const handleNext = () => {
    dispatch(userRegisterRequest({ mobile_number }));
  };


  return (
    <BackgroundPagesOne>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={26} color="#fff" />
              </TouchableOpacity>

              <View style={styles.logoSpace}>
                <AnimatedLogo />
              </View>

              <Text style={styles.title}>Can we get your number?</Text>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => phoneInputRef.current?.focus()}
                style={styles.inputContainer}
              >
                <Text style={styles.label}>Phone Number</Text>

                <TextInput
                  ref={phoneInputRef}
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor="#bbb"
                  keyboardType="number-pad"
                  value={mobile_number}
                  onChangeText={handlePhoneChange}
                  maxLength={10}
                  autoFocus
                />
              </TouchableOpacity>

              <Text style={styles.infoText}>
                We’ll text you a code to verify you're really you.
              </Text>

              <TouchableOpacity
                style={[
                  styles.nextButton,
                  mobile_number.length === 10 ? styles.nextActive : styles.nextDisabled,
                ]}
                disabled={mobile_number.length !== 10}
                onPress={handleNext}
                activeOpacity={mobile_number.length === 10 ? 0.7 : 1}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BackgroundPagesOne>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: {
    width: "92%",
    alignSelf: "center",
    paddingVertical: 20,
    alignItems: "center",
    flexGrow: 1,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 44 : 22,
    left: 2,
    padding: 6,
    zIndex: 10,
  },
  logoSpace: {
    marginTop: Platform.OS === "ios" ? 44 : 30,
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 5,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 7,
    fontWeight: "500",
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#b784ff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 13 : 9,
    color: "#fff",
    fontSize: 17,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  infoText: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 22,
    textAlign: "center",
  },
  nextButton: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  nextDisabled: { backgroundColor: "#444" },
  nextActive: { backgroundColor: "#bb78ee" },
  nextText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default PhoneScreen;
