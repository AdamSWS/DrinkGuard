import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#aaa",
    paddingBottom: 10,
    marginBottom: 15,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF7F11",
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
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
  statusIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  entryText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 5,
  },
  drinkEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  entryDetails: {
    flex: 1,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF7F11',
    marginRight: 10,
  },
});

export default styles;
