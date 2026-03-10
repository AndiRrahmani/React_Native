import React from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { Card, Title, Paragraph, List, Button } from 'react-native-paper';

const LocationScreen = () => {
  const dealershipLocation = {
    address: '123 Auto Drive, Car City, ST 12345',
    phone: '(555) 123-4567',
    email: 'info@eliteautodealership.com',
    hours: 'Mon-Fri: 9AM-8PM, Sat: 9AM-6PM, Sun: Closed',
    coordinates: { lat: 40.7128, lng: -74.0060 }, // New York coordinates as example
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${dealershipLocation.coordinates.lat},${dealershipLocation.coordinates.lng}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open maps application');
    });
  };

  const callDealership = () => {
    const url = `tel:${dealershipLocation.phone.replace(/\D/g, '')}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to make phone call');
    });
  };

  const emailDealership = () => {
    const url = `mailto:${dealershipLocation.email}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open email application');
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.mapCard}>
        <Card.Content>
          <Title>Our Location</Title>
          <Paragraph style={styles.address}>{dealershipLocation.address}</Paragraph>
          <Button mode="contained" onPress={openInMaps} style={styles.mapButton}>
            View on Map
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title>Contact Information</Title>
          <List.Item
            title="Phone"
            description={dealershipLocation.phone}
            left={props => <List.Icon {...props} icon="phone" />}
            onPress={callDealership}
          />
          <List.Item
            title="Email"
            description={dealershipLocation.email}
            left={props => <List.Icon {...props} icon="email" />}
            onPress={emailDealership}
          />
          <List.Item
            title="Business Hours"
            description={dealershipLocation.hours}
            left={props => <List.Icon {...props} icon="clock" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.directionsCard}>
        <Card.Content>
          <Title>Visit Our Showroom</Title>
          <Paragraph>
            Located in the heart of Car City, our dealership features a modern showroom
            with over 200 vehicles in stock. We offer complimentary refreshments, free Wi-Fi,
            and dedicated sales consultants to help you find your perfect vehicle.
          </Paragraph>
          <Paragraph style={styles.parking}>
            Free parking available for all visitors.
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  mapCard: {
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  mapButton: {
    marginTop: 10,
  },
  infoCard: {
    marginBottom: 20,
  },
  directionsCard: {
    marginBottom: 20,
  },
  parking: {
    fontStyle: 'italic',
    marginTop: 10,
    color: '#27ae60',
  },
});

export default LocationScreen;