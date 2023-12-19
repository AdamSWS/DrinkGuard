import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  fileListHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#FF7F11",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    color: "#804009",
    marginBottom: 20,
  },
  getResultsButton: {
    width: "50%",
    marginTop: 30,
  },
  buttonGradient: {
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  flatList: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    color: "#804009",
  },
  selectedText: {
    color: "#FF7F11",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  promptText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: 'center',
  },
  continueButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#FF7F11",
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bluetoothIcon: {
    width: 100, 
    height: 100,
    marginBottom: 20,
},
discoveredText: {
  fontSize: 16,
  color: "white",
  marginTop: 10,
},
subText: {
  fontSize: 16,
  color: '#FFF',
  textAlign: 'center',
  marginVertical: 10,
},

drinkGuardIcon: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginVertical: 10,
},

readyButton: {
  backgroundColor: '#2196F3',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  alignSelf: 'center',
  marginTop: 10,
},
resultsButton: {
  padding: 10,
  backgroundColor: "#333",
  borderRadius: 5,
  alignItems: "center",
  marginTop: 10,
},
logo: {
  width: 150,
  height: 150,
  alignSelf: "center",
  marginBottom: 25,
  marginTop: 10,
},
header: {
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 1000,
},
welcomeText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: 20,
},
pairButton: {
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
readyButton: {
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
disconnectButton: {
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 10,
},
bluetoothContainer: {
  paddingTop: 150,
  alignItems: 'center',
  justifyContent: 'center',
},
nearbyDevicesText: {
  color: '#FFF',
  fontSize: 16,
  marginVertical: 5,
},
connectingContainer: {
  position: 'absolute',
  alignItems: 'center',
},
});

export default styles;
