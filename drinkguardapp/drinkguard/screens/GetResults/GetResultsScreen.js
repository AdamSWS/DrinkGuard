import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ref, push, get } from "firebase/database";
import { UserContext } from "../../components/UserContext";
import { DRINKGUARD_DB } from "../../firebaseConfig";
import styles from './GetResultsScreenStyles';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid, Platform } from 'react-native';

export default function GetResultsScreen({ route }) {
  const navigation = useNavigation();
  const { data } = route.params;
  const { currentUser } = useContext(UserContext);
  const [newDrink, setNewDrink] = useState(null);

  async function getContacts() {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contacts permission denied');
        return;
      }
    }

    const contacts = await Contacts.getAll();
    return contacts;
  }

  const handleContactAuthorities = () => {
    Alert.alert(
      "Authorities Contacted",
      "The authorities have been notified about the contaminated drink.",
      [
        { text: "OK" }
      ]
    );
  };

  const isDrinkClean = () => {
    for (let contaminant in data.content.sensor_results) {
      if (data.content.sensor_results[contaminant].detected) {
        return false;
      }
    }
    return true;
  };

  const getDetectedContaminants = () => {
    return Object.entries(data.content.sensor_results)
      .filter(([_, result]) => result.detected)
      .map(([chemical, _]) => chemical);
  };

  const handleSaveResults = async () => {
    const isClean = isDrinkClean();
    const detectedContaminants = getDetectedContaminants();
    const drinkData = {
      date: new Date(data.content.timestamp).toLocaleDateString('en-US'),
      result: isClean ? "Clean" : "Contaminated",
      contaminants: detectedContaminants,
      timestamp: data.content.timestamp,
    };

    setNewDrink(drinkData);

    const historyRef = ref(DRINKGUARD_DB, "users/" + currentUser.uid + "/history");

    get(historyRef).then((snapshot) => {
      if (snapshot.exists()) {
        const drinksArray = Object.values(snapshot.val());
        if (drinksArray.some(drink => drink.timestamp === drinkData.timestamp && drink.result === drinkData.result)) {
          console.error("This drink result is already saved.");
          return;
        }
      }

      try {
        push(historyRef, drinkData);
        console.log("Drink result saved successfully!");
      } catch (error) {
        console.error(`Failed to save drink result: ${error.message}`);
      }
    });
  };

  useEffect(() => {
    handleSaveResults();
  }, []);

  const handleShare = () => {
    if (newDrink) {
      navigation.navigate('ContactSelection', { data: newDrink });
    } else {
      console.error('No drink data available to share.');
    }
  };

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
      {!isDrinkClean() ? (
        <>
          <Image
            source={require("../../assets/remove.png")}
            style={styles.crossImage}
          />
          <Text style={styles.warningText}>Don't drink this drink!</Text>
          <View style={styles.chemicalsContainer}>
            <Text style={styles.chemicalsHeader}>Chemicals Detected:</Text>
            {data.content && data.content.sensor_results ? (
              Object.entries(data.content.sensor_results).map(
                ([chemical, result]) => {
                  if (result.detected) {
                    return (
                      <Text key={chemical} style={styles.chemicalText}>
                        {chemical.replace(/_/g, " ")}: {result.concentration}
                      </Text>
                    );
                  }
                  return null;
                }
              )
            ) : (
              <Text style={styles.noDataText}>No sensor data available.</Text>
            )}
          </View>
        </>
      ) : (
        <>
          <Image
            source={require("../../assets/check.png")}
            style={styles.checkImage}
          />
          <Text style={styles.safeText}>Enjoy your drink!</Text>
        </>
      )}
      <Text style={styles.drinkInfoText}>
        Timestamp: {data.content.timestamp}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <LinearGradient colors={["#FF7F11", "#A32900"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Share Results</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.returnHomeButton} onPress={() => navigation.goBack()}>
          <LinearGradient colors={["#FF7F11", "#A32900"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Return to Home</Text>
          </LinearGradient>
        </TouchableOpacity>

        {!isDrinkClean() && (
          <TouchableOpacity style={styles.contactAuthoritiesButton} onPress={handleContactAuthorities}>
            <LinearGradient colors={["#FF7F11", "#A32900"]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Contact Authorities</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}