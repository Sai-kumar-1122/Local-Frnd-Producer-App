import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const LocationScreen = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handlePermission = (type) => {
    console.log("User selected:", type);
    setShowPopup(false);

    // ⭐ Navigate to GenderScreen
    navigation.navigate("GenderScreen");
  };

  return (
    <View style={styles.container}>
      {/* -------- BACKGROUND IMAGE -------- */}
      <Image
        source={require("../assets/mapimage.jpg")} 
        style={styles.bgImage}
      />

      {/* -------- LANGUAGE CONTENT -------- */}
      <View style={styles.languageBox}>
        <Text style={styles.heading}>Select your language</Text>
        <Text style={styles.subheading}>
          Show your language proudly, get better matches
        </Text>

        <View style={styles.langRow}>
          <Text style={styles.langItem}>Hindi</Text>
          <Text style={styles.langItem}>Telugu</Text>
          <Text style={styles.langItem}>Bengali</Text>
        </View>
      </View>

      {/* -------- LOCATION POPUP -------- */}
      {showPopup && (
        <View style={styles.popupContainer}>
          <View style={styles.sheet}>
            <Text style={styles.icon}>📍</Text>

            <Text style={styles.title}>
              Allow <Text style={{ fontWeight: "bold" }}>FRND</Text> to access
              this device’s location?
            </Text>

            {/* MAP OPTIONS */}
            <View style={styles.row}>
              {/* Precise */}
              <View style={styles.option}>
                <Image
                  source={require("../assets/map.jpg")}
                  style={styles.mapImage}
                />
                <Text style={styles.optionText}>Precise</Text>
              </View>

              {/* Approximate */}
              <View style={styles.option}>
                <Image
                  source={require("../assets/map2.png")}
                  style={styles.mapImage}
                />
                <Text style={styles.optionText}>Approximate</Text>
              </View>
            </View>

            {/* BUTTONS */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handlePermission("while-app")}
            >
              <Text style={styles.btnText}>While using the app</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => handlePermission("only-once")}
            >
              <Text style={styles.btnText}>Only this time</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePermission("deny")}>
              <Text style={styles.denyText}>Don't allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Background image */
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
    opacity: 0.3,
  },

  /* Language Section */
  languageBox: {
    paddingTop: 80,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A2F00",
  },
  subheading: {
    fontSize: 14,
    color: "#4A2F00",
    marginBottom: 20,
  },
  langRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  langItem: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
  },

  /* Popup */
  popupContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: "center",
  },
  icon: { fontSize: 35, marginBottom: 10 },
  title: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 25,
  },
  option: { alignItems: "center" },
  optionText: { marginTop: 8, fontSize: 15, color: "#333" },
  mapImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    resizeMode: "cover",
  },
  btn: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    fontSize: 17,
    color: "#007AFF",
    fontWeight: "500",
  },
  denyText: {
    fontSize: 17,
    color: "red",
    marginTop: 10,
  },
});
