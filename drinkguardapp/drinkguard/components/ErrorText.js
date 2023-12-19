import React from 'react';
import { Text, StyleSheet } from 'react-native';

function ErrorText({ message }) {
  if (!message) return null;
  return <Text style={styles.errorText}>{message}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ErrorText;
