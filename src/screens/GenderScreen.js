import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import AnimatedLogo from "../components/SampleLogo/AnimatedLogo";
import BackgroundPagesOne from "../components/BackgroundPages/BackgroundPagesOne";

const { width } = Dimensions.get("window");

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <BackgroundPagesOne>

    <View style={styles.container}>
      {/* Logo */}
      <AnimatedLogo />

      {/* Title */}
      <Text style={styles.title}>Select your gender</Text>

      {/* Gender Cards */}
      <View style={styles.cardRow}>
        {/* MALE */}
        <Pressable onPress={() => setSelectedGender("male")}>
          <View
            style={[
              styles.card,
              selectedGender === "male" && styles.selectedCard,
            ]}
          >
            <Image
              source={require("../assets/boy1.jpg")}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.label}>Male</Text>
        </Pressable>

        {/* FEMALE */}
        <Pressable onPress={() => setSelectedGender("female")}>
          <View
            style={[
              styles.card,
              selectedGender === "female" && styles.selectedCard,
            ]}
          >
            <Image
              source={require("../assets/girl1.jpg")}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.label}>Female</Text>
        </Pressable>
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.button,
          selectedGender ? styles.buttonActive : styles.buttonDisabled,
        ]}
        disabled={!selectedGender}
        onPress={() => navigation.navigate("NextScreen")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
        </BackgroundPagesOne>
  );
};

export default GenderScreen;

/* ================= STYLES ================= */

const CARD_SIZE = width / 2.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  title: {
    color: "#fff",
    fontSize: 31,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 30,
    marginTop:-55,
    marginBottom:50
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: "#fff",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  selectedCard: {
    borderWidth: 3,
    borderColor: "#db0afc",
    transform: [{ scale: 1.05 }],
  },

  avatar: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
  },

  label: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },

  button: {
    marginTop: "auto",
    marginLeft:20,
    paddingVertical: 15,
    borderRadius: 14,
    marginBottom: 60,
    width:"90%",
    height:"7%"
  },

  buttonActive: {
    backgroundColor: "#db0afc",
  },

  buttonDisabled: {
    backgroundColor: "#444",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});
