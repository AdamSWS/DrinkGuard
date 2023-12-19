import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '40%',
    borderWidth: 10,
    borderRadius: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 16,
  },
  buttonContainerSingle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonGradient: {
    padding: 12,
    borderRadius: 8,
    width: 'auto',
    marginHorizontal: 5,
  },
  buttonUber: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLyft: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchingText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FFF',
  },
  rideStandby: {
    color: 'red',
  },
  rideArrived: {
    color: 'green',
  },
  rideStatus: {
    fontSize: 22,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#90EE90',
    marginTop: 10,
  },
  rideStandby: {
    color: '#FF6666',
  },
  rideArrived: {
    color: '#66FF66',
  },

  touchableButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    padding: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  searchingText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  header: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default styles;
