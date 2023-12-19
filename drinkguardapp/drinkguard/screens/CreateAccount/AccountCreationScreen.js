import React, { useState, useContext } from "react";
import { TextInput, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DRINKGUARD_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../../components/UserContext";
import styles from "./AccountCreationScreenStyles";
import Particle from "../../components/Particle";

// AccountCreationScreen: A componet for user authentication and account creation
export default function AccountCreationScreen() {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // State hooks for managing user input and authentication status.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle");

  const auth = DRINKGUARD_AUTH;

  // validateEmail: Validates the email format.
  const validateEmail = (email) => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    return pattern.test(email);
  };

  // handleSignIn: Handles the sign-in process.
  const handleSignIn = async () => {
    setLoginStatus("loading");
    setEmailError("");
    setGeneralError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoginStatus("success");

      setCurrentUser(response.user);

      // Navigate to the Home screen after successful login.
      setTimeout(() => {
        navigation.navigate("Home");
        setLoginStatus("idle");
      }, 1000);
    } catch (err) {
      // Handle authentication errors.
      if (err.code === "auth/user-not-found") {
        setGeneralError("Invalid login credentials.");
      } else {
        setGeneralError(err.message);
      }
    }
  };

  // handleSignUp: Navigates to the registration screen.
  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
      {/* Particle effect as a background */}
      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      {/* Logo Image */}
      <Image
        source={require("../../assets/drinkguardofflogo.png")}
        style={styles.logo}
      />
      {/* Email Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#804009"
      />
      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor="#804009"
      />
      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <LinearGradient
          colors={["#FF7F11", "#A32900"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <LinearGradient
          colors={["#FF7F11", "#A32900"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
     {/* Forgot Password Link */}
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => console.log("Forgot Password")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
