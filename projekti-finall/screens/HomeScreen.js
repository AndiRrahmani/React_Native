import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { cars } from '../data/cars';

const HomeScreen = ({ navigation }) => {
  const featuredCars = cars.slice(0, 3);

  const renderCar = ({ item }) => (
    <Card style={styles.carCard} onPress={() => navigation.navigate('CarDetail', { car: item })}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.year} {item.make} {item.model}</Title>
        <Paragraph>${item.price.toLocaleString()}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to Elite Auto Dealership</Text>
        <Text style={styles.heroSubtitle}>Find your perfect vehicle with our premium selection</Text>
        <Button mode="contained" onPress={() => navigation.navigate('CarList')} style={styles.heroButton}>
          Browse Inventory
        </Button>
      </View>
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Vehicles</Text>
        <FlatList
          data={featuredCars}
          renderItem={renderCar}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.aboutText}>
          With over 20 years of experience, we provide exceptional service and the finest selection of vehicles.
          Our certified pre-owned cars come with comprehensive warranties and competitive financing options.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    backgroundColor: '#2c3e50',
    padding: 30,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#3498db',
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  listContainer: {
    paddingVertical: 10,
  },
  carCard: {
    width: 250,
    marginRight: 15,
  },
  aboutSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
});

export default HomeScreen;