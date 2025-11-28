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
  Alert,
} from "react-native";
import { PermissionsAndroid } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { userpostphotorequest } from "../features/photo/photoAction";

const { width } = Dimensions.get("window");

const UplodePhotoScreen = () => {
  const dispatch=useDispatch()
  const [photo, setPhoto] = useState(null);
  
const navigation = useNavigation();
const requestCameraPermission=async()=>{
  try {
    
    const granted=await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title:"Camera Permission",
        message:"App needs access to your camera",
        buttonNeutral:"Ask me Later",
        buttonNegative:"cancel",
        buttonPositive:"Ok",

      }
    );
    return granted=== PermissionsAndroid.RESULTS.GRANTED
  } catch (error) {
    console.warn(err);
    return false;
    
  }
}

  // 📸 Open Camera
  const openCamera =async () => {
    const Permission=await requestCameraPermission()
    if (!Permission){
      return Alert("Camera permission denied")
    }
    launchCamera(
  {
    mediaType: "photo",
    cameraType: "back",
    quality: 1,
  },
  (response) => {
    if (response.didCancel || response.errorCode) return;

    if (response.assets?.length > 0) {
      setPhoto(response.assets[0].uri); // ⭐ Needed for FormData upload
    }
  }
);


  };

  // 🖼 Open Gallery
  const openGallery = () => {
    launchImageLibrary(
      { mediaType: "photo",
        includeBase64: true,
    quality: 0.7,
       },
      (response) => {
        if (response.didCancel) return;
        if (response.errorMessage) return;

if (response.assets?.length > 0) {
      const base64 = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
      setPhoto(base64);
    }      }
    );
  };
 
const handlesendphoto = () => {
  if (!photo) {
    Alert.alert("Please select an image first");
    return;
  }

  const formData = new FormData();

  // Upload actual file for multer
  formData.append("photo", {
    uri: photo,
    type: "image/jpeg",
    name: `photo_${Date.now()}.jpg`,
  });

  // Additional metadata fields
  formData.append("photo_url", photo);     // backend can ignore or use
  formData.append("is_primary", true);     // or false
  formData.append("status", "active");

  dispatch(userpostphotorequest(formData));
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
  <TouchableOpacity onPress={handlesendphoto}><Text style={styles.nextText} >NEXT →</Text></TouchableOpacity>
  
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
