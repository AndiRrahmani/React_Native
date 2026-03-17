import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, Checkbox, Divider, ProgressBar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { cars } from '../data/cars';

const CompareScreen = ({ navigation }) => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCarSelection = (car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    } else {
      Alert.alert('Limit Reached', 'You can compare up to 2 cars at a time');
    }
  };

  const getBetterValue = (value1, value2, isLowerBetter = false) => {
    if (isLowerBetter) {
      return value1 < value2 ? 1 : value1 > value2 ? 2 : 0;
    }
    return value1 > value2 ? 1 : value1 < value2 ? 2 : 0;
  };

  const getIndicatorColor = (position) => {
    if (position === 1) return '#27ae60';
    if (position === 2) return '#e74c3c';
    return '#95a5a6';
  };

  const ComparisonRow = ({ label, value1, value2, unit = '', isLowerBetter = false, formatValue = (v) => v }) => {
    const better = getBetterValue(value1, value2, isLowerBetter);
    return (
      <View style={styles.comparisonRow}>
        <Text style={styles.comparisonLabel}>{label}</Text>
        <View style={styles.comparisonValues}>
          <View style={[styles.valueBox, { borderLeftColor: getIndicatorColor(better) }]}>
            <Text style={[styles.valueText, { color: getIndicatorColor(better) }]}>
              {formatValue(value1)}{unit}
            </Text>
          </View>
          <View style={[styles.valueBox, { borderLeftColor: getIndicatorColor(better === 1 ? 2 : better === 2 ? 1 : 0) }]}>
            <Text style={[styles.valueText, { color: getIndicatorColor(better === 1 ? 2 : better === 2 ? 1 : 0) }]}>
              {formatValue(value2)}{unit}
            </Text>
          </View>
        </View>
      </View>
    );
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
              <View style={styles.ratingBadge}>
                <MaterialIcons name="star" size={14} color="#f39c12" />
                <Text style={styles.ratingText}>{item.rating} ({item.reviews} reviews)</Text>
              </View>
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
    setShowComparison(true);
  };

  if (showComparison && selectedCars.length === 2) {
    const [car1, car2] = selectedCars;
    const maxPrice = Math.max(car1.price, car2.price);
    const maxMileage = Math.max(car1.mileage, car2.mileage);
    const maxRating = 5;

    return (
      <ScrollView style={styles.comparisonContainer}>
        <View style={styles.comparisonHeader}>
          <Button onPress={() => setShowComparison(false)} style={styles.backButton}>
            ← Back to Selection
          </Button>
          <Text style={styles.comparisonTitle}>Car Comparison</Text>
        </View>

        <View style={styles.carHeadersRow}>
          <Text style={[styles.carHeaderText, { flex: 1 }]}>Specs</Text>
          <View style={styles.carComparisonHeader}>
            <View style={styles.carHeaderItem}>
              <Text style={styles.carHeaderYear}>{car1.year}</Text>
              <Text style={styles.carHeaderName}>{car1.make} {car1.model}</Text>
            </View>
            <View style={styles.carHeaderItem}>
              <Text style={styles.carHeaderYear}>{car2.year}</Text>
              <Text style={styles.carHeaderName}>{car2.make} {car2.model}</Text>
            </View>
          </View>
        </View>

        <Divider />

        {/* Price Comparison */}
        <ComparisonRow
          label="Price"
          value1={car1.price}
          value2={car2.price}
          unit=""
          isLowerBetter={true}
          formatValue={(v) => `$${v.toLocaleString()}`}
        />

        {/* Year Comparison */}
        <ComparisonRow
          label="Year"
          value1={car1.year}
          value2={car2.year}
          unit=""
          isLowerBetter={false}
        />

        {/* Mileage Comparison */}
        <ComparisonRow
          label="Mileage"
          value1={car1.mileage}
          value2={car2.mileage}
          unit=" mi"
          isLowerBetter={true}
          formatValue={(v) => v.toLocaleString()}
        />

        {/* Color */}
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>Color</Text>
          <View style={styles.comparisonValues}>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>{car1.color}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>{car2.color}</Text>
            </View>
          </View>
        </View>

        {/* Rating Comparison */}
        <View style={styles.comparisonRow}>
          <Text style={styles.comparisonLabel}>Customer Rating</Text>
          <View style={styles.comparisonValues}>
            <View style={styles.valueBox}>
              <View style={styles.ratingDisplay}>
                <MaterialIcons name="star" size={18} color="#f39c12" />
                <Text style={styles.ratingDisplayText}>{car1.rating}</Text>
              </View>
              <Text style={styles.reviewCount}>{car1.reviews} reviews</Text>
            </View>
            <View style={styles.valueBox}>
              <View style={styles.ratingDisplay}>
                <MaterialIcons name="star" size={18} color="#f39c12" />
                <Text style={styles.ratingDisplayText}>{car2.rating}</Text>
              </View>
              <Text style={styles.reviewCount}>{car2.reviews} reviews</Text>
            </View>
          </View>
        </View>

        {/* Features Comparison */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresRow}>
            <View style={styles.featureColumn}>
              {car1.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={16} color="#27ae60" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <View style={styles.featureColumn}>
              {car2.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={16} color="#27ae60" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>About These Cars</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>{car1.year} {car1.make} {car1.model}</Text>
            <Text style={styles.descriptionText}>{car1.description}</Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>{car2.year} {car2.make} {car2.model}</Text>
            <Text style={styles.descriptionText}>{car2.description}</Text>
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <Button mode="contained" onPress={() => setShowComparison(false)} style={styles.actionButton}>
            Start Over
          </Button>
        </View>
      </ScrollView>
    );
  }

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

const windowWidth = Dimensions.get('window').width;

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
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#7f8c8d',
  },
  compareButton: {
    margin: 20,
  },
  // Comparison view styles
  comparisonContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  comparisonHeader: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  comparisonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  carHeadersRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#ecf0f1',
  },
  carHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2c3e50',
  },
  carComparisonHeader: {
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carHeaderItem: {
    flex: 1,
    alignItems: 'center',
  },
  carHeaderYear: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  carHeaderName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    alignItems: 'center',
  },
  comparisonLabel: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    color: '#2c3e50',
  },
  comparisonValues: {
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueBox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#95a5a6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingDisplayText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
    color: '#f39c12',
  },
  reviewCount: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 3,
  },
  featuresSection: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureColumn: {
    flex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#2c3e50',
    marginLeft: 8,
    flex: 1,
  },
  descriptionSection: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  descriptionBox: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  bottomButtons: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  actionButton: {
    marginBottom: 10,
  },
});

export default CompareScreen;