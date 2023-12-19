import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const StarRating = ({ rating, maxStars, onRating }) => {
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onRating(i)}>
          <Image
            style={styles.starImage}
            source={i <= rating ? require('../assets/full_star.png') : require('../assets/empty_star.png')}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.starRatingContainer}>
      {renderStars()}
    </View>
  );
};

// Your styles for the custom component
const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: 40, // Set the width as needed
    height: 40, // Set the height as needed
    resizeMode: 'cover',
  },
});

export default StarRating;