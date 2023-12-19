import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './RideShareScreenStyles';
import { LinearGradient } from 'expo-linear-gradient';
import Particle from '../../components/Particle';

export default function RideShareScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [rideStatus, setRideStatus] = useState('standby');
  const [eta, setEta] = useState('');
  const [searching, setSearching] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [dots, setDots] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    let intervalId;

    if (searching) {
      intervalId = setInterval(() => {
        setDots(prev => (prev.length === 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }

    return () => clearInterval(intervalId);
  }, [searching]);

  useEffect(() => {
    let timeoutId;
  
    if (searching) {
      timeoutId = setTimeout(() => {
        Alert.alert("Driver found", "A driver is on the way!", [
          { text: "OK", onPress: () => {
            setRideStatus('enroute');
            setSearching(false);
          }}
        ]);
      }, 5000 + Math.random() * 5000);
    }
  
    return () => clearTimeout(timeoutId);
  }, [searching]);

  useEffect(() => {
    console.log('Ride Status:', rideStatus);
  }, [rideStatus]);

  useEffect(() => {
    let timeoutId;
  
    if (searching) {
      timeoutId = setTimeout(() => {
        setRideStatus('enroute');  // Directly setting the ride status to 'enroute'
        setSearching(false);
      }, 5000 + Math.random() * 5000);
    }
  
    return () => clearTimeout(timeoutId);
  }, [searching]);

  const requestRide = (service) => {
    setServiceType(service);
    setSearching(true);
    setRideStatus('searching');

    const now = new Date();
    const minutesToAdd = 10 + Math.floor(Math.random() * 5);
    const etaDate = new Date(now.getTime() + minutesToAdd * 60000);
    const etaString = etaDate.toLocaleTimeString([], { timeStyle: 'short' });
    setEta(etaString);
  };

  const cancelSearch = () => {
    setSearching(false);
    setRideStatus('standby');
    setEta('');
  };

  const renderRequestButtons = () => {
    if (rideStatus === 'standby') {
      return (
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#FF7F11", "#A32900"]}
            style={styles.buttonGradient}
          >
            <TouchableOpacity onPress={() => requestRide('Uber')} style={styles.touchableButton}>
              <Text style={styles.buttonText}>Request Uber</Text>
            </TouchableOpacity>
          </LinearGradient>
  
          <LinearGradient
            colors={["#FF7F11", "#A32900"]}
            style={styles.buttonGradient}
          >
            <TouchableOpacity onPress={() => requestRide('Lyft')} style={styles.touchableButton}>
              <Text style={styles.buttonText}>Request Lyft</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
            {Array.from({ length: 15 }).map((_, index) => (
        <Particle key={index} />
      ))}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/drinkguardofflogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Ride Share</Text>
      </View>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
          />
        </MapView>
      )}
      
      {rideStatus === 'searching' && (
  <View style={styles.loadingContainer}>
    <Text style={styles.searchingText}>
      Looking for a driver{dots}
    </Text>
    <ActivityIndicator size="large" color="#FF7F11" />
  </View>
)}

      {/* Render the 'Request Ride' buttons only if the rideStatus is 'standby' */}
      {rideStatus === 'standby' && renderRequestButtons()}
      
      {/* Conditionally render the "Driver enroute" text */}
      {rideStatus === 'enroute' && (
        <Text style={styles.rideStatus}>
          There is currently a driver enroute that is estimated to arrive at {eta}.
        </Text>
      )}

      {/* Always render the cancel button when searching or a driver is enroute */}
      {(rideStatus === 'searching' || rideStatus === 'enroute') && (
  <View style={styles.buttonContainerSingle}>
    <LinearGradient
      colors={["#FF7F11", "#A32900"]}
      style={styles.buttonGradient}
    >
      <TouchableOpacity onPress={cancelSearch} style={styles.touchableButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
)}
    </View>
  );
}
