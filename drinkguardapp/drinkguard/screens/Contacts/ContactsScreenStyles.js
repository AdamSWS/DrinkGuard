import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginLeft: 10,
  },
  sectionListContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inactiveSectionHeader: {
    color: '#A0A0A0',
  },
  cardContainer: {
    marginVertical: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  contactText: {
    color: '#804009',
  },
  errorText: {
    color: 'red',
    margin: 10,
    fontSize: 16,
  },
  feedbackText: {
    color: '#FF7F11',
    margin: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  addButton: {
    width: '30%',
  },
  buttonGradient: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  friendActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  friendActionButton: {
    marginLeft: 10,
    padding: 5,
  },
  friendActionText: {
    color: '#fff',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    width: '50%',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  errorModalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorModalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  errorModalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  errorModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  cancelImage: {
    width: 24,
    height: 24,
  },
  addImage: {
    width: 24,
    height: 24,
  },
  nameAndUsernameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameAndUsernameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  usernameText: {
    fontSize: 14,
    color: '#FFF',
  },
  addButton: {
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
  infoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});

export default styles;
