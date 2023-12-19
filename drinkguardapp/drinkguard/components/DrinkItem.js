import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function DrinkItem({ entryNumber, drink }) {
    const handlePress = () => {
        let message = drink.result === 'Contaminated' 
            ? `Detected Chemicals:\n${drink.contaminants.join(', ')}`
            : 'No contaminants found.';
        Alert.alert(`Drink Entry #${entryNumber}`, message);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <LinearGradient
                colors={["#FF7F11", "#A32900"]} // Use your gradient colors here
                style={styles.linearGradient}
            >
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.drinkName}>Drink Entry #{entryNumber}</Text>
                        <Text style={styles.drinkDetail}>Date: {drink.date}</Text>
                        <Text style={styles.drinkDetail}>Results: {drink.result}</Text>
                    </View>
                    <Image 
                        source={drink.result === 'Contaminated' ? require('../assets/remove.png') : require('../assets/check.png')} 
                        style={styles.statusIcon} 
                    />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: 8, // Same as your card's border radius
        marginVertical: 10, // Adjust margins as needed
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    infoContainer: {
        flex: 1,
    },
    drinkName: {
        color: '#fff', // slightly lighter orange
        fontSize: 18,
        fontWeight: 'bold',
    },
    drinkDetail: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
    statusIcon: {
        width: 30, // Size of the icon
        height: 30, // Size of the icon
        resizeMode: 'contain', // Keep the aspect ratio of the icon
    },
});

export default DrinkItem;
