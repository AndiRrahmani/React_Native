import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import StudentInfo from "../components/StudentInfo";
import Projects from "../components/Projects";

const ProfileScreen = () => {
  // Sample data passed as props to components. Replace with real data as needed.
  const fullname = "JOHN DOE";
  const position = "UI/UX Designer";
  const description =
    "We're passionate about creating beautiful desing for startups & leading brands";

  // Using placeholder remote images so the component works without local assets.
  const profileImage = { uri: "https://i.pravatar.cc/600" };
  const projectImages = [
    { uri: "https://picsum.photos/300/200?1" },
    { uri: "https://picsum.photos/300/200?2" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <StudentInfo
          fullname={fullname}
          position={position}
          description={description}
          profileImage={profileImage}
        />

        <View style={styles.projectsSection}>
          <View style={styles.projectsHeader}>
            <Text style={styles.projectsTitle}>PROJECTS</Text>
            <View style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </View>
          </View>

          <View style={styles.projectsRow}>
            {projectImages.map((img, idx) => (
              <Projects key={idx} image={img} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingBottom: 24 },
  projectsSection: { paddingHorizontal: 18 },
  projectsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  projectsTitle: { fontWeight: "700" },
  viewAllButton: {
    backgroundColor: "#ffd400",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  viewAllText: { fontWeight: "700" },
  projectsRow: { flexDirection: "row" },
});

export default ProfileScreen;
