import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const UplodePhotoScreen = () => {
  const [photo, setPhoto] = useState(null);
const navigation = useNavigation();

  // 📸 Open Camera
  const openCamera = () => {
    launchCamera(
      {
        mediaType: "photo",
        cameraType: "back",
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorMessage) return;

        setPhoto(response.assets[0].uri);
      }
    );
  };

  // 🖼 Open Gallery
  const openGallery = () => {
    launchImageLibrary(
      { mediaType: "photo" },
      (response) => {
        if (response.didCancel) return;
        if (response.errorMessage) return;

        setPhoto(response.assets[0].uri);
      }
    );
  };

  return (
    <LinearGradient
      colors={["#4a0f4aff", "#2f0738ff"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>UPLOAD PHOTO</Text>
        </View>

        {/* STEP INDICATOR */}
        <View style={styles.stepContainer}>
          <View style={styles.activeStep}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.inactiveStep}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            placeholder="Enter image URL"
            placeholderTextColor="#999"
            style={styles.input}
          />

          {/* CAMERA IMAGE BOX */}
          <TouchableOpacity style={styles.photoBox} onPress={openCamera}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.previewImage} />
            ) : (
              <Text style={styles.cameraIcon}>📷</Text>
            )}
          </TouchableOpacity>

          {/* OPEN GALLERY */}
          <TouchableOpacity onPress={openGallery}>
            <Text style={styles.galleryText}>OPEN GALLERY</Text>
          </TouchableOpacity>
        </View>

        {/* NEXT BUTTON */}
        <TouchableOpacity
  style={styles.nextButton}
  onPress={() => navigation.navigate("Home")}
>
  <Text style={styles.nextText}>NEXT →</Text>
</TouchableOpacity>


      </ScrollView>
    </LinearGradient>
  );
};

export default UplodePhotoScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingVertical: 25,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },

  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },

  activeStep: {
    backgroundColor: "#ffffff",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 4,
  },

  inactiveStep: {
    backgroundColor: "#a9a9a9",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    opacity: 0.5,
  },

  stepNumber: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },

  card: {
    width: width * 0.9,
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 20,
    borderRadius: 14,
    marginTop: 10,
    elevation: 6,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#b8b8b8",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },

  photoBox: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fafafa",
  },

  cameraIcon: {
    fontSize: 40,
    opacity: 0.6,
    fontWeight: "bold",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  galleryText: {
    textAlign: "center",
    marginTop: 18,
    fontWeight: "bold",
    color: "#007bff",
    fontSize: 17,
  },

  nextButton: {
    backgroundColor: "#fff",
    width: width * 0.9,
    alignSelf: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
    elevation: 5,
  },

  nextText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
