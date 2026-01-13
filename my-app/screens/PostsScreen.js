import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

class PostsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [], // will store the fetched JSON data
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const jsonData = await response.json();

      this.setState({ posts: jsonData });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default PostsScreen;
