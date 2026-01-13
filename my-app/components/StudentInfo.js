import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const StudentInfo = ({ fullname, position, description, profileImage }) => {
  return (
    <View style={styles.container}>
      <Image
        source={profileImage}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.name}>{fullname}</Text>
        <Text style={styles.position}>{position}</Text>
        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.9}>
          <Text style={styles.buttonText}>HIRE HIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#e6f0f6",
  },
  card: {
    width: "88%",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: -40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  position: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#ffd400",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "700",
    color: "#222",
  },
});

export default StudentInfo;
