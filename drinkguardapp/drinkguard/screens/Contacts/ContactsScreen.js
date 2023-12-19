import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  Modal,
  Image,
} from "react-native";
import { ref, get, set, onValue, off } from "@firebase/database";
import { DRINKGUARD_DB } from "../../firebaseConfig";
import { UserContext } from "../../components/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ContactsScreenStyles";
import Particle from "../../components/Particle";

export default function ContactsScreen() {
  const { currentUser } = useContext(UserContext); // Accessing current user from context
  const [allUsers, setAllUsers] = useState([]); // State for storing all users
  const [userFriends, setUserFriends] = useState([]); // State for storing user's friends
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [activeSection, setActiveSection] = useState("Your Friends"); // State to track the active section
  const [drinkNotifications, setDrinkNotifications] = useState(null); // State for drink notifications
  const [usersWithNotifications, setUsersWithNotifications] = useState({}); // State to track users with notification

  // handles changes between 'Your Friends' and 'Add Users' Sections
  const toggleSection = (sectionTitle) => {
    setActiveSection((prevSection) =>
      prevSection === sectionTitle ? null : sectionTitle
    );
  };

  // Check if a section is currently active
  const isSectionActive = (sectionTitle) => {
    return activeSection === sectionTitle;
  };

  // Fetch users and user friends data from Firebase on component mount
  useEffect(() => {
    fetchUsers();
    fetchUserFriends();

    return () => {
      const friendsRef = ref(
        DRINKGUARD_DB,
        "users/" + currentUser.uid + "/friends"
      );
      off(friendsRef);
    };
  }, [currentUser.uid]);

  // Clear error message after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Fetch all users from the database
  const fetchUsers = async () => {
    const usersRef = ref(DRINKGUARD_DB, "users");
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Process the list of users
        const usersArray = Object.entries(snapshot.val()).map(
          ([key, value]) => ({
            uid: key,
            ...value,
          })
        );

        // Filter out current user and existing friends
        const nonFriendNonCurrentUser = usersArray.filter(
          (user) =>
            user.uid !== currentUser.uid &&
            !userFriends.some((friend) => friend.uid === user.uid)
        );

        setAllUsers(nonFriendNonCurrentUser);
      } else {
        setErrorMessage("No users found in database.");
      }
    });
  };

  // Fetch current user's friends from the database
  const fetchUserFriends = () => {
    const friendsRef = ref(
      DRINKGUARD_DB,
      "users/" + currentUser.uid + "/friends"
    );

    const listener = onValue(friendsRef, async (snapshot) => {
      if (snapshot.exists()) {
        // Process the list of friends
        const friendUIDs = Object.keys(snapshot.val());
        const friendDetailsPromises = friendUIDs.map((uid) => {
          const userRef = ref(DRINKGUARD_DB, "users/" + uid);
          return get(userRef).then((userSnapshot) => {
            if (userSnapshot.exists()) {
              const userData = userSnapshot.val();
              // Track users with notifications
              if (userData.notifications && userData.notifications.length > 0) {
                setUsersWithNotifications((prev) => ({ ...prev, [uid]: true }));
              }
              return { uid, ...userData };
            }
            return null;
          });
        });

        const friendsArray = await Promise.all(friendDetailsPromises);
        setUserFriends(friendsArray.filter(Boolean));
      } else {
        setErrorMessage("User has no friends yet.");
        setUserFriends([]);
      }
    });

    return () => {
      off(friendsRef, "value", listener);
    };
  };

  // Handle adding a new friend
  const handleAddFriend = (uid) => {
    if (!uid || uid === currentUser.uid) {
      setErrorMessage("Invalid UID or trying to add self.");
      return;
    }

    const specificFriendRef = ref(
      DRINKGUARD_DB,
      "users/" + currentUser.uid + "/friends/" + uid
    );

    get(specificFriendRef).then((friendSnapshot) => {
      if (friendSnapshot.exists()) {
        setErrorMessage("This user is already a friend.");
        return;
      }

      try {
        set(specificFriendRef, { uid: uid }).then(() => {
          const addedFriend = allUsers.find((user) => user.uid === uid);

          if (addedFriend) {
            setUserFriends((prevFriends) => [...prevFriends, addedFriend]);
          }

          setAllUsers((prevUsers) =>
            prevUsers.filter((user) => user.uid !== uid)
          );
        });
      } catch (error) {
        setErrorMessage(`Failed to add friend: ${error.message}`);
      }
    });

    setErrorMessage(null);
  };

  // Handle removing a friend
  const handleRemoveFriend = (uid) => {
    if (!uid) {
      setErrorMessage("Invalid UID.");
      return;
    }

    const specificFriendRef = ref(
      DRINKGUARD_DB,
      "users/" + currentUser.uid + "/friends/" + uid
    );

    set(specificFriendRef, null)
      .then(() => {
        const removedFriend = userFriends.find((friend) => friend.uid === uid);
        setUserFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.uid !== uid)
        );

        if (removedFriend) {
          setAllUsers((prevUsers) => [...prevUsers, removedFriend]);
        }
      })
      .catch((error) => {
        setErrorMessage(`Failed to remove friend: ${error.message}`);
      });
  };

  // Handle card press to show notifications
  const handleCardPress = async (user) => {
    const contactUid = user.uid;
    console.log("Card pressed for UID:", contactUid);

    const notificationsRef = ref(
      DRINKGUARD_DB,
      `users/${contactUid}/notifications`
    );
    get(notificationsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const notifications = snapshot.val();
          console.log("Notifications:", notifications);

          const notificationsArray = Array.isArray(notifications)
            ? notifications
            : Object.values(notifications);
          const sortedNotifications = notificationsArray.sort(
            (a, b) => new Date(b.sharedOn) - new Date(a.sharedOn)
          );

          if (sortedNotifications.length > 0) {
            setDrinkNotifications(sortedNotifications[0]);
          } else {
            setDrinkNotifications(null);
          }
        } else {
          setDrinkNotifications(null);
        }
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setDrinkNotifications(null);
        setIsModalVisible(true);
      });
  };

  // Render UI components
  return (
    <View testID="contacts-screen" style={styles.container}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/drinkguardofflogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Contacts</Text>
      </View>

      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#FF7F11", "#A32900"]}
          style={styles.buttonGradient}
        >
          <TouchableOpacity
            onPress={() =>
              !isSectionActive("Your Friends") && toggleSection("Your Friends")
            }
            style={[styles.headerButton, isSectionActive("Your Friends")]}
          >
            <Image
              source={require("../../assets/your_friends.png")}
              style={styles.buttonImage}
            />
            <Text
              style={[
                styles.sectionHeader,
                !isSectionActive("Your Friends") &&
                styles.inactiveSectionHeader,
              ]}
            >
              Your Friends
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={["#FF7F11", "#A32900"]}
          style={styles.buttonGradient}
        >
          <TouchableOpacity
            onPress={() =>
              !isSectionActive("Add Users") && toggleSection("Add Users")
            }
            style={[styles.headerButton, isSectionActive("Add Users")]}
          >
            <Image
              source={require("../../assets/other_users.png")}
              style={styles.buttonImage}
            />
            <Text
              style={[
                styles.sectionHeader,
                !isSectionActive("Add Users") && styles.inactiveSectionHeader,
              ]}
            >
              Add Users
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {activeSection === "Your Friends" && (
        <SectionList
          sections={[{ data: userFriends }]}
          renderItem={({ item }) => {
            return (
              <LinearGradient
                colors={["#FF7F11", "#A32900"]}
                style={styles.buttonGradient}
              >
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => handleCardPress(item)}
                >
                  <View style={styles.nameAndUsernameContainer}>
                    <Text style={styles.boldText}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text style={styles.usernameText}>@{item.username}</Text>
                  </View>
                  {usersWithNotifications[item.uid] && (
                    <Image
                      source={require("../../assets/notifications.png")}
                      style={styles.notificationImage}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleRemoveFriend(item.uid)}
                  >
                    <Image
                      source={require("../../assets/cancel.png")}
                      style={styles.cancelImage}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </LinearGradient>
            );
          }}
          keyExtractor={(item) => item.uid}
        />
      )}

      {activeSection === "Add Users" && (
        <SectionList
          sections={[{ data: allUsers }]}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#FF7F11", "#A32900"]}
              style={styles.buttonGradient}
            >
              <View style={styles.cardContainer}>
                <View style={styles.nameAndUsernameContainer}>
                  <Text style={styles.boldText}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={styles.usernameText}>@{item.username}</Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddFriend(item.uid)}
                >
                  <Image
                    source={require("../../assets/plus.png")}
                    style={styles.addImage}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}
          keyExtractor={(item) => item.uid}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Shared Drink Details</Text>
            {drinkNotifications ? (
              <>
                <Text style={styles.notificationText}>
                  <Text style={styles.boldText}>Shared On: </Text>
                  {new Date(drinkNotifications.sharedOn).toLocaleDateString(
                    "en-US"
                  )}
                </Text>
                <Text style={styles.notificationText}>
                  <Text style={styles.boldText}>Result: </Text>
                  {drinkNotifications.drinkResult.result}
                </Text>
                <Text style={styles.notificationText}>
                  <Text style={styles.boldText}>Contaminants: </Text>
                  {drinkNotifications.drinkResult.contaminants.join(", ")}
                </Text>
              </>
            ) : (
              <Text style={styles.noNotificationsText}>
                No current notifications
              </Text>
            )}
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <LinearGradient
                colors={["#FF7F11", "#A32900"]}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
