import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

const AudiocallScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#5e007a", "#0d0017"]}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.userName}>Kian</Text>
          <Text style={styles.duration}>5:45 Mins</Text>
        </View>

        <TouchableOpacity style={styles.inviteBtn}>
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
      </View>

      {/* AVATARS */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarBox}>
          <Image
            source={require("../assets/boy1.jpg")}
            style={styles.avatarImg}
          />
        </View>

        <View style={styles.avatarBox2}>
          <Image
            source={require("../assets/girl1.jpg")}
            style={styles.avatarImg}
          />
        </View>
      </View>

      {/* CALL ACTION BUTTONS */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallBtn}>
          <Feather name="volume-2" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallBtn}>
          <Ionicons name="call" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallBtn}>
          <Feather name="mic-off" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AudiocallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // HEADER
  header: {
    marginTop: 50,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  duration: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 2,
  },

  inviteBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  inviteText: {
    color: "#fff",
    fontSize: 14,
  },

  // AVATAR CONTAINER
  avatarContainer: {
    marginTop: 90,
    width: "100%",
    alignItems: "center",
    position: "relative",
    height: 350,
  },

  avatarBox: {
    width: 160,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  avatarBox2: {
    width: 160,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,

    position: "absolute",
    top: 130,
    right: width * 0.18,
  },

  avatarImg: {
    width: "95%",
    height: "95%",
    borderRadius: 20,
  },

  // BOTTOM BUTTONS
  bottomButtons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  smallBtn: {
    width: 65,
    height: 65,
    backgroundColor: "#7d2ecf",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  endCallBtn: {
    width: 75,
    height: 75,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
