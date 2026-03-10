import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Searchbar, Chip, Menu, Button } from 'react-native-paper';
import { cars } from '../data/cars';

const CarListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceFilter, setPriceFilter] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);

  const priceRanges = {
    all: { min: 0, max: Infinity },
    under25k: { min: 0, max: 25000 },
    '25k-40k': { min: 25000, max: 40000 },
    '40k-60k': { min: 40000, max: 60000 },
    over60k: { min: 60000, max: Infinity },
  };

  const applyFilters = (query, sort, order, priceRange) => {
    let filtered = cars.filter(car => {
      const matchesSearch = `${car.make} ${car.model}`.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = car.price >= priceRanges[priceRange].min && car.price <= priceRanges[priceRange].max;
      return matchesSearch && matchesPrice;
    });

    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sort) {
        case 'price':
          aVal = a.price;
          bVal = b.price;
          break;
        case 'year':
          aVal = a.year;
          bVal = b.year;
          break;
        case 'mileage':
          aVal = a.mileage;
          bVal = b.mileage;
          break;
        default:
          return 0;
      }
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    });

    setFilteredCars(filtered);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, sortBy, sortOrder, priceFilter);
  };

  const onSortChange = (sort) => {
    setSortBy(sort);
    setMenuVisible(false);
    applyFilters(searchQuery, sort, sortOrder, priceFilter);
  };

  const onPriceFilterChange = (range) => {
    setPriceFilter(range);
    applyFilters(searchQuery, sortBy, sortOrder, range);
  };

  const renderCar = ({ item }) => (
    <Card style={styles.carCard} onPress={() => navigation.navigate('CarDetail', { car: item })}>
      <Card.Cover source={{ uri: item.images ? item.images[0] : item.image }} />
      <Card.Content>
        <Title>{item.year} {item.make} {item.model}</Title>
        <Paragraph>Mileage: {item.mileage.toLocaleString()} miles</Paragraph>
        <Paragraph>Color: {item.color}</Paragraph>
        <Paragraph style={styles.price}>${item.price.toLocaleString()}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search cars..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.priceFilterScroll}>
          {Object.keys(priceRanges).map(range => (
            <Chip
              key={range}
              selected={priceFilter === range}
              onPress={() => onPriceFilterChange(range)}
              style={styles.priceChip}
            >
              {range === 'all' ? 'All Prices' :
               range === 'under25k' ? 'Under $25K' :
               range === '25k-40k' ? '$25K-$40K' :
               range === '40k-60k' ? '$40K-$60K' : 'Over $60K'}
            </Chip>
          ))}
        </ScrollView>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Button onPress={() => setMenuVisible(true)} mode="outlined" style={styles.sortButton}>Sort by {sortBy}</Button>}
        >
          <Menu.Item onPress={() => onSortChange('price')} title="Price" />
          <Menu.Item onPress={() => onSortChange('year')} title="Year" />
          <Menu.Item onPress={() => onSortChange('mileage')} title="Mileage" />
        </Menu>
      </View>
      <Text style={styles.resultsText}>{filteredCars.length} vehicles found</Text>
      <FlatList
        data={filteredCars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchBar: {
    margin: 10,
    backgroundColor: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priceFilterScroll: {
    flex: 1,
  },
  priceChip: {
    marginRight: 8,
  },
  sortButton: {
    marginLeft: 10,
  },
  resultsText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 10,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
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
});

export default CarListScreen;