import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DRINKGUARD_AUTH, DRINKGUARD_DB } from "../../firebaseConfig";
import { ref, get, set } from "firebase/database";
import styles from './EditProfileScreenStyles';
import { signOut } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Particle from "../../components/Particle";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [gradientColors] = useState(["#FF7F11", "#A32900"]);
  const [isChanged, setIsChanged] = useState(false);

  // Function to update state and mark as changed
  const handleChange = (setter) => (value) => {
    setter(value);
    setIsChanged(true);
  };

  const showErrorAlert = (message) => {
    Alert.alert("Error", message, [{ text: "OK" }]);
  };

  useEffect(() => {
    // Check if any field is different from the original user data
    if (!userDataFetched && currentUser) {
      // ... existing useEffect code
      setIsChanged(false); // Reset the change flag when user data is fetched
    }
  }, [currentUser, userDataFetched]);

  const currentUser = DRINKGUARD_AUTH.currentUser;

  useEffect(() => {
    if (!userDataFetched && currentUser) {
      const userRef = ref(DRINKGUARD_DB, "users/" + currentUser.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setUsername(userData.username || "");
            setEmail(userData.email || currentUser.email);
            setPhoneNumber(userData.phone || "");
            setUserDataFetched(true);
          } else {
            Alert.alert("Error", "User data not found.");
          }
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!firstName || !lastName || !username || !email || !phoneNumber) {
      showErrorAlert("All fields are required!");
      return;
    }

    const namePattern = /^[a-zA-Z ]+$/;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
      setErrorMessage("Names can only contain letters.");
      return;
    }

    const phonePattern =
      /^(\+\d{1,2}\s?)?((\(\d{1,4}\))|\d{1,4})[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;
    if (!phonePattern.test(phoneNumber)) {
      setErrorMessage("Invalid phone number format.");
      return;
    }

    if (username.length < 3) {
      setErrorMessage("Username should be at least 3 characters long.");
      return;
    }

    if (currentUser) {
      const userRef = ref(DRINKGUARD_DB, "users/" + currentUser.uid);
      get(userRef).then((snapshot) => {
        const existingData = snapshot.val() || {};
        const newData = {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
        };

        if (JSON.stringify(existingData) !== JSON.stringify(newData)) {
          set(userRef, newData)
            .then(() => {
              Alert.alert("Success", "Profile updated successfully.");
              setIsChanged(false); // Reset the change flag after successful update
            })
            .catch((error) => {
              Alert.alert("Error", error.message);
            });
        } else {
          setIsChanged(false); // Also reset if there are no changes to save
        }
      });
    }
  };

  return (
    <LinearGradient colors={['#000', '#000']} style={styles.container}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/drinkguardofflogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <LinearGradient colors={gradientColors} style={styles.card}>
        {/* Row container for First Name and Last Name */}
        <View style={styles.rowContainer}>
          <View style={styles.halfWidthContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.inputHalf}
              placeholder="Enter your First Name"
              value={firstName}
              onChangeText={handleChange(setFirstName)}
            />
          </View>

          <View style={styles.halfWidthContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.inputHalf}
              placeholder="Enter your Last Name"
              value={lastName}
              onChangeText={handleChange(setLastName)}
            />
          </View>
        </View>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          value={username}
          onChangeText={handleChange(setUsername)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={handleChange(setEmail)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Phone Number (XXX-XXX-XXXX)"
          value={phoneNumber}
          onChangeText={handleChange(setPhoneNumber)}
        />
      </LinearGradient>

      {isChanged && (
        <LinearGradient colors={gradientColors} style={styles.saveButton}>
          <Image source={require("../../assets/confirm.png")} style={styles.confirmIcon} />
          <Text style={styles.buttonText}>Confirm Changes</Text>
        </LinearGradient>
      )}
    </LinearGradient>
  );
}
