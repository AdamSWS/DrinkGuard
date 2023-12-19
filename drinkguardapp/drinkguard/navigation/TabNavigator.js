import HomeScreen from '../screens/Home/HomeScreen';
import ContactsScreen from '../screens/Contacts/ContactsScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import DrinkSafeScreen from '../screens/DrinkSafe/DrinkSafeScreen';
import RideShareScreen from '../screens/RideShare/RideShareScreen';
import FeedbackScreen from '../screens/Feedback/FeedbackScreen';
import { Alert, Image, TouchableOpacity, Text, View } from 'react-native';
import homeIcon from '../assets/home.png';
import contactsIcon from '../assets/contact-book.png';
import historyIcon from '../assets/history.png';
import editProfileIcon from '../assets/user.png';
import drinkSafeIcon from '../assets/drink_safe.png';
import rideShareIcon from '../assets/car.png';
import feedbackIcon from '../assets/feedback.png';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { DRINKGUARD_AUTH } from '../firebaseConfig';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(DRINKGUARD_AUTH);
      navigation.reset({
        index: 0,
        routes: [{ name: "AccountCreationScreen" }],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 10, borderTopWidth: 1, borderColor: '#ccc' }}>
        <TouchableOpacity onPress={handleSignOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/logout.png')} style={{ width: 24, height: 24 }} />
          <Text style={{ marginLeft: 32, fontSize: 16 }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      {/* Main */}
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerIcon: () => <Image source={homeIcon} style={{ width: 24, height: 24 }} />,
          title: 'Home',
        }}
      />

      {/* Profile & Settings */}
      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          drawerIcon: () => <Image source={editProfileIcon} style={{ width: 24, height: 24 }} />,
          title: 'Edit Profile',
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          drawerIcon: () => <Image source={contactsIcon} style={{ width: 24, height: 24 }} />,
        }}
      />

      {/* Safety */}
      <Drawer.Screen
        name="DrinkSafe"
        component={DrinkSafeScreen}
        options={{
          drawerIcon: () => <Image source={drinkSafeIcon} style={{ width: 24, height: 24 }} />,
        }}
      />
      <Drawer.Screen
        name="RideShare"
        component={RideShareScreen}
        options={{
          drawerIcon: () => <Image source={rideShareIcon} style={{ width: 24, height: 24 }} />,
        }}
      />

      {/* History */}
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerIcon: () => <Image source={historyIcon} style={{ width: 24, height: 24 }} />,
        }}
      />

      {/* Social & Feedback */}
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          drawerIcon: () => <Image source={feedbackIcon} style={{ width: 24, height: 24 }} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
