import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import StudentDetails from "../components/StudentDetail";
import PersonImage from "../assets/person1.jpg";

const StudentScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Students Screen</Text>

      <StudentDetails
        name="Gabriel"
        image={require("../assets/person1.jpg")}
        description="Lorem ipsum dolor sit amet"
      />
      <StudentDetails
        name="Ellie"
        image={require("../assets/person1.jpg")}
        description="Lorem ipsum dolor sit amet"
      />
      <StudentDetails
        name="Kaylen"
        image={require("../assets/person1.jpg")}
        description="Lorem ipsum dolor sit amet"
      />
    </ScrollView>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
  },
});
