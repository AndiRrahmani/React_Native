import React, { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph, FAB, Searchbar, Menu, Button, Checkbox } from 'react-native-paper';
import { cars } from '../data/cars';
import { FavoritesContext } from '../contexts/FavoritesContext';

const SORT_OPTIONS = [
  { key: 'priceAsc', label: 'Price: Low → High', comparator: (a, b) => a.price - b.price },
  { key: 'priceDesc', label: 'Price: High → Low', comparator: (a, b) => b.price - a.price },
  { key: 'yearDesc', label: 'Year: New → Old', comparator: (a, b) => b.year - a.year },
  { key: 'ratingDesc', label: 'Rating', comparator: (a, b) => b.rating - a.rating },
];

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite, clearFavorites } = useContext(FavoritesContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState('priceDesc');
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const favoriteCars = useMemo(() => {
    const base = cars.filter(car => favorites.includes(car.id));
    const filtered = searchQuery.trim()
      ? base.filter((car) =>
          `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : base;

    const sortConfig = SORT_OPTIONS.find((o) => o.key === sortOption);
    if (sortConfig) {
      return [...filtered].sort(sortConfig.comparator);
    }
    return filtered;
  }, [favorites, searchQuery, sortOption]);

  const toggleSelectForCompare = (carId) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 2) {
        Alert.alert('Compare Limit', 'You can only compare 2 cars at a time.');
        return prev;
      }
      return [...prev, carId];
    });
  };

  const compareSelected = () => {
    if (selectedForCompare.length !== 2) {
      Alert.alert('Select Cars', 'Please select exactly 2 favorites to compare.');
      return;
    }
    navigation.navigate('Compare', { selectedIds: selectedForCompare });
  };

  const confirmClearFavorites = () => {
    if (favorites.length === 0) return;
    Alert.alert(
      'Clear Favorites',
      'Remove all favorite cars?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => clearFavorites() },
      ]
    );
  };

  const renderCar = ({ item }) => {
    const isSelected = selectedForCompare.includes(item.id);

    return (
      <Card style={[styles.carCard, isSelected && styles.selectedCard]}>
        <Card.Cover source={{ uri: item.images ? item.images[0] : item.image }} />
        <Card.Content>
          <View style={styles.cardHeader}>
            <Checkbox
              status={isSelected ? 'checked' : 'unchecked'}
              onPress={() => toggleSelectForCompare(item.id)}
            />
            <View style={styles.carInfo}>
              <Title>{item.year} {item.make} {item.model}</Title>
              <Paragraph>Mileage: {item.mileage.toLocaleString()} miles</Paragraph>
              <Paragraph>Color: {item.color}</Paragraph>
              <Paragraph style={styles.price}>${item.price.toLocaleString()}</Paragraph>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Card.Actions>
              <FAB
                icon="eye"
                size="small"
                onPress={() => navigation.navigate('CarDetail', { car: item })}
                style={styles.viewButton}
              />
              <FAB
                icon="heart"
                size="small"
                onPress={() => toggleFavorite(item.id)}
                style={styles.removeButton}
              />
            </Card.Actions>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const selectedCount = selectedForCompare.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>

      <Searchbar
        placeholder="Search favorites..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      <View style={styles.controlsRow}>
        <Menu
          visible={sortMenuVisible}
          onDismiss={() => setSortMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setSortMenuVisible(true)}>
              Sort
            </Button>
          }
        >
          {SORT_OPTIONS.map((option) => (
            <Menu.Item
              key={option.key}
              title={option.label}
              onPress={() => {
                setSortOption(option.key);
                setSortMenuVisible(false);
              }}
            />
          ))}
        </Menu>
        <Button mode="text" onPress={confirmClearFavorites}>
          Clear All
        </Button>
      </View>

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

      {selectedCount > 0 && (
        <View style={styles.compareBar}>
          <Text style={styles.compareText}>{selectedCount} selected</Text>
          <Button
            mode="contained"
            disabled={selectedCount !== 2}
            onPress={compareSelected}
          >
            Compare
          </Button>
          <Button mode="text" onPress={() => setSelectedForCompare([])}>
            Clear
          </Button>
        </View>
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
  searchBar: {
    marginBottom: 10,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  compareBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  compareText: {
    fontSize: 14,
    fontWeight: '600',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  carInfo: {
    flex: 1,
    marginLeft: 10,
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