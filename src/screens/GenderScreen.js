import React, { useState } from "react";
import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const GenderScreen = ({ navigation }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Mixed Avatars
  const avatars = [
    { id: 1, img: require("../assets/boy1.jpg") },
    { id: 2, img: require("../assets/girl1.jpg") },
    { id: 3, img: require("../assets/boy2.jpg") },
    { id: 4, img: require("../assets/girl2.jpg") },
    { id: 5, img: require("../assets/boy3.jpg") },
    { id: 6, img: require("../assets/girl3.jpg") },
    { id: 7, img: require("../assets/boy4.jpg") },
    { id: 8, img: require("../assets/girl4.jpg") },
    { id: 9, img: require("../assets/boy5.jpg") },
    { id: 10, img: require("../assets/girl5.jpg") },
    { id: 1, img: require("../assets/boy1.jpg") },
    { id: 2, img: require("../assets/girl1.jpg") },
    { id: 3, img: require("../assets/boy2.jpg") },
    { id: 4, img: require("../assets/girl2.jpg") },
     { id: 7, img: require("../assets/boy4.jpg") },
    { id: 8, img: require("../assets/girl4.jpg") },
     { id: 9, img: require("../assets/boy5.jpg") },
    { id: 10, img: require("../assets/girl5.jpg") },
    // Avoid duplicate ids if possible
  ];

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Choose Your Avatar</Text>

      {/* Avatar Grid */}
      <FlatList
        data={avatars}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedAvatar(item.id)}>
            <View
              style={[
                styles.avatarBox,
                selectedAvatar === item.id && styles.avatarSelected,
              ]}
            >
              <Image source={item.img} style={styles.avatarImage} />
            </View>
          </Pressable>
        )}
      />

      {/* Continue Button */}
      <Pressable
        style={[
          styles.button,
          !selectedAvatar && { opacity: 0.4 },
        ]}
        disabled={!selectedAvatar}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

    </View>
  );
};

export default GenderScreen;

const ITEM_SIZE = width / 3.8; // Responsive size

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 15,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
  },

  row: {
    justifyContent: "space-between",
  },

  avatarBox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: "#111",
    borderRadius: 16,
    marginBottom: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarSelected: {
    borderWidth: 3,
    borderColor: "#b56fff",
    transform: [{ scale: 1.05 }],
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  button: {
    backgroundColor: "#db0afc",
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 25,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
