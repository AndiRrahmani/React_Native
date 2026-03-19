import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, FAB, Avatar } from 'react-native-paper';
import { FavoritesContext } from '../contexts/FavoritesContext';

const CarDetailScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useContext(FavoritesContext);

  useEffect(() => {
    addRecentlyViewed(car);
  }, [car, addRecentlyViewed]);

  const favorited = isFavorite(car.id);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.imageCard}>
        <Card.Cover source={{ uri: car.images ? car.images[0] : car.image }} />
      </Card>
      <Card style={styles.detailsCard}>
        <Card.Content>
          <Title style={styles.title}>{car.year} {car.make} {car.model}</Title>
          <Paragraph style={styles.price}>${car.price.toLocaleString()}</Paragraph>
          <View style={styles.specsContainer}>
            <Chip icon="speedometer" style={styles.chip}>Mileage: {car.mileage.toLocaleString()} miles</Chip>
            <Chip icon="palette" style={styles.chip}>Color: {car.color}</Chip>
          </View>
          <Paragraph style={styles.description}>{car.description}</Paragraph>

          {car.rating && (
            <View style={styles.ratingContainer}>
              <Title style={styles.reviewsTitle}>Customer Reviews</Title>
              <View style={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <Avatar.Icon
                    key={i}
                    size={20}
                    icon={i < Math.floor(car.rating) ? "star" : "star-outline"}
                    style={styles.star}
                  />
                ))}
                <Paragraph style={styles.ratingText}>{car.rating} ({car.reviews} reviews)</Paragraph>
              </View>
            </View>
          )}

          {car.features && (
            <>
              <Title style={styles.featuresTitle}>Key Features</Title>
              <View style={styles.featuresContainer}>
                {car.features.map((feature, index) => (
                  <Chip key={index} style={styles.featureChip}>{feature}</Chip>
                ))}
              </View>
            </>
          )}
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          mode={favorited ? 'contained' : 'outlined'}
          icon={favorited ? 'heart' : 'heart-outline'}
          onPress={() => toggleFavorite(car.id)}
          style={styles.button}
        >
          {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>

        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Schedule Test Drive
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          Get Financing Quote
        </Button>
        <Button mode="text" onPress={() => {}} style={styles.button}>
          Contact Dealer
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageCard: {
    margin: 10,
  },
  detailsCard: {
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 10,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 15,
  },
  chip: {
    marginRight: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginTop: 10,
  },
  ratingContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    backgroundColor: '#f39c12',
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 10,
    color: '#7f8c8d',
  },
  featuresTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#ecf0f1',
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default CarDetailScreen;