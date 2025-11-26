import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Pressable
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";

const DobGenderScreen = () => {

  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [showGenderBar, setShowGenderBar] = useState(false);
  const [showDateBar, setShowDateBar] = useState(false);

  const [pickerDate, setPickerDate] = useState(new Date());

  const onChangeNickname = (text) => setNickname(text);

  const selectGender = (value) => {
    setGender(value);
    setShowGenderBar(false);
  };

  const handleDateSelect = (event, selectedDate) => {
    if (!selectedDate) return;

    const d = new Date(selectedDate);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();

    const finalDate = `${dd}/${mm}/${yyyy}`;
    setDob(finalDate);
    setPickerDate(d);

    const currYear = new Date().getFullYear();
    const calcAge = currYear - yyyy;

    setAge(calcAge.toString());
    setShowDateBar(false);
  };

  const handleSubmit = () => {
    if (!nickname.trim()) return alert("Name required");
    if (!gender) return alert("Gender required");
    if (!dob) return alert("Date of Birth required");

    if (!age || parseInt(age) < 18) {
      return alert("Age must be greater than or equal to 18");
    }

    navigation.navigate("LocationScreen", {
      name: nickname,
      gender,
      dob,
      age,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Profile</Text>

      <Text style={styles.inputLabel}>Name</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#9e9e9e"
          value={nickname}
          onChangeText={onChangeNickname}
          style={styles.textInput}
        />
      </View>

      <Text style={styles.inputLabel}>Date of Birth</Text>
      <Pressable onPress={() => setShowDateBar(true)} style={styles.genderContainer}>
        <Text>{dob ? dob : "Select DOB"}</Text>
      </Pressable>

      <Text style={styles.inputLabel}>Age</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Enter your age"
          placeholderTextColor="#9e9e9e"
          value={age}
          keyboardType="numeric"
          onChangeText={setAge}
          style={styles.textInput}
        />
      </View>

      <Text style={styles.inputLabel}>Gender</Text>
      <Pressable onPress={() => setShowGenderBar(true)} style={styles.genderContainer}>
        <Text>{gender ? gender : "Select Gender"}</Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Next</Text>
      </Pressable>

      {showGenderBar && (
        <View style={styles.bottomGenderBar}>
          <Pressable onPress={() => selectGender("Male")}><Text style={styles.popupItem}>Male</Text></Pressable>
          <Pressable onPress={() => selectGender("Female")}><Text style={styles.popupItem}>Female</Text></Pressable>
        </View>
      )}

      {showDateBar && (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="spinner"
          maximumDate={new Date()}
          onChange={handleDateSelect}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  inputLabel: { marginTop: 15, fontWeight: "600" },
  inputBox: {
    borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 6, marginTop: 5,
  },
  textInput: { fontSize: 16, color: "#000" },
  genderContainer: {
    borderWidth: 1, borderRadius: 10,
    padding: 12, marginTop: 10,
  },
  submitButton: {
    marginTop: 40, backgroundColor: "#ff1983",
    padding: 15, borderRadius: 20
  },
  submitButtonText: { color: "#fff", textAlign: "center", fontSize: 18 },
  bottomGenderBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff", padding: 20,
    borderTopWidth: 1, borderColor: "#ccc"
  },
  popupItem: { fontSize: 18, paddingVertical: 10 }
});

export default DobGenderScreen;
