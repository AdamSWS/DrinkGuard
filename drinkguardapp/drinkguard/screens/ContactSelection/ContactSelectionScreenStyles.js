import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginVertical: 10,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    contactText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    sendButton: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: '#FF7F11',
      borderRadius: 5,
    },
    sendButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
    doneButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#A32900',
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 10,
    },
    doneText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    gradientButton: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
  });

  export default styles;