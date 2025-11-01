import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => (
  <View style={styles.outer}>
    <LinearGradient
      colors={['#000000', '#110019', '#240438', '#610575']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBg}
    >

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner}>
            <Text style={styles.logoText}>LσH</Text>
          </View>
        </View>
      </View>

      {/* Upward moved content */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>
          By tapping <Text style={{ fontWeight: 'bold' }}>Log In</Text> , you agree to our
        </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Terms & Privacy Policy</Text>
        </TouchableOpacity>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.iconText}>
              <Icon name="phone" size={24} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Log in with Phone number</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.troubleLink}>Trouble Logging In?</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradientBg: {
    flex: 1,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    zIndex: 2,
  },
  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#A723F2',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#250d35ff",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.7,
        shadowRadius: 18,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  logoInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A723F2',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  // This moves all items up well above center
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 260, // Try 240~300 for different phones
    paddingHorizontal: 22,
    width: '100%',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 2,
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 22,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 28,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.91)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#A723F2',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 8,
    width: width - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  troubleLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default LoginScreen;
