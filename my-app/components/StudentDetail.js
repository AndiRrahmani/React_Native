import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const StudentDetails = ({ image ,name, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.imgWrapper}>
          <Image source={image} style={styles.img} />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: "center",
  },
  cardWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    width: "90%",
  },
  imgWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  img: {
    width: 100,
    height: 100,
  },
  infoWrapper: {
    marginLeft: 20,
    marginTop: 20,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
