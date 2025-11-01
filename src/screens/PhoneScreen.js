import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PhoneScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (text) => {
    // Allow only numbers, max 10 digits
    const numeric = text.replace(/[^0-9]/g, "");
    if (numeric.length <= 10) setPhone(numeric);
  };

  return (
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
            {/* 🔙 Back button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={26} color="#fff" />
            </TouchableOpacity>

            {/* 🪩 Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/100x100.png?text=Logo",
                }}
                style={styles.logo}
              />
            </View>

            <Text style={styles.title}>Can we get your number?</Text>

            {/* 📱 Phone input field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={10}
                returnKeyType="done"
              />
            </View>

            <Text style={styles.infoText}>
              We’ll text you a code to verify you’re really you.
            </Text>
            <Text style={styles.linkText}>
              What happens if your number changes?
            </Text>

            {/* ✅ Next button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                phone.length === 10 ? styles.nextActive : styles.nextDisabled,
              ]}
              disabled={phone.length !== 10}
              onPress={() => navigation.navigate("Otp", { phone })}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#b784ff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  infoText: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 15,
  },
  linkText: {
    color: "#b784ff",
    fontSize: 13,
    marginTop: 5,
    textDecorationLine: "underline",
  },
  nextButton: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 14,
  },
  nextDisabled: {
    backgroundColor: "#444",
  },
  nextActive: {
    backgroundColor: "#b784ff",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
