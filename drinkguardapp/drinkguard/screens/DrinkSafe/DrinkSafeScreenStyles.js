import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  linkText: {
    fontSize: 16,
    color: '#00BFFF',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#0055FF',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  factContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factImageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  factText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginHorizontal: 10,
  },
  linksSection: {
    marginTop: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  tipsSection: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: width * 0.8,
    alignSelf: 'center',
    maxHeight: 200,
  },
  helpfulLinksSection: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: width * 0.8,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  scrollableContent: {
    marginTop: 170,
  },
  sectionListContainer: {
    flex: 1,
  },
  mainContent: {
    marginTop: 200,
    paddingHorizontal: 20,
  },
});

export default styles;

