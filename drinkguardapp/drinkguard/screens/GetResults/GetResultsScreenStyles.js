import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  crossImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  checkImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F11",
    marginBottom: 15,
  },
  safeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F11",
    marginBottom: 15,
  },
  chemicalsContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  chemicalsHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F11",
    marginBottom: 10,
  },
  chemicalText: {
    fontSize: 16,
    color: "red",
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 16,
    color: "#804009",
  },
  drinkInfoText: {
    fontSize: 16,
    color: "#804009",
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'column',
  },
  buttonGradient: {
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
