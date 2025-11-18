import React from "react";
import { Text, StyleSheet, View } from "react-native";

const InfoItem = ({ label, value }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ChallengeScreen = () => {
  const student = {
    name: "Andi",
    surname: "Rrahmani",
    birthDate: "28/05/2009",
    age: 17,
    grade: "11th Grade",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student's Personal Info</Text>

      <View style={styles.card}>
        <InfoItem label="Full Name" value={`${student.name} ${student.surname}`} />
        <InfoItem label="Surname" value={student.surname} />
        <InfoItem label="Birthday" value={student.birthDate} />
        <InfoItem label="Age" value={student.age} />
        <InfoItem label="Grade" value={student.grade} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2C3E50",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  item: {
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#7D8A97",
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    color: "#2C3E50",
  },
});

export default ChallengeScreen;