import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 275,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 20,
  },
  signInButton: {
    width: "50%",
    marginTop: 30,
  },
  signUpButton: {
    width: "50%",
    marginTop: 10,
  },
  forgotPassword: {
    marginTop: 15,
  },
  input: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    color: "#804009",
    backgroundColor: "#FFFFFF",
  },
  buttonGradient: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPasswordText: {
    color: "#FF7F11",
    fontSize: 16,
  },
});

export default styles;