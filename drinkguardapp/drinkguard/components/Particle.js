import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Particle = () => {
  // Initialize Animated Values
  const animX = useRef(new Animated.Value(getRandomXPosition())).current;
  const animY = useRef(new Animated.Value(windowHeight + 550)).current;

  // Predefined colors and opacities
  const colors = ['rgba(255, 255, 100, 0.1)', 'rgba(255, 255, 150, 0.12)', 'rgba(255, 255, 200, 0.15)'];
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const animateParticle = () => {
      const targetX = getRandomXPosition() - 100;
      const targetY = -250; // End above the screen

      Animated.parallel([
        Animated.timing(animX, {
          toValue: targetX,
          duration: getRandomDuration(),
          useNativeDriver: true
        }),
        Animated.timing(animY, {
          toValue: targetY,
          duration: getRandomDuration(),
          useNativeDriver: true
        })
      ]).start(() => {
        animX.setValue(getRandomXPosition());
        animY.setValue(windowHeight + 50);
        animateParticle();
      });
    };

    animateParticle();
  }, []);

  function getRandomXPosition() {
    return Math.random() * windowWidth - windowWidth * 0.2;
  }

  function getRandomDuration() {
    return 5000 + Math.random() * 5000; // Random duration between 10 to 15 seconds
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateX: animX }, { translateY: animY }],
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: backgroundColor,
        borderRadius: 25,
      }}
    />
  );
};

export default Particle;