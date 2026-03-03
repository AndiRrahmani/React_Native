import React from "react";
import { Image } from "react-native";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth=40;
  const birdHeight=40;


  return (
    <Image
    source={require('../../assets/bird1.png')}
      style={{
        position: "absolute",
        width: birdWidth,
        height: birdHeight,
        backgroundColor: "blue",
        left: birdLeft - (birdWidth/2),
        bottom: birdBottom -(birdHeight/2),
      }}
      resizeMode="stretch"
    />
  );
};

export default Bird;
