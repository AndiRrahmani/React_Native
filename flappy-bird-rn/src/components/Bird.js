import React from "react";
import { View } from "react-native";

const Bird = ({ birdBottom }) => {
  return (
    <View
      style={{
        position: "absolute",
        width: 50,
        height: 50,
        backgroundColor: "blue",
        left: 100,
        bottom: birdBottom,
      }}
    />
  );
};

export default Bird;
