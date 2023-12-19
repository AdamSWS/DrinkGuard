import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './FeedbackScreenStyles';
import StarRating from '../../components/StarRating';
import Particle from '../../components/Particle';

export default function FeedbackScreen() {
  const [starCount, setStarCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviewSent] = useState(false);

  const handleSend = () => {
    if (starCount === 0) {
      Alert.alert('Rating Required', 'Please provide a star rating before sending.');
      return;
    }
    // Reset the state
    setStarCount(0);
    setFeedback('');
    // Show an alert instead of setting the review sent state
    Alert.alert("Thank you!", "Review sent successfully.", [
      { text: "OK" }
    ]);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      <View style={styles.header}>
        <Image
          source={require("../../assets/drinkguardofflogo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Feedback</Text>
      <View style={styles.card}>
        <StarRating
          rating={starCount}
          maxStars={5}
          onRating={(rating) => setStarCount(rating)}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Provide feedback (optional)"
        value={feedback}
        onChangeText={setFeedback}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity onPress={handleSend}>
        <LinearGradient
          colors={["#FF7F11", "#A32900"]} style={styles.button}
        >
          <Text style={styles.buttonText}>Send</Text>
        </LinearGradient>
      </TouchableOpacity>
      {reviewSent && <Text style={styles.reviewSentText}>Review sent. Thank you!</Text>}
    </View>
  );
}
