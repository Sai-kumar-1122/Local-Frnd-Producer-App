import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  AppState,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { userpostphotorequest } from "../features/photo/photoAction";

const { width } = Dimensions.get("window");

/* ================= SAFE ALERT ================= */
const safeAlert = (title, message) => {
  if (AppState.currentState === "active") {
    Alert.alert(title, message);
  }
};

const UplodePhotoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);      // preview
  const [photoFile, setPhotoFile] = useState(null); // file object

  /* ================= CAMERA PERMISSION ================= */
  const requestCameraPermission = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera access",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /* ================= OPEN CAMERA ================= */
  const openCamera = async () => {
    const permitted = await requestCameraPermission();
    if (!permitted) {
      safeAlert("Permission", "Camera permission denied");
      return;
    }

    launchCamera(
      {
        mediaType: "photo",
        quality: 0.8,
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel || response.errorCode) return;

        const asset = response.assets?.[0];
        if (!asset) return;

        setPhoto(asset.uri);
        setPhotoFile({
          uri: asset.uri,
          type: asset.type || "image/jpeg",
          name: `photo_${Date.now()}.jpg`,
        });
      }
    );
  };

  /* ================= OPEN GALLERY ================= */
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel || response.errorCode) return;

        const asset = response.assets?.[0];
        if (!asset) return;

        setPhoto(asset.uri);
        setPhotoFile({
          uri: asset.uri,
          type: asset.type || "image/jpeg",
          name: `photo_${Date.now()}.jpg`,
        });
      }
    );
  };

  /* ================= SHOW ACTION SHEET ================= */
  const openSelectOption = () => {
    if (Platform.OS === "ios") {
      // iOS ActionSheet
      Alert.alert(
        "Upload Photo",
        "Choose option",
        [
          { text: "Camera", onPress: openCamera },
          { text: "Gallery", onPress: openGallery },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } else {
      // Android Bottom Sheet Style
      Alert.alert(
        "Upload Photo",
        "",
        [
          { text: "Camera", onPress: openCamera },
          { text: "Gallery", onPress: openGallery },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    }
  };

  /* ================= UPLOAD PHOTO ================= */
  const handlesendphoto = () => {
    if (!photoFile) {
      safeAlert("Error", "Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photoFile);
    formData.append("is_primary", true);
    formData.append("status", "active");

    dispatch(
      userpostphotorequest(formData, () => {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }, 300);
      })
    );
  };

  /* ================= UI ================= */
  return (
    <LinearGradient colors={["#4a0f4a", "#2f0738"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Profile Setup (2/2)</Text>

        <TouchableOpacity style={styles.photoCircle} onPress={openSelectOption}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoPreview} />
          ) : (
            <Text style={styles.bigCameraIcon}>📷</Text>
          )}

          <TouchableOpacity style={styles.smallCameraBtn} onPress={openSelectOption}>
            <Text style={styles.smallCameraIcon}>📷</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.smileText}>Show us your smile!</Text>
        <Text style={styles.coinText}>
          Upload now and instantly get{" "}
          <Text style={styles.boldCoin}>50 Coins! 💰</Text>
        </Text>

        <TouchableOpacity style={styles.uploadBtn} onPress={handlesendphoto}>
          <Text style={styles.uploadBtnText}>Upload Photo (+50 Coins)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default UplodePhotoScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 40, alignItems: "center" },

  backBtn: { position: "absolute", left: 20, top: 45 },
  backArrow: { fontSize: 28, color: "#fff" },

  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
    fontWeight: "600",
  },

  photoCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#eee",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  bigCameraIcon: { fontSize: 50, opacity: 0.4 },

  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 90,
  },

  smallCameraBtn: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "#fff",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  smallCameraIcon: { fontSize: 22 },

  smileText: {
    fontSize: 22,
    color: "#fff",
    marginTop: 35,
    fontWeight: "600",
  },

  coinText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },

  boldCoin: { fontWeight: "bold" },

  uploadBtn: {
    backgroundColor: "#fff",
    width: width * 0.8,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
    elevation: 4,
  },

  uploadBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  skipText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 16,
    marginBottom: 20,
  },
});
