import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function InputField({ placeholder, value, onChangeText, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 35,
    width: '70%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#804009',
    backgroundColor: '#FFFFFF',
  },
});

export default InputField;
