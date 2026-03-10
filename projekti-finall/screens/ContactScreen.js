import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, TextInput, Button, Paragraph, List } from 'react-native-paper';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // In a real app, this would send the data to a server
    Alert.alert(
      'Thank You!',
      'Your message has been sent. We\'ll get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }}]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Contact Us</Title>
          <Paragraph>Ready to find your perfect vehicle? Get in touch with our team!</Paragraph>

          <TextInput
            label="Full Name *"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            label="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="Message *"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Send Message
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title>Visit Our Showroom</Title>
          <List.Item
            title="Address"
            description="123 Auto Drive, Car City, ST 12345"
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title="Phone"
            description="(555) 123-4567"
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            title="Email"
            description="info@eliteautodealership.com"
            left={props => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="Hours"
            description="Mon-Fri: 9AM-8PM, Sat: 9AM-6PM, Sun: Closed"
            left={props => <List.Icon {...props} icon="clock" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  infoCard: {
    marginBottom: 20,
  },
});

export default ContactScreen;