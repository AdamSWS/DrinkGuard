import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function RegisterButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.registerButton} onPress={onPress}>
      <LinearGradient
        colors={["#FF7F11", "#A32900"]}
        style={styles.buttonGradient}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    width: '70%',
    padding: 12,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonGradient: {
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RegisterButton;
