import React, { useContext, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Avatar, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cars } from '../data/cars';
import { AuthContext } from '../contexts/AuthContext';
import { FavoritesContext } from '../contexts/FavoritesContext';

const SAVED_COMPARISONS_KEY = 'savedComparisons';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { favorites, recentlyViewed } = useContext(FavoritesContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedComparisons, setSavedComparisons] = useState([]);
  const [loadingSavedComparisons, setLoadingSavedComparisons] = useState(false);

  const featuredCars = useMemo(() => {
    return [...cars]
      .sort((a, b) => {
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.reviews || 0) - (a.reviews || 0);
      })
      .slice(0, 3);
  }, []);

  const loadSavedComparisons = async () => {
    setLoadingSavedComparisons(true);
    try {
      const stored = await AsyncStorage.getItem(SAVED_COMPARISONS_KEY);
      if (stored) {
        setSavedComparisons(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Error loading saved comparisons', error);
    } finally {
      setLoadingSavedComparisons(false);
    }
  };

  useEffect(() => {
    loadSavedComparisons();
  }, []);

  const renderSavedComparison = ({ item }) => (
    <Card
      style={styles.savedCard}
      onPress={() => navigation.navigate('Compare', { loadComparisonId: item.id })}
    >
      <Card.Content>
        <Title style={styles.savedCardTitle}>{item.name}</Title>
        <Paragraph style={styles.savedCardMeta}>{new Date(item.timestamp).toLocaleString()}</Paragraph>
      </Card.Content>
    </Card>
  );

  const handleQuickSearch = () => {
    const query = searchQuery.trim();
    navigation.navigate('CarList', { initialQuery: query });
  };

  const renderCar = ({ item }) => (
    <Card style={styles.carCard} onPress={() => navigation.navigate('CarDetail', { car: item })}>
      <Card.Cover source={{ uri: item.images ? item.images[0] : item.image }} />
      <Card.Content>
        <Title>{item.year} {item.make} {item.model}</Title>
        <Paragraph>${item.price.toLocaleString()}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroTitle}>Welcome{user ? `, ${user.name}` : ''}</Text>
            <Text style={styles.heroSubtitle}>Find your perfect vehicle with our premium selection</Text>
            {favorites.length > 0 && (
              <Text style={styles.heroSubtitle}>{favorites.length} favorite{favorites.length === 1 ? '' : 's'} saved</Text>
            )}
          </View>
          {user?.avatar ? (
            <Avatar.Image size={56} source={{ uri: user.avatar }} />
          ) : (
            <Avatar.Icon size={56} icon="car" />
          )}
        </View>

        <Searchbar
          placeholder="Search cars..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onIconPress={handleQuickSearch}
          onSubmitEditing={handleQuickSearch}
          style={styles.searchBar}
        />

        <View style={styles.quickActions}>
          <Button mode="contained" onPress={() => navigation.navigate('CarList')} style={styles.quickActionButton}>
            Browse Inventory
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('Favorites')} style={styles.quickActionButton}>
            My Favorites
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('Compare')} style={styles.quickActionButton}>
            Compare Cars
          </Button>
        </View>
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

      {savedComparisons.length > 0 && (
        <View style={styles.savedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Comparisons</Text>
            <Button mode="text" onPress={() => navigation.navigate('Compare')}>
              See all
            </Button>
          </View>
          {loadingSavedComparisons ? (
            <ActivityIndicator animating size="small" style={styles.savedLoading} />
          ) : (
            <FlatList
              data={savedComparisons.slice(0, 3)}
              renderItem={renderSavedComparison}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      )}

      {recentlyViewed.length > 0 && (
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
            <Button mode="text" onPress={() => navigation.navigate('CarList')}>See all</Button>
          </View>
          <FlatList
            data={recentlyViewed}
            renderItem={renderCar}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}

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
    padding: 20,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    marginTop: 6,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickActionButton: {
    flex: 1,
    marginVertical: 4,
    marginRight: 8,
  },
  featuredSection: {
    padding: 20,
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  savedSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  savedCard: {
    width: 220,
    marginRight: 15,
    backgroundColor: 'white',
  },
  savedCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  savedCardMeta: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  savedLoading: {
    marginVertical: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
});

export default HomeScreen;