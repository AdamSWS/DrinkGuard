import { Text } from 'react-native';
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get, child } from "firebase/database";
import { DRINKGUARD_AUTH, DRINKGUARD_DB } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../../components/UserContext";
import InputField from '../../components/InputField';
import RegisterButton from '../../components/RegisterButton';
import ErrorText from '../../components/ErrorText';
import styles from './RegisterScreenStyles';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = async () => {
    if (!firstName || !lastName || !phone || !username || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (username.length < 3 || username.length > 15) {
      setErrorMessage("Username should be 3-15 characters long.");
      return; ß
    }

    const namePattern = /^[a-zA-Z ]+$/;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
      setErrorMessage("Names can only contain letters.");
      return;
    }

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) {
      setErrorMessage("Invalid phone number format.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage("Password must contain both letters and numbers.");
      return;
    }

    const usernameDbRef = ref(DRINKGUARD_DB, "users/");
    const snapshot = await get(child(usernameDbRef, `username/${username}`));
    if (snapshot.exists()) {
      setErrorMessage("Username already exists.");
      return;
    }

    try {
      const auth = DRINKGUARD_AUTH;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDbRef = ref(DRINKGUARD_DB, "users/" + userCredential.user.uid);
      await set(userDbRef, {
        firstName,
        lastName,
        phone,
        username,
        email,
        friends: [],
        history: [],
      });

      setCurrentUser(userCredential.user);
      navigation.navigate("Home");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Email address already in use.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Error with authentication.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password is too weak.");
          break;
        default:
          setErrorMessage(error.message);
      }
    }
  };

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <ErrorText message={errorMessage} />
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#804009"
        textAlign="center"
      />
      <InputField
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#804009"
        textAlign="center"
      />
      <InputField
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#804009"
        textAlign="center"
      />
      <InputField
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor="#804009"
        textAlign="center"
      />
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#804009"
        textAlign="center"
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#804009"
        secureTextEntry={true}
        textAlign="center"
      />
      <RegisterButton onPress={handleRegister} />
    </LinearGradient>
  );
}