import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../components/UserContext";
import { ref, get, onValue, off, set } from "firebase/database";
import { DRINKGUARD_DB } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import styles from './ContactSelectionScreenStyles';

export default function ContactSelectionScreen({ route }) {
  const { currentUser } = useContext(UserContext);
  const [userFriends, setUserFriends] = useState([]);
  const navigation = useNavigation();
  const { data } = route.params;

  const fetchUserFriends = () => {
    const friendsRef = ref(DRINKGUARD_DB, `users/${currentUser.uid}/friends`);

    const listener = onValue(friendsRef, async (snapshot) => {
      if (snapshot.exists()) {
        const friendUIDs = Object.keys(snapshot.val());
        const friendDetailsPromises = friendUIDs.map((uid) => {
          const userRef = ref(DRINKGUARD_DB, `users/${uid}`);
          return get(userRef).then((userSnapshot) => {
            if (userSnapshot.exists()) {
              return {
                uid,
                ...userSnapshot.val(),
                isSent: false,
              };
            }
            return null;
          });
        });

        const friendsArray = await Promise.all(friendDetailsPromises);
        setUserFriends(friendsArray.filter(Boolean));
      } else {
        console.log("User has no friends yet.");
        setUserFriends([]);
      }
    });

    return () => {
      off(friendsRef, "value", listener);
    };
  };

  useEffect(() => {
    return fetchUserFriends();
  }, [currentUser.uid]);

  const handleShare = async (friendUid) => {
    if (!data) {
      console.error("No drink data available to share.");
      return;
    }
  
    // Construct the notification object to be sent
    const notification = {
      sharedBy: currentUser.uid,
      sharedOn: new Date().toISOString(),
      drinkResult: data // Assuming 'data' contains all necessary information about the drink result
    };
  
    const notificationRef = ref(DRINKGUARD_DB, `users/${friendUid}/notifications`);
    get(notificationRef).then((snapshot) => {
      const existingNotifications = snapshot.exists() ? snapshot.val() : [];
      set(notificationRef, [...existingNotifications, notification])
        .then(() => {
          console.log("Drink result shared successfully!");
          // Update the state to reflect that the result has been shared with this friend
          setUserFriends(prevFriends => prevFriends.map(friend => 
            friend.uid === friendUid ? { ...friend, isSent: true } : friend
          ));
        })
        .catch(error => console.error("Error updating notifications:", error));
    });
  };
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={styles.container}>
    <Text style={styles.header}>Friends List</Text>
    <FlatList
      data={userFriends}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => (
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>
            {item.firstName} {item.lastName}
          </Text>
          <TouchableOpacity onPress={() => handleShare(item.uid)} disabled={item.isSent}>
            <LinearGradient
              colors={["#FF7F11", "#A32900"]}
              style={styles.gradientButton}
            >
              <Text style={styles.sendButtonText}>{item.isSent ? 'Sent' : 'Send'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    />
    <TouchableOpacity onPress={navigateBack}>
      <LinearGradient
        colors={["#FF7F11", "#A32900"]}
        style={styles.doneButton}
      >
        <Text style={styles.doneText}>Done</Text>
      </LinearGradient>
    </TouchableOpacity>
  </LinearGradient>
  );
}