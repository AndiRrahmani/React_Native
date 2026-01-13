import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import data from "../data/countries.json";

class CountriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  componentDidMount() {
    // Fetching data from local JSON file
    this.setState({
      countries: data,
    });
  }

  renderItem = ({ item }) => {
    const { name, country, description } = item;

    return (
      <View style={styles.cardWrapper}>
        <Text style={styles.title}>Country name: {name}</Text>
        <Text style={styles.subtitle}>City name: {country}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Countries Screen</Text>

        <FlatList
          data={this.state.countries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default CountriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  cardWrapper: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    marginTop: 6,
    color: "#555",
  },
});
