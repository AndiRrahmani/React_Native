import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Projects = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  image: {
    width: 160,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
});

export default Projects;
