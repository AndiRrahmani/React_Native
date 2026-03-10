import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Checkbox } from 'react-native-paper';
import { cars } from '../data/cars';

const CompareScreen = ({ navigation }) => {
  const [selectedCars, setSelectedCars] = useState([]);

  const toggleCarSelection = (car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    } else {
      Alert.alert('Limit Reached', 'You can compare up to 2 cars at a time');
    }
  };

  const renderCar = ({ item }) => {
    const isSelected = selectedCars.find(c => c.id === item.id);

    return (
      <Card style={[styles.carCard, isSelected && styles.selectedCard]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Checkbox
              status={isSelected ? 'checked' : 'unchecked'}
              onPress={() => toggleCarSelection(item)}
            />
            <View style={styles.carInfo}>
              <Title style={styles.carTitle}>{item.year} {item.make} {item.model}</Title>
              <Paragraph>${item.price.toLocaleString()}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const compareCars = () => {
    if (selectedCars.length !== 2) {
      Alert.alert('Select Cars', 'Please select exactly 2 cars to compare');
      return;
    }

    const [car1, car2] = selectedCars;
    let comparison = `Comparing ${car1.year} ${car1.make} ${car1.model} vs ${car2.year} ${car2.make} ${car2.model}\n\n`;
    comparison += `Price: $${car1.price.toLocaleString()} vs $${car2.price.toLocaleString()}\n`;
    comparison += `Mileage: ${car1.mileage.toLocaleString()} vs ${car2.mileage.toLocaleString()} miles\n`;
    comparison += `Year: ${car1.year} vs ${car2.year}\n`;

    Alert.alert('Car Comparison', comparison);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compare Cars</Text>
      <Text style={styles.subtitle}>Select up to 2 cars to compare</Text>
      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      {selectedCars.length === 2 && (
        <Button mode="contained" onPress={compareCars} style={styles.compareButton}>
          Compare Selected Cars
        </Button>
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
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
  },
  listContainer: {
    paddingBottom: 20,
  },
  carCard: {
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carInfo: {
    flex: 1,
    marginLeft: 10,
  },
  carTitle: {
    fontSize: 16,
  },
  compareButton: {
    margin: 20,
  },
});

export default CompareScreen;