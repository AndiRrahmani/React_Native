import React from "react";
import { View, StyleSheet, Text, Image } from "react-native-web";

const StudentDetail = ({ image, name }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5, // Android + Web shadow
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    objectFit: "cover",
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default StudentDetail;
