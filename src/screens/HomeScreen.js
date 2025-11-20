import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const activePals = [
  { id: 1, name: "Aadhya", img: require("../assets/girl1.jpg") },
  { id: 2, name: "Yuvaan", img: require("../assets/boy1.jpg") },
  { id: 3, name: "Luna", img: require("../assets/girl2.jpg") },
  { id: 4, name: "Hannah", img: require("../assets/girl3.jpg") },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#0A001A" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>Local Friend</Text>
            <Text style={styles.subText}>Start with charm, stay for connection!</Text>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Icon name="bell-outline" size={26} color="#fff" />
            </TouchableOpacity>

            <View style={styles.coinBox}>
              <Icon name="currency-eth" size={20} color="#FFD700" />
              <Text style={styles.coinText}>100</Text>
            </View>

            <Image
              source={require("../assets/boy4.jpg")}
              style={styles.profilePic}
            />
          </View>
        </View>

        {/* Offer Card */}
        <View style={styles.offerCard}>
          <Text style={styles.offerTag}>Special offer for 1 day</Text>

          <Text style={styles.offerTitle}>
            Buy 100 coins, get 20 extra absolutely free!
          </Text>

          <TouchableOpacity style={styles.claimBtn}>
            <Text style={styles.claimText}>Claim Now</Text>
          </TouchableOpacity>
        </View>

        {/* Active Pals */}
        <Text style={styles.sectionTitle}>Active Pals</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {activePals.map((user) => (
            <View key={user.id} style={styles.palCard}>
              <Image source={user.img} style={styles.avatar} />
              <Text style={styles.palName}>{user.name}</Text>

              <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="phone" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="video" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="message-text" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Start Connecting */}
        <Text style={styles.sectionTitle}>Start connecting</Text>

        <View style={styles.connectRow}>
          <TouchableOpacity style={styles.connectBox}>
            <Icon name="dice-5" size={30} color="#fff" />
            <Text style={styles.connectText}>Random Calls</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.connectBox}>
            <Icon name="map-marker" size={30} color="#fff" />
            <Text style={styles.connectText}>Local Calls</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.connectBoxActive}>
            <Icon name="account-multiple" size={30} color="#fff" />
            <Text style={styles.connectText}>Followed Calls</Text>
          </TouchableOpacity>
        </View>

        {/* EXPERT SECTION */}
        <TouchableOpacity style={styles.expertCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="account-group" size={26} color="#fff" />
            <Text style={styles.expertText}> Experts</Text>
          </View>
          <Icon name="chevron-right" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={{ height: 130 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="message-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Center CALL Button */}
        <TouchableOpacity style={styles.centerBtn}>
          <Icon name="phone" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Time Icon */}
        <TouchableOpacity style={styles.navItem}>
          <Icon name="clock-time-eight-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Navigate to Profile */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Icon name="account-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default HomeScreen;

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 50 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  appTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
  subText: {
    color: "#c7b7ff",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "600",
  },

  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  coinBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#32004E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  coinText: {
    color: "#FFD700",
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },

  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff00ff",
  },

  /* OFFER CARD */
  offerCard: {
    marginTop: 25,
    backgroundColor: "#1a0033",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#5b009e",
  },
  offerTag: {
    color: "#ff47ff",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 8,
  },
  offerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },
  claimBtn: {
    backgroundColor: "#ff00ff",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  claimText: { color: "#fff", fontWeight: "800", fontSize: 15 },

  /* ACTIVE PALS */
  sectionTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 12,
  },

  palCard: {
    width: 120,
    backgroundColor: "#1a0033",
    borderRadius: 18,
    padding: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#5b009e",
  },

  avatar: { width: "100%", height: 95, borderRadius: 15 },

  palName: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 8,
    fontSize: 14,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  iconBtn: {
    backgroundColor: "#32004E",
    padding: 7,
    borderRadius: 10,
  },

  /* CONNECT ROW */
  connectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  connectBox: {
    width: "30%",
    backgroundColor: "#1a0033",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5b009e",
  },

  connectBoxActive: {
    width: "30%",
    backgroundColor: "#5b009e",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
  },

  connectText: {
    color: "#fff",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
  },

  expertCard: {
    marginTop: 25,
    backgroundColor: "#1a0033",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#5b009e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  expertText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

  /* BOTTOM NAV */
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    backgroundColor: "#120020",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
  },

  navItem: { padding: 10 },

  centerBtn: {
    width: 70,
    height: 70,
    backgroundColor: "#ff00ff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 10,
  },
});
