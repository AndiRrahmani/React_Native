import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

const Home = () => {
  const navigation = useNavigation();

  // Sample carousel data
  const carouselItems = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Designer",
      image: require("../../assets/dhurata.jpg"),
      rating: "4.8",
      badge: "Top",
      badgeColor: "#FF6B6B"
    },
    {
      id: 2,
      name: "Emily Davis",
      title: "Developer",
      image: require("../../assets/dhurata.jpg"),
      rating: "4.9",
      badge: "Featured",
      badgeColor: "#4ECDC4"
    },
    {
      id: 3,
      name: "Jessica Lee",
      title: "Manager",
      image: require("../../assets/dhurata.jpg"),
      rating: "4.7",
      badge: "Expert",
      badgeColor: "#95E1D3"
    },
    {
      id: 4,
      name: "Lisa Wong",
      title: "Consultant",
      image: require("../../assets/dhurata.jpg"),
      rating: "4.6",
      badge: "Pro",
      badgeColor: "#FFE66D"
    },
    {
      id: 5,
      name: "Rachel Brown",
      title: "Specialist",
      image: require("../../assets/dhurata.jpg"),
      rating: "4.5",
      badge: "Verified",
      badgeColor: "#A8E6CF"
    }
  ];

  return (
    <View style={styles.container}>
      <Swiper
      style={styles.swiper}
      showsPagination
      dotColor="#999"
      activeDotColor="#007AFF"
      >

        <View style={styles.slide}>

          <Image source={require("../../assets/dhurata.jpg")}
          style={styles.slideImage}
          resizeMode="cover"
          >

          </Image>
        </View>

        <View style={styles.slide}>

          <Image source={require("../../assets/dhurata.jpg")}
          style={styles.slideImage}
          resizeMode="cover"
          >

          </Image>
        </View>

        <View style={styles.slide}>

          <Image source={require("../../assets/dhurata.jpg")}
          style={styles.slideImage}
          resizeMode="cover"
          >

          </Image>
        </View>

      </Swiper>

      {/* Horizontal Carousel */}
      <View style={styles.carouselSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Profiles</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        >
          {carouselItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
              <View style={styles.cardImageWrapper}>
                <Image 
                  source={item.image} 
                  style={styles.cardImage}
                />
                <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                </View>
                <TouchableOpacity style={styles.contactBtn}>
                  <Text style={styles.contactBtnText}>Contact</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  swiper: {
    height: 200,
    backgroundColor: "#F5F5F5"
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  
  // Carousel Styles
  carouselSection: {
    paddingVertical: 25,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#007AFF",
  },
  carouselContainer: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  card: {
    marginHorizontal: 8,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    width: 150,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardImageWrapper: {
    position: "relative",
    width: "100%",
    height: 140,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FF6B6B",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  cardContent: {
    padding: 14,
    alignItems: "center",
  },
  cardName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 5,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 11,
    color: "#999",
    marginBottom: 10,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ratingContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rating: {
    fontSize: 13,
    color: "#FFB84D",
    fontWeight: "600",
  },
  contactBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 6,
  },
  contactBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default Home;
