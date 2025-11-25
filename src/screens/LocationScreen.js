import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Pressable,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { userEditRequest } from "../features/user/userAction";

const LocationScreen = () => {
  // ------------------ HOOKS MUST BE ON TOP ------------------
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { success, error, loading } = useSelector((state) => state.user);

  const { name, gender, date_of_birth, age } = route.params;

  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState(null);

  // ------------------ PERMISSION FUNCTION ------------------
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Allow this app to access your location?",
          buttonPositive: "Allow",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
        getCurrentLocation();
      } else {
        setPermission(false);
      }
    } catch (err) {
      console.log("Permission Error:", err);
    }
  };

  // ------------------ GET LOCATION ------------------
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => {
        console.log("Location Error:", error);
        setLocation(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );
  };

  // ------------------ RUN ON SCREEN OPEN ------------------
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // ------------------ BACKEND RESPONSE HANDLING ------------------
  useEffect(() => {
    if (success === false && error) {
      alert(error.message || "Something went wrong");
    }

    if (success === true) {
      alert("Profile updated successfully!");
      navigation.navigate("Home");
    }
  }, [success, error]);

  // ------------------ SUBMIT ------------------
  const handleSubmit = () => {
    if (!location) return alert("Location not detected.");

    const finalUserData = {
      name,
      gender,
      date_of_birth,
      age,
      location_lat: location.latitude,
      location_log: location.longitude,
    };

    dispatch(userEditRequest(finalUserData));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Access</Text>

      {/* ---------- Permission Denied ---------- */}
      {permission === false && (
        <>
          <Text style={styles.errorText}>Permission Denied</Text>
          <Button title="Retry Permission" onPress={requestLocationPermission} />
        </>
      )}

      {/* ---------- Coordinates Found ---------- */}
      {permission === true && location && (
        <View style={styles.box}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}

      {/* ---------- Try Again ---------- */}
      {permission === true && !location && (
        <>
          <Text style={styles.errorText}>Location not found</Text>
          <Button title="Try Again" onPress={getCurrentLocation} />
        </>
      )}

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>
          {loading ? "Submitting..." : "Submit"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
  box: {
    backgroundColor: "#ededed",
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: "#ff1983",
    padding: 15,
    borderRadius: 20,
    marginTop: 30,
  },
  submitText: { color: "#fff", fontSize: 18, textAlign: "center" },
});

export default LocationScreen;
