import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";

const DobGenderScreen = () => {

  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false);

  const [dob, setDob] = useState('');
  const [showGenderBar, setShowGenderBar] = useState(false);
  const [showDateBar, setShowDateBar] = useState(false);
  const [gender, setGender] = useState('');

  const [pickerDate, setPickerDate] = useState(new Date());

  const onChangeNickname = (text) => {
    setNickname(text);
    setNicknameValid(text.trim().length > 0);
  };

  const selectGender = (value) => {
    setGender(value);
    setShowGenderBar(false);
  };

  const parseDobStringToDate = (dobString) => {
    if (!dobString) return new Date();
    const parts = dobString.split('/');
    if (parts.length !== 3) return new Date();
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const handleDateSelect = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type !== 'dismissed' && selectedDate) {
        const dateObj = new Date(selectedDate);
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const yyyy = dateObj.getFullYear();
        setDob(`${dd}/${mm}/${yyyy}`);
        setPickerDate(dateObj);
      }
      setShowDateBar(false);
      return;
    }

    // iOS live update
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const yyyy = dateObj.getFullYear();
      setDob(`${dd}/${mm}/${yyyy}`);
      setPickerDate(dateObj);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Profile</Text>

      {/* Nickname Input */}
      <Text style={styles.inputLabel}>Nick-name</Text>
      <View style={[styles.inputBox, nicknameValid && styles.inputBoxValid]}>
        <TextInput
          style={styles.textInput}
          value={nickname}
          placeholder="Enter nickname"
          placeholderTextColor="#bbb"
          onChangeText={onChangeNickname}
        />
        {nicknameValid && <Text style={styles.checkMark}>✔️</Text>}
      </View>

      {nicknameValid && <Text style={styles.validText}>Perfect!</Text>}

      {/* Gender Selector */}
      <View style={styles.genderContainer}>
        <Text style={{ color: '#d8c5c5ff', fontWeight: '500', marginRight: 10 }}>
          Who are you?
        </Text>
        <Pressable style={styles.genderChip} onPress={() => setShowGenderBar(true)}>
          <Text style={styles.genderChipText}>{gender ? `✓ ${gender}` : 'Select Gender'}</Text>
          <Text style={styles.editText}> Edit</Text>
        </Pressable>
      </View>

      {/* DOB Selector */}
      <View style={styles.genderContainer}>
        <Text style={{ color: '#d8c5c5ff', fontWeight: '500', marginRight: 10 }}>
          Date of Birth
        </Text>
        <Pressable
          style={styles.genderChip}
          onPress={() => {
            setPickerDate(parseDobStringToDate(dob));
            setShowDateBar(true);
          }}
        >
          <Text style={styles.genderChipText}>{dob ? dob : 'Select Date'}</Text>
          <Text style={styles.editText}> Edit</Text>
        </Pressable>
      </View>

      {/* Referral */}
      <Pressable>
        <Text style={styles.referralText}>I have referral code</Text>
      </Pressable>

      {/* Submit */}
      <Pressable
        style={styles.submitButton}
        onPress={() => navigation.navigate("LocationScreen")}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>

      {/* Gender Sheet */}
      {showGenderBar && (
        <View style={styles.bottomGenderBar}>
          <Text style={styles.sheetTitle}>Select your true gender</Text>
          <Text style={styles.warning}>
            Wrong Gender = Life Ban <Text style={styles.noEntry}>🚫</Text>
          </Text>
          <View style={styles.avatarRow}>
            <Pressable style={styles.genderBoxGirl} onPress={() => selectGender('Girl')}>
              <Text style={styles.genderIconGirl}>♀️</Text>
              <Text style={styles.genderLabelGirl}>I am Girl</Text>
            </Pressable>
            <Pressable style={styles.genderBoxBoy} onPress={() => selectGender('Boy')}>
              <Text style={styles.genderIconBoy}>♂️</Text>
              <Text style={styles.genderLabelBoy}>I am Boy</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => setShowGenderBar(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* Date Picker */}
      {showDateBar && (
        Platform.OS === 'android' ? (
          <DateTimePicker
            value={pickerDate}
            mode="date"
            display="calendar"
            maximumDate={new Date()}
            onChange={handleDateSelect}
          />
        ) : (
          <Modal transparent animationType="fade">
            <View style={styles.modalWrap}>
              <View style={styles.modalBox}>
                <DateTimePicker
                  value={pickerDate}
                  mode="date"
                  display="spinner"
                  maximumDate={new Date()}
                  onChange={handleDateSelect}
                />

                <Pressable
                  onPress={() => setShowDateBar(false)}
                  style={styles.iosDoneBtn}
                >
                  <Text style={styles.iosDoneText}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )
      )}
    </View>
  );
};

/* 🔥 Your existing styles (unchanged) */
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 36, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 20 },
  inputLabel: { color: '#aaa', fontWeight: '600', marginBottom: 6, marginTop: 18, fontSize: 15 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 5,
  },
  inputBoxValid: { borderColor: '#0cb86e' },
  textInput: { flex: 1, color: '#111', fontSize: 16, height: 32 },
  checkMark: { fontSize: 19, color: '#0cb86e', marginLeft: 6 },
  validText: { color: '#0cb86e', fontSize: 14, marginLeft: 3, marginBottom: 15 },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 15,
    marginVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    justifyContent: 'space-between',
  },
  genderChip: { flexDirection: 'row', alignItems: 'center' },
  genderChipText: { fontSize: 16, color: '#1da1f2', fontWeight: 'bold' },
  editText: { color: '#e66990', fontSize: 16, fontWeight: '500', marginLeft: 8 },
  referralText: { color: '#e66990', fontSize: 15, fontWeight: '500', marginTop: 18, marginBottom: 20, alignSelf: 'flex-start' },
  submitButton: {
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: '#ff1983',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 19, letterSpacing: 1 },
  bottomGenderBar: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 13,
    elevation: 12,
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 24,
    paddingHorizontal: 18,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheetTitle: { fontSize: 19, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#222' },
  warning: { fontSize: 13, color: '#a22', marginBottom: 22, textAlign: 'center', fontWeight: '600' },
  noEntry: { fontSize: 17 },
  avatarRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 2 },
  genderBoxGirl: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#ffe6ee',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 14,
  },
  genderIconGirl: { fontSize: 42, color: '#ff4468', marginBottom: 7 },
  genderLabelGirl: { color: '#ff4468', fontSize: 16, fontWeight: 'bold' },
  genderBoxBoy: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#e0f3ff',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 14,
  },
  genderIconBoy: { fontSize: 42, color: '#2aa7ff', marginBottom: 7 },
  genderLabelBoy: { color: '#2aa7ff', fontSize: 16, fontWeight: 'bold' },
  cancelText: { textAlign: 'center', color: 'red', fontSize: 16, fontWeight: '500', marginTop: 20 },

  /* Date Picker Modal Styles */
  modalWrap: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalBox: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16
  },
  iosDoneBtn: {
    backgroundColor: "#ff1983",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },
  iosDoneText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default DobGenderScreen;
