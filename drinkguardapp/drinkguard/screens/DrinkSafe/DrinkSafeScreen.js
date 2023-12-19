import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import styles from './DrinkSafeScreenStyles';
import { LinearGradient } from 'expo-linear-gradient';
import Particle from '../../components/Particle';

// Array of images for the DrinkSafe tips
const images = [
  require('../../assets/confused.png'),
  require('../../assets/drinking1.png'),
  require('../../assets/eye.png'),
  require('../../assets/faint.png'),
  require('../../assets/drugs.png'),
];

export default function DrinkSafeScreen() {
  // State to manage the current fact index displayed
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Array of facts related to drink safety
  const facts = [
    "Drink spiking is often associated with the use of drugs or alcohol to incapacitate a person without their knowledge.",
    "Common substances used in drink spiking include Rohypnol, GHB, and Ketamine.",
    "It's not just about illicit substances; alcohol itself can be used to spike a drink, especially if it's added without the drinker's awareness.",
    "Drink spiking can lead to a loss of inhibition, unconsciousness, memory loss, and even life-threatening situations.",
    "To prevent drink spiking, never leave your drink unattended, try to buy your own drinks, and always watch when your drink is being prepared."
  ];

  // Effect hook to cycle through facts every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFactIndex((prevCurrentFactIndex) =>
        prevCurrentFactIndex === facts.length - 1 ? 0 : prevCurrentFactIndex + 1
      );
    }, 5000);

    // Clean-up function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle external link opening
  const openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  // Rendering the screen's UI
  return (
    <View style={styles.container}>
      {/* Particle effect as a background */}
      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      {/* Header with logo and title */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/drinkguardofflogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>DrinkSafe</Text>
      </View>
      
      {/* Main content section */}
      <View style={styles.mainContent}>
        {/* Section to display DrinkSafe facts */}
        <View style={styles.sectionPlate}>
          <LinearGradient
            colors={['#FF7F11', '#A32900']}
            style={[styles.tipsSection, { borderRadius: 5 }]}
          >
            <Text style={styles.subtitle}>DrinkSafe Facts</Text>
            <View style={styles.factContainer}>
              <Text style={styles.factText}>{facts[currentFactIndex]}</Text>
              <Image
                source={images[currentFactIndex]}
                style={styles.imageStyle}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Section for helpful links */}
        <View style={styles.sectionPlate}>
          <LinearGradient
            colors={['#FF7F11', '#A32900']}
            style={[styles.helpfulLinksSection, { borderRadius: 5 }]}
          >
            <Text style={styles.subtitle}>Helpful Links:</Text>
            <Text style={styles.infoText}>
              For more information on drink spiking, click on the below links:
            </Text>
            {/* Buttons for external links */}
            <TouchableOpacity onPress={() => openURL('https://alcohol.org/guides/spiked/')}>
              <Text style={styles.linkText}>Alcohol.org Guides</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openURL('https://www.apa.org/news/press/releases/2016/05/drink-spiking')}>
              <Text style={styles.linkText}>APA Press Release on Drink Spiking</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};