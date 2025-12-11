import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AnimatedCircle = ({ delay }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1.3,
              duration: 2500,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 2500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

const LandingScreen = ({ navigation }) => {
 
   useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("twittoke");
      const user_id = await AsyncStorage.getItem("user_id");

      console.log("Token:", token);
      console.log("User ID:", user_id);

      // ✅ If no token → go to Login
      if (!token || !user_id) {
        navigation.replace("Login");
        return;
      }

      if (token && user_id) navigation.replace("Home");

    };

    // wait 3 seconds for animation
    const timer = setTimeout(checkLogin, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <LinearGradient colors={["#C724C7", "#C724C7"]} style={styles.gradient}>
        <View style={styles.center}>
          <AnimatedCircle delay={0} />
          <AnimatedCircle delay={800} />
          <AnimatedCircle delay={1600} />

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>L🤝F</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  logoContainer: {
    backgroundColor: "#fff",
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
  },
});
