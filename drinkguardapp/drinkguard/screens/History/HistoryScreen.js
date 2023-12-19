import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Text, Image } from "react-native";
import DrinkItem from "../../components/DrinkItem";
import { ref, onValue, off } from "firebase/database";
import { UserContext } from "../../components/UserContext";
import { DRINKGUARD_DB } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import styles from './HistoryScreenStyles';
import Particle from "../../components/Particle";

export default function HistoryScreen() {
  const [drinks, setDrinks] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const historyRef = ref(
      DRINKGUARD_DB,
      "users/" + currentUser.uid + "/history"
    );

    const handleDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const drinksData = Object.values(snapshot.val()).filter(
          (drink) => drink.name !== "sample"
        );
        setDrinks(drinksData);
      }
    };

    const unsubscribe = onValue(historyRef, handleDataChange, (error) => {
      console.error(`Failed to fetch drink history: ${error.message}`);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
                      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))} 
      <Image source={require("../../assets/drinkguardofflogo.png")} style={styles.logo} />
      <Text style={styles.title}>Drink History</Text>
      <ScrollView style={styles.scrollContainer}>
        {drinks.map((drink, index) => (
          <DrinkItem key={index} entryNumber={index + 1} drink={drink} />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
