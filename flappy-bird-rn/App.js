import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  Image,
} from "react-native";
import Bird from "./src/components/Bird";
import Obstacles from "./src/components/Obstacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  // Bird position
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);

  // Gravity
  const gravity = 3;
  let gameTimerId;

  // Obstacles settings
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;

  // First obstacle pair
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  let obstaclesTimerId;

  // Second obstacle pair
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2
  );
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  let obstaclesTimerIdTwo;

  
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Stop game
  const gameOver = () => {
    setIsGameOver(true);
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
  };

  // when the person touches the screen this method is called
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((b) => b + 50);
    }
  };

  // Bird falling
  useEffect(() => {
    if (birdBottom > 0 && !isGameOver) {
      gameTimerId = setInterval(() => {
        setBirdBottom((b) => b - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom, isGameOver]);

  // Move first obstacle
  useEffect(() => {
    if (!isGameOver) {
      if (obstaclesLeft > -obstacleWidth) {
        obstaclesTimerId = setInterval(() => {
          setObstaclesLeft((left) => left - 5);
        }, 30);

        return () => clearInterval(obstaclesTimerId);
      } else {
        //  score 
        setScore((s) => s + 1);
        setObstaclesLeft(screenWidth);
        setObstaclesNegHeight(-Math.random() * 100);
      }
    }
  }, [obstaclesLeft, isGameOver]);

  // Movee second obstacl
  useEffect(() => {
    if (!isGameOver) {
      if (obstaclesLeftTwo > -obstacleWidth) {
        obstaclesTimerIdTwo = setInterval(() => {
          setObstaclesLeftTwo((left) => left - 5);
        }, 30);

        return () => clearInterval(obstaclesTimerIdTwo);
      } else {
        //  score
        setScore((s) => s + 1);
        setObstaclesLeftTwo(screenWidth);
        setObstaclesNegHeightTwo(-Math.random() * 100);
      }
    }
  }, [obstaclesLeftTwo, isGameOver]);
  useEffect(() => {
    if (
      (
        (birdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
          birdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30
      ) ||
      (
        (birdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
          birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30
      )
    ) {
      gameOver();
    }
  }, [
    birdBottom,
    obstaclesLeft,
    obstaclesLeftTwo,
    obstaclesNegHeight,
    obstaclesNegHeightTwo,
    isGameOver,
  ]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>

        <Image
        source ={require('./assets/background.png')}
        style = {styles.backgroundImage}
        />
       
        <Text style={styles.score}>{score}</Text>

        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

        <Obstacles
          color={"green"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          obstaclesLeft={obstaclesLeft}
        />

        <Obstacles
          color={"yellow"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
          obstaclesLeft={obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage:{
    position:'absolute',
    width:'100%',
    height:'100%',

  },
  score: {
    position: "absolute",
    top: 60,
    left: 20,
    fontSize: 32,
    fontWeight: "bold",
    zIndex: 10,
  }
});