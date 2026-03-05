import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cars } from '../data/cars';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const removeFavorite = async (carId) => {
    try {
      const updatedFavorites = favorites.filter(id => id !== carId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const favoriteCars = cars.filter(car => favorites.includes(car.id));

  const renderCar = ({ item }) => (
    <Card style={styles.carCard}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.year} {item.make} {item.model}</Title>
        <Paragraph>Mileage: {item.mileage.toLocaleString()} miles</Paragraph>
        <Paragraph>Color: {item.color}</Paragraph>
        <Paragraph style={styles.price}>${item.price.toLocaleString()}</Paragraph>
        <View style={styles.buttonContainer}>
          <Card.Actions>
            <FAB
              icon="eye"
              size="small"
              onPress={() => navigation.navigate('CarDetail', { car: item })}
              style={styles.viewButton}
            />
            <FAB
              icon="heart-off"
              size="small"
              onPress={() => removeFavorite(item.id)}
              style={styles.removeButton}
            />
          </Card.Actions>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {favoriteCars.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite cars yet</Text>
          <Text style={styles.emptySubtext}>Browse our inventory and add cars to your favorites!</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteCars}
          renderItem={renderCar}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  carCard: {
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#3498db',
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
  },
});

export default FavoritesScreen;