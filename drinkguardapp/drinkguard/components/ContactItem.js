import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ContactItem = ({ contact, onSelect }) => (
    <View style={styles.container}>
        <Image source={contact.image} style={styles.contactImage} />
        <TouchableOpacity onPress={() => onSelect(contact)}>
            <Text style={styles.contactName}>{contact.name}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    contactImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    contactName: {
        fontSize: 16,
    },
});

export default ContactItem;