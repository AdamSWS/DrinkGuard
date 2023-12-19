import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  View,
  Image,
  Easing,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./HomeScreenStyles";
import { DRINKGUARD_AUTH, DRINKGUARD_DB } from "../../firebaseConfig";
import { ref, get } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import bluetoothIcon from "../../assets/bluetooth_icon.png";
import drinkGuardExample from "../../assets/drinkguard_example.png";
import Particle from "../../components/Particle";
import { drinks, bars } from "../../assets/data";

export default function HomeScreen() {
  const currentUser = DRINKGUARD_AUTH.currentUser;
  const navigation = useNavigation();
  const [step, setStep] = useState(-1);
  const [username, setUsername] = useState("Username");
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [submersionCountdown, setSubmersionCountdown] = useState(5);
  const [gradientColors] = useState(["#FF7F11", "#A32900"]);

  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(0);
  const flashAnim = new Animated.Value(0);
  const rotationAnim = new Animated.Value(0);

  const activityIndicatorStyle = {
    marginTop: 20,
    marginBottom: 20,
    transform: [{ scale: 1.5 }],
  };

  const LoadingIndicator = () => (
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator size="large" color="#FF7F11" />
    </View>
  );

  useEffect(() => {
    if (step === -1) {
      const timer = setTimeout(() => setStep(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (!userDataFetched && currentUser) {
      const userRef = ref(DRINKGUARD_DB, "users/" + currentUser.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUsername(userData.username || "Username");
            setUserDataFetched(true);
          } else {
            Alert.alert("Error", "User data not found.");
          }
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  }, [currentUser, userDataFetched]);

  const generateRandomToxicityValues = (detected) => {
    return detected ? `${(Math.random() * 0.5).toFixed(2)} mg/mL` : "0 mg/mL";
  };

  const generateRandomScan = () => {
    const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
    const randomBar = bars[Math.floor(Math.random() * bars.length)];
    const detectedSubstances = [
      "flunitrazepam",
      "gamma_hydroxybutyric_acid",
      "gamma_butyrolactone",
      "ketamine",
    ];
    const sensorResults = {};

    detectedSubstances.forEach((substance) => {
      const detected = Math.random() < 0.5;
      sensorResults[substance] = {
        detected: detected,
        concentration: generateRandomToxicityValues(detected),
      };
    });

    const scan = {
      scan_id: Math.floor(100000000 + Math.random() * 900000000).toString(),
      timestamp: new Date().toISOString(),
      location: {
        latitude: randomBar.latitude,
        longitude: randomBar.longitude,
        name: randomBar.name,
      },
      drink: {
        name: randomDrink.name,
        description: randomDrink.description,
      },
      sensor_results: sensorResults,
    };

    return scan;
  };

  const resetSubmersionTimer = () => {
    setSubmersionCountdown(5);
  };

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      let dotInterval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4);
      }, 1000);

      setTimeout(() => {
        clearInterval(dotInterval);
        setStep(2);
      }, 5000);
    } else if (step === 2) {
      setStep(3);
      resetSubmersionTimer();
    }
  };

  const handleGetResultsPress = () => {
    const randomProps = generateRandomScan();
    console.log(generateRandomScan());
    navigation.navigate("GetResultsScreen", { data: { content: randomProps } });
    setStep(2);
  };

  const rotationInterpolated = rotationAnim.interpolate({
    inputRange: [-30, 30],
    outputRange: ["-30deg", "30deg"],
  });

  useEffect(() => {
    if (step === 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(flashAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(flashAnim, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (step === 2) {
      rotationAnim.setValue(0);

      Animated.loop(
        Animated.sequence([
          Animated.timing(rotationAnim, {
            toValue: 5,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(rotationAnim, {
            toValue: -10,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(rotationAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (step === 3) {
      const submersionInterval = setInterval(() => {
        setSubmersionCountdown((prev) => {
          const nextCount = prev - 1;
          if (nextCount === 0) {
            clearInterval(submersionInterval);
            resetSubmersionTimer();
            setStep(4);
          }
          return nextCount;
        });
      }, 1000);
      return () => clearInterval(submersionInterval);
    } else if (step !== 2) {
      rotationAnim.setValue(0);
    }
  }, [step]);

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      <View style={styles.header}>
        <Image
          source={require("../../assets/drinkguardofflogo.png")}
          style={styles.logo}
        />
        {/* Welcome message */}
        {userDataFetched && step === 0 && (
          <Text style={styles.welcomeText}>Welcome, {username}!</Text>
        )}
      </View>
      {step === -1 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF7F11" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {step === 0 && (
        <View style={styles.bluetoothContainer}>
          <Animated.Image
            source={bluetoothIcon}
            style={[
              styles.bluetoothIcon,
              { transform: [{ scale: scaleAnim }] },
            ]}
          />
          <Animated.Text style={[styles.promptText, { opacity: flashAnim }]}>
            Connect your DrinkGuard device
          </Animated.Text>
          <Animated.Text
            style={[styles.discoveredText, { opacity: opacityAnim }]}
          >
            Discovered: {username}'s Drinkguard
          </Animated.Text>
          <Text style={styles.nearbyDevicesText}>
            Nearby devices: {username}'s DrinkGuard
          </Text>
          <Animated.Text
            style={[styles.discoveredText, { opacity: opacityAnim }]}
          >
            Discovered: {username}'s Drinkguard
          </Animated.Text>
        </View>
      )}
      {step === 1 && (
        <View>
          <Text style={styles.promptText}>
            Connecting to {username}'s DrinkGuard{".".repeat(dotCount)}
          </Text>
          <LoadingIndicator />
        </View>
      )}
      {step === 2 && (
        <>
          <Text style={styles.promptText}>Connected</Text>
          <Text style={styles.subText}>
            Dip DrinkGuard into drink and press 'Ready'! Only submerge the
            lighter end.
          </Text>
          <Animated.Image
            source={drinkGuardExample}
            style={[
              styles.drinkGuardIcon,
              {
                transform: [{ rotateZ: rotationInterpolated }],
              },
            ]}
          />
          <LinearGradient colors={gradientColors} style={styles.readyButton}>
            <TouchableOpacity onPress={() => setStep(3)}>
              <Text style={styles.buttonText}>Ready</Text>
            </TouchableOpacity>
          </LinearGradient>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.promptText}>Keep DrinkGuard Submerged</Text>
          <Text style={styles.subText}>Time left: {submersionCountdown}s</Text>
        </>
      )}
      {step === 4 && (
        <>
          <Text style={styles.promptText}>Here are your drink results...</Text>
          <LinearGradient colors={gradientColors} style={styles.pairButton}>
            <TouchableOpacity
              style={styles.pairButton}
              onPress={handleGetResultsPress}
            >
              <Text style={styles.buttonText}>Get Results</Text>
            </TouchableOpacity>
          </LinearGradient>
        </>
      )}

      {step === 0 && (
        <LinearGradient colors={gradientColors} style={styles.pairButton}>
          <TouchableOpacity onPress={handleContinue} style={styles.pairButton}>
            <Text style={styles.buttonText}>Pair</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {step !== 0 && step !== -1 && (
        <LinearGradient colors={gradientColors} style={styles.disconnectButton}>
          <TouchableOpacity
            onPress={() => {
              setStep(0);
              resetSubmersionTimer();
            }}
          >
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </LinearGradient>
  );
}
