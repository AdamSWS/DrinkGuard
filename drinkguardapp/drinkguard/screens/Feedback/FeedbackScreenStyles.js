import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#000000",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  reviewSentText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  starRatingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
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
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles;
