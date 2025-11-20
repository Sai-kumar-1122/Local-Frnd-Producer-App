import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import BackgroundPagesOne from '../components/BackgroundPages/BackgroundPagesOne';
import AnimatedLogo from '../components/SampleLogo/AnimatedLogo';

const UserScreen = () => {
  const [name, setName] = useState('');

  // Allow only letters and spaces
  const handleTextChange = (text) => {
    const filteredText = text.replace(/[^A-Za-z\s]/g, '');
    setName(filteredText);
  };

  const handleConfirm = () => {
    console.log('User Name:', name);
  };

  return (
    <BackgroundPagesOne>
      <View style={styles.mainContainer}>
        {/* Top logo */}
        <View style={styles.logoSpace}>
          <AnimatedLogo />
        </View>

        {/* Center input and button */}
        <View style={styles.centerBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={handleTextChange}
          />

          <TouchableOpacity
            style={[styles.button, !name && styles.disabledButton]}
            onPress={handleConfirm}
            activeOpacity={0.8}
            disabled={!name}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundPagesOne>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 60 : 40,
  },
  logoSpace: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 30 : 20,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C724C7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#C724C7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#C724C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
